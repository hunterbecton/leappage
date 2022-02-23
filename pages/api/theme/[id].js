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

// Update current theme
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Get items from req.body
  const filteredBody = filterObject(
    req.body,
    'primary',
    'primaryLight',
    'primaryHover',
    'fontFamily'
  );

  // Update theme in MongoDB
  const theme = await Theme.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    success: true,
    data: {
      theme,
    },
  });
});

export default handler;
