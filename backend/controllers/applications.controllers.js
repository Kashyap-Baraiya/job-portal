import Applications from "../models/applications.model.js";
import Job from "../models/job.model.js";


export const applyJob = async (req, res) => {

    try {
        const userId = req.id;
        const jobId = req.params.id;

        console.log(userId);
        console.log(jobId);

        if (!jobId) {
            return res.status(400).json({
                message: "job id is required",
                success: false
            });
        };

        const existingApplication = await Applications.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "you have already applied for this jobs",
                success: false
            });
        };

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            });
        };

        const newApplication = await Applications.create({
            job: jobId,
            applicant: userId
        });
       

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "job applied successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}



export const getAppliedJob = async (req, res) => {

    try {
        const userId = req.id;

        const appliedJob = await Applications.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!appliedJob) {
            return res.status(404).json({
                message: "appliedJob not found",
                success: false,
            });
        };

        return res.status(200).json({
            appliedJob,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}



export const getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findOne({_id:jobId}).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            });
        };


        res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}



export const updateStatus = async (req, res) => {
    try {
        console.log("hello")
        console.log(req.body);
        const {status} = req.body;
        console.log(status);
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "status id is required",
                success: false
            });
        };

        const application = await Applications.findById(applicationId);

         if (!application) {
            return res.status(404).json({
                message: "Appliation not found",
                success: false
            });
        };


        application.status = status.toLowerCase();
        await application.save();


        return res.status(200).json({
           message:"status updated successfully",
           success:true,
        });

    } catch (error) {
        console.log(error)
    }
}


