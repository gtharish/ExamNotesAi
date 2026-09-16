import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { setUserData, setAuthenticated, setCredits } from "../redux/userSlice.js";
import logo from "../assets/logo.png";

export default function Auth() {
  const ServerUrl = import.meta.env.VITE_SERVER_URL
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const User = response.user;
      
      const name = User.displayName;
      const email = User.email;
      const result = await axios.post(
       ServerUrl + "/api/auth/login",
        { name, email },
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(result.data.user));
      dispatch(setAuthenticated(true));
      dispatch(setCredits(result.data.user.credit))
      Navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 px-4 sm:px-8 py-6 relative overflow-x-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-100/40 via-purple-50/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none -z-10" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto rounded-2xl bg-neutral-950 border border-neutral-800 px-6 py-4 shadow-[0_16px_36px_rgba(0,0,0,0.2)] flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="ExamNotes AI"
            className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">
                ExamNotes
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              AI-powered exam-oriented notes & revision
            </p>
          </div>
        </Link>

        <Link
          to="/"
          className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
        >
          Back to Home →
        </Link>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-xs text-xs font-semibold text-neutral-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>50 Free Generation Credits On Signup</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
            Unlock Smart <br />
            <span className="bg-gradient-to-r from-neutral-950 via-neutral-800 to-indigo-900 bg-clip-text text-transparent">
              AI Exam Notes
            </span>
          </h1>

          <p className="text-base text-neutral-600 max-w-lg leading-relaxed font-normal">
            You get <span className="font-bold text-neutral-900">50 FREE credits</span> to create
            exam notes, project documentation, diagrams, charts and download clean, printable PDFs —
            instantly using AI.
          </p>

          {/* Google Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleAuth}
              className="
                w-full sm:w-auto
                px-8 py-3.5 rounded-xl
                flex items-center justify-center gap-3
                bg-neutral-950 hover:bg-neutral-900
                border border-neutral-800
                text-white font-semibold text-sm sm:text-base
                shadow-[0_12px_28px_rgba(0,0,0,0.18)]
                hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)]
                transition-all duration-200
                cursor-pointer
              "
            >
              <FcGoogle size={22} />
              <span>Continue with Google</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Instant access • No credit card required • Upgrade anytime</span>
          </div>
        </motion.div>

        {/* Right Content - Features */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Feature
            icon="🎁"
            title="50 Free Credits"
            desc="Start with 50 credits to generate notes without paying."
          />

          <Feature
            icon="📄"
            title="Exam Notes"
            desc="High-yield, revision-ready exam-oriented notes."
          />

          <Feature
            icon="📁"
            title="Project Notes"
            desc="Well-structured documentation for assignments & projects."
          />

          <Feature
            icon="📊"
            title="Charts & Graphs"
            desc="Auto-generated diagrams, charts and flow graphs."
          />

          <div className="sm:col-span-2">
            <Feature
              icon="📥"
              title="Free PDF Download"
              desc="Download clean, printable PDFs instantly to study offline anywhere."
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

/* Feature Card Component */
function Feature({ icon, title, desc }) {
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate("/");
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleLoginPage}
      className="
        rounded-2xl p-5
        bg-white
        border border-neutral-200/80
        hover:border-neutral-300
        shadow-[0_2px_10px_rgba(0,0,0,0.02)]
        hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]
        transition-all duration-200
        cursor-pointer
      "
    >
      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-xl mb-3">
        {icon}
      </div>

      <h3 className="text-sm font-bold text-neutral-900 mb-1">
        {title}
      </h3>

      <p className="text-neutral-500 text-xs leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}