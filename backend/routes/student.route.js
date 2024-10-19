import express from "express";

import { verifyStudent } from "../controllers/student.controller.js";

const router = express.Router();

router.get('/:id', verifyStudent);
// router.post('/register', register);
// router.post('/login', login);

export default router;