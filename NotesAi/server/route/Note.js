import express from "express"
import { deleteNote, generateNotes, getHistory,getNote} from "../controller/generateController.js";
import fetchUser from "../middleware/fetchUser.js";
const router = express.Router();



router.post("/generate-note",fetchUser, generateNotes);
router.get("/history",fetchUser,getHistory);
router.delete("/history/:id",fetchUser,deleteNote);
router.get("/:id",fetchUser, getNote);



export default router;
