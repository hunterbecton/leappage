import nc from 'next-connect';
import multer from 'multer';
import storage from 'services/google';

import { dbConnect } from 'utils';
import Media from 'models/mediaModel';
import { withProtect } from 'middleware/api/withProtect';
import { withRestrict } from 'middleware/api/withRestrict';
import { withSubscription } from 'middleware/api/withSubscription';

dbConnect();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    throw new Error('Only upload JPG, PNG, or SVG files.');
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // no larger than 2mb
  },
  fileFilter: multerFilter,
});

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

// Use Multer middleware
handler.use(upload.single('file'));

// Create and upload Media
handler.post(async (req, res, next) => {
  if (!req.file) {
    throw new Error('Please include a file to upload.');
  }

  let ext = req.file.mimetype.split('/')[1];

  // If ext is svg format correctly
  if (ext === 'svg+xml') {
    ext = 'svg';
  }

  // Upload preview file to Google
  const path = `${req.user.tenant_mongo_id}-${new Date().getTime()}`;
  const bucketName = 'ace-case-336816.appspot.com';
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(
    `tenants/${req.user.firebase.tenant}/media/${path}.${ext}`
  );

  await file.save(req.file.buffer);

  // await file.setMetadata({
  //   cacheControl: 'no-store',
  // });

  let publicFile = `https://storage.googleapis.com/${bucketName}/tenants/${req.user.firebase.tenant}/media/${path}`;

  // Create media in MongoDB
  const media = await Media.create({
    title: req.file.originalname,
    url: `${publicFile}.${ext}`,
    size100: `${publicFile}_100x100.${ext}`,
    size200: `${publicFile}_200x200.${ext}`,
    size500: `${publicFile}_500x500.${ext}`,
    tenant: req.user.tenant_mongo_id,
  });

  return res.status(200).json({
    success: true,
    data: {
      media,
    },
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
