import nc from 'next-connect';
import fetch from 'node-fetch';

import { dbConnect } from 'utils';
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

// Delete domain and update Tenant
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Remove domain in Render
  const response = await fetch(
    `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/custom-domains/${id}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RENDER_API}`,
      },
    }
  );

  // Throw error if status is error
  if (response.status === 204) {
    const tenant = await Tenant.findOneAndUpdate(
      {
        tenant: req.user.tenant_mongo_id,
      },
      { domain: null },
      { new: true, runValidators: true }
    );

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
