import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="
        max-w-6xl mx-auto
        px-6 sm:px-8
        mt-20 mb-8
      "
    >
      <div className="
        rounded-3xl
        bg-neutral-950
        text-white
        border border-neutral-800
        p-8 sm:p-12
        shadow-[0_20px_50px_rgba(0,0,0,0.15)]
      ">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={logo}
                alt="ExamNotes AI"
                className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                ExamNotes{" "}
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 text-indigo-300">
                  AI
                </span>
              </span>
            </Link>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              ExamNotes AI helps students generate exam-focused notes,
              revision material, diagrams, and printable PDFs using AI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link to="/notes" className="hover:text-white transition-colors">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/notes" className="hover:text-white transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link to="/notes" className="hover:text-white transition-colors">
                  Diagrams
                </Link>
              </li>
              <li>
                <Link to="/notes" className="hover:text-white transition-colors">
                  PDF Download
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} ExamNotes AI. All rights reserved.</p>
          <p className="text-neutral-400">Built for student success with AI.</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;