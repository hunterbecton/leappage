import nc from 'next-connect';

import { dbConnect } from 'utils';
import Media from 'models/mediaModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
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

// Restrict routes
handler.use(withRestrict('admin', 'editor'));

handler.delete(async (req, res, next) => {
  const { id } = req.query;

  // Delete template in MongoDB
  const media = await Media.findOneAndDelete({
    _id: id,
    tenant: req.user.tenant_mongo_id,
  });

  if (!media) {
    throw new Error('Media not found.');
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
