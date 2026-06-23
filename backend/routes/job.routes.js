import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { adminJobs, deleteJob, getAlljob, getJobById, postJob } from '../controllers/job.controllers.js';

const router = express.Router();


router.route('/post').post(isAuthenticated,postJob);
router.route('/get').get(getAlljob);
router.route("/delete/:id").delete(isAuthenticated,deleteJob);
router.route('/getadminjob').get(isAuthenticated,adminJobs);
router.route('/:id').get(isAuthenticated,getJobById);


export default router;