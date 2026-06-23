import express from 'express'
import { login, logout, register, updatProfile } from '../controllers/user.controllers.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.route("/register").post(upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
    { name: "companyPhoto", maxCount: 1 }
]), register);
router.route('/login').post(login);
router.route("/logout").post(logout);

router.route("/profile/update").put(isAuthenticated, upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
    { name: "companyPhoto", maxCount: 1 }
]), updatProfile);


export default router;