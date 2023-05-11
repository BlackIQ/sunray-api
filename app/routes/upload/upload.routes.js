/*
    Routes name: User Data Routes
    Routes start: /api/user/user
*/

import express from "express";

import { Upload } from "$app/controllers/index.js";

const router = express.Router();

router.get("/", Upload.ALL);
router.post("/", Upload.CREATE);
router.delete("/:id", Upload.DELETE);
router.patch("/:id", Upload.UPDATE);

export default router;
