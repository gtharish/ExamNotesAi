import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { generateNotes } from "../services/api";
import { useSelector,useDispatch } from "react-redux";
import { setUserData, setCredits } from "../redux/userSlice.js";

function TopicForm({ loading, setResult, setLoading, setError }) {
  const dispatch = useDispatch();
  const [Topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const handleSubmit = async () => {
    try {
      if (!Topic.trim()) {
        setError("Please enter the topic");
        return;
      }

      setError("");
      setLoading(true);
      setResult(null);

      setProgress(0);
      setProgressText("Analyzing notes");

      const result = await generateNotes({
        Topic,
        examType,
        classLevel,
        includeChart,
        includeDiagram,
        revisionMode,
      });
      if(!result) throw new Error("result is not generated");
      console.log(result.creditLeft);
      dispatch(setCredits(result.creditLeft))
      const generatedResult = result?.data?.content ?? result?.data;
      setResult(generatedResult);
       
      setProgress(100);
      setProgressText("Notes generated successfully");

      setLoading(false);
    } catch (e) {
      console.log(e.message);

      setError("Failed to fetch data");

      setLoading(false);
      setProgress(0);
      setProgressText("");
    }
  };

  useEffect(() => {
    if (!loading) {
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += 5;

      // Don't let fake progress reach 100%
      if (value >= 90) {
        value = 90;
        clearInterval(interval);
      }

      setProgress(value);

      if (value < 20) {
        setProgressText("Analyzing notes");
      } else if (value < 50) {
        setProgressText("Generating notes");
      } else if (value < 80) {
        setProgressText("Almost complete");
      } else {
        setProgressText("Finalizing notes");
      }
    }, 700);

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        w-full
        rounded-3xl
        bg-white
        border border-neutral-200/80
        shadow-[0_12px_40px_rgba(0,0,0,0.05)]
        p-6 sm:p-8
        text-neutral-900
      "
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center text-sm font-bold shadow-sm">
            ✦
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
              Create AI Study Notes
            </h2>
            <p className="text-xs text-neutral-500">
              Enter your exam topic and customize output preferences
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/70 text-xs font-semibold text-neutral-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          AI Engine Ready
        </span>
      </div>

      <div className="space-y-5">
        {/* Topic Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
            Exam Topic or Subject <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="text"
              className="
                w-full
                px-4 py-3.5
                rounded-xl
                bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white
                border border-neutral-200
                focus:border-neutral-900
                focus:ring-4 focus:ring-neutral-950/5
                placeholder-neutral-400
                text-neutral-900 font-medium text-sm sm:text-base
                outline-none
                transition-all duration-200
              "
              placeholder="e.g. Thermodynamics, Indian Constitution, Photosynthesis, Binary Trees"
              name="Topic"
              value={Topic}
              disabled={loading}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>

        {/* Class Level and Exam Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
              Class / Education Level
            </label>

            <input
              type="text"
              className="
                w-full
                px-4 py-3
                rounded-xl
                bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white
                border border-neutral-200
                focus:border-neutral-900
                focus:ring-4 focus:ring-neutral-950/5
                placeholder-neutral-400
                text-neutral-900 font-medium text-sm
                outline-none
                transition-all duration-200
              "
              placeholder="e.g. Class 10, Grade 12, B.Tech, Undergrad"
              name="classLevel"
              value={classLevel}
              disabled={loading}
              onChange={(e) => setClassLevel(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
              Exam Target
            </label>

            <input
              type="text"
              className="
                w-full
                px-4 py-3
                rounded-xl
                bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white
                border border-neutral-200
                focus:border-neutral-900
                focus:ring-4 focus:ring-neutral-950/5
                placeholder-neutral-400
                text-neutral-900 font-medium text-sm
                outline-none
                transition-all duration-200
              "
              placeholder="e.g. CBSE Boards, JEE Mains, NEET, Semester Final"
              name="examType"
              value={examType}
              disabled={loading}
              onChange={(e) => setExamType(e.target.value)}
            />
          </div>
        </div>

        {/* Toggles */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2.5">
            Output Enhancements
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Toggle
              label="Revision Mode"
              sublabel="Key summary bullets"
              icon="⚡"
              checked={revisionMode}
              disabled={loading}
              onChange={() => setRevisionMode(!revisionMode)}
            />

            <Toggle
              label="Include Diagram"
              sublabel="Mermaid flow charts"
              icon="📊"
              checked={includeDiagram}
              disabled={loading}
              onChange={() => setIncludeDiagram(!includeDiagram)}
            />

            <Toggle
              label="Include Chart"
              sublabel="Analytical visual graphs"
              icon="📈"
              checked={includeChart}
              disabled={loading}
              onChange={() => setIncludeChart(!includeChart)}
            />
          </div>
        </div>

        {/* Primary Generate Button */}
        <motion.button
          whileHover={!loading ? { scale: 1.01, y: -1 } : {}}
          whileTap={!loading ? { scale: 0.99 } : {}}
          disabled={loading}
          onClick={handleSubmit}
          className={`
            w-full
            mt-3
            py-3.5 sm:py-4
            rounded-xl
            font-bold text-sm sm:text-base
            flex
            items-center
            justify-center
            gap-3
            transition-all duration-200
            cursor-pointer
            ${
              loading
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-200"
                : "bg-neutral-950 hover:bg-neutral-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] border border-neutral-800"
            }
          `}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-800 rounded-full animate-spin" />
              <span>Generating Exam Notes...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>✦</span>
              <span>Generate AI Exam Notes</span>
              <span className="text-xs opacity-75 font-normal ml-1">(Uses 1 Credit)</span>
            </div>
          )}
        </motion.button>

        {/* Polished AI Loading State Experience */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 p-5 space-y-4"
          >
            {/* Stage Tracker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <LoadingStage
                label="Analyzing Topic"
                isActive={progress >= 0 && progress < 25}
                isComplete={progress >= 25}
              />
              <LoadingStage
                label="Synthesizing Notes"
                isActive={progress >= 25 && progress < 55}
                isComplete={progress >= 55}
              />
              <LoadingStage
                label="Revision Points"
                isActive={progress >= 55 && progress < 80}
                isComplete={progress >= 80}
              />
              <LoadingStage
                label="Finalizing Result"
                isActive={progress >= 80}
                isComplete={progress >= 100}
              />
            </div>

            {/* Progress Bar with Shimmer */}
            <div className="relative w-full h-2.5 rounded-full bg-neutral-200/80 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-neutral-900 via-indigo-600 to-neutral-900 relative"
              >
                <div className="absolute inset-0 bg-white/25 animate-shimmer" />
              </motion.div>
            </div>

            {/* Progress Status and % */}
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                {progressText || "Processing your notes..."}
              </span>
              <span className="text-neutral-900 font-mono font-bold">{progress}%</span>
            </div>

            <p className="text-[11px] text-neutral-500 text-center">
              Please don't close or refresh the page while your comprehensive study material is being formulated.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function LoadingStage({ label, isActive, isComplete }) {
  return (
    <div
      className={`
        flex items-center gap-1.5 p-2 rounded-lg transition-colors
        ${
          isComplete
            ? "bg-emerald-50 text-emerald-700 font-medium"
            : isActive
            ? "bg-indigo-50 text-indigo-700 font-semibold ring-1 ring-indigo-200"
            : "bg-white text-neutral-400"
        }
      `}
    >
      <span className="text-xs">
        {isComplete ? "✓" : isActive ? "●" : "○"}
      </span>
      <span className="truncate">{label}</span>
    </div>
  );
}

function Toggle({ label, sublabel, icon, checked, onChange, disabled }) {
  return (
    <div
      onClick={!disabled ? onChange : undefined}
      className={`
        flex items-center justify-between gap-3
        p-3.5 rounded-xl border
        transition-all duration-200 select-none
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${
          checked
            ? "bg-neutral-950 text-white border-neutral-900 shadow-sm"
            : "bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200"
        }
      `}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-base">{icon}</span>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-bold truncate leading-tight">{label}</p>
          {sublabel && (
            <p
              className={`text-[11px] truncate mt-0.5 ${
                checked ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {sublabel}
            </p>
          )}
        </div>
      </div>

      <div
        className={`
          relative w-10 h-5.5 rounded-full p-0.5 transition-colors shrink-0
          ${checked ? "bg-emerald-500" : "bg-neutral-300"}
        `}
      >
        <motion.div
          animate={{ x: checked ? 18 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-4.5 h-4.5 rounded-full bg-white shadow-sm"
        />
      </div>
    </div>
  );
}

export default TopicForm;
