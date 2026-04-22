// ─── ENHANCED COURSES PAGE ────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import {
  BookOpen, Plus, X, Check, Clock, Calendar, FileText,
  ChevronRight, ChevronLeft, Download, Bell, Sparkles,
  User, AlertCircle, Upload, Loader2, ExternalLink,
  GraduationCap, BookMarked, Info, Star, Filter,
  Search, MapPin, Hash, Layers, ArrowLeft, Share2,
  CheckCircle2, Circle, Zap, Brain, ClipboardList,
  MoreHorizontal, Trash2, CalendarDays, RefreshCw,
  LockKeyhole, Send, ListChecks
} from "lucide-react";
import AlertModal from "./components/common/AlertModal";
import { REGISTRATION_STATUS, MOCK_USER } from "./data/mockData";
import { getTimetableData, saveTimetableData } from "./utils/timetableStore";

// ─── FULL COURSE CATALOGUE ────────────────────────────────────────────────────
const COURSE_CATALOGUE = [
  // 300L CS Courses
  { id:1,  code:"CSC 301", title:"Data Structures & Algorithms",      units:3, dept:"Computer Science", level:300, semester:"First",  lecturer:"Dr. Emeka Obi",        venue:"Room 201, CS Block",   days:["Monday","Wednesday"],   time:"8:00 – 9:00 AM",  examDate:"2025-05-12", examTime:"9:00 AM",  examVenue:"Hall A" },
  { id:2,  code:"CSC 303", title:"Computer Networks",                  units:3, dept:"Computer Science", level:300, semester:"First",  lecturer:"Prof. Ngozi Adeyemi",  venue:"Room 105, CS Block",   days:["Tuesday","Thursday"],   time:"10:00 – 11:00 AM",examDate:"2025-05-14", examTime:"9:00 AM",  examVenue:"Hall B" },
  { id:3,  code:"CSC 305", title:"Software Engineering",               units:3, dept:"Computer Science", level:300, semester:"First",  lecturer:"Dr. Bello Yusuf",      venue:"Room 302, CS Block",   days:["Monday","Friday"],      time:"12:00 – 1:00 PM", examDate:"2025-05-16", examTime:"2:00 PM",  examVenue:"Hall A" },
  { id:4,  code:"CSC 307", title:"Database Systems",                   units:3, dept:"Computer Science", level:300, semester:"First",  lecturer:"Dr. Amina Garba",      venue:"Lab 2, CS Block",      days:["Wednesday","Friday"],   time:"2:00 – 3:00 PM",  examDate:"2025-05-19", examTime:"9:00 AM",  examVenue:"Hall C" },
  { id:5,  code:"CSC 309", title:"Operating Systems",                  units:3, dept:"Computer Science", level:300, semester:"First",  lecturer:"Prof. Chidi Nwosu",    venue:"Room 201, CS Block",   days:["Tuesday"],              time:"8:00 – 10:00 AM", examDate:"2025-05-21", examTime:"2:00 PM",  examVenue:"Hall A" },
  { id:6,  code:"MTH 301", title:"Linear Algebra",                     units:3, dept:"Mathematics",      level:300, semester:"First",  lecturer:"Dr. Fatima Usman",     venue:"Room 401, Science Blk",days:["Monday","Wednesday"],   time:"10:00 – 11:00 AM",examDate:"2025-05-13", examTime:"9:00 AM",  examVenue:"Hall D" },
  { id:7,  code:"MTH 303", title:"Numerical Analysis",                 units:3, dept:"Mathematics",      level:300, semester:"First",  lecturer:"Dr. Tunde Alabi",      venue:"Room 403, Science Blk",days:["Thursday","Friday"],    time:"11:00 AM – 12PM", examDate:"2025-05-20", examTime:"9:00 AM",  examVenue:"Hall D" },
  { id:8,  code:"PHY 301", title:"Quantum Mechanics",                  units:2, dept:"Physics",          level:300, semester:"First",  lecturer:"Prof. Uche Okonkwo",   venue:"Physics Lab, Sci Blk", days:["Tuesday","Thursday"],   time:"2:00 – 3:00 PM",  examDate:"2025-05-15", examTime:"2:00 PM",  examVenue:"Hall B" },
  { id:9,  code:"GST 301", title:"Entrepreneurship Studies",           units:2, dept:"General Studies",  level:300, semester:"First",  lecturer:"Mr. Adeola Fashola",   venue:"Auditorium",           days:["Friday"],               time:"8:00 – 10:00 AM", examDate:"2025-05-22", examTime:"9:00 AM",  examVenue:"Hall E" },
  { id:10, code:"CSC 302", title:"Artificial Intelligence",            units:3, dept:"Computer Science", level:300, semester:"Second", lecturer:"Dr. Ngozi Osei",       venue:"Room 105, CS Block",   days:["Monday","Wednesday"],   time:"9:00 – 10:00 AM", examDate:"2025-11-10", examTime:"9:00 AM",  examVenue:"Hall A" },
  { id:11, code:"CSC 304", title:"Human-Computer Interaction",         units:3, dept:"Computer Science", level:300, semester:"Second", lecturer:"Dr. Ify Nwosu",        venue:"Lab 1, CS Block",      days:["Tuesday","Thursday"],   time:"11:00 AM – 12PM", examDate:"2025-11-12", examTime:"2:00 PM",  examVenue:"Hall B" },
  { id:12, code:"CSC 306", title:"Computer Graphics",                  units:3, dept:"Computer Science", level:300, semester:"Second", lecturer:"Prof. Sani Abubakar",  venue:"Room 302, CS Block",   days:["Wednesday","Friday"],   time:"2:00 – 3:00 PM",  examDate:"2025-11-14", examTime:"9:00 AM",  examVenue:"Hall C" },
];

const LECTURER_ANNOUNCEMENTS = {
  1:  [{ id:1, text:"Quiz next Monday covering Trees and Graphs. Review chapters 5–7.", date:"2025-03-08", important:true  },
       { id:2, text:"Office hours moved to Thursday 3–5 PM this week.",               date:"2025-03-06", important:false }],
  2:  [{ id:1, text:"Lab practical on Wireshark scheduled for next Tuesday.",          date:"2025-03-09", important:true  }],
  3:  [{ id:1, text:"Group project teams to be submitted by Friday via email.",        date:"2025-03-07", important:true  },
       { id:2, text:"Recommended reading: Sommerville Software Engineering 10th Ed.", date:"2025-03-04", important:false }],
  4:  [{ id:1, text:"ER Diagram assignment extended to March 25.",                     date:"2025-03-08", important:false }],
  5:  [{ id:1, text:"No class next Tuesday — makeup class on Saturday 10 AM.",        date:"2025-03-09", important:true  }],
  6:  [{ id:1, text:"Problem set 3 posted on the portal. Due March 20.",              date:"2025-03-05", important:false }],
};

const ASSIGNMENTS_BY_COURSE = {
  1: [{ id:1, title:"Binary Trees Implementation",     deadline:"2025-03-15", status:"submitted", marks:18, total:20 },
      { id:2, title:"Graph Traversal Report",          deadline:"2025-03-28", status:"pending",   marks:null, total:20 }],
  2: [{ id:1, title:"TCP/IP Protocol Analysis",        deadline:"2025-03-18", status:"pending",   marks:null, total:25 }],
  3: [{ id:1, title:"Software Requirements Doc (SRS)", deadline:"2025-03-22", status:"pending",   marks:null, total:30 }],
  4: [{ id:1, title:"ER Diagram Design Project",       deadline:"2025-03-25", status:"submitted", marks:24, total:25 }],
  6: [{ id:1, title:"Matrix Transformations Set",      deadline:"2025-03-12", status:"overdue",   marks:null, total:20 }],
};

