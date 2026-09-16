import express from "express"

import fetchUser from "../middleware/fetchUser.js";
import { pdfDownload } from "../controller/pdfDownloadController.js";
const pdfRouter = express.Router();



 pdfRouter.post("/generate-pdf",fetchUser, pdfDownload);


export default  pdfRouter;
