import {useEffect} from "react"
import { Link, useSearchParams,useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck, FiHome } from "react-icons/fi";
import { motion } from "motion/react";
import logo from "../assets/logo.png";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const Navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  useEffect(()=>{
     setTimeout(()=>{
      Navigate("/")
     },5000)
  },[])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-12 text-neutral-900">
      <div className="absolute inset-0 bg-dot-grid opacity-60" />
      <div className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-3xl border border-neutral-200 bg-white/90 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:p-12"
      >
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-neutral-900">
          <img src={logo} alt="ExamNotes AI" className="h-8 w-8 object-contain" />
          ExamNotes AI
        </Link>

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <FiCheck className="h-10 w-10" strokeWidth={2.5} />
        </div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">Payment successful</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">Your credits are on the way!</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-neutral-600">
          Thanks for your purchase. Your ExamNotes AI credits will be available in your account shortly.
        </p>
        {sessionId && (
          <p className="mt-5 break-all rounded-xl bg-neutral-50 px-4 py-3 text-xs text-neutral-500">
            Payment reference: {sessionId}
          </p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/notes" className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
            Start creating notes <FiArrowRight />
          </Link>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-6 py-3.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
            <FiHome /> Go home
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
