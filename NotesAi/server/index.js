import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import AuthRoute from "./route/Auth.js"
import UserRoute from "./route/User.js"
import NoteRoute from "./route/Note.js"

import { ConnectDB } from "./utils/db.js";
import cookieParser from "cookie-parser";
import pdfRouter from "./route/pdf.js"
import paymentRouter from "./route/payment.js"
import { stripeWebhook } from "./controller/paymentController.js"

dotenv.config({});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

app.post("/api/credit/webhook",
    express.raw({type:"application/json"}),
    stripeWebhook
)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
console.log(`server is running on the ${PORT}`)
ConnectDB();
});


app.get("/",(req,res)=>{
    res.send("landing page of the website")
});

app.use("/api/auth",AuthRoute);
app.use("/api/user",UserRoute);
app.use("/api/note",NoteRoute);
app.use("/api/credit",paymentRouter)
app.use("/api/pdf",pdfRouter);
