import nc from "next-connect";

import { dbConnect, filterObject } from "utils";
import Category from "models/categoryModel";
import { withProtect } from "middleware/api/withProtect";
import { withRestrict } from "middleware/api/withRestrict";
import { withSubscription } from "middleware/api/withSubscription";

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

// Restrict routes
handler.use(withRestrict("admin", "editor"));

// Create Category
handler.post(async (req, res, next) => {
  // Get items from req.body
  const filteredBody = filterObject(req.body, "title");

  // Create Category in MongoDB
  const category = await Category.create({
    ...filteredBody,
    tenant: req.user.tenant_mongo_id,
  });

  return res.status(200).json({
    success: true,
    data: {
      category,
    },
  });
});

export default handler;
