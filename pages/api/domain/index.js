import nc from 'next-connect';
import fetch from 'node-fetch';

import { dbConnect, filterObject } from 'utils';
import Tenant from 'models/tenantModel';
import { withProtect } from 'middleware/api/withProtect';
import { withSubscription } from 'middleware/api/withSubscription';

dbConnect();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: {
        message: err.message || 'Server Error',
      },
    });
  },
});

// Protect routes
handler.use(withProtect);

// Check subscription
handler.use(withSubscription);

// Create domain and update Tenant
handler.patch(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(req.body, 'domain');

  // Check if domain is in use
  const domainInUse = await Tenant.findOne({
    domain: filteredBody.domain,
  });

  if (domainInUse) {
    throw new Error('Domain already in use.');
  }

  // Create domain in Render
  const response = await fetch(
    `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/custom-domains`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RENDER_API}`,
      },
      body: JSON.stringify({ name: filteredBody.domain }),
    }
  );

  // Throw error if status is error
  if (response.status === 201) {
    const tenantId = req.user.tenant_mongo_id;
    // Update tenant with domain
    const tenant = await Tenant.findByIdAndUpdate(tenantId, filteredBody, {
      new: true,
      runValidators: true,
    });

    // Return updated tenant
    return res.status(200).json({
      success: true,
      data: {
        tenant,
      },
    });
  } else {
    const { message } = await response.json();

    throw new Error(message);
  }
});

export default handler;