const DAYS_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CoursesPage({ dm, user }) {
  const currentUser = user || MOCK_USER;
  const regOpen = REGISTRATION_STATUS.open;

  const [view, setView]                 = useState("catalogue");   // catalogue | registered | timetable | detail
  const [registered, setRegistered]     = useState([1,2,4,6]);    // registered course IDs
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [detailTab, setDetailTab]       = useState("info");        // info | timetable | assignments | ai
  const [semFilter, setSemFilter]       = useState("First");
  const [searchQ, setSearchQ]           = useState("");
  const [toast, setToast]               = useState(null);
  const [timetableType, setTimetableType] = useState("lecture");   // lecture | exam

  // Alert modal state
  const [alertModal, setAlertModal] = useState({ open: false, type: "info", title: "", message: "" });
  const showAlert = (type, title, message) => setAlertModal({ open: true, type, title, message });

  // Course application state (for when registration is closed)
  const [applyModal, setApplyModal] = useState({ open: false, type: "add", course: null });
  const [applyReason, setApplyReason] = useState("");
  const [pendingApps, setPendingApps] = useState([]);
  const [applySelectId, setApplySelectId] = useState("");

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openApplyModal = (type, course = null) => {
    setApplyReason("");
    setApplySelectId(course ? String(course.id) : "");
    setApplyModal({ open: true, type, course });
  };

  const submitApplication = () => {
    if (!applyReason.trim()) return;
    const courseId = applyModal.course ? applyModal.course.id : parseInt(applySelectId);
    const course = COURSE_CATALOGUE.find(c => c.id === courseId);
    if (!course) return;
    setPendingApps(prev => [
      ...prev,
      { id: Date.now(), type: applyModal.type, course, reason: applyReason, status: "Pending", date: new Date().toISOString().split("T")[0] }
    ]);
    setApplyModal({ open: false, type: "add", course: null });
    showAlert("success", "Application Submitted", `Your application to ${applyModal.type === "add" ? "add" : "drop"} ${course.code} has been submitted and is awaiting approval.`);
  };

  const toggleReg = (course) => {
    if (!currentUser.fees_paid) {
      showAlert("error", "Fees Not Paid", "You must pay your school fees before registering for courses.");
      return;
    }
    if (!regOpen) {
      openApplyModal(registered.includes(course.id) ? "drop" : "add", course);
      return;
    }
    const max = 24;
    const totalUnits = COURSE_CATALOGUE.filter(c => registered.includes(c.id)).reduce((s,c)=>s+c.units,0);
    if (!registered.includes(course.id) && totalUnits + course.units > max) {
      showAlert("warning", "Unit Limit Reached", `Maximum 24 units allowed. You currently have ${totalUnits} units registered.`);
      return;
    }
    setRegistered(r => r.includes(course.id) ? r.filter(x=>x!==course.id) : [...r, course.id]);
    showToast(registered.includes(course.id) ? `❌ Dropped ${course.code}` : `✅ Registered for ${course.code}`);
  };

  const registeredCourses = COURSE_CATALOGUE.filter(c => registered.includes(c.id));
  const totalUnits = registeredCourses.reduce((s,c)=>s+c.units, 0);

  const filtered = COURSE_CATALOGUE.filter(c =>
    c.semester === semFilter &&
    (searchQ === "" || c.code.toLowerCase().includes(searchQ.toLowerCase()) || c.title.toLowerCase().includes(searchQ.toLowerCase()))
  );

  // ── EXPORT TO CALENDAR (.ics) ───────────────────────────────────────────────
  const exportToCalendar = (type) => {
    const lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//UniPortal NG//EN","CALSCALE:GREGORIAN"];

    const toICSDate = (dateStr, timeStr) => {
      const d = new Date(`${dateStr} ${timeStr}`);
      return d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
    };

    if (type === "exam") {
      registeredCourses.forEach(c => {
        lines.push("BEGIN:VEVENT");
        lines.push(`SUMMARY:EXAM - ${c.code} ${c.title}`);
        lines.push(`DTSTART:${toICSDate(c.examDate, c.examTime)}`);
        lines.push(`DTEND:${toICSDate(c.examDate, c.examTime.replace(/(\d+):/, m => `${parseInt(m)+2}:`))}`);
        lines.push(`LOCATION:${c.examVenue}`);
        lines.push(`DESCRIPTION:${c.code} Examination - ${c.title}`);
        lines.push("END:VEVENT");
      });
    } else {
      // Lecture timetable — recurring weekly events for next 12 weeks
      const weekStart = new Date("2025-03-10"); // Monday
      registeredCourses.forEach(c => {
        c.days.forEach(day => {
          const dayIdx = DAYS_ORDER.indexOf(day);
          const eventDate = new Date(weekStart);
          eventDate.setDate(weekStart.getDate() + dayIdx);
          const dateStr = eventDate.toISOString().split("T")[0];
          const startHour = parseInt(c.time.split(":")[0]);
          lines.push("BEGIN:VEVENT");
          lines.push(`SUMMARY:${c.code} - ${c.title}`);
          lines.push(`DTSTART:${toICSDate(dateStr, c.time.split("–")[0].trim())}`);
          lines.push(`DTEND:${toICSDate(dateStr, c.time.split("–")[1]?.trim() || `${startHour+1}:00 AM`)}`);
          lines.push(`LOCATION:${c.venue}`);
          lines.push(`DESCRIPTION:Lecturer: ${c.lecturer}`);
          lines.push("RRULE:FREQ=WEEKLY;COUNT=24");
          lines.push("END:VEVENT");
        });
      });
    }

    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type:"text/calendar" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `uniportal-${type}-timetable.ics`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`📅 ${type === "exam" ? "Exam" : "Lecture"} timetable exported to calendar!`);
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  if (view === "detail" && selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        dm={dm}
        onBack={() => { setView("registered"); setDetailTab("info"); }}
        detailTab={detailTab}
        setDetailTab={setDetailTab}
        announcements={LECTURER_ANNOUNCEMENTS[selectedCourse.id] || []}
        assignments={ASSIGNMENTS_BY_COURSE[selectedCourse.id] || []}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Alert Modal */}
      <AlertModal
        open={alertModal.open}
        onClose={() => setAlertModal(p => ({ ...p, open: false }))}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        dm={dm}
      />

      {/* Apply for Add/Drop Modal */}
      {applyModal.open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className={`w-full max-w-sm my-auto rounded-2xl shadow-xl p-5 space-y-4 ${dm ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-bold text-base ${dm ? "text-white" : "text-gray-900"}`}>
                Apply to {applyModal.type === "add" ? "Add" : "Drop"} Course
              </h3>
              <button onClick={() => setApplyModal(p => ({ ...p, open: false }))} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Registration closed notice */}
            <div className={`flex items-start gap-2 rounded-xl p-3 text-xs ${dm ? "bg-amber-900/30 text-amber-300" : "bg-amber-50 text-amber-700"} border ${dm ? "border-amber-800" : "border-amber-200"}`}>
              <LockKeyhole className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Registration is currently closed (closed {REGISTRATION_STATUS.closeDate}). Applications are reviewed by the academic office. Next opening: <strong>{REGISTRATION_STATUS.nextOpenDate}</strong>.</p>
            </div>

            {/* Course selector (when no course pre-selected) */}
            {!applyModal.course && (
              <div>
                <label className={`block text-xs font-semibold mb-1 ${dm ? "text-gray-300" : "text-gray-600"}`}>Select Course</label>
                <select
                  value={applySelectId}
                  onChange={e => setApplySelectId(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${dm ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                >
                  <option value="">— Choose a course —</option>
                  {(applyModal.type === "add"
                    ? COURSE_CATALOGUE.filter(c => !registered.includes(c.id))
                    : COURSE_CATALOGUE.filter(c => registered.includes(c.id))
                  ).map(c => (
                    <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Pre-selected course info */}
            {applyModal.course && (
              <div className={`rounded-xl p-3 text-sm ${dm ? "bg-gray-700" : "bg-gray-50"}`}>
                <p className="text-xs font-bold text-indigo-500">{applyModal.course.code}</p>
                <p className={`font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{applyModal.course.title}</p>
                <p className={`text-xs mt-0.5 ${dm ? "text-gray-400" : "text-gray-500"}`}>{applyModal.course.units} units · {applyModal.course.lecturer}</p>
              </div>
            )}

            {/* Reason */}
            <div>
              <label className={`block text-xs font-semibold mb-1 ${dm ? "text-gray-300" : "text-gray-600"}`}>Reason / Justification <span className="text-red-500">*</span></label>
              <textarea
                value={applyReason}
                onChange={e => setApplyReason(e.target.value)}
                rows={3}
                placeholder="Explain why you need to add or drop this course..."
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none resize-none ${dm ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setApplyModal(p => ({ ...p, open: false }))}
                className={`flex-1 rounded-xl border py-2 text-sm font-medium ${dm ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}>
                Cancel
              </button>
              <button
                onClick={submitApplication}
                disabled={!applyReason.trim() || (!applyModal.course && !applySelectId)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" /> Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl fade-up ${toast.type==="error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* Registration Status Banner */}
      <div className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-medium border ${
        !currentUser.fees_paid
          ? dm ? "bg-red-900/30 border-red-800 text-red-300" : "bg-red-50 border-red-200 text-red-700"
          : regOpen
          ? dm ? "bg-emerald-900/30 border-emerald-800 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-700"
          : dm ? "bg-amber-900/30 border-amber-800 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-700"
      }`}>
        {!currentUser.fees_paid ? (
          <><AlertCircle className="w-4 h-4 shrink-0" /> Fees unpaid — course registration is locked until fees are cleared.</>
        ) : regOpen ? (
          <><CheckCircle2 className="w-4 h-4 shrink-0" /> Registration is open. You can add or drop courses freely.</>
        ) : (
          <><LockKeyhole className="w-4 h-4 shrink-0" /> Registration closed ({REGISTRATION_STATUS.closeDate}). You can view courses. To add/drop, submit an application for approval.</>
        )}
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:"Registered", value:registered.length, sub:"courses", color:"indigo" },
          { label:"Total Units", value:totalUnits,        sub:`/ 24 max`, color:"purple" },
          { label:"Catalogue",   value:COURSE_CATALOGUE.length, sub:"available", color:"emerald" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className={`rounded-2xl p-3 text-center border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
            <p className={`text-2xl font-bold ${color==="indigo"?"text-indigo-600":color==="purple"?"text-purple-600":"text-emerald-600"}`}>{value}</p>
            <p className={`text-xs font-medium ${dm?"text-gray-300":"text-gray-700"}`}>{label}</p>
            <p className={`text-xs ${dm?"text-gray-500":"text-gray-400"}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={`flex rounded-2xl p-1 gap-1 ${dm?"bg-gray-900":"bg-gray-100"}`}>
        {[
          { id:"catalogue",  label:"Browse Courses",  icon:BookOpen },
          { id:"registered", label:"My Courses",      icon:BookMarked },
          { id:"timetable",  label:"Timetable",       icon:CalendarDays },
        ].map(({ id, label, icon }) => {
          const TabIcon = icon;
          return (
            <button key={id} onClick={()=>setView(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${view===id ? "bg-indigo-600 text-white shadow-md" : dm?"text-gray-400 hover:text-white":"text-gray-500 hover:text-gray-800"}`}>
              <TabIcon className="w-3.5 h-3.5"/>{label}
            </button>
          );
        })}
      </div>

      {/* ── CATALOGUE VIEW ── */}
      {view === "catalogue" && (
        <div className="space-y-3">
          {/* Filters */}
          <div className="flex gap-2">
            <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border ${dm?"bg-gray-900 border-gray-700":"bg-white border-gray-200"}`}>
              <Search className="w-4 h-4 text-gray-400"/>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search courses..."
                className={`flex-1 text-sm bg-transparent outline-none ${dm?"text-white placeholder-gray-600":"text-gray-800"}`}/>
            </div>
            <div className="flex gap-1">
              {["First","Second"].map(s => (
                <button key={s} onClick={()=>setSemFilter(s)}
                  className={`text-xs px-3 py-2 rounded-xl font-medium ${semFilter===s?"bg-indigo-600 text-white":dm?"bg-gray-800 text-gray-400":"bg-white border border-gray-200 text-gray-600"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className={`text-xs font-medium ${dm?"text-gray-500":"text-gray-400"}`}>{filtered.length} courses · {semFilter} Semester</p>

          <div className={`rounded-2xl border overflow-hidden ${dm ? "border-gray-800" : "border-gray-200"}`}>
            <div className={`overflow-x-auto ${dm ? "bg-gray-900" : "bg-white"}`}>
              <table className="w-full text-sm" style={{ minWidth: "920px" }}>
                <thead>
                  <tr className={`${dm ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Course Code</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Course Title</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Course Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Course Unit</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className={`${dm ? "divide-y divide-gray-800" : "divide-y divide-gray-100"}`}>
                  {filtered.map((course) => {
                    const isReg = registered.includes(course.id);
                    const courseType = (course.dept === currentUser.department || course.code.startsWith("GST")) ? "COMPULSORY" : "ELECTIVE";

                    return (
                      <tr key={course.id} className={`${isReg ? (dm ? "bg-indigo-950/20" : "bg-indigo-50/60") : ""}`}>
                        <td className="px-4 py-3 font-semibold text-indigo-500 whitespace-nowrap">{course.code}</td>
                        <td className="px-4 py-3">
                          <p className={`font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{course.title}</p>
                          <p className={`mt-1 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{course.days.join(", ")} · {course.time}</p>
                        </td>
                        <td className={`px-4 py-3 ${dm ? "text-gray-300" : "text-gray-700"}`}>{course.level}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${courseType === "COMPULSORY" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                            {courseType}
                          </span>
                        </td>
                        <td className={`px-4 py-3 font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{course.units}</td>
                        <td className="px-4 py-3">
                          {!currentUser.fees_paid ? (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed">
                              <LockKeyhole className="w-3 h-3" /> Locked
                            </span>
                          ) : !regOpen ? (
                            <button
                              onClick={() => openApplyModal(isReg ? "drop" : "add", course)}
                              className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                            >
                              {isReg ? "Apply Drop" : "Apply Add"}
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleReg(course)}
                              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${isReg ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                            >
                              {isReg ? "Drop" : "+ Add"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── MY COURSES VIEW ── */}
      {view === "registered" && (
        <div className="space-y-3">
          {/* Apply button when registration closed */}
          {!regOpen && currentUser.fees_paid && (
            <div className="flex gap-2">
              <button onClick={() => openApplyModal("add")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700">
                <Plus className="w-3.5 h-3.5" /> Apply to Add Course
              </button>
              <button onClick={() => openApplyModal("drop")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100">
                <Trash2 className="w-3.5 h-3.5" /> Apply to Drop Course
              </button>
            </div>
          )}

          {registeredCourses.length === 0 ? (
            <div className={`rounded-2xl p-10 text-center border ${dm?"border-gray-800":"border-gray-100"}`}>
              <BookOpen className={`w-10 h-10 mx-auto mb-3 ${dm?"text-gray-700":"text-gray-300"}`}/>
              <p className={`text-sm font-medium ${dm?"text-gray-400":"text-gray-500"}`}>No courses registered yet</p>
              <button onClick={()=>setView("catalogue")} className="mt-3 text-xs px-4 py-2 bg-indigo-600 text-white rounded-xl">Browse Courses</button>
            </div>
          ) : registeredCourses.map(course => (
            <button key={course.id} onClick={()=>{ setSelectedCourse(course); setView("detail"); setDetailTab("info"); }}
              className={`w-full text-left rounded-2xl p-4 border transition-all card-hover ${dm?"bg-gray-900 border-gray-800 hover:border-indigo-700":"bg-white border-gray-100 hover:border-indigo-200"}`}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {course.units}U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-indigo-500">{course.code}</p>
                  <p className={`text-sm font-semibold truncate ${dm?"text-white":"text-gray-900"}`}>{course.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`text-xs ${dm?"text-gray-400":"text-gray-500"}`}>{course.days.join(", ")}</span>
                    <span className={`text-xs ${dm?"text-gray-400":"text-gray-500"}`}>{course.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(LECTURER_ANNOUNCEMENTS[course.id]||[]).length > 0 && (
                    <span className="w-2 h-2 bg-amber-500 rounded-full"/>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400"/>
                </div>
              </div>
            </button>
          ))}

          {/* Pending Applications */}
          {pendingApps.length > 0 && (
            <div className={`rounded-2xl border overflow-hidden ${dm ? "border-gray-800" : "border-gray-200"}`}>
              <div className={`flex items-center gap-2 px-4 py-3 border-b ${dm ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                <ListChecks className="w-4 h-4 text-amber-500" />
                <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>Pending Applications</p>
                <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{pendingApps.length}</span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {pendingApps.map(app => (
                  <div key={app.id} className={`px-4 py-3 flex items-start gap-3 ${dm ? "bg-gray-900" : "bg-white"}`}>
                    <span className={`mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${app.type === "add" ? "bg-indigo-100 text-indigo-700" : "bg-red-100 text-red-600"}`}>
                      {app.type === "add" ? "+ ADD" : "− DROP"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{app.course.code} — {app.course.title}</p>
                      <p className={`text-xs mt-0.5 ${dm ? "text-gray-400" : "text-gray-500"}`}>{app.reason}</p>
                      <p className={`text-xs mt-0.5 ${dm ? "text-gray-500" : "text-gray-400"}`}>Submitted {app.date}</p>
                    </div>
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TIMETABLE VIEW ── */}
      {view === "timetable" && (
        <TimetableView
          dm={dm}
          registeredCourses={registeredCourses}
          timetableType={timetableType}
          setTimetableType={setTimetableType}
          onExport={exportToCalendar}
        />
      )}
    </div>
  );
}

// ─── TIMETABLE VIEW ───────────────────────────────────────────────────────────
function TimetableView({ dm, registeredCourses, timetableType, setTimetableType, onExport }) {
  const timeSlots = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
  const allDays   = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  const colors    = ["indigo","purple","blue","emerald","amber","rose","teal","orange"];

  // ── editable state ──────────────────────────────────────────────────────────
  const [editMode,      setEditMode]      = useState(false);
  const [overrides,     setOverrides]     = useState({});      // { courseId: { days:[], time, venue } }
  const [examOverrides, setExamOverrides] = useState({});      // { courseId: { examDate, examTime, examVenue } }
  const [customEntries, setCustomEntries] = useState([]);      // [{ id, day, timeSlot, label, color }]
  const [editPanel,     setEditPanel]     = useState(null);    // { type:"course"|"exam"|"custom"|"new", data }
  const [examNotes,     setExamNotes]     = useState({});      // { courseId: noteString }

  // scratch state inside panel
  const [scratch, setScratch] = useState({});

  const openPanel = (type, data) => {
    setScratch({ ...data });
    setEditPanel({ type, data });
  };
  const closePanel = () => { setEditPanel(null); setScratch({}); };

  useEffect(() => {
    const saved = getTimetableData();
    setOverrides(saved.lectureOverrides || {});
    setExamOverrides(saved.examOverrides || {});
    setCustomEntries(saved.customEntries || []);
    setExamNotes(saved.examNotes || {});
  }, []);

  useEffect(() => {
    const lectureCourses = registeredCourses.map((course) => {
      const lectureOverride = overrides[course.id] || {};
      const examOverride = examOverrides[course.id] || {};
      return {
        id: course.id,
        code: course.code,
        title: course.title,
        days: lectureOverride.days ?? course.days,
        time: lectureOverride.time ?? course.time,
        venue: lectureOverride.venue ?? course.venue,
      };
    });

    const examCourses = registeredCourses.map((course) => {
      const examOverride = examOverrides[course.id] || {};
      return {
        id: course.id,
        code: course.code,
        title: course.title,
        examDate: examOverride.examDate ?? course.examDate,
        examTime: examOverride.examTime ?? course.examTime,
        examVenue: examOverride.examVenue ?? course.examVenue,
      };
    });

    saveTimetableData({
      lectureCourses,
      examCourses,
      lectureOverrides: overrides,
      examOverrides,
      customEntries,
      examNotes,
    });
  }, [registeredCourses, overrides, examOverrides, customEntries, examNotes]);

  const savePanel = () => {
    if (editPanel.type === "course") {
      setOverrides(p => ({ ...p, [scratch.id]: { days: scratch.days, time: scratch.time, venue: scratch.venue } }));
    } else if (editPanel.type === "exam") {
      setExamOverrides(p => ({ ...p, [scratch.id]: { examDate: scratch.examDate, examTime: scratch.examTime, examVenue: scratch.examVenue } }));
    } else if (editPanel.type === "custom") {
      setCustomEntries(p => p.map(e => e.id === scratch.id ? { ...scratch } : e));
    } else if (editPanel.type === "new") {
      setCustomEntries(p => [...p, { ...scratch, id: Date.now() }]);
    }
    closePanel();
  };

  const deleteEntry = (id) => {
    setCustomEntries(p => p.filter(e => e.id !== id));
    closePanel();
  };

  const resetOverride = (courseId) => {
    setOverrides(p => { const n = { ...p }; delete n[courseId]; return n; });
    closePanel();
  };

  const resetExamOverride = (courseId) => {
    setExamOverrides(p => { const n = { ...p }; delete n[courseId]; return n; });
    closePanel();
  };

  const getCourseColor = (idx) => {
    const c = colors[idx % colors.length];
    const map = {
      indigo:  { bg:"bg-indigo-100",  text:"text-indigo-700",  border:"border-indigo-300",  dot:"bg-indigo-500"  },
      purple:  { bg:"bg-purple-100",  text:"text-purple-700",  border:"border-purple-300",  dot:"bg-purple-500"  },
      blue:    { bg:"bg-blue-100",    text:"text-blue-700",    border:"border-blue-300",    dot:"bg-blue-500"    },
      emerald: { bg:"bg-emerald-100", text:"text-emerald-700", border:"border-emerald-300", dot:"bg-emerald-500" },
      amber:   { bg:"bg-amber-100",   text:"text-amber-700",   border:"border-amber-300",   dot:"bg-amber-500"   },
      rose:    { bg:"bg-rose-100",    text:"text-rose-700",    border:"border-rose-300",    dot:"bg-rose-500"    },
      teal:    { bg:"bg-teal-100",    text:"text-teal-700",    border:"border-teal-300",    dot:"bg-teal-500"    },
      orange:  { bg:"bg-orange-100",  text:"text-orange-700",  border:"border-orange-300",  dot:"bg-orange-500"  },
    };
    return map[c];
  };

  const customColorMap = {
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-300",
    purple: "bg-purple-100 text-purple-700 border-purple-300",
    emerald:"bg-emerald-100 text-emerald-700 border-emerald-300",
    rose:   "bg-rose-100 text-rose-700 border-rose-300",
    amber:  "bg-amber-100 text-amber-700 border-amber-300",
    teal:   "bg-teal-100 text-teal-700 border-teal-300",
  };

  // resolve effective days/time/venue for a course (override or original)
  const resolved = (course) => {
    const ov = overrides[course.id];
    return {
      days:  ov?.days  ?? course.days,
      time:  ov?.time  ?? course.time,
      venue: ov?.venue ?? course.venue,
    };
  };

  const resolvedExam = (course) => {
    const ov = examOverrides[course.id];
    return {
      examDate: ov?.examDate ?? course.examDate,
      examTime: ov?.examTime ?? course.examTime,
      examVenue: ov?.examVenue ?? course.examVenue,
    };
  };

  const handleCellClick = (day, slot) => {
    if (!editMode) return;

    // check if a registered course sits here
    const course = registeredCourses.find(c => {
      const r = resolved(c);
      return r.days.includes(day) && r.time.split("–")[0].trim().toLowerCase() === slot.toLowerCase();
    });
    if (course) {
      const r = resolved(course);
      openPanel("course", { id: course.id, code: course.code, title: course.title, days: [...r.days], time: r.time, venue: r.venue });
      return;
    }

    // check if a custom entry sits here
    const custom = customEntries.find(e => e.day === day && e.timeSlot === slot);
    if (custom) { openPanel("custom", { ...custom }); return; }

    // empty cell — add new
    openPanel("new", { day, timeSlot: slot, label: "", color: "indigo" });
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-2">
        <div className={`flex rounded-xl p-1 gap-1 flex-1 ${dm?"bg-gray-900":"bg-gray-100"}`}>
          {[{id:"lecture",label:"Lecture"},{id:"exam",label:"Exam"}].map(({id,label})=>(
            <button key={id} onClick={()=>setTimetableType(id)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${timetableType===id?"bg-indigo-600 text-white":"text-gray-500"}`}>
              {label} Timetable
            </button>
          ))}
        </div>
        {(timetableType === "lecture" || timetableType === "exam") && (
          <button onClick={()=>{ setEditMode(e=>!e); closePanel(); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${editMode ? "bg-amber-500 text-white" : dm?"bg-gray-800 text-gray-300 border border-gray-700":"bg-white border border-gray-200 text-gray-600"}`}>
            <Sparkles className="w-3.5 h-3.5"/>
            {editMode ? "Done" : "Edit"}
          </button>
        )}
        <button onClick={()=>onExport(timetableType)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-all">
          <Download className="w-3.5 h-3.5"/>
          Export
        </button>
      </div>

      {editMode && timetableType === "lecture" && (
        <div className={`text-xs px-3 py-2 rounded-xl flex items-center gap-2 ${dm?"bg-amber-900/30 border border-amber-800 text-amber-300":"bg-amber-50 border border-amber-200 text-amber-700"}`}>
          <Sparkles className="w-3.5 h-3.5 shrink-0"/>
          Edit mode — tap any course cell to adjust its time/day/venue, or tap an empty cell to add a personal entry.
        </div>
      )}

      {editMode && timetableType === "exam" && (
        <div className={`text-xs px-3 py-2 rounded-xl flex items-center gap-2 ${dm?"bg-amber-900/30 border border-amber-800 text-amber-300":"bg-amber-50 border border-amber-200 text-amber-700"}`}>
          <Sparkles className="w-3.5 h-3.5 shrink-0"/>
          Edit mode — tap any exam card to adjust exam date, time, and venue.
        </div>
      )}

      {!editMode && timetableType === "lecture" && (
        <div className={`text-xs px-3 py-2 rounded-xl ${dm?"bg-gray-800 text-gray-400":"bg-indigo-50 text-indigo-700"} flex items-center gap-2`}>
          <Share2 className="w-3.5 h-3.5 shrink-0"/>
          Tap Export to save as .ics — opens in Google Calendar, Apple Calendar, or Outlook
        </div>
      )}

      {/* LECTURE TIMETABLE — Grid */}
      {timetableType === "lecture" && (
        <div className={`rounded-2xl border overflow-hidden ${dm?"border-gray-800":"border-gray-200"}`}>
          {/* Day headers */}
          <div className={`grid ${dm?"bg-gray-900":"bg-gray-50"}`} style={{gridTemplateColumns:"64px repeat(5,1fr)"}}>
            <div className="p-2"/>
            {["Mon","Tue","Wed","Thu","Fri"].map(d => (
              <div key={d} className={`p-2 text-center text-xs font-bold border-l ${dm?"border-gray-800 text-gray-400":"border-gray-200 text-gray-600"}`}>{d}</div>
            ))}
          </div>

          {/* Time rows */}
          {timeSlots.map((slot) => (
            <div key={slot} className={`grid border-t ${dm?"border-gray-800":"border-gray-100"}`}
              style={{gridTemplateColumns:"64px repeat(5,1fr)"}}>
              <div className={`p-2 text-xs text-right pr-3 ${dm?"text-gray-600":"text-gray-400"} flex items-start justify-end pt-2`}>
                {slot.replace(":00","")}
              </div>
              {allDays.map((day) => {
                const coursMatch = registeredCourses.find(c => {
                  const r = resolved(c);
                  return r.days.includes(day) && r.time.split("–")[0].trim().toLowerCase() === slot.toLowerCase();
                });
                const cidx = coursMatch ? registeredCourses.indexOf(coursMatch) : -1;
                const col  = cidx >= 0 ? getCourseColor(cidx) : null;
                const custom = customEntries.find(e => e.day === day && e.timeSlot === slot);
                const isOverridden = coursMatch && !!overrides[coursMatch.id];

                return (
                  <div key={day}
                    onClick={() => handleCellClick(day, slot)}
                    className={`border-l p-1 min-h-11 transition-all ${dm?"border-gray-800":"border-gray-100"} ${editMode ? "cursor-pointer hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10" : ""}`}>
                    {coursMatch && col && (
                      <div className={`h-full p-1.5 rounded-lg border ${col.bg} ${col.border} ${col.text} ${editMode?"ring-2 ring-amber-400 ring-offset-1":""}`}>
                        <p className="text-xs font-bold leading-tight">{coursMatch.code}</p>
                        <p className="text-xs opacity-75 leading-tight truncate">{resolved(coursMatch).venue.split(",")[0]}</p>
                        {isOverridden && <span className="text-[9px] font-bold opacity-60">✏ edited</span>}
                      </div>
                    )}
                    {custom && !coursMatch && (
                      <div className={`h-full p-1.5 rounded-lg border text-xs font-medium ${customColorMap[custom.color] ?? customColorMap.indigo} ${editMode?"ring-2 ring-amber-400 ring-offset-1":""}`}>
                        {custom.label}
                      </div>
                    )}
                    {editMode && !coursMatch && !custom && (
                      <div className="h-full w-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Plus className="w-3 h-3 text-gray-400"/>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Legend */}
          <div className={`p-3 flex flex-wrap gap-2 border-t ${dm?"border-gray-800 bg-gray-900":"border-gray-100 bg-gray-50"}`}>
            {registeredCourses.map((c,i) => {
              const col = getCourseColor(i);
              return (
                <span key={c.id} className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg ${col.bg} ${col.text}`}>
                  <span className={`w-2 h-2 rounded-full ${col.dot}`}/>
                  {c.code}{overrides[c.id] ? " ✏" : ""}
                </span>
              );
            })}
            {customEntries.map(e => (
              <span key={e.id} className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg ${customColorMap[e.color] ?? customColorMap.indigo}`}>
                ★ {e.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* EXAM TIMETABLE — List */}
      {timetableType === "exam" && (
        <div className="space-y-2">
          <p className={`text-xs px-1 ${dm?"text-gray-500":"text-gray-400"}`}>You can add personal notes to each exam.</p>
          {registeredCourses
            .sort((a,b) => new Date(resolvedExam(a).examDate) - new Date(resolvedExam(b).examDate))
            .map((c,i) => {
              const exam = resolvedExam(c);
              const col = getCourseColor(i);
              const examD = new Date(exam.examDate);
              const daysLeft = Math.ceil((examD - new Date()) / (1000*60*60*24));
              const examEdited = !!examOverrides[c.id];
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    if (!editMode) return;
                    openPanel("exam", {
                      id: c.id,
                      code: c.code,
                      title: c.title,
                      examDate: exam.examDate,
                      examTime: exam.examTime,
                      examVenue: exam.examVenue,
                    });
                  }}
                  className={`rounded-2xl p-4 border space-y-2 transition-all ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"} ${editMode ? "cursor-pointer hover:border-indigo-400" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${col.bg} flex flex-col items-center justify-center shrink-0`}>
                      <p className={`text-sm font-bold leading-none ${col.text}`}>{examD.getDate()}</p>
                      <p className={`text-xs ${col.text} opacity-75`}>{examD.toLocaleString("default",{month:"short"})}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-indigo-500">{c.code}</p>
                      <p className={`text-sm font-semibold truncate ${dm?"text-white":"text-gray-900"}`}>{c.title}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className={`text-xs flex items-center gap-1 ${dm?"text-gray-400":"text-gray-500"}`}><Clock className="w-3 h-3"/>{exam.examTime}</span>
                        <span className={`text-xs flex items-center gap-1 ${dm?"text-gray-400":"text-gray-500"}`}><MapPin className="w-3 h-3"/>{exam.examVenue}</span>
                      </div>
                      {examEdited && <p className="mt-1 text-[10px] font-bold text-amber-500">✏ Exam updated</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${daysLeft < 7 ? "bg-red-100 text-red-600" : daysLeft < 30 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                        {daysLeft}d left
                      </span>
                    </div>
                  </div>
                  {/* Personal note */}
                  <textarea
                    value={examNotes[c.id] ?? ""}
                    onChange={e => setExamNotes(p => ({ ...p, [c.id]: e.target.value }))}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Add a personal note or reminder for this exam..."
                    rows={2}
                    readOnly={editMode}
                    className={`w-full text-xs rounded-xl border px-3 py-2 resize-none outline-none ${dm?"bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-600":"bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400"}`}
                  />
                </div>
              );
            })}
        </div>
      )}

      {/* ── EDIT PANEL MODAL ── */}
      {editPanel && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className={`w-full max-w-sm my-auto rounded-2xl shadow-xl p-5 space-y-4 ${dm?"bg-gray-800":"bg-white"}`}>

            {/* Course edit */}
            {(editPanel.type === "course") && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-indigo-500">{scratch.code}</p>
                    <h3 className={`font-bold text-sm ${dm?"text-white":"text-gray-900"}`}>{scratch.title}</h3>
                  </div>
                  <button onClick={closePanel} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-4 h-4"/></button>
                </div>
                <p className={`text-xs ${dm?"text-gray-400":"text-gray-500"}`}>These changes are local overrides visible only in your timetable view.</p>

                {/* Days checkboxes */}
                <div>
                  <label className={`text-xs font-semibold block mb-1.5 ${dm?"text-gray-300":"text-gray-600"}`}>Lecture Days</label>
                  <div className="flex flex-wrap gap-2">
                    {allDays.map(d => (
                      <button key={d} onClick={() => setScratch(p => ({
                        ...p, days: p.days.includes(d) ? p.days.filter(x=>x!==d) : [...p.days, d]
                      }))}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${scratch.days?.includes(d) ? "bg-indigo-600 text-white border-indigo-600" : dm?"border-gray-600 text-gray-400":"border-gray-300 text-gray-600"}`}>
                        {d.slice(0,3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className={`text-xs font-semibold block mb-1 ${dm?"text-gray-300":"text-gray-600"}`}>Time (e.g. 10:00 AM – 11:00 AM)</label>
                  <input value={scratch.time ?? ""} onChange={e=>setScratch(p=>({...p,time:e.target.value}))}
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${dm?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-300 text-gray-900"}`}/>
                </div>

                {/* Venue */}
                <div>
                  <label className={`text-xs font-semibold block mb-1 ${dm?"text-gray-300":"text-gray-600"}`}>Venue</label>
                  <input value={scratch.venue ?? ""} onChange={e=>setScratch(p=>({...p,venue:e.target.value}))}
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${dm?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-300 text-gray-900"}`}/>
                </div>

                <div className="flex gap-2 pt-1">
                  {overrides[scratch.id] && (
                    <button onClick={() => resetOverride(scratch.id)}
                      className="px-3 py-2 text-xs font-medium rounded-xl text-red-600 border border-red-200 hover:bg-red-50">
                      Reset
                    </button>
                  )}
                  <button onClick={closePanel} className={`flex-1 py-2 rounded-xl border text-sm font-medium ${dm?"border-gray-600 text-gray-300":"border-gray-300 text-gray-600"}`}>Cancel</button>
                  <button onClick={savePanel} className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Save</button>
                </div>
              </>
            )}

            {(editPanel.type === "exam") && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-indigo-500">{scratch.code}</p>
                    <h3 className={`font-bold text-sm ${dm?"text-white":"text-gray-900"}`}>{scratch.title}</h3>
                  </div>
                  <button onClick={closePanel} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-4 h-4"/></button>
                </div>
                <p className={`text-xs ${dm?"text-gray-400":"text-gray-500"}`}>Edit your exam schedule override for this course.</p>

                <div>
                  <label className={`text-xs font-semibold block mb-1 ${dm?"text-gray-300":"text-gray-600"}`}>Exam Date</label>
                  <input
                    type="date"
                    value={scratch.examDate ?? ""}
                    onChange={e => setScratch(p => ({ ...p, examDate: e.target.value }))}
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${dm?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-1 ${dm?"text-gray-300":"text-gray-600"}`}>Exam Time</label>
                  <input
                    value={scratch.examTime ?? ""}
                    onChange={e => setScratch(p => ({ ...p, examTime: e.target.value }))}
                    placeholder="e.g. 9:00 AM"
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${dm?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-1 ${dm?"text-gray-300":"text-gray-600"}`}>Exam Venue</label>
                  <input
                    value={scratch.examVenue ?? ""}
                    onChange={e => setScratch(p => ({ ...p, examVenue: e.target.value }))}
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${dm?"bg-gray-700 border-gray-600 text-white":"bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  {examOverrides[scratch.id] && (
                    <button onClick={() => resetExamOverride(scratch.id)} className="px-3 py-2 text-xs font-medium rounded-xl text-red-600 border border-red-200 hover:bg-red-50">
                      Reset
                    </button>
                  )}
                  <button onClick={closePanel} className={`flex-1 py-2 rounded-xl border text-sm font-medium ${dm?"border-gray-600 text-gray-300":"border-gray-300 text-gray-600"}`}>Cancel</button>
                  <button onClick={savePanel} className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Save</button>
                </div>
              </>
            )}

            {/* Custom entry edit / new */}
            {(editPanel.type === "custom" || editPanel.type === "new") && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-sm ${dm?"text-white":"text-gray-900"}`}>
                    {editPanel.type === "new" ? "Add Personal Entry" : "Edit Entry"}
                  </h3>
                  <button onClick={closePanel} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-4 h-4"/></button>
                </div>

                <div className={`text-xs rounded-xl px-3 py-2 ${dm?"bg-gray-700 text-gray-400":"bg-gray-100 text-gray-500"}`}>
                  {scratch.day} · {scratch.timeSlot}
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-1 ${dm?"text-gray-300":"text-gray-600"}`}>Label <span className="text-red-500">*</span></label>
                  <input value={scratch.label ?? ""} onChange={e=>setScratch(p=>({...p,label:e.target.value}))}
                    placeholder="e.g. Study Group, Office Hours..."
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${dm?"bg-gray-700 border-gray-600 text-white placeholder-gray-500":"bg-white border-gray-300 text-gray-900 placeholder-gray-400"}`}/>
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-1.5 ${dm?"text-gray-300":"text-gray-600"}`}>Colour</label>
                  <div className="flex gap-2">
                    {Object.keys(customColorMap).map(c => (
                      <button key={c} onClick={()=>setScratch(p=>({...p,color:c}))}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${customColorMap[c].split(" ")[0]} ${scratch.color===c?"border-gray-900 scale-110":"border-transparent"}`}/>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  {editPanel.type === "custom" && (
                    <button onClick={()=>deleteEntry(scratch.id)} className="px-3 py-2 text-xs font-medium rounded-xl text-red-600 border border-red-200 hover:bg-red-50">
                      Delete
                    </button>
                  )}
                  <button onClick={closePanel} className={`flex-1 py-2 rounded-xl border text-sm font-medium ${dm?"border-gray-600 text-gray-300":"border-gray-300 text-gray-600"}`}>Cancel</button>
                  <button onClick={savePanel} disabled={!scratch.label?.trim()}
                    className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">
                    {editPanel.type === "new" ? "Add" : "Save"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── COURSE DETAIL PAGE ───────────────────────────────────────────────────────
function CourseDetail({ course, dm, onBack, detailTab, setDetailTab, announcements, assignments }) {
  return (
    <div className="space-y-4 slide-in">
      {/* Header */}
      <div>
        <button onClick={onBack} className={`flex items-center gap-1.5 text-sm font-medium mb-3 ${dm?"text-gray-400 hover:text-white":"text-gray-500 hover:text-gray-900"}`}>
          <ArrowLeft className="w-4 h-4"/> Back to My Courses
        </button>
        <div className="relative overflow-hidden rounded-2xl p-5" style={{background:"linear-gradient(135deg,#4338ca,#7c3aed)"}}>
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10" style={{background:"radial-gradient(circle,white,transparent)"}}/>
          <div className="relative z-10">
            <span className="text-indigo-200 text-xs font-bold">{course.code} · {course.units} Units</span>
            <h2 className="text-xl font-bold text-white mt-1 leading-tight" style={{fontFamily:"Sora"}}>{course.title}</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-indigo-200 text-xs">
              <span className="flex items-center gap-1"><User className="w-3 h-3"/>{course.lecturer}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{course.venue}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{course.days.join(" & ")} · {course.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className={`flex rounded-2xl p-1 gap-1 overflow-x-auto ${dm?"bg-gray-900":"bg-gray-100"}`}>
        {[
          { id:"info",        label:"Info",        icon:Info          },
          { id:"timetable",   label:"Schedule",    icon:CalendarDays  },
          { id:"assignments", label:"Assignments", icon:ClipboardList },
          { id:"ai",          label:"AI Notes",    icon:Brain         },
        ].map(({ id, label, icon }) => {
          const DetailIcon = icon;
          return (
            <button key={id} onClick={()=>setDetailTab(id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${detailTab===id?"bg-indigo-600 text-white shadow":"text-gray-500 hover:text-gray-800"}`}>
              <DetailIcon className="w-3.5 h-3.5"/>{label}
            </button>
          );
        })}
      </div>

      {/* ── INFO TAB ── */}
      {detailTab === "info" && (
        <div className="space-y-3 fade-up">
          {/* Lecturer Announcements */}
          <div className={`rounded-2xl border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
            <div className={`px-4 py-3 border-b flex items-center gap-2 ${dm?"border-gray-800":"border-gray-100"}`}>
              <Bell className="w-4 h-4 text-amber-500"/>
              <p className="font-semibold text-sm">Lecturer Announcements</p>
              {announcements.length > 0 && <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{announcements.length}</span>}
            </div>
            <div className="p-3 space-y-2">
              {announcements.length === 0 ? (
                <p className={`text-xs text-center py-4 ${dm?"text-gray-600":"text-gray-400"}`}>No announcements yet</p>
              ) : announcements.map(a => (
                <div key={a.id} className={`p-3 rounded-xl border-l-4 ${a.important ? "border-l-amber-500 bg-amber-50" : dm?"border-l-gray-700 bg-gray-800":"border-l-gray-200 bg-gray-50"}`}>
                  {a.important && <span className="text-xs font-bold text-amber-600 flex items-center gap-1 mb-1"><AlertCircle className="w-3 h-3"/> Important</span>}
                  <p className={`text-sm ${dm&&!a.important?"text-gray-300":"text-gray-800"}`}>{a.text}</p>
                  <p className={`text-xs mt-1 ${dm?"text-gray-500":"text-gray-400"}`}>{a.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Course Details */}
          <div className={`rounded-2xl border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"} p-4`}>
            <p className="font-semibold text-sm mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-indigo-500"/> Course Details</p>
            <div className="space-y-2">
              {[
                { label:"Department",    value:course.dept },
                { label:"Level",         value:"300 Level" },
                { label:"Semester",      value:`${course.semester} Semester` },
                { label:"Credit Units",  value:`${course.units} Units` },
                { label:"Lecturer",      value:course.lecturer },
                { label:"Venue",         value:course.venue },
                { label:"Class Days",    value:course.days.join(", ") },
                { label:"Class Time",    value:course.time },
                { label:"Exam Date",     value:`${course.examDate} · ${course.examTime}` },
                { label:"Exam Venue",    value:course.examVenue },
              ].map(({ label, value }) => (
                <div key={label} className={`flex justify-between gap-3 py-2 border-b ${dm?"border-gray-800":"border-gray-50"} last:border-0`}>
                  <p className={`text-xs ${dm?"text-gray-500":"text-gray-400"}`}>{label}</p>
                  <p className="text-xs font-semibold text-right">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SCHEDULE TAB ── */}
      {detailTab === "timetable" && (
        <div className="space-y-3 fade-up">
          {/* Lecture schedule */}
          <div className={`rounded-2xl border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"} overflow-hidden`}>
            <div className={`px-4 py-3 border-b flex items-center gap-2 ${dm?"border-gray-800":"border-gray-100"}`}>
              <CalendarDays className="w-4 h-4 text-indigo-500"/>
              <p className="font-semibold text-sm">Weekly Lecture Schedule</p>
            </div>
            <div className="p-3 space-y-2">
              {course.days.map(day => (
                <div key={day} className={`flex items-center gap-3 p-3 rounded-xl ${dm?"bg-gray-800":"bg-indigo-50"}`}>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {day.slice(0,3)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{day}</p>
                    <p className={`text-xs ${dm?"text-gray-400":"text-gray-500"}`}>{course.time} · {course.venue}</p>
                  </div>
                  <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Weekly</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exam schedule */}
          <div className={`rounded-2xl border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"} overflow-hidden`}>
            <div className={`px-4 py-3 border-b flex items-center gap-2 ${dm?"border-gray-800":"border-gray-100"}`}>
              <FileText className="w-4 h-4 text-rose-500"/>
              <p className="font-semibold text-sm">Examination</p>
              <span className="ml-auto text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                {Math.ceil((new Date(course.examDate)-new Date())/(1000*60*60*24))} days away
              </span>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label:"Date",  value:course.examDate, icon:Calendar },
                { label:"Time",  value:course.examTime, icon:Clock    },
                { label:"Venue", value:course.examVenue,icon:MapPin   },
              ].map(({ label, value, icon }) => {
                const ScheduleIcon = icon;
                return (
                  <div key={label} className={`flex items-center gap-3 p-3 rounded-xl ${dm?"bg-gray-800":"bg-rose-50"}`}>
                    <ScheduleIcon className="w-4 h-4 text-rose-500 shrink-0"/>
                    <div>
                      <p className={`text-xs ${dm?"text-gray-500":"text-gray-400"}`}>{label}</p>
                      <p className="text-sm font-semibold">{value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── ASSIGNMENTS TAB ── */}
      {detailTab === "assignments" && (
        <div className="space-y-3 fade-up">
          {assignments.length === 0 ? (
            <div className={`rounded-2xl p-10 text-center border ${dm?"border-gray-800":"border-gray-100"}`}>
              <ClipboardList className={`w-10 h-10 mx-auto mb-3 ${dm?"text-gray-700":"text-gray-300"}`}/>
              <p className={`text-sm ${dm?"text-gray-500":"text-gray-400"}`}>No assignments yet</p>
            </div>
          ) : assignments.map(a => {
            const statusStyle = {
              submitted:"bg-emerald-100 text-emerald-700",
              pending:  "bg-amber-100 text-amber-700",
              overdue:  "bg-red-100 text-red-600",
            }[a.status];
            return (
              <div key={a.id} className={`rounded-2xl border p-4 ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className={`text-sm font-semibold ${dm?"text-white":"text-gray-900"}`}>{a.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize shrink-0 ${statusStyle}`}>{a.status}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs flex items-center gap-1 ${dm?"text-gray-400":"text-gray-500"}`}><Clock className="w-3 h-3"/> Due {a.deadline}</span>
                  {a.marks !== null
                    ? <span className="text-xs font-bold text-indigo-600">{a.marks}/{a.total} pts</span>
                    : <span className={`text-xs ${dm?"text-gray-500":"text-gray-400"}`}>/{a.total} pts</span>}
                </div>
                {a.status !== "submitted" && (
                  <button className="mt-3 flex items-center gap-1.5 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                    <Upload className="w-3.5 h-3.5"/> Upload Submission (PDF)
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── AI NOTES TAB ── */}
      {detailTab === "ai" && (
        <AINotesPanel dm={dm} course={course} />
      )}
    </div>
  );
}

// ─── AI LECTURE NOTES PANEL ───────────────────────────────────────────────────
function AINotesPanel({ dm, course }) {
  const [loading, setLoading]   = useState(false);
  const [summary, setSummary]   = useState(null);
  const [asked, setAsked]       = useState("");
  const [qaResult, setQaResult] = useState(null);
  const [qaLoading, setQaLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const generateSummary = async () => {
    setLoading(true); setSummary(null);
    const prompt = `You are a helpful university tutor. Generate a structured lecture note summary for the course "${course.title}" (${course.code}) as taught at a Nigerian university. 

Format your response as JSON with this exact structure (no markdown, pure JSON):
{
  "overview": "2-3 sentence course overview",
  "keyTopics": ["topic1", "topic2", "topic3", "topic4", "topic5"],
  "weeklyBreakdown": [
    {"week": 1, "title": "Topic Title", "summary": "Brief summary of what is covered"},
    {"week": 2, "title": "Topic Title", "summary": "Brief summary"},
    {"week": 3, "title": "Topic Title", "summary": "Brief summary"},
    {"week": 4, "title": "Topic Title", "summary": "Brief summary"}
  ],
  "examTips": ["tip1", "tip2", "tip3"],
  "recommendedTexts": ["Book Title by Author", "Book Title by Author"]
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("").trim();
      const clean = text.replace(/```json|```/g,"").trim();
      setSummary(JSON.parse(clean));
    } catch {
      setSummary({ error: "Could not load AI summary. Please try again." });
    }
    setLoading(false);
  };

  const askQuestion = async () => {
    if (!asked.trim()) return;
    setQaLoading(true); setQaResult(null);
    const prompt = `You are a university tutor for "${course.title}" (${course.code}). Answer this student question concisely and clearly, as if explaining to a Nigerian university 300-level student:

Question: ${asked}

Give a clear, direct answer in 3-5 sentences. Use simple language.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      setQaResult(data.content?.map(b => b.text || "").join("").trim());
    } catch {
      setQaResult("Could not get an answer. Please try again.");
    }
    setQaLoading(false);
  };

  return (
    <div className="space-y-4 fade-up">
      {/* Banner */}
      <div className="rounded-2xl p-4 bg-linear-to-r from-violet-600 to-indigo-600 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5"/>
          <p className="font-bold text-sm" style={{fontFamily:"Sora"}}>AI Lecture Notes</p>
          <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">Powered by Claude</span>
        </div>
        <p className="text-violet-200 text-xs">Get an AI-generated summary of {course.code} topics, weekly breakdowns, exam tips, and ask any question about the course.</p>
      </div>

      {/* Generate Button */}
      {!summary && !loading && (
        <button onClick={generateSummary}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-all">
          <Sparkles className="w-4 h-4"/> Generate Lecture Summary for {course.code}
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className={`rounded-2xl border p-8 text-center ${dm?"border-gray-800 bg-gray-900":"border-gray-100 bg-white"}`}>
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-violet-100 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-violet-600 animate-spin"/>
          </div>
          <p className={`text-sm font-medium ${dm?"text-gray-300":"text-gray-700"}`}>Generating notes for {course.code}...</p>
          <p className={`text-xs mt-1 ${dm?"text-gray-500":"text-gray-400"}`}>Claude is summarising topics and exam tips</p>
        </div>
      )}

      {/* Summary */}
      {summary && !summary.error && (
        <div className="space-y-3">
          {/* Overview */}
          <div className={`rounded-2xl border p-4 ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-500"/> Course Overview</p>
            <p className={`text-sm leading-relaxed ${dm?"text-gray-300":"text-gray-700"}`}>{summary.overview}</p>
          </div>

          {/* Key Topics */}
          <div className={`rounded-2xl border p-4 ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
            <p className="font-semibold text-sm mb-3 flex items-center gap-2"><Layers className="w-4 h-4 text-purple-500"/> Key Topics</p>
            <div className="flex flex-wrap gap-2">
              {summary.keyTopics?.map((t,i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-purple-100 text-purple-700 rounded-xl font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Weekly Breakdown */}
          <div className={`rounded-2xl border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"} overflow-hidden`}>
            <div className={`px-4 py-3 border-b ${dm?"border-gray-800":"border-gray-100"}`}>
              <p className="font-semibold text-sm flex items-center gap-2"><CalendarDays className="w-4 h-4 text-blue-500"/> Weekly Breakdown</p>
            </div>
            <div className="divide-y divide-gray-100">
              {summary.weeklyBreakdown?.map((w) => (
                <div key={w.week}>
                  <button onClick={() => setActiveSection(activeSection===w.week ? null : w.week)}
                    className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-all ${dm?"hover:bg-gray-800":""}`}>
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold shrink-0">
                      W{w.week}
                    </div>
                    <p className="text-sm font-medium flex-1">{w.title}</p>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${activeSection===w.week?"rotate-90":""}`}/>
                  </button>
                  {activeSection === w.week && (
                    <div className={`px-4 pb-3 text-sm ${dm?"text-gray-400":"text-gray-600"}`}>
                      {w.summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exam Tips */}
          <div className={`rounded-2xl border p-4 ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
            <p className="font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-amber-500"/> Exam Tips</p>
            <div className="space-y-2">
              {summary.examTips?.map((t,i) => (
                <div key={i} className={`flex gap-2.5 p-2.5 rounded-xl ${dm?"bg-amber-950/30 text-amber-200":"bg-amber-50 text-amber-800"}`}>
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/>
                  <p className="text-xs">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Texts */}
          <div className={`rounded-2xl border p-4 ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
            <p className="font-semibold text-sm mb-3 flex items-center gap-2"><BookMarked className="w-4 h-4 text-emerald-500"/> Recommended Texts</p>
            <div className="space-y-1.5">
              {summary.recommendedTexts?.map((t,i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 text-xs font-bold mt-0.5">{i+1}.</span>
                  <p className={`text-sm ${dm?"text-gray-300":"text-gray-700"}`}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regenerate */}
          <button onClick={generateSummary}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border ${dm?"border-gray-700 text-gray-400 hover:bg-gray-800":"border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            <RefreshCw className="w-3.5 h-3.5"/> Regenerate Summary
          </button>
        </div>
      )}

      {summary?.error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
          {summary.error}
        </div>
      )}

      {/* Ask AI anything */}
      <div className={`rounded-2xl border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"} overflow-hidden`}>
        <div className={`px-4 py-3 border-b flex items-center gap-2 ${dm?"border-gray-800":"border-gray-100"}`}>
          <Zap className="w-4 h-4 text-violet-500"/>
          <p className="font-semibold text-sm">Ask AI About This Course</p>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex gap-2">
            <input value={asked} onChange={e=>setAsked(e.target.value)}
              onKeyDown={e => e.key==="Enter" && askQuestion()}
              placeholder={`Ask anything about ${course.code}...`}
              className={`flex-1 text-sm p-2.5 rounded-xl border focus:outline-none focus:border-violet-400 ${dm?"bg-gray-800 border-gray-700 text-white placeholder-gray-600":"bg-gray-50 border-gray-200"}`}/>
            <button onClick={askQuestion} disabled={qaLoading || !asked.trim()}
              className="px-3 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 flex items-center gap-1.5 text-xs font-medium shrink-0">
              {qaLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Sparkles className="w-3.5 h-3.5"/>}
              Ask
            </button>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-1.5">
            {[
              `Explain the key concepts`,
              `What are common exam questions?`,
              `Summarise week 3 topics`,
            ].map(q => (
              <button key={q} onClick={() => { setAsked(q); }}
                className={`text-xs px-2.5 py-1 rounded-xl border ${dm?"border-gray-700 text-gray-400 hover:bg-gray-800":"border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                {q}
              </button>
            ))}
          </div>

          {qaLoading && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-violet-50">
              <Loader2 className="w-4 h-4 text-violet-600 animate-spin shrink-0"/>
              <p className="text-xs text-violet-700">Claude is thinking...</p>
            </div>
          )}

          {qaResult && (
            <div className={`p-3 rounded-xl ${dm?"bg-violet-950/40 border border-violet-800 text-violet-200":"bg-violet-50 border border-violet-200 text-violet-900"}`}>
              <div className="flex items-center gap-1.5 mb-2">
                <Brain className="w-3.5 h-3.5 text-violet-500"/>
                <p className="text-xs font-bold text-violet-500">Claude's Answer</p>
              </div>
              <p className="text-sm leading-relaxed">{qaResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
