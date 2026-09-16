import  React , { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios"; // Uncomment when connecting to backend
// import { ServerUrl } from "../App.jsx"; // Uncomment when connecting to backend
import { downloadPdf } from "../services/api";
import logo from "../assets/logo.png";
import Footer from "./Footer";

// =======================================================================
// SAMPLE TEMPLATE DATA (Replace with your database data)
// =======================================================================

// const INITIAL_SAMPLE_HISTORY = [
//   {
//     _id: "hist_1",
//     Topic: "Thermodynamics & Carnot Cycle",
//     classLevel: "Class 12",
//     examType: "JEE Mains",
//     createdAt: "2026-09-08T10:30:00Z",
//     hasDiagram: true,
//     hasChart: true,
//     revisionMode: true,
//     importance: "95% (Very High - 4 Questions Expected)",
//     preview:
//       "First Law of Thermodynamics, Isobaric & Isochoric processes, Carnot Engine efficiency formula, and key numerical shortcuts.",
//     result: null, // Full generated result object to load back into view
//   },
//   {
//     _id: "hist_2",
//     Topic: "Fundamental Rights & Constitutional Remedies",
//     classLevel: "Undergraduate",
//     examType: "UPSC / Law",
//     createdAt: "2026-09-07T14:15:00Z",
//     hasDiagram: true,
//     hasChart: false,
//     revisionMode: true,
//     importance: "90% (High Yield)",
//     preview:
//       "Articles 14 through 32, Doctrine of Severability, Writs (Habeas Corpus, Mandamus, Certiorari), and landmark Supreme Court verdicts.",
//     result: null,
//   },
//   {
//     _id: "hist_3",
//     Topic: "Cellular Respiration & Krebs Cycle",
//     classLevel: "Class 11",
//     examType: "NEET",
//     createdAt: "2026-09-05T09:00:00Z",
//     hasDiagram: true,
//     hasChart: true,
//     revisionMode: false,
//     importance: "88% (High Yield)",
//     preview:
//       "Glycolysis steps, Link Reaction, ATP yield calculation, Electron Transport Chain, and oxidative phosphorylation.",
//     result: null,
//   },
// ];

export default function History() { 
  const navigate = useNavigate();
  const _user = useSelector((state) => state.user.userData);


  // =======================================================================
  // STATE MANAGEMENT
  // =======================================================================
  const [historyList, setHistoryList] = useState([]);
  const [loading, _setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'revision' | 'diagrams'
  const [selectedNote, setSelectedNote] = useState(null); // Optional modal view

  // =======================================================================
  // TODO: CONNECT WITH YOUR BACKEND DATABASE
  // =======================================================================
  useEffect(() => {
    
    const fetchHistoryFromDB = async () => {
      try {
        _setLoading(true);
        const response = await axios.get("http://localhost:5000/api/note/history", {
          withCredentials: true,
        });

        // Set notes returned from your database:

        if (response.data ) {
         
          setHistoryList(response.data.notes);
        }
      } catch (error) {
        console.error("Failed to fetch notes history:", error);
      } finally {
        _setLoading(false);
      }
    };

    fetchHistoryFromDB();
    
  }, []);
  console.log("the history data is",historyList);

  // =======================================================================
  // TODO: DELETE HANDLER LOGIC
  // =======================================================================
//  console.log( historyList[0].createdAt)
  const handleDeleteNote = async (id, e) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this saved note?");
    if (!confirmed) return;

    try {
      // TODO: Call your backend delete endpoint:
     await axios.delete(`http://localhost:5000/api/note/history/${id}`, { withCredentials: true });
     
      // Optimistic UI update:
      setHistoryList((prev) => prev.filter((item) => item._id !== id && item._id !== null));
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  // =======================================================================
  // TODO: OPEN / RESUME NOTE HANDLER
  // =======================================================================
  const handleOpenNote = (note) => {
    // If the note has full generated result stored, navigate to /notes with state:
    if (note.result) {
      navigate("/notes", { state: { savedResult: note.result } });
    } else {
      setSelectedNote(note);
    }
  };

  // =======================================================================
  // TODO: PDF DOWNLOAD HANDLER
  // =======================================================================
  const handleDownloadNotePdf = async (note, e) => {
    e.stopPropagation();
    if (note.result) {
      await downloadPdf(note.result);
    } else {
      alert("PDF download will trigger with backend result object.");
    }
  };

  // Filter and Search
  console.log(historyList) 
 
  const filteredHistory = historyList.filter((item) => {
    const matchesSearch =
      item.Topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.classLevel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.examType?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "revision") return item.revisionMode;
    if (activeFilter === "diagrams") return item.includeDiagram;
    if (activeFilter === "chart") return item.includeChart;
    return true;
  });
  
  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-16 relative overflow-x-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-indigo-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* WORKSPACE HEADER BAR */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mb-8 rounded-2xl
            bg-neutral-950
            border border-neutral-800
            px-6 sm:px-8 py-4 sm:py-5
            shadow-[0_16px_36px_rgba(0,0,0,0.2)]
            flex flex-col sm:flex-row sm:items-center justify-between gap-4
          "
        >
          {/* Logo & Title */}
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
                  History
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Review, study, and export previously generated AI notes
              </p>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate("/notes")}
              className="
                px-4 py-2 rounded-xl
                text-xs sm:text-sm font-semibold
                bg-white text-neutral-950 hover:bg-neutral-200
                transition-all
                flex items-center gap-2
                shadow-sm
                cursor-pointer
              "
            >
              <span>✦</span>
              <span>Create New Notes</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="
                px-3.5 py-2 rounded-xl
                text-xs sm:text-sm font-medium
                bg-white/10 hover:bg-white/15
                border border-white/15
                text-white
                transition
                cursor-pointer
              "
            >
              Home
            </button>
          </div>
        </motion.header>

        {/* CONTROLS: SEARCH & FILTER BAR */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by Topic, class, or exam target..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full
                pl-10 pr-4 py-2.5
                rounded-xl
                bg-white
                border border-neutral-200
                focus:border-neutral-900
                focus:ring-4 focus:ring-neutral-950/5
                text-sm text-neutral-900
                placeholder-neutral-400
                outline-none
                shadow-xs
                transition
              "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-neutral-200/80 shadow-xs self-start sm:self-auto">
            <FilterTab
              label="All Notes"
              count={historyList.length}
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            <FilterTab
              label="Revision Ready"
              count={historyList.filter((i) => i.revisionMode).length}
              active={activeFilter === "revision"}
              onClick={() => setActiveFilter("revision")}
            />
            <FilterTab
              label="With Diagrams"
              count={historyList.filter((i) => i.includeDiagram).length}
              active={activeFilter === "diagrams"}
              onClick={() => setActiveFilter("diagrams")}
            />
            <FilterTab
              label="With Charts"
              count={historyList.filter((i) => i.includeChart).length}
              active={activeFilter === "chart"}
              onClick={() => setActiveFilter("chart")}
            />
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 animate-pulse space-y-4"
              >
                <div className="h-4 bg-neutral-200 rounded w-1/3" />
                <div className="h-6 bg-neutral-200 rounded w-3/4" />
                <div className="h-16 bg-neutral-100 rounded w-full" />
                <div className="h-8 bg-neutral-200 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* HISTORY CARDS GRID */}
        {!loading && filteredHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHistory.map((item, idx) => (
              <motion.div
                key={item._id }
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => handleOpenNote(item)}
                className="
                  rounded-2xl
                  bg-white
                  border border-neutral-200/80
                  hover:border-neutral-400/80
                  shadow-[0_2px_12px_rgba(0,0,0,0.03)]
                  hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)]
                  p-5 sm:p-6
                  flex flex-col justify-between
                  transition-all duration-200
                  cursor-pointer
                  group
                "
              >
                <div className="space-y-3">
                  {/* Top Meta: Date and Target */}
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    {item.examType && (
                      <span className="px-2 py-0.5 rounded-full font-bold bg-neutral-100 text-neutral-700 border border-neutral-200 text-[10px]">
                        {item.examType}
                      </span>
                    )}
                  </div>

                  {/* Topic Title */}
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.Topic}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.classLevel && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                        {item.classLevel}
                      </span>
                    )}
                    {item.revisionMode && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        ⚡ Revision
                      </span>
                    )}
                    {item.includeDiagram && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        📊 Diagram
                      </span> 
                    )}
                    {item.includeChart && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60">
                        📈 Chart
                      </span>
                    )}
                  </div>

                  {/* Preview Excerpt */}
                  {item.content?.quickOverview && (
                    <p className="text-xs sm:text-sm text-neutral-500 line-clamp-3 leading-relaxed pt-1">
                      {item.content?.quickOverview}
                    </p>
                  )}
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                    <span>Open Study Notes</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDownloadNotePdf(item, e)}
                      title="Download PDF"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
                    >
                      📄
                    </button>
                    <button
                      onClick={(e) => handleDeleteNote(item._id, e)}
                      title="Delete saved note"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              rounded-3xl
              p-12
              bg-white
              border border-dashed border-neutral-300
              text-center
              flex flex-col items-center justify-center
            "
          >
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl mb-4 text-neutral-700">
              📚
            </div>

            <h3 className="text-lg font-bold text-neutral-900 mb-1">
              {searchQuery ? "No matching notes found" : "No saved notes yet"}
            </h3>

            <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
              {searchQuery
                ? "Try searching for a different Topic keyword or clearing your filter."
                : "Generate notes on any exam Topic, and your saved materials will appear here for revision."}
            </p>

            <button
              onClick={() => navigate("/notes")}
              className="
                px-6 py-3 rounded-xl
                bg-neutral-950 hover:bg-neutral-900
                text-white text-sm font-semibold
                shadow-md
                transition
                cursor-pointer
              "
            >
              Generate Your First Note →
            </button>
          </motion.div>
        )}

        {/* NOTE PREVIEW MODAL / DIALOG (Optional) */}
        <AnimatePresence>
          {selectedNote && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="
                  w-full max-w-2xl
                  rounded-3xl
                  bg-white
                  border border-neutral-200
                  shadow-2xl
                  p-6 sm:p-8
                  space-y-5
                  max-h-[85vh] overflow-y-auto
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Saved Note Preview
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 mt-1">
                      {selectedNote.Topic}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedNote(null)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 font-semibold">
                    {selectedNote.classLevel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 font-semibold">
                    {selectedNote.examType}
                  </span>
                  {selectedNote.importance && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                      {selectedNote.importance}
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-700 leading-relaxed">
                  <p className="font-semibold text-neutral-900 mb-1">Quick Overview:</p>
                  <p>{selectedNote.content?.quickOverview}</p>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100">
                  <button
                    onClick={() => setSelectedNote(null)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNote(null);
                      navigate(`/notes/${selectedNote._id}`);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-semibold shadow-sm"
                  >
                    Open in Workspace →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

function FilterTab({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5
        ${
          active
            ? "bg-neutral-950 text-white shadow-xs"
            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
        }
      `}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            active ? "bg-white/20 text-white" : "bg-neutral-200/70 text-neutral-600"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
