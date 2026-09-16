import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import FinalResult from "./FinalResult";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import axios from "axios";
import { ServerUrl } from "../App.jsx";

export default function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  
  const credits = user.credits;
  useEffect(() => {
    let active = true;

    const fetchNote = async () => {
      if (!id) {
        setError("This note could not be loaded.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`${ServerUrl}/api/note/${id}`, {
          withCredentials: true,
        });
        const note = response.data?.note;
        const noteContent = note?.content ?? note;

        if (active && noteContent && typeof noteContent === "object") {
          setResult(noteContent);
        } else if (active) {
          setResult(null);
          setError("This note does not contain valid generated content.");
        }
      } catch (fetchError) {
        console.error("Failed to fetch note:", fetchError);
        if (active) {
          setResult(null);
          setError(
            fetchError.response?.data?.message ||
              "Failed to load this note. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchNote();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-16">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-indigo-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* WORKSPACE HEADER BAR */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mb-8 rounded-2xl
            bg-neutral-950
            border border-neutral-800
            px-6 sm:px-8 py-4 sm:py-5
            shadow-[0_16px_36px_rgba(0,0,0,0.2)]
            flex flex-col sm:flex-row sm:items-center justify-between gap-4
          "
        >
          {/* Logo & Title */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="ExamNotes AI"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  ExamNotes
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI Workspace
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                AI-powered exam-oriented notes, revision & smart diagrams
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate("/pricing")}
              className="
                flex items-center gap-2
                px-3.5 py-1.5 rounded-full
                bg-white/10 hover:bg-white/15
                border border-white/15
                text-white text-xs sm:text-sm font-medium
                transition
                cursor-pointer
              "
              title="Credits available"
            >
              <span className="text-amber-400">✦</span>
              <span className="font-bold">{credits}</span>
              <span className="text-xs text-neutral-400">credits</span>
              <motion.span
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-4 h-4 rounded-full bg-white text-neutral-950 text-xs font-bold flex items-center justify-center ml-0.5"
              >
                +
              </motion.span>
            </button>

            <button
              onClick={() => navigate("/history")}
              className="
                px-4 py-2 rounded-xl
                text-xs sm:text-sm font-semibold
                bg-white/10 hover:bg-white/15
                border border-white/15
                text-white
                transition
                flex items-center gap-2
                cursor-pointer
              "
            >
              <span>📚</span>
              <span>Your Notes</span>
            </button>
          </div>
        </motion.header>

     
{/* 
        ERROR MESSAGE BANNER */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium text-center flex items-center justify-center gap-2"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        {/* EMPTY STATE (BEFORE GENERATION) */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-[60vh] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
      w-10 h-10
      rounded-full
      border-4
      border-neutral-200
      border-t-indigo-600
    "
            />

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="mt-4 text-sm font-medium text-neutral-600"
            >
              Loading your note...
            </motion.p>
          </motion.div>
        )}

        {!loading && !result && !error && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900">
                Note not found
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                This note may have been deleted or does not exist.
              </p>
              <button
                onClick={() => navigate("/history")}
                className="mt-5 px-4 py-2 rounded-xl bg-neutral-950 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Back to History
              </button>
            </div>
          </div>
        )}

        {/* RESULT PRESENTATION (AFTER GENERATION) */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:grid lg:grid-cols-4 gap-6 items-start"
          >
            {/* STICKY STUDY NAVIGATION SIDEBAR */}
            <aside className="w-full lg:col-span-1 lg:sticky lg:top-6">
              <Sidebar result={result} />
            </aside>

            {/* MAIN STUDY DOCUMENT AREA */}
            <main
              className="
                w-full lg:col-span-3
                rounded-3xl
                bg-white
                border border-neutral-200/80
                shadow-[0_12px_40px_rgba(0,0,0,0.06)]
                p-6 sm:p-8
              "
            >
              <FinalResult result={result} />
            </main>
          </motion.div>
        )}
      </div>
    </div>
  );
}
