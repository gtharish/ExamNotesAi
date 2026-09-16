import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import img from "../assets/img1.png";
import Footer from "./Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen   overflow-x-hidden bg-[#fafafa] text-neutral-900 relative">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-100/40 via-purple-50/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none -z-10" />

      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 pt-16 md:pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-xs font-semibold text-neutral-800"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>AI-Powered Exam Preparation Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]"
          >
            Create Smart <br />
            <span className="bg-gradient-to-r from-neutral-950 via-neutral-800 to-indigo-900 bg-clip-text text-transparent">
              AI Notes in Seconds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
            className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            Generate exam-focused notes, project documentation,
            flow diagrams and revision-ready content using AI —
            faster, cleaner and smarter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/notes")}
              className="
                w-full sm:w-auto
                px-8 py-3.5 rounded-xl
                bg-neutral-950 hover:bg-neutral-900
                text-white font-semibold text-sm sm:text-base
                shadow-[0_12px_28px_rgba(0,0,0,0.18)]
                hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)]
                border border-white/10
                flex items-center justify-center gap-2.5
                transition-all duration-200
                cursor-pointer
              "
            >
              <span>Get Started</span>
              <span className="text-base">→</span>
            </motion.button>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="text-amber-500 font-bold">★★★★★</span>
              <span>50 Free Credits Included</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Hero Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="relative w-full max-w-md"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 rounded-3xl blur-2xl -z-10" />

            <div className="
              rounded-3xl
              bg-white/80
              backdrop-blur-xl
              border border-neutral-200/80
              p-3 sm:p-4
              shadow-[0_20px_50px_rgba(0,0,0,0.08)]
              transition-all duration-300
            ">
              <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-900/5">
                <img
                  src={img}
                  alt="ExamNotes AI Preview"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link to="/notes" className="group">
            <Feature
              icon="📖"
              title="Exam Notes"
              desc="High-yield exam-oriented notes with revision points."
            />
          </Link>
          <Link to="/notes" className="group">
            <Feature
              icon="📂"
              title="Project Notes"
              desc="Well-structured content for assignments and projects."
            />
          </Link>
          <Link to="/notes" className="group">
            <Feature
              icon="📊"
              title="Diagrams"
              desc="Auto-generated visual diagrams for clarity."
            />
          </Link>
          <Link to="/notes" className="group">
            <Feature
              icon="⬇️"
              title="PDF Download"
              desc="Download clean, printable PDFs instantly."
            />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        h-full
        relative overflow-hidden rounded-2xl p-6
        bg-white
        border border-neutral-200/80
        hover:border-neutral-400/80
        shadow-[0_2px_12px_rgba(0,0,0,0.03)]
        hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)]
        transition-all duration-200
        flex flex-col justify-between
      "
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
          {icon}
        </div>

        <h3 className="text-base font-bold text-neutral-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="pt-4 flex items-center text-xs font-semibold text-neutral-400 group-hover:text-indigo-600 transition-colors">
        <span>Try it out</span>
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </div>
    </motion.div>
  );
}