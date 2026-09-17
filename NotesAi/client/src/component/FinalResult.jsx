import React, { useState } from "react";
import { downloadPdf } from "../services/api";
import MermaidSetup from "./Mermaid.jsx";
import RechartSetUp from "./RechartSetup.jsx";
import ReactMarkdown from "react-markdown";

function FinalResult({ result }) {
  const [quickRevision, setQuickRevision] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!result) {
    return null;
  }

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);
      await downloadPdf(result);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-w-0 space-y-10 text-neutral-900">
      {/* ================= STICKY / FLOATING ACTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
              Generated Study Document
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Exam-focused comprehensive notes, diagrams and questions
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Quick Revision Toggle */}
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`
              px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200
              flex items-center gap-2 cursor-pointer shadow-sm
              ${
                quickRevision
                  ? "bg-emerald-600 text-white shadow-emerald-500/20"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100"
              }
            `}
          >
            <span>⚡</span>
            <span>{quickRevision ? "Full Document View" : "Quick Revision (5 min)"}</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className={`
              px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200
              flex items-center gap-2 cursor-pointer shadow-sm
              ${
                downloading
                  ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                  : "bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-800 shadow-neutral-950/15 active:scale-[0.98]"
              }
            `}
          >
            <span>{downloading ? "⏳" : "📄"}</span>
            <span>{downloading ? "Preparing PDF..." : "Download PDF"}</span>
          </button>
        </div>
      </div>

      {/* ================= SUB TOPICS ================= */}
      {!quickRevision && result.subTopics && (
        <section className="space-y-4">
          <SectionHeader icon="⭐" title="Syllabus & Subtopics" badge="Priority Blueprint" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(result.subTopics).map(([star, topics]) => (
              <div
                key={star}
                className="rounded-2xl bg-neutral-50/70 border border-neutral-200/80 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200/60">
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <span>★</span>
                      <span>{star} Priority</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-500">
                      {topics.length} topics
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                    {topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-neutral-400 text-xs mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= DETAILED NOTES ================= */}
      {!quickRevision && result.notes && (
        <section className="space-y-4">
          <SectionHeader icon="📚" title="Detailed Notes" badge="Comprehensive Material" />

          <div className="min-w-0 rounded-2xl border border-neutral-200/80 bg-neutral-50/30 p-4 sm:p-8">
            <div className="prose prose-neutral max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-4">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 mt-6 mb-3 pb-2 border-b border-neutral-200">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 mt-5 mb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 space-y-1.5 text-neutral-700 mb-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 space-y-1.5 text-neutral-700 mb-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-neutral-950">{children}</strong>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-indigo-500 bg-indigo-50/40 rounded-r-xl px-4 py-3 my-3 text-neutral-800 italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-neutral-200/60 text-neutral-900 px-1.5 py-0.5 rounded font-mono text-xs sm:text-sm">
                      {children}
                    </code>
                  ),
                }}
              >
                {result.notes}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* ================= REVISION POINTS ================= */}
      {result.revisionPoints && result.revisionPoints.length > 0 && (
        <section className="space-y-4">
          <SectionHeader icon="🔖" title="Revision Points" badge="5-Minute High-Yield Summary" />

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 border border-emerald-200/80 p-6 sm:p-7 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {result.revisionPoints.map((point, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/80 border border-emerald-100 p-3.5 flex items-start gap-3 shadow-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= MERMAID DIAGRAM ================= */}
      {!quickRevision && result.diagram?.data && (
        <section className="space-y-4">
          <SectionHeader icon="📊" title="Visual Flowchart / Diagram" badge="Auto-Generated" />

          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm">
            <div className="bg-dot-grid rounded-xl border border-neutral-100 p-6 overflow-x-auto flex justify-center">
              <MermaidSetup diagram={result.diagram.data} />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
              <span className="italic">
                💡 Diagram rendered with Mermaid.js. You can right-click or take a screenshot for reference.
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {result.diagram.type || "Flowchart"}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ================= CHARTS ================= */}
      {!quickRevision && result.charts && result.charts.length > 0 && (
        <section className="space-y-4">
          <SectionHeader icon="📈" title="Visual Charts & Analytics" badge="Data Visualization" />

          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm">
            <RechartSetUp charts={result.charts} />
          </div>
        </section>
      )}

      {/* ================= IMPORTANT QUESTIONS ================= */}
      {result.questions && (
        <section className="space-y-5">
          <SectionHeader icon="❓" title="Important Exam Questions" badge="Self-Assessment" />

          <div className="space-y-6">
            {/* SHORT QUESTIONS */}
            {result.questions.short && result.questions.short.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                    Short Answer Questions ({result.questions.short.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {result.questions.short.map((question, index) => (
                    <QuestionCard
                      key={index}
                      item={question}
                      index={index}
                      type="Short"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* LONG QUESTIONS */}
            {result.questions.long && result.questions.long.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                    Long Answer Questions ({result.questions.long.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {result.questions.long.map((question, index) => (
                    <QuestionCard
                      key={index}
                      item={question}
                      index={index}
                      type="Long"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* DIAGRAM QUESTION */}
            {result.questions.diagram && (
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                    Diagram-Based Question
                  </h4>
                </div>

                <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                  <p className="text-sm font-semibold text-neutral-900 leading-relaxed">
                    {result.questions.diagram.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

/* ================= QUESTION CARD HELPER ================= */

function QuestionCard({ item, index, type }) {
  let question = item;
  let answer = null;

  if (typeof item === "string") {
    const match = item.match(/^(.*?)(?:\s*(?:Answer|Ans):\s*)(.*)$/is);
    if (match) {
      question = match[1].replace(/^(?:Question|Q\d*):?\s*/i, "").trim();
      answer = match[2].trim();
    } else {
      question = item.replace(/^(?:Question|Q\d*):?\s*/i, "").trim();
    }
  } else if (typeof item === "object" && item !== null) {
    question = item.question || item.q || JSON.stringify(item);
    answer = item.answer || item.a || null;
  }

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/40 hover:bg-white hover:shadow-md transition-all duration-200 p-4 sm:p-5">
      <div className="flex items-start gap-3.5">
        <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          {index + 1}
        </span>
        <div className="space-y-2 flex-1">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
              {type} Question
            </span>
            <p className="text-sm sm:text-base font-semibold text-neutral-900 mt-0.5 leading-snug">
              {question}
            </p>
          </div>

          {answer && (
            <div className="pt-3 mt-2 border-t border-neutral-200/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1.5">
                <span>↓</span>
                <span>Answer</span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border border-neutral-200/70 text-xs sm:text-sm text-neutral-700 leading-relaxed shadow-xs">
                {answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= SECTION HEADER HELPER ================= */

function SectionHeader({ icon, title, badge }) {
  return (
    <div className="flex items-center justify-between pb-2">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-sm">
          {icon}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
          {title}
        </h3>
      </div>
      {badge && (
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/60">
          {badge}
        </span>
      )}
    </div>
  );
}

export default FinalResult;