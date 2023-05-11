import express from "express";

import Client from "$app/routes/client/client.routes.js";
import Upload from "$app/routes/upload/upload.routes.js";
import Ray from "$app/routes/ray/ray.routes.js";

const router = express.Router();

router.use("/clients", Client);
router.use("/uploads", Upload);
router.use("/ray", Ray);

export default router;
