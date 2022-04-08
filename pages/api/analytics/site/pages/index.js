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

// Get site analytics
handler.get(async (req, res, next) => {
  // Get items from req.query
  const filteredQuery = filterObject(req.query, 'last');

  const last = filteredQuery.last * 1 ? filteredQuery.last * 1 : 30;

  const tenant = await Tenant.findById(req.user.tenant_mongo_id);

  const hostname = tenant.domain
    ? `https://${tenant.domain}`
    : `https://${tenant.subdomain}.leappage.com`;

  let filters = [
    {
      property: 'hostname',
      operator: 'is',
      value: hostname,
    },
  ];

  filters = JSON.stringify(filters);

  const now = new Date().toISOString();

  const thirtyDaysAgo = new Date(
    new Date().setDate(new Date().getDate() - last)
  ).toISOString();

  let fetchRoute = `https://api.usefathom.com/v1/aggregations?entity=pageview&entity_id=ACPBVJGZ&aggregates=visits,uniques,pageviews,avg_duration&filters=${filters}&date_from=${thirtyDaysAgo}&date_to=${now}&field_grouping=pathname&sort_by=pageviews:desc`;

  const response = await fetch(fetchRoute, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.FATHOM_API}`,
    },
  });

  const data = await response.json();

  return res.status(200).json({
    success: true,
    data,
  });
});

export default handler;
