import axios from "axios"

import { setAuthenticated, setCredits, setUserData } from "../redux/userSlice.js";
import { ServerUrl } from "../App.jsx";

export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(ServerUrl + "/api/auth/getUser", {
            withCredentials: true
        })

        dispatch(setUserData(result.data.user))
        dispatch( setCredits(result.data.user.credit))
        dispatch(setAuthenticated(true))

    }
    catch (e) {
        console.log(e.message)
    }
}

export const generateNotes = async (payload) => {
    try {
        const result = await axios.post(ServerUrl + "/api/note/generate-note", payload, {
            withCredentials: true
        })
       
        return result.data;

    } catch (e) {
        console.log(e.message)
    }
}
export const downloadPdf = async (result) => {
    try {
        const response = await axios.post(
            ServerUrl + "/api/pdf/generate-pdf",
            { result },
            {
                responseType: "blob",
                withCredentials: true,
            }
        );

        const blob = new Blob([response.data], {
            type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "ExamNotesAI.pdf";

        link.click();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        throw new error("pdf download failed");
    }
};