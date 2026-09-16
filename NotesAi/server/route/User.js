import express from "express"
import { getUser } from "../controller/userController.js";
import fetchUser from "../middleware/fetchUser.js";
const router = express.Router();



router.get("/getUser",fetchUser,getUser);


export default router;
