import jwt from "jsonwebtoken"

const fetchUser = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.status(400).json({
                message: "There is no token",
                success: false
            });
        }
        const tokenData = await jwt.verify(token, process.env.SECRET);
        console.log(tokenData)
        req.userId = tokenData.userId
      
        console.log(req.userId);
        next();

    }
    catch (e) {
        console.log(e.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        })
    }
}

export default fetchUser;