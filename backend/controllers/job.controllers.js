import Applications from "../models/applications.model.js";
import Job from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, location, requirements, salary, experienceLevel, position, jobType, company } = req.body;
        console.log(title, description, location, requirements, salary, experienceLevel, position, jobType, company);

        const userId = req.id;

        if (!title || !description || !location || !requirements || !salary || !experienceLevel || !position || !jobType || !company) {
            return res.status(400).json({
                message: "somthing is missing",
                success: false
            })
        };


        let requirementsArray = requirements.split(",");
        // console.log(requirementsArray)

        const job = await Job.create({
            title,
            description,
            location,
            requirements: requirementsArray,
            salary: Number(salary),
            experienceLevel,
            position,
            jobType,
            company,
            created_by: userId,
        })

        return res.status(201).json({
            job,
            message: "New job created sucessfully !",
            success: true
        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Sever error!",
            success: true
        });
    }
}




export const getAlljob = async (req, res) => {
    try {
        const { q, location, jobType, sortBy } = req.query;
        let query = {};

        if (q) {
            query.$or = [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                { role: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
            ];
        }


        if (location) {
            query.location = location;
        }


        if (jobType) {
            query.jobType = jobType;
        }


        let sortOption = { createdAt: -1 };

        if (sortBy === "salaryLowHigh") sortOption = { salary: 1 };
        if (sortBy === "salaryHighLow") sortOption = { salary: -1 };


        const jobs = await Job.find(query)
            .populate("company")
            .sort(sortOption);

        res.status(200).json({
            success: true,
            job: jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            populate: {
                path: "applicant",
            },
        });

        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            });
        };

        return res.status(200).json({
            job,
            success: true
        });


    } catch (error) {
        console.log(error);
    }
}


//admin jobs

export const adminJobs = async (req, res) => {
    const adminId = req.id;

    const job = await Job.find({ created_by: adminId }).populate({ path: "company" });

    if (!job) {
        return res.status(404).json({
            message: "job not found",
            success: false
        });
    };

    return res.status(200).json({
        job,
        success: true
    });
}


export const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;
        await Applications.deleteMany({ job: id })
        const job = await Job.findOneAndDelete({_id:id});

        res.status(200).json({
            job,
            message: "job Deleted successfully !",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }

}