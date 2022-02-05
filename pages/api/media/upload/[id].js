import nc from "next-connect";
import multer from "multer";
import storage from "services/google";

import { dbConnect, filterObject } from "utils";
import Media from "models/mediaModel";
import { withSubscription } from "middleware/api/withSubscription";
import { withProtect } from "middleware/api/withProtect";
import { withRestrict } from "middleware/api/withRestrict";

dbConnect();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    throw new Error("Only upload JPG, PNG, or SVG files.");
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
        message: err.message || "Server Error",
      },
    });
  },
});

// Protect routes
handler.use(withProtect);

// Check subscription
handler.use(withSubscription);

// Restrict routes
handler.use(withRestrict("admin", "editor"));

// Use Multer middleware
handler.use(upload.single("file"));

// Update Media
handler.patch(async (req, res, next) => {
  const { id } = req.query;

  // Get items from req.body
  const filteredBody = filterObject(req.body, "title", "url");

  // Update if new file was uploaded
  if (req.file) {
    let ext = req.file.mimetype.split("/")[1];

    // If ext is svg format correctly
    if (ext === "svg+xml") {
      ext = "svg";
    }

    // Check uploaded extension matches current
    const lastDot = filteredBody.url.lastIndexOf(".");
    const currentExt = filteredBody.url.substring(lastDot + 1);

    if (ext !== currentExt) {
      throw new Error("Only replace files with the same file type.");
    }

    // Upload preview file to Google
    const lastSlash = filteredBody.url.lastIndexOf("/");

    const path = filteredBody.url.substring(lastSlash + 1);

    const bucketName = "ace-case-336816.appspot.com";
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(
      `tenants/${req.user.firebase.tenant}/media/${path}`
    );

    await file.save(req.file.buffer);

    await file.makePublic();

    await file.setMetadata({
      cacheControl: "no-store",
    });

    let publicFile = `https://storage.googleapis.com/${bucketName}/tenants/${req.user.firebase.tenant}/media/${path}`;

    filteredBody.url = publicFile;
  }

  const media = await Media.findOneAndUpdate(
    {
      _id: id,
      tenant: req.user.tenant_mongo_id,
    },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!media) {
    throw new Error("Media not found..");
  }

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
