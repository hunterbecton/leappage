import nc from "next-connect";

import { dbConnect } from "utils";
import Media from "models/mediaModel";
import { withProtect } from "middleware/api/withProtect";
import APIFeatures from "utils/APIFeatures";

dbConnect();

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

// Get Media
handler.get(async (req, res, next) => {
  let filter = { tenant: req.user.tenant_mongo_id };

  const totalMedia = await Media.countDocuments(filter);

  const features = new APIFeatures(Media.find(filter), req.query, req.url)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const media = await features.query;

  return res.status(200).json({
    success: true,
    data: {
      media,
      totalMedia,
    },
  });
});

export default handler;
