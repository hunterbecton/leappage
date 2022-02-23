import nc from 'next-connect';

import { dbConnect, filterObject } from 'utils';
import Theme from 'models/themeModel';
import { withProtect } from 'middleware/api/withProtect';
import { withSubscription } from 'middleware/api/withSubscription';

dbConnect();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err);
    res.status(500).end(err.toString());
  },
});

// Protect routes
handler.use(withProtect);

// Check subscription
handler.use(withSubscription);

// Create theme
handler.post(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'primary',
    'primaryLight',
    'primaryHover',
    'fontFamily'
  );

  // Create theme in MongoDB
  const theme = await Theme.create({
    ...filteredBody,
    tenant: req.user.tenant_mongo_id,
  });

  return res.status(200).json({
    success: true,
    data: {
      theme,
    },
  });
});

export default handler;
