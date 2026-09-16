import { useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import { FiArrowLeft, FiRefreshCw, FiX } from "react-icons/fi";
import { motion } from "motion/react";
import logo from "../assets/logo.png";


export default function PaymentFailed() {
  const Navigate = useNavigate()
    useEffect(()=>{
       setTimeout(()=>{
        Navigate("/")
       },5000)
    },[])
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-12 text-neutral-900">
      <div className="absolute inset-0 bg-dot-grid opacity-60" />
      <div className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-3xl border border-neutral-200 bg-white/90 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:p-12"
      >
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-neutral-900">
          <img src={logo} alt="ExamNotes AI" className="h-8 w-8 object-contain" />
          ExamNotes AI
        </Link>

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <FiX className="h-10 w-10" strokeWidth={2.5} />
        </div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-rose-600">Payment not completed</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">No worries, nothing was charged.</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-neutral-600">
          Your payment was cancelled or could not be completed. You can try again whenever you are ready.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
            <FiRefreshCw /> Try again
          </Link>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-6 py-3.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
            <FiArrowLeft /> Back to home
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
