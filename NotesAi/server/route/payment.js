import express from "express"

import fetchUser from "../middleware/fetchUser.js";
import { createCheckoutSession } from "../controller/paymentController.js";
const paymentRouter = express.Router();

paymentRouter.post("/orders",fetchUser, createCheckoutSession);

export default paymentRouter;