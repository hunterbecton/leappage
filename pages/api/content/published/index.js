import nc from "next-connect";

import { dbConnect } from "utils";
import Content from "models/contentModel";
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

// Get all published Content
handler.get(async (req, res, next) => {
  let filter = { status: "published" };

  const totalContent = await Content.countDocuments(filter);

  const features = new APIFeatures(
    Content.find(filter).populate({
      path: "categoryInfo",
      select: "title",
    }),
    req.query,
    req.url
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const content = await features.query;

  return res.status(200).json({
    success: true,
    data: {
      content,
      totalContent,
    },
  });
});

export default handler;
