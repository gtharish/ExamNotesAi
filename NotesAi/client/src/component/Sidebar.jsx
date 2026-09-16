import React from "react";

function Sidebar({ result }) {
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 space-y-6 text-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-sm">
            📌
          </span>
          <h3 className="text-sm font-bold text-neutral-950 tracking-tight">
            Study Navigation
          </h3>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
          Overview
        </span>
      </div>

      {/* Exam Importance Card */}
      {result.importance && (
        <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/70 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">🔥</span>
            <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Exam Importance
            </p>
          </div>
          <p className="text-base font-extrabold text-amber-950 mt-1">
            {result.importance}
          </p>
        </section>
      )}

      {/* Sub Topics by Priority */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Priority Subtopics
          </p>
          <span className="text-xs text-neutral-400">★ High to Low</span>
        </div>

        <div className="space-y-2.5">
          {Object.entries(result.subTopics).map(([star, topics]) => (
            <div
              key={star}
              className="rounded-xl bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/70 p-3 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <span>★</span>
                  <span>{star} Priority</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-semibold px-1.5 py-0.5 rounded bg-white border border-neutral-200">
                  {Array.isArray(topics) ? topics.length : 0} items
                </span>
              </div>

              <ul className="space-y-1.5 text-xs text-neutral-700">
                {(Array.isArray(topics) ? topics : []).map((topic, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-neutral-400 text-[10px] mt-0.5">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Questions Preview */}
      <section className="space-y-3 pt-1 border-t border-neutral-100">
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Question Blueprint
        </p>

        {/* Short Questions */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200/70 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Short Questions
            </span>
            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              {result.questions.short.length}
            </span>
          </div>

          <ul className="space-y-1 text-xs text-neutral-600">
            {result.questions.short.map((item, i) => {
              const question = getQuestionText(item);

              return (
                <li key={i} className="truncate" title={question}>
                  {i + 1}. {question}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Long Questions */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200/70 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Long Questions
            </span>
            <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              {result.questions.long.length}
            </span>
          </div>

          <ul className="space-y-1 text-xs text-neutral-600">
            {result.questions.long.map((item, i) => {
              const question = getQuestionText(item);

              return (
                <li key={i} className="truncate" title={question}>
                  {i + 1}. {question}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Diagram Question */}
        {result.diagram && (
          <div className="rounded-xl bg-neutral-50 border border-neutral-200/70 p-3">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Diagram Question
            </span>
            <ul className="space-y-1 text-xs text-neutral-600">
              {result.diagram.type && <li>Type: {result.diagram.type}</li>}
              {result.diagram.data && (
                <li className="truncate text-neutral-500 font-mono text-[11px]">
                  {result.diagram.data}
                </li>
              )}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

function getQuestionText(item) {
  if (typeof item === "string") {
    return item;
  }

  if (item && typeof item === "object") {
    return item.question || item.q || "Untitled question";
  }

  return "Untitled question";
}

export default Sidebar;