import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { fullname, password, role, email, phoneNumber } = req.body;
        const filePath = req.files?.profilePhoto?.[0]?.path;
        const fileName = req.files?.profilePhoto?.[0]?.originalname;
        // console.log(filePath);

        if (!fullname || !password || !role || !email || !phoneNumber) {
            return res.status(400).json(
                {
                    message: "something is missing",
                    success: false
                }
            )
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json(
                {
                    message: "user already exist with this email",
                    success: false
                })
        }

        const hashedPassward = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassward,
            role,
            profile: {
                profilePhoto: {
                    url: filePath,
                    fileName
                },
            }
        })

        const tokenData = {
            userId: newUser._id
        }

        console.log(tokenData);
        console.log(process.env.SECRET_KEY);

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            newUser,
            message: "user register successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}



export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!password || !role || !email) {
            return res.status(400).json(
                {
                    message: "something is missing",
                    success: false
                }
            )
        }

        let user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json(
                {
                    message: "Incorrect email or passward1",
                    success: false
                }
            )
        }

        const currectPassward = await bcrypt.compare(password, user.password);
        if (!currectPassward) {
            return res.status(400).json(
                {
                    message: "Incorrect email or passward",
                    success: false
                }
            )
        }

        if (role != user.role) {
            return res.status(400).json(
                {
                    message: "Account dosen't exist with this role",
                    success: false
                }
            )
        }

        const tokenData = {
            userId: user._id
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });



        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            user,
            message: `welcome back ${user.fullname}`,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}



export const updatProfile = async (req, res) => {
    const { fullname, bio, skills, email } = req.body;
    const filePath = req.files?.resume?.[0]?.path;
    const fileName = req.files?.resume?.[0]?.originalname;
    // console.log(fullname, bio, skills, email);


    if (!fullname || !email) {
        return res.status(400).json(
            {
                message: "something is missing",
                success: false
            }
        )
    }


    const userId = req.id;

    let user = await User.findById(userId);


    const setskills = () => {
        if (skills.length > 0) {
            const skillsArray = skills.trim().split(",");
            return skillsArray;
        } else {
            return [];
        }
    }


    const skillsArray = setskills();


    if (!user) {
        return res.status(401).json({
            message: "user not found",
            success: false
        });
    };

    user.fullname = fullname;
    user.profile.skills = skillsArray;
    user.profile.bio = bio;
    user.email = email;
    user.profile.resume = filePath;
    user.profile.resumeOriginalname = fileName;

    await user.save();

    res.status(200).json({
        user,
        message: "profile update successfully",
        success: true
    })

}


export const logout = async (req, res) => {
    try {
        return res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            path: "/"
        }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};





