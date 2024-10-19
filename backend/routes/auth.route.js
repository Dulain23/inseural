import express from "express";

import { verifyAuth, register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/:id', verifyAuth);
router.post('/register', register);
router.post('/login', login);


export default router;