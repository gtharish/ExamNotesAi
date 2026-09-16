import User from "../model/user.model.js"
import Notes from "../model/notes.model.js"
import { generateGeminiResponse } from "../services/googleGemini.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
    const { Topic, classLevel, examType, revisionMode, includeDiagram, includeChart } = req.body;
    if (!Topic) {
        return res.status(400).json({
            message: "Topic is not given",
            success: false
        })
    }
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(401).json({
            message: "resource are not accessible",
            success: false
        })
    }
    let credit = user.credit;
    
    if (credit < 10) {
        user.isCreditAvailable = false;
        user.save();
        return res.status(400).json({
            message: "credits insufficient",
            success: false
        })
    }
    const prompt = buildPrompt({ Topic, classLevel, examType, revisionMode, includeDiagram, includeChart });

    const aiResponse = await generateGeminiResponse(prompt);
    const note = await Notes.create({
        user: user._id, Topic, classLevel, examType, revisionMode, includeDiagram, includeChart,
        content: aiResponse

    });
    console.log(note);
    credit = credit- 10;
    if (credit <= 0) user.isCreditAvailable = false;
    if (!Array.isArray(user.notes)) user.notes = [];
    user.notes.push(note._id);
    user.credit = credit;
    console.log(user.credit)
    await user.save();

    return res.status(200).json({
        data: aiResponse,
        creditLeft: credit,
        note_id: note._id,
        message: "data sent successfully",
        succcess: true
    })


};

export const getHistory = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "unotherized access",

            })
        }
        const NotesId = user.notes

        const notes = await Promise.all(
            NotesId.map((noteId) =>

                Notes.findById(noteId).select(
                    "_id,Topic classLevel examType includeDiagram includeChart revisionMode content.quickOverview createdAt"
                )
            )
        );


        return res.status(200).json({
            success: false,
            message: "user history found",
            notes

        })

    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Intena server error !!",

        })
    }
};

export const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.notes.includes(noteId)) {
            return res.status(404).json({
                success: false,
                message: "Note ID not found in user's notes"
            });
        }

        user.notes.pull(noteId);
        await user.save();



        // if (!notes) {
        //     return res.status(404).json({
        //         message: "notes not found",
        //         message: false
        //     })
        // }
        return res.status(200).json({
            messsage: "note is deleted succesfully",
            success: true,

        })

    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Intena server error !!",

        })
    }
}

export const getNote = async (req, res) => {
    const noteId = req.params.id;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const note = await Notes.findById(noteId);
       if(!note){
         return res.status(404).json({
                success: false,
                message: "Note ID is not found"
            });
       }
       return res.status(200).json({
        message:"Note fetched successfully",
        success:true,
        note
       })
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Intenal server error !!",

        })
    }

}
