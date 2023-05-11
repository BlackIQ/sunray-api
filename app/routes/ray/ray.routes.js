/*
    Routes name: User Data Routes
    Routes start: /api/user/user
*/

import express from "express";

import { Ray } from "$app/controllers/index.js";

const router = express.Router();

router.get("/", Ray.RAY);

export default router;
