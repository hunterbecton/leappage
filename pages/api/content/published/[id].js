import nc from "next-connect";

import { dbConnect } from "utils";
import Content from "models/contentModel";

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

// Get published Content
handler.get(async (req, res, next) => {
  const { id } = req.query;

  // Ignore demo / placeholder data
  if (id.startsWith("demo")) {
    return res.status(200).json({
      success: true,
      data: {
        content: {
          id,
          title: "4 Simple Tips for Leveraging the Power of Social Media",
          description:
            "The importance of customer reviews online for businesses can mean a surge in brand awareness and an overall increase in profit in the long run.",
          categoryInfo: [{ title: "Resource" }],
          feature: "https://dummyimage.com/672x512/f3f4f6/1f2937.jpg",
          url: "https://leappage.com",
        },
      },
    });
  }

  const content = await Content.findOne({
    _id: id,
    status: "published",
  }).populate({
    path: "categoryInfo",
    select: "title",
  });

  if (!content) {
    throw new Error("Content not found.");
  }

  return res.status(200).json({
    success: true,
    data: {
      content,
    },
  });
});

export default handler;
