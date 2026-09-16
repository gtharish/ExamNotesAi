import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Logout} from "../redux/userSlice";
import logo from "../assets/logo.png";
import axios from "axios";

function Navbar() {
    const ServerUrl = import.meta.env.VITE_SERVER_URL

  const userData = useSelector((state) => state.user);
  const user = userData.userData;
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);
  const creditRef = useRef(null);

  let userName = user ? user.name : null;
  let userEmail = user ? user.email : null;

  // const credits = user.credits;
  const credits = userData.credits;


  const handleLogout = async (e) => {
    const result = await axios.get(
      ServerUrl + "api/auth/logout",
      {
        withCredentials: true,
      }
    );


    dispatch(Logout());
    Navigate("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }

      if (
        creditRef.current &&
        !creditRef.current.contains(e.target)
      ) {
        setShowCredits(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="
        sticky top-4 z-50
        max-w-6xl mx-auto
        px-4 sm:px-6
      "
    >
      <div
        className="
          w-full
          rounded-2xl
          bg-neutral-950/90
          backdrop-blur-xl
          border border-white/10
          shadow-[0_16px_40px_rgba(0,0,0,0.35)]
          px-5 sm:px-7 py-3.5
          flex items-center justify-between
        "
      >
        {/* LEFT SIDE - BRAND */}
        <div
          onClick={() => Navigate("/")}
          className="
            flex items-center gap-3
            cursor-pointer
            group
            select-none
          "
        >
          <div className="relative flex items-center justify-center">
            <div
              className="
                absolute -inset-1
                rounded-full
                bg-indigo-500/20
                blur-sm
                group-hover:bg-indigo-500/30
                transition-all duration-300
              "
            />

            <img
              src={logo}
              alt="ExamNotes AI"
              className="
                w-8 h-8 sm:w-9 sm:h-9
                object-contain
                relative z-10
                transition-transform duration-300
                group-hover:scale-105
              "
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="
                text-base sm:text-lg
                font-bold
                text-white
                tracking-tight
              "
            >
              ExamNotes
            </span>

            <span
              className="
                text-xs
                px-2 py-0.5
                rounded-full
                font-semibold
                bg-gradient-to-r
                from-indigo-500/20
                to-purple-500/20
                border border-indigo-400/30
                text-indigo-300
                tracking-wider
              "
            >
              AI
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex items-center
            gap-3 sm:gap-4
            relative z-50
          "
        >
          {/* THEME TOGGLE */}
      

          {/* CREDITS PILL */}
          <div
            ref={creditRef}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowCredits(!showCredits);
                setShowProfile(false);
              }}
              className="
                flex items-center gap-2
                px-3.5 py-1.5
                rounded-full
                bg-white/[0.08]
                hover:bg-white/[0.14]
                border border-white/15
                text-white
                text-xs sm:text-sm
                font-medium
                shadow-sm
                transition-colors
                cursor-pointer
              "
              aria-label="View credits"
            >
              <span className="text-amber-400 text-sm">
                ✦
              </span>

              <span className="font-semibold tracking-tight">
                {credits}
              </span>

              <span className="text-xs text-neutral-400 hidden xs:inline">
                credits
              </span>

              <span
                className="
                  w-4 h-4
                  rounded-full
                  bg-white/15
                  flex items-center justify-center
                  text-xs font-bold
                  text-white
                  ml-0.5
                "
              >
                +
              </span>
            </motion.button>

            {/* CREDITS POPUP */}
            <AnimatePresence>
              {showCredits && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: "easeOut",
                  }}
                  className="
                    absolute right-0 top-full mt-3
                    w-72
                    rounded-2xl
                    bg-neutral-950/95
                    backdrop-blur-2xl
                    border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.6)]
                    p-5
                    text-white
                    z-[100]
                  "
                >
                  <div
                    className="
                      flex items-center justify-between
                      pb-3
                      border-b border-white/10
                    "
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base text-amber-400">
                        ✦
                      </span>

                      <h3 className="font-semibold text-sm text-white">
                        Your Balance
                      </h3>
                    </div>

                    <span
                      className="
                        text-xs
                        px-2 py-0.5
                        rounded-full
                        bg-emerald-500/20
                        text-emerald-400
                        font-medium
                        border border-emerald-500/30
                      "
                    >
                      Active
                    </span>
                  </div>

                  <div className="py-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold tracking-tight text-white">
                        {credits}
                      </span>

                      <span className="text-xs text-neutral-400">
                        AI generations left
                      </span>
                    </div>

                    <p className="text-neutral-400 text-xs mt-2 leading-relaxed">
                      Each comprehensive note generation,
                      chart & diagram uses 1 credit.
                    </p>
                  </div>

                  <button
                    onClick={() => Navigate("/pricing")}
                    className="
                      w-full
                      py-2.5
                      rounded-xl
                      bg-gradient-to-r
                      from-white
                      via-neutral-100
                      to-neutral-200
                      text-neutral-950
                      font-semibold
                      text-xs
                      hover:opacity-95
                      active:scale-[0.98]
                      transition-all
                      shadow-[0_4px_16px_rgba(255,255,255,0.15)]
                    "
                  >
                    Get More Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE SECTION */}
          <div
            ref={profileRef}
            className="relative"
          >
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowCredits(false);
                }}
                className="
                  w-9 h-9
                  rounded-full
                  bg-gradient-to-br
                  from-indigo-500
                  via-purple-500
                  to-pink-500
                  p-[1.5px]
                  cursor-pointer
                  transition-all
                  shadow-[0_4px_12px_rgba(99,102,241,0.25)]
                "
                aria-label="User menu"
              >
                <div
                  className="
                    w-full h-full
                    rounded-full
                    bg-neutral-900
                    flex items-center justify-center
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-neutral-800
                    transition
                  "
                >
                  {userName
                    ? userName.slice(0, 1).toUpperCase()
                    : "U"}
                </div>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => Navigate("/auth")}
                className="
                  px-4 py-1.5
                  rounded-full
                  bg-white
                  text-neutral-950
                  font-semibold
                  text-xs sm:text-sm
                  hover:bg-neutral-200
                  transition
                  shadow-sm
                "
              >
                Sign In
              </motion.button>
            )}

            {/* PROFILE DROPDOWN */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: "easeOut",
                  }}
                  className="
                    absolute right-0 top-full mt-3
                    w-56
                    overflow-hidden
                    rounded-2xl
                    bg-neutral-950/95
                    backdrop-blur-2xl
                    border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.6)]
                    z-[100]
                  "
                >
                  {/* USER INFO */}
                  <div
                    className="
                      px-4 py-3.5
                      border-b border-white/10
                    "
                  >
                    <p className="text-white text-sm font-semibold truncate">
                      {userName || "Exam Prep Student"}
                    </p>

                    <p className="text-neutral-400 text-xs truncate mt-0.5">
                      {userEmail || "Student Account"}
                    </p>
                  </div>

                  {/* MENU ITEMS */}
                  <div className="py-1.5">
                    <MenuItem
                      icon="👤"
                      text="My Profile"
                      onClick={() => {
                        setShowProfile(false);
                        console.log("Profile clicked");
                      }}
                    />

                    <MenuItem
                      icon="⚙️"
                      text="Settings"
                      onClick={() => {
                        setShowProfile(false);
                        console.log("Settings clicked");
                      }}
                    />

                    <MenuItem
                      icon="📚"
                      text="History"
                      onClick={() => {
                        setShowProfile(false);
                        Navigate("/history");
                      }}
                    />

                    <div className="h-px bg-white/10 my-1" />

                    <MenuItem
                      icon="🚪"
                      text="Logout"
                      red={true}
                      onClick={handleLogout}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MenuItem({ onClick, text, icon, red }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-left
        px-4 py-2.5
        text-xs sm:text-sm
        font-medium
        cursor-pointer
        transition-colors
        flex items-center gap-2.5

        ${
          red
            ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
            : "text-neutral-300 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {icon && (
        <span className="text-xs opacity-80">
          {icon}
        </span>
      )}

      <span>{text}</span>
    </button>
  );
}

export default Navbar;