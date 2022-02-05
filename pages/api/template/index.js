import nc from "next-connect";

import { dbConnect, filterObject } from "utils";
import Template from "models/templateModel";
import { withProtect } from "middleware/api/withProtect";
import { withSubscription } from "middleware/api/withSubscription";
import { withRestrict } from "middleware/api/withRestrict";

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

// Restrict routes
handler.use(withRestrict("admin", "editor"));

// Create Template
handler.post(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(req.body, "title", "frame");

  // Create Template in MongoDB
  const template = await Template.create({
    ...filteredBody,
    tenant: req.user.tenant_mongo_id,
  });

  return res.status(200).json({
    success: true,
    data: {
      template,
    },
  });
});

export default handler;
