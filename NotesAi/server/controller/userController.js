import User from "../model/user.model.js"
import Token from "../utils/token.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name, email
            });

        };
        const userId = user._id;
        const token = await Token({ userId });
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true,
           sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000

        }).json({
            message: "user Login successfully",
            succses: true,
            user,token
        });

    }
    catch (e) {
        console.error(e.message);
    }

};

export const LogOut = async (req, res) => {
    await res.clearCookie("token");
    return res.status(200).json({
        message: "user log out successfully",
        success: true
    })
};

export const getUser = async (req, res) => {
    try {
        const userId  = req.userId;
        console.log(userId);
        const user = await User.findById(userId);
        if (!user) {
            return res.json(404).json({
                message: "there is no user",
                success: false
            })

        }
       
        console.log(user);
        return res.status(200).json({
            message: "user found successfull",
            success: true,
            user
        })
    }
    catch (e) {
        console.log(e.message);
    }

};