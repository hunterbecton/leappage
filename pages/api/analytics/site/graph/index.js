import nc from 'next-connect';
import fetch from 'node-fetch';

import { dbConnect, filterObject, getDateArray } from 'utils';
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

  let fetchRoute = `https://api.usefathom.com/v1/aggregations?entity=pageview&entity_id=ACPBVJGZ&aggregates=visits,uniques,pageviews,avg_duration&filters=${filters}&date_from=${thirtyDaysAgo}&date_to=${now}&date_grouping=day&sort_by=timestamp:asc`;

  const response = await fetch(fetchRoute, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.FATHOM_API}`,
    },
  });

  const data = await response.json();

  const dateArray = getDateArray(thirtyDaysAgo, now);

  // Remove time from dateArray
  const formatedDateArray = dateArray.map(
    (date) => new Date(date).toISOString().split('T')[0]
  );

  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];

  let newData = [];

  // Go through dateArray and see if date exists in data
  formatedDateArray.forEach((date, i) => {
    const found = data.some((el) => el.date === date);

    // Add empty data point if not found
    if (!found) {
      newData.splice(i, 0, {
        visits: null,
        uniques: null,
        pageviews: null,
        avg_duration: null,
        date,
      });
    }
    // Add data to newDate if found
    else {
      // Get index of data at date found
      let dataIndex = data.map((stat) => stat.date).indexOf(date);

      newData.splice(i, 0, data[dataIndex]);
    }
  });

  return res.status(200).json({
    success: true,
    data: newData,
  });
});

export default handler;
