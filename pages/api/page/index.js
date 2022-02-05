import nc from "next-connect";

import { dbConnect, filterObject } from "utils";
import Page from "models/pageModel";
import { withProtect } from "middleware/api/withProtect";
import { withSubscription } from "middleware/api/withSubscription";

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

// Check subscription
handler.use(withSubscription);

// Create Page
handler.post(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(req.body, "title", "frame");

  // Create Page in MongoDB
  const page = await Page.create({
    ...filteredBody,
    tenant: req.user.tenant_mongo_id,
    user: req.user.uid,
  });

  return res.status(200).json({
    success: true,
    data: {
      page,
    },
  });
});

export default handler;
