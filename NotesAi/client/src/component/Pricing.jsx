import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios"; // Uncomment when connecting to backend
// import { ServerUrl } from "../App.jsx"; // Uncomment when connecting to backend
import logo from "../assets/logo.png";
import Footer from "./Footer";

// =======================================================================
// PRICING TIERS CONFIGURATION
// =======================================================================
const PRICING_PLANS = [
  {
    id: "starter",
    name: "Free Starter",
    badge: "Included on Signup",
    credits: 50,
    price: "Free",
    period: "forever",
    description: "Ideal for exploring AI exam notes and preparing for quick tests.",
    isPopular: false,
    features: [
      "50 Generation Credits",
      "Full Exam-Focused Notes",
      "5-Minute Quick Revision Mode",
      "Basic Questions & Answers",
      "Standard PDF Downloads",
    ],
    ctaText: "Current Plan",
    disabled: true,
  },
  {
    id: "pro_student",
    name: "Pro Student",
    badge: "Most Popular",
    credits: 350,
    price: "₹199",
    dollarPrice: "$2.99",
    period: "one-time",
    description: "Best for school, college, board exams, and competitive test prep.",
    isPopular: true,
    features: [
      "350 Generation Credits",
      "Priority AI Note Synthesis",
      "Interactive Mermaid Flowcharts",
      "Analytical Recharts Data Visualizations",
      "High-Yield Question Blueprint (Short, Long, Diagram)",
      "Instant Clean PDF Exports",
      "No Expiration Date on Credits",
    ],
    ctaText: "Get 350 Credits",
    disabled: false,
  },
  {
    id: "ranker_pack",
    name: "Ranker Master Pack",
    badge: "Maximum Value",
    credits: 1000,
    price: "₹449",
    dollarPrice: "$5.99",
    period: "one-time",
    description: "Designed for intensive competitive exams (JEE, NEET, UPSC, Finals).",
    isPopular: false,
    features: [
      "1,000 Generation Credits",
      "Deep Syllabus Analysis & Star Priorities",
      "Unlimited Mermaid Diagrams & Visual Charts",
      "Comprehensive Q&A Bank with Model Answers",
      "Priority Server Processing Speed",
      "Lifetime Credits Validity",
      "24/7 Priority Support",
    ],
    ctaText: "Get 1,000 Credits",
    disabled: false,
  },
];

const FAQS = [
  {
    q: "How do generation credits work?",
    a: "Each time you generate a full exam note set (including syllabus breakdown, notes, diagrams, charts, and questions), 1 credit is deducted.",
  },
  {
    q: "Do my purchased credits expire?",
    a: "No! All credits have lifetime validity and will stay in your account until you use them.",
  },
  {
    q: "Can I download notes for offline study?",
    a: "Yes. Every generated note can be downloaded as a clean, printable PDF instantly at no extra cost.",
  },
  {
    q: "How can I check my current credit balance?",
    a: "Your credit balance is always displayed in the header bar at the top right of your workspace.",
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const _user = useSelector((state) => state.user?.userData);
  const currentCredits = 50; // Replace with user?.credits when ready
  const [selectedPlan, setSelectedPlan] = useState("pro_student");
  const [processingPlanId, setProcessingPlanId] = useState(null);

  // =======================================================================
  // TODO: CONNECT TO PAYMENT GATEWAY (Razorpay, Stripe, etc.)
  // =======================================================================
  const handlePurchase = async (plan) => {
    if (plan.disabled) return;

    try {
      setProcessingPlanId(plan.id);

      const response = await axios.post(`http://localhost:5000/api/credit/orders`, {
        planId: plan.id,
        amount: plan.price,
        credits: plan.credits,
      }, { withCredentials: true });

      if (!response.data?.url) {
        throw new Error("Checkout URL was not returned");
      }
      
      window.location.assign(response.data.url);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-16 relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-100/40 via-purple-50/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* WORKSPACE HEADER BAR */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mb-10 rounded-2xl
            bg-neutral-950
            border border-neutral-800
            px-6 sm:px-8 py-4 sm:py-5
            shadow-[0_16px_36px_rgba(0,0,0,0.2)]
            flex flex-col sm:flex-row sm:items-center justify-between gap-4
          "
        >
          <Link to="/" className="flex items-center gap-3 group">
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
                  Plans & Credits
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Transparent credit packs for seamless exam preparation
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold">
              <span className="text-amber-400">✦</span>
              <span>{currentCredits} Credits Available</span>
            </div>

            <button
              onClick={() => navigate("/notes")}
              className="
                px-4 py-2 rounded-xl
                text-xs sm:text-sm font-semibold
                bg-white text-neutral-950 hover:bg-neutral-200
                transition-all
                cursor-pointer
              "
            >
              Go to Workspace →
            </button>
          </div>
        </motion.header>

        {/* HERO TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200 shadow-xs text-xs font-semibold text-neutral-800">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>Pay As You Study • No Monthly Subscriptions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
            Simple, Transparent <br />
            <span className="bg-gradient-to-r from-neutral-950 via-neutral-800 to-indigo-900 bg-clip-text text-transparent">
              Credit Packs
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Purchase credits when you need them. Credits never expire and work across all features: notes, revision points, diagrams, and PDF exports.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-20">
          {PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5 }}
                className={`
                  relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between
                  transition-all duration-200 cursor-pointer
                  ${isSelected ? "ring-2 ring-indigo-500 shadow-xl" : ""}
                  ${
                    plan.isPopular
                      ? "bg-neutral-950 text-white border-2 border-indigo-500/80 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                      : "bg-white text-neutral-900 border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-neutral-400"
                  }
                `}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`
                        text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm
                        ${
                          plan.isPopular
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                            : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                        }
                      `}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        plan.isPopular ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* Price & Credits */}
                  <div className="pt-2 pb-4 border-b border-neutral-200/50 dark:border-neutral-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      {plan.dollarPrice && (
                        <span
                          className={`text-xs font-semibold ${
                            plan.isPopular ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          / {plan.dollarPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-amber-400 text-sm">✦</span>
                      <span className="text-sm font-bold">{plan.credits} AI Generations</span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-3 text-xs sm:text-sm">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-snug">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            plan.isPopular
                              ? "bg-indigo-500/30 text-indigo-300"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={plan.isPopular ? "text-neutral-300" : "text-neutral-700"}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    disabled={plan.disabled || processingPlanId === plan.id}
                    onClick={() => handlePurchase(plan)}
                    className={`
                      w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200
                      flex items-center justify-center gap-2
                      ${
                        plan.disabled
                          ? "bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-default"
                          : plan.isPopular
                          ? "bg-white text-neutral-950 hover:bg-neutral-200 shadow-md active:scale-[0.98] cursor-pointer"
                          : "bg-neutral-950 hover:bg-neutral-900 text-white shadow-sm active:scale-[0.98] cursor-pointer"
                      }
                    `}
                  >
                    {processingPlanId === plan.id ? (
                      <span>Processing...</span>
                    ) : (
                      <span>{plan.ctaText}</span>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              Everything you need to know about credits and exam preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-xs"
              >
                <h4 className="text-sm font-bold text-neutral-900 mb-1.5">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
