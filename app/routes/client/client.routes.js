/*
    Routes name: User Data Routes
    Routes start: /api/user/user
*/

import express from "express";

import { Client } from "$app/controllers/index.js";

const router = express.Router();

router.get("/test", Client.TEST);

router.get("/", Client.ALL);
router.post("/", Client.CREATE);
router.delete("/:id", Client.DELETE);

export default router;
