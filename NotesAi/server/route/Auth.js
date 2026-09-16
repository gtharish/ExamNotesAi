import express from "express"
import { googleAuth,LogOut,getUser } from "../controller/userController.js";
import fetchUser from "../middleware/fetchUser.js";
const router = express.Router();


router.post("/login",googleAuth);
router.get("/logout",LogOut);
router.get("/getUser",fetchUser,getUser);


export default router;
