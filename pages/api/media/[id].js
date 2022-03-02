import nc from 'next-connect';

import { dbConnect } from 'utils';
import Media from 'models/mediaModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
import { withSubscription } from 'middleware/api/withSubscription';
import storage from 'services/google';

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

const handleGoogleDelete = async (url, tenant) => {
  const lastSlash = url.lastIndexOf('/');
  const path = url.substring(lastSlash + 1);

  const bucketName = 'ace-case-336816.appspot.com';
  const bucket = storage.bucket(bucketName);

  await bucket.file(`tenants/${tenant}/media/${path}`).delete();
};

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

  // Delete in GCS
  if (media.url) {
    await handleGoogleDelete(media.url, req.user.firebase.tenant);
  }

  if (media.size100) {
    await handleGoogleDelete(media.size100, req.user.firebase.tenant);
  }

  if (media.size200) {
    await handleGoogleDelete(media.size200, req.user.firebase.tenant);
  }

  if (media.size500) {
    await handleGoogleDelete(media.size500, req.user.firebase.tenant);
  }

  return res.status(200).json({
    success: true,
    data: {},
  });
});

export default handler;
