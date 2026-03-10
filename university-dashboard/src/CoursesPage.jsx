// ─── ENHANCED COURSES PAGE ────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import {
  BookOpen, Plus, X, Check, Clock, Calendar, FileText,
  ChevronRight, ChevronLeft, Download, Bell, Sparkles,
  User, AlertCircle, Upload, Loader2, ExternalLink,
  GraduationCap, BookMarked, Info, Star, Filter,
  Search, MapPin, Hash, Layers, ArrowLeft, Share2,
  CheckCircle2, Circle, Zap, Brain, ClipboardList,
  MoreHorizontal, Trash2, CalendarDays, RefreshCw
} from "lucide-react";

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
  const [view, setView]                 = useState("catalogue");   // catalogue | registered | timetable | detail
  const [registered, setRegistered]     = useState([1,2,4,6]);    // registered course IDs
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [detailTab, setDetailTab]       = useState("info");        // info | timetable | assignments | ai
  const [semFilter, setSemFilter]       = useState("First");
  const [searchQ, setSearchQ]           = useState("");
  const [toast, setToast]               = useState(null);
  const [timetableType, setTimetableType] = useState("lecture");   // lecture | exam

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleReg = (course) => {
    if (!user.fees_paid) { showToast("⚠️ Pay your school fees first!", "error"); return; }
    const max = 24;
    const totalUnits = COURSE_CATALOGUE.filter(c => registered.includes(c.id)).reduce((s,c)=>s+c.units,0);
    if (!registered.includes(course.id) && totalUnits + course.units > max) {
      showToast(`⚠️ Max 24 units allowed. You have ${totalUnits} units.`, "error"); return;
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
        isRegistered={registered.includes(selectedCourse.id)}
        announcements={LECTURER_ANNOUNCEMENTS[selectedCourse.id] || []}
        assignments={ASSIGNMENTS_BY_COURSE[selectedCourse.id] || []}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl fade-up ${toast.type==="error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
          {toast.msg}
        </div>
      )}

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
        ].map(({ id, label, icon:Icon }) => (
          <button key={id} onClick={()=>setView(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${view===id ? "bg-indigo-600 text-white shadow-md" : dm?"text-gray-400 hover:text-white":"text-gray-500 hover:text-gray-800"}`}>
            <Icon className="w-3.5 h-3.5"/>{label}
          </button>
        ))}
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

          {filtered.map(course => {
            const isReg = registered.includes(course.id);
            return (
              <div key={course.id} className={`rounded-2xl p-4 border transition-all ${isReg ? dm?"border-indigo-700 bg-indigo-950/40":"border-indigo-200 bg-indigo-50/60" : dm?"bg-gray-900 border-gray-800 hover:border-gray-700":"bg-white border-gray-100 hover:border-gray-200"}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${isReg?"bg-indigo-600 text-white":dm?"bg-gray-800 text-gray-400":"bg-gray-100 text-gray-600"}`}>
                    {course.units}U
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-xs font-bold ${isReg?"text-indigo-600":"text-indigo-500"}`}>{course.code}</p>
                        <p className={`text-sm font-semibold leading-tight ${dm?"text-white":"text-gray-900"}`}>{course.title}</p>
                      </div>
                      <button onClick={()=>toggleReg(course)}
                        className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${isReg?"bg-red-50 text-red-600 border border-red-200 hover:bg-red-100":"bg-indigo-600 text-white hover:bg-indigo-700"}`}>
                        {isReg ? "Drop" : "+ Add"}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs flex items-center gap-1 ${dm?"text-gray-400":"text-gray-500"}`}><User className="w-3 h-3"/>{course.lecturer}</span>
                      <span className={`text-xs flex items-center gap-1 ${dm?"text-gray-400":"text-gray-500"}`}><Clock className="w-3 h-3"/>{course.days.join(", ")} · {course.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MY COURSES VIEW ── */}
      {view === "registered" && (
        <div className="space-y-3">
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
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
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
  const timeSlots = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM"];
  const colors    = ["indigo","purple","blue","emerald","amber","rose","teal","orange"];

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
        <button onClick={()=>onExport(timetableType)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-all">
          <Download className="w-3.5 h-3.5"/>
          Export
        </button>
      </div>

      <div className={`text-xs px-3 py-2 rounded-xl ${dm?"bg-gray-800 text-gray-400":"bg-indigo-50 text-indigo-700"} flex items-center gap-2`}>
        <Share2 className="w-3.5 h-3.5 flex-shrink-0"/>
        Tap Export to save as .ics — opens in Google Calendar, Apple Calendar, or Outlook
      </div>

      {/* LECTURE TIMETABLE — Grid */}
      {timetableType === "lecture" && (
        <div className={`rounded-2xl border overflow-hidden ${dm?"border-gray-800":"border-gray-200"}`}>
          {/* Day headers */}
          <div className={`grid grid-cols-6 ${dm?"bg-gray-900":"bg-gray-50"}`} style={{gridTemplateColumns:"64px repeat(5,1fr)"}}>
            <div className="p-2"/>
            {["Mon","Tue","Wed","Thu","Fri"].map(d => (
              <div key={d} className={`p-2 text-center text-xs font-bold border-l ${dm?"border-gray-800 text-gray-400":"border-gray-200 text-gray-600"}`}>{d}</div>
            ))}
          </div>

          {/* Time rows */}
          {timeSlots.map((slot,si) => (
            <div key={slot} className={`grid border-t ${dm?"border-gray-800":"border-gray-100"}`}
              style={{gridTemplateColumns:"64px repeat(5,1fr)"}}>
              <div className={`p-2 text-xs text-right pr-3 ${dm?"text-gray-600":"text-gray-400"} flex items-start justify-end pt-2`}>
                {slot.replace(":00","")}
              </div>
              {["Monday","Tuesday","Wednesday","Thursday","Friday"].map((day,di) => {
                const course = registeredCourses.find(c => {
                  const courseHour = parseInt(c.time.split(":")[0]);
                  const slotHour = parseInt(slot.split(":")[0]) + (slot.includes("PM") && !slot.startsWith("12") ? 12 : 0);
                  return c.days.includes(day) && courseHour === (slot.includes("PM") && !slot.startsWith("12") ? parseInt(slot)-12 : parseInt(slot));
                });
                // simpler matching
                const match = registeredCourses.find(c => {
                  const timeStart = c.time.split("–")[0].trim().toLowerCase();
                  const slotLow = slot.toLowerCase();
                  return c.days.includes(day) && timeStart === slotLow;
                });
                const cidx = match ? registeredCourses.indexOf(match) : -1;
                const col = cidx >= 0 ? getCourseColor(cidx) : null;
                return (
                  <div key={day} className={`border-l p-1 min-h-[44px] ${dm?"border-gray-800":"border-gray-100"}`}>
                    {match && col && (
                      <div className={`h-full p-1.5 rounded-lg border ${col.bg} ${col.border} ${col.text}`}>
                        <p className="text-xs font-bold leading-tight">{match.code}</p>
                        <p className="text-xs opacity-75 leading-tight truncate">{match.venue.split(",")[0]}</p>
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
                  {c.code}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* EXAM TIMETABLE — List */}
      {timetableType === "exam" && (
        <div className="space-y-2">
          {registeredCourses
            .sort((a,b) => new Date(a.examDate) - new Date(b.examDate))
            .map((c,i) => {
              const col = getCourseColor(i);
              const examD = new Date(c.examDate);
              const daysLeft = Math.ceil((examD - new Date()) / (1000*60*60*24));
              return (
                <div key={c.id} className={`rounded-2xl p-4 border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${col.bg} flex flex-col items-center justify-center flex-shrink-0`}>
                      <p className={`text-sm font-bold leading-none ${col.text}`}>{examD.getDate()}</p>
                      <p className={`text-xs ${col.text} opacity-75`}>{examD.toLocaleString("default",{month:"short"})}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-indigo-500">{c.code}</p>
                      <p className={`text-sm font-semibold truncate ${dm?"text-white":"text-gray-900"}`}>{c.title}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className={`text-xs flex items-center gap-1 ${dm?"text-gray-400":"text-gray-500"}`}><Clock className="w-3 h-3"/>{c.examTime}</span>
                        <span className={`text-xs flex items-center gap-1 ${dm?"text-gray-400":"text-gray-500"}`}><MapPin className="w-3 h-3"/>{c.examVenue}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${daysLeft < 7 ? "bg-red-100 text-red-600" : daysLeft < 30 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                        {daysLeft}d left
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

// ─── COURSE DETAIL PAGE ───────────────────────────────────────────────────────
function CourseDetail({ course, dm, onBack, detailTab, setDetailTab, isRegistered, announcements, assignments }) {
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
        ].map(({ id, label, icon:Icon }) => (
          <button key={id} onClick={()=>setDetailTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold flex-shrink-0 transition-all ${detailTab===id?"bg-indigo-600 text-white shadow":"text-gray-500 hover:text-gray-800"}`}>
            <Icon className="w-3.5 h-3.5"/>{label}
          </button>
        ))}
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
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
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
              ].map(({ label, value, icon:Icon }) => (
                <div key={label} className={`flex items-center gap-3 p-3 rounded-xl ${dm?"bg-gray-800":"bg-rose-50"}`}>
                  <Icon className="w-4 h-4 text-rose-500 flex-shrink-0"/>
                  <div>
                    <p className={`text-xs ${dm?"text-gray-500":"text-gray-400"}`}>{label}</p>
                    <p className="text-sm font-semibold">{value}</p>
                  </div>
                </div>
              ))}
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
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize flex-shrink-0 ${statusStyle}`}>{a.status}</span>
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
  const [topic, setTopic]       = useState("");
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
    } catch(e) {
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
    } catch(e) {
      setQaResult("Could not get an answer. Please try again.");
    }
    setQaLoading(false);
  };

  return (
    <div className="space-y-4 fade-up">
      {/* Banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
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
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition-all">
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
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold flex-shrink-0">
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
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"/>
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
              className="px-3 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 flex items-center gap-1.5 text-xs font-medium flex-shrink-0">
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
              <Loader2 className="w-4 h-4 text-violet-600 animate-spin flex-shrink-0"/>
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