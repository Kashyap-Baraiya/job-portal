import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controllers.js';
import upload from '../middleware/upload.js'
const router  = express.Router();


router.route('/get').get(isAuthenticated,getCompany);
router.route('/get/:id').get(isAuthenticated,getCompanyById);

router.route('/register').post(isAuthenticated,upload.fields([
    {  name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
    { name: "companyPhoto", maxCount: 1 }]) ,
    registerCompany);

router.route('/update/:id').put(isAuthenticated,upload.fields([
    {  name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
    { name: "companyPhoto", maxCount: 1 }]) ,updateCompany);




export default router;