import Company from "../models/company.model.js";


export const registerCompany = async (req, res) => {
    try {
        const { name, description, location, website } = req.body;
        // console.log(req.files);
        const filePath = req.files?.companyPhoto?.[0]?.path;
        const fileName = req.files?.companyPhoto?.[0]?.originalname;
         console.log(req.body);
         console.log(req.file);

         if(!name || !description || !location){
            return res.status(400).json({
                message:"Name,Description,Location are required !",
                success:false,
            })
         }
        // console.log(name,description,location,website);
        // console.log(fileName,filePath)

        if (!name) {
           return res.status(400).json({
                message: "companyName required !",
                success: false
            })
        }

        const company = await Company.findOne({ name });


        if (company) {
            return res.status(400).json({
                message: "you can't add same company",
                success: false
            })
        }

        const newCompany = await Company.create({
            name,
            description,
            location,
            website,
            logo: {
                logoUrl: filePath,
                fileName: fileName
            },
            userId: req.id,
        })

        return res.status(201).json({
            newCompany,
            message: "company register successfully",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies) {
            res.status(404).json({
                message: "companies not found!",
                success: false
            })
        }

        res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }

}



export const getCompanyById = async (req, res) => {
    try {

        const company = await Company.findById(req.params.id);

        if (!company) {
            res.status(404).json({
                message: "companies not found!",
                success: false
            })
        }

        res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        
        console.log( name, description, website, location )
        const file = req.file;

        let company = await Company.findByIdAndUpdate(req.params.id, { name, description, website, location }, { new: true });


        if (!company) {
            res.status(404).json({
                message: "companies not found!",
                success: false
            })
        }

        res.status(200).json({
            company,
            message: "company updated successfullu",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}