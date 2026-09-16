import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopicForm from "./TopicForm";
import Sidebar from "./Sidebar";
import FinalResult from "./FinalResult";
import logo from "../assets/logo.png";

function Notes() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
 const userData = user.userData;
 const credit = user.credits;
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
              <span className="font-bold">{credit}</span>
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

        {/* TOPIC FORM */}
        <motion.div className="mb-8">
          <TopicForm
            loading={loading}
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />
        </motion.div>

        {/* ERROR MESSAGE BANNER */}
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
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              rounded-3xl
              p-8 sm:p-12
              bg-white
              border border-dashed border-neutral-300
              shadow-[0_2px_12px_rgba(0,0,0,0.02)]
              text-center
              flex flex-col items-center justify-center
            "
          >
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl mb-4 text-neutral-700">
              📝
            </div>

            <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-1">
              Ready to generate your study notes
            </h3>

            <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
              Enter any subject or exam topic above and choose your preferences. ExamNotes AI will formulate structured notes, diagrams, and revision points.
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-neutral-500">
              <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                ⭐ Priority Subtopics
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                ⚡ 5-Minute Revision
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                📊 Visual Flowcharts
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                ❓ High-Yield Q&A
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                📄 Instant PDF Download
              </span>
            </div>
          </motion.div>
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

export default Notes;