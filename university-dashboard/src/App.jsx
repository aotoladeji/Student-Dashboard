import { useState, useEffect, useCallback } from "react";
import logo from './assets/logo.png';
import CoursesPage from './CoursesPage';
import {
  BookOpen, Home, Bell, Settings, LogOut, ChevronRight,
  GraduationCap, Building2, FileText, Ticket, Calendar,
  Timer, TrendingUp, Award, Users, AlertTriangle, CheckCircle,
  Clock, Upload, Plus, X, Menu, Search, Star, Zap,
  QrCode, BadgeCheck, ChevronDown, BarChart3, Target,
  BookMarked, Wifi, BellRing, Coffee, Moon, Sun,
  ClipboardList, MessageSquare, ExternalLink, Filter,
  Hash, Layers, Activity, ArrowUpRight, ArrowDownRight,
  Cpu, Shield, Globe, HelpCircle, ChevronLeft, MoreHorizontal,
  MapPin, Phone, Mail, User, Lock, Eye, EyeOff, AlertCircle
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar
} from "recharts";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MOCK_USER = {
  id: 1, matric_no: "190404001", name: "Adaeze Okonkwo",
  email: "adaeze.okonkwo@unilag.edu.ng", gender: "Female",
  cgpa: 4.67, level: 300, department: "Computer Science",
  faculty: "Science", fees_paid: true, hall: "Idia Hall",
  hall_id: 1, avatar: "AO", phone: "08012345678"
};

const CGPA_HISTORY = [
  { sem: "100L/1", cgpa: 3.8 }, { sem: "100L/2", cgpa: 4.1 },
  { sem: "200L/1", cgpa: 4.3 }, { sem: "200L/2", cgpa: 4.5 },
  { sem: "300L/1", cgpa: 4.67 },
];

const COURSES = [
  { id: 1, code: "CSC 301", title: "Data Structures & Algorithms", units: 3, semester: "First", registered: true, score: 78 },
  { id: 2, code: "CSC 303", title: "Computer Networks", units: 3, semester: "First", registered: true, score: 85 },
  { id: 3, code: "MTH 301", title: "Linear Algebra", units: 3, semester: "First", registered: true, score: 71 },
  { id: 4, code: "CSC 305", title: "Software Engineering", units: 3, semester: "First", registered: false, score: null },
  { id: 5, code: "PHY 301", title: "Quantum Mechanics", units: 2, semester: "First", registered: false, score: null },
  { id: 6, code: "CSC 307", title: "Database Systems", units: 3, semester: "First", registered: true, score: 92 },
];

const ASSIGNMENTS = [
  { id: 1, course: "CSC 301", title: "Binary Trees Implementation", deadline: "2025-03-15", status: "submitted", marks: 18, total: 20 },
  { id: 2, course: "CSC 303", title: "TCP/IP Protocol Analysis", deadline: "2025-03-18", status: "pending", marks: null, total: 25 },
  { id: 3, course: "MTH 301", title: "Matrix Transformations Problem Set", deadline: "2025-03-12", status: "overdue", marks: null, total: 20 },
  { id: 4, course: "CSC 307", title: "ER Diagram Design Project", deadline: "2025-03-22", status: "submitted", marks: 24, total: 25 },
];

const HOSTELS = [
  { id: 1, name: "Idia Hall", gender: "Female", capacity: 400, occupied: 380, floors: 4 },
  { id: 2, name: "Queen Amina Hall", gender: "Female", capacity: 350, occupied: 290, floors: 3 },
  { id: 3, name: "Zik Hall", gender: "Male", capacity: 500, occupied: 478, floors: 5 },
  { id: 4, name: "Mellanby Hall", gender: "Male", capacity: 450, occupied: 320, floors: 4 },
  { id: 5, name: "Sultan Bello Hall", gender: "Male", capacity: 400, occupied: 399, floors: 4 },
];

const TICKETS = [
  { id: "TKT-2401", category: "Result Issue", description: "Missing score for CSC 201", status: "Open", date: "2025-02-28" },
  { id: "TKT-2398", category: "ID Card", description: "Request for ID card replacement", status: "Resolved", date: "2025-02-10" },
  { id: "TKT-2350", category: "Portal Access", description: "Unable to access exam portal", status: "In Progress", date: "2025-01-22" },
];

const EVENTS = [
  { id: 1, title: "SUG Presidential Debate", date: "2025-03-14", time: "4:00 PM", venue: "Freedom Square", tag: "Political" },
  { id: 2, title: "CSC Faculty Week Hackathon", date: "2025-03-17", time: "9:00 AM", venue: "Engineering Complex", tag: "Academic" },
  { id: 3, title: "Inter-Hall Cultural Festival", date: "2025-03-20", time: "2:00 PM", venue: "Sports Pavilion", tag: "Social" },
  { id: 4, title: "NLNG Scholarship Info Session", date: "2025-03-25", time: "11:00 AM", venue: "Senate Building", tag: "Scholarship" },
];

const MENTORS = [
  { id: 1, name: "Chukwuemeka Eze", cgpa: 4.89, level: 400, hall: "Zik Hall", dept: "Computer Science", available: true },
  { id: 2, name: "Fatima Aliyu", cgpa: 4.92, level: 400, hall: "Idia Hall", dept: "Computer Science", available: true },
];

const gradeToPoint = (score) => {
  if (score >= 70) return 5.0;
  if (score >= 60) return 4.0;
  if (score >= 50) return 3.0;
  if (score >= 45) return 2.0;
  if (score >= 40) return 1.0;
  return 0.0;
};

const gradeToLetter = (score) => {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const login = (userData) => { setUser(userData); setIsLoggedIn(true); };
  const logout = () => { setUser(null); setIsLoggedIn(false); setActiveTab("dashboard"); };

  if (!isLoggedIn) return <LoginPage onLogin={login} />;

  const dm = darkMode;

  return (
    <div className={`min-h-screen font-sans ${dm ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}
      style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 4px; }
        .slide-in { animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity:0; transform: translateX(-10px); } to { opacity:1; transform: translateX(0); } }
        .fade-up { animation: fadeUp 0.4s ease; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .card-hover { transition: all 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.15); }
        .glow { box-shadow: 0 0 20px rgba(99,102,241,0.3); }
      `}</style>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-r flex flex-col`}>
        {/* Logo */}
        <div className={`px-5 py-4 border-b ${dm ? "border-gray-800" : "border-gray-100"} flex items-center gap-3`}>
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
            <img src={logo} alt="UniBadan Portal" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight" style={{fontFamily:"Sora"}}>UniBadan Portal</p>
            <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>Student Hub</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"><X className="w-4 h-4"/></button>
        </div>

        {/* User Badge */}
        <div className={`mx-4 mt-4 p-3 rounded-xl ${dm ? "bg-gray-800" : "bg-indigo-50"} flex items-center gap-3`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {(user || MOCK_USER).avatar}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">{(user || MOCK_USER).name}</p>
            <p className={`text-xs truncate ${dm ? "text-gray-400" : "text-gray-500"}`}>{(user || MOCK_USER).matric_no}</p>
          </div>
          <div className="ml-auto">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${(user||MOCK_USER).cgpa >= 4.5 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {(user||MOCK_USER).cgpa}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {[
            { id:"dashboard", icon: BarChart3, label:"Dashboard" },
            { id:"courses", icon: BookOpen, label:"Courses & Registration" },
            { id:"assignments", icon: ClipboardList, label:"Assignments" },
            { id:"cgpa", icon: TrendingUp, label:"CGPA Tracker" },
            { id:"hostel", icon: Building2, label:"Hostel Module" },
            { id:"tickets", icon: Ticket, label:"Support Tickets" },
            { id:"events", icon: Calendar, label:"Events Feed" },
            { id:"planner", icon: Timer, label:"Study Planner" },
          ].map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : dm ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {activeTab === id && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className={`p-3 border-t ${dm ? "border-gray-800" : "border-gray-100"} space-y-1`}>
          <button onClick={() => setDarkMode(!dm)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${dm ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}`}>
            {dm ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>} {dm ? "Light Mode" : "Dark Mode"}
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* MAIN */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* TOP BAR */}
        <header className={`sticky top-0 z-30 px-4 py-3 ${dm ? "bg-gray-950/90 border-gray-800" : "bg-white/90 border-gray-200"} border-b backdrop-blur-sm flex items-center gap-3`}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold" style={{fontFamily:"Sora"}}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}
            </h1>
            <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>300 Level · 2024/2025 Session</p>
          </div>

          {/* Fee Status */}
          <span className={`hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${(user||MOCK_USER).fees_paid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
            <span className={`w-1.5 h-1.5 rounded-full pulse-dot ${(user||MOCK_USER).fees_paid ? "bg-emerald-500" : "bg-red-500"}`}/>
            {(user||MOCK_USER).fees_paid ? "Fees Paid" : "Fees Unpaid"}
          </span>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className={`relative p-2 rounded-xl ${dm ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/>
            </button>
            {notifOpen && (
              <div className={`absolute right-0 top-full mt-2 w-72 ${dm ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border rounded-2xl shadow-xl p-3 z-50 fade-up`}>
                <p className="font-semibold text-sm mb-2">Notifications</p>
                {[
                  { msg: "Assignment deadline in 2 days: TCP/IP", time: "1h ago", type: "warn" },
                  { msg: "Hostel application status updated", time: "3h ago", type: "info" },
                  { msg: "New event: CSC Faculty Hackathon", time: "1d ago", type: "info" },
                ].map((n, i) => (
                  <div key={i} className={`flex gap-2.5 p-2 rounded-xl mb-1 ${dm ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${n.type === "warn" ? "bg-amber-100" : "bg-indigo-100"}`}>
                      {n.type === "warn" ? <AlertTriangle className="w-4 h-4 text-amber-600"/> : <Bell className="w-4 h-4 text-indigo-600"/>}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{n.msg}</p>
                      <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 lg:p-6 fade-up" key={activeTab}>
          {activeTab === "dashboard" && <DashboardPage dm={dm} user={user||MOCK_USER} />}
          {activeTab === "courses" && <CoursesPage dm={dm} user={user||MOCK_USER} />}
          {activeTab === "assignments" && <AssignmentsPage dm={dm} />}
          {activeTab === "cgpa" && <CGPAPage dm={dm} user={user||MOCK_USER} />}
          {activeTab === "hostel" && <HostelPage dm={dm} user={user||MOCK_USER} />}
          {activeTab === "tickets" && <TicketsPage dm={dm} />}
          {activeTab === "events" && <EventsPage dm={dm} />}
          {activeTab === "planner" && <PlannerPage dm={dm} />}
        </main>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [matric, setMatric] = useState("190404001");
  const [password, setPassword] = useState("password123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true); setError("");
    setTimeout(() => {
      if (matric && password) { onLogin(MOCK_USER); }
      else { setError("Invalid credentials. Please try again."); setLoading(false); }
    }, 1200);
  };

  const handleResetPassword = () => {
    if (!resetEmail.trim()) return;
    setResetLoading(true);
    setTimeout(() => {
      setResetLoading(false);
      setResetSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{fontFamily:"'Outfit', sans-serif", background:"linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');`}</style>

      {/* Left Branding */}
      <div className="hidden lg:flex flex-col justify-between flex-1 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:"radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a855f7 0%, transparent 40%)"}}/>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
              <img src={logo} alt="UniBadan Portal" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-white text-lg" style={{fontFamily:"Sora"}}>UniBadan Portal</p>
              <p className="text-indigo-300 text-sm">Student Academic Hub</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4" style={{fontFamily:"Sora"}}>
            Your Academic Life,<br/><span className="text-indigo-400">Centralized.</span>
          </h2>
          <p className="text-indigo-200 text-base max-w-sm leading-relaxed">
            Manage courses, hostel applications, assignments, CGPA tracking and more — all in one place.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen, label: "Course Registration", desc: "Add/Drop courses" },
            { icon: Building2, label: "Hostel Booking", desc: "Digital QR clearance" },
            { icon: TrendingUp, label: "CGPA Tracker", desc: "5.0 scale calculator" },
            { icon: Award, label: "Scholarship Portal", desc: "MTN, NLNG, Shell" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Icon className="w-5 h-5 text-indigo-400 mb-2" />
              <p className="text-white text-sm font-semibold">{label}</p>
              <p className="text-indigo-300 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-[420px] flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <img src={logo} alt="UniBadan Portal" className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-white text-base" style={{fontFamily:"Sora"}}>UniBadan Portal</p>
          </div>

          {forgotMode ? (
            <>
              <button onClick={() => { setForgotMode(false); setResetSent(false); setResetEmail(""); }} className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs mb-6 transition-colors">
                <ChevronLeft className="w-3 h-3"/> Back to Sign In
              </button>
              <h3 className="text-2xl font-bold text-white mb-1" style={{fontFamily:"Sora"}}>Forgot Password?</h3>
              <p className="text-indigo-300 text-sm mb-8">Enter your matric number or email and we'll send you a reset link.</p>

              {resetSent ? (
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-400"/>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">Reset Link Sent!</p>
                    <p className="text-indigo-300 text-xs leading-relaxed">Check your registered email address for a password reset link. It may take a few minutes to arrive.</p>
                  </div>
                  <button onClick={() => { setForgotMode(false); setResetSent(false); setResetEmail(""); }}
                    className="mt-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all">
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-indigo-300 font-medium block mb-2">MATRIC NUMBER / EMAIL</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400"/>
                      <input value={resetEmail} onChange={e => setResetEmail(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-indigo-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
                        placeholder="e.g. 190404001 or email" />
                    </div>
                  </div>
                  <button onClick={handleResetPassword} disabled={resetLoading || !resetEmail.trim()}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-900/50 disabled:opacity-60 flex items-center justify-center gap-2">
                    {resetLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending...</> : "Send Reset Link"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-white mb-1" style={{fontFamily:"Sora"}}>Welcome back</h3>
              <p className="text-indigo-300 text-sm mb-8">Sign in with your Matric Number</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-indigo-300 font-medium block mb-2">MATRIC NUMBER / EMAIL</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400"/>
                    <input value={matric} onChange={e=>setMatric(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-indigo-400 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
                      placeholder="e.g. 190404001" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-indigo-300 font-medium">PASSWORD</label>
                    <button onClick={() => setForgotMode(true)} className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400"/>
                    <input type={showPass ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-10 pr-10 text-white placeholder-indigo-400 text-sm focus:outline-none focus:border-indigo-400 transition-all"
                      placeholder="••••••••" />
                    <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white">
                      {showPass ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0"/> {error}
                  </div>
                )}

                <button onClick={handleLogin} disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-900/50 disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Signing in...</> : "Sign In to Portal"}
                </button>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                {/* <p className="text-indigo-300 text-xs font-medium mb-2">🔐 Demo Credentials</p>
                <p className="text-white text-xs">Matric: <span className="text-indigo-300">190404001</span></p>
                <p className="text-white text-xs">Password: <span className="text-indigo-300">password123</span></p> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CARD COMPONENT ───────────────────────────────────────────────────────────
function Card({ children, className = "", dm }) {
  return (
    <div className={`rounded-2xl p-4 ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border ${className}`}>
      {children}
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage({ dm, user }) {
  const showScholarship = user.cgpa >= 4.5;
  const showMentorship = user.cgpa < 2.5;

  const statCards = [
    { label: "CGPA", value: user.cgpa, suffix: "/ 5.0", icon: TrendingUp, color: "indigo", trend: "+0.17" },
    { label: "Registered Units", value: "12", suffix: "/ 24", icon: BookOpen, color: "purple", trend: "" },
    { label: "Assignments", value: "2", suffix: "pending", icon: ClipboardList, color: "amber", trend: "" },
    { label: "Support Tickets", value: "1", suffix: "open", icon: Ticket, color: "rose", trend: "" },
  ];

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl p-5 lg:p-6" style={{background:"linear-gradient(135deg, #4f46e5, #7c3aed)"}}>
        <div className="absolute right-0 top-0 w-48 h-48 opacity-10" style={{background:"radial-gradient(circle, white 0%, transparent 70%)"}}/>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-indigo-200 text-sm mb-1">Good morning 👋</p>
            <h2 className="text-xl lg:text-2xl font-bold text-white" style={{fontFamily:"Sora"}}>{user.name}</h2>
            <p className="text-indigo-200 text-sm mt-1">{user.department} · {user.level}L · {user.faculty}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-xl">
              <p className="text-white text-xs font-medium">2024/2025 Session</p>
            </div>
            <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-xl">
              <p className="text-white text-xs font-medium">First Semester</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map(({ label, value, suffix, icon: Icon, color, trend }) => (
          <Card key={label} dm={dm} className="card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                color === "indigo" ? "bg-indigo-100 text-indigo-600" :
                color === "purple" ? "bg-purple-100 text-purple-600" :
                color === "amber" ? "bg-amber-100 text-amber-600" : "bg-rose-100 text-rose-600"
              }`}><Icon className="w-4 h-4"/></div>
              {trend && <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/>{trend}</span>}
            </div>
            <p className={`text-2xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>{value}</p>
            <p className={`text-xs mt-0.5 ${dm ? "text-gray-500" : "text-gray-500"}`}><span className={`font-medium ${dm ? "text-gray-300" : "text-gray-600"}`}>{suffix}</span> {label}</p>
          </Card>
        ))}
      </div>

      {/* Incentive Banners */}
      {showScholarship && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0"><Award className="w-5 h-5 text-amber-600"/></div>
          <div className="flex-1">
            <p className="font-bold text-amber-900 text-sm">🎓 Scholarship Eligible!</p>
            <p className="text-amber-700 text-xs mt-0.5">Your CGPA qualifies you for prestigious scholarships. Apply now!</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["MTN Foundation", "NLNG", "Shell Scholarship"].map(s => (
                <a key={s} href="#" className="text-xs px-2.5 py-1 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 flex items-center gap-1">
                  {s} <ExternalLink className="w-3 h-3"/>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      {showMentorship && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-start gap-3">
          <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"/>
          <div>
            <p className="font-bold text-blue-900 text-sm">Peer Mentorship Available</p>
            <p className="text-blue-700 text-xs mt-0.5">Connect with high-performing students in your hall for academic support.</p>
            <div className="mt-2 space-y-1">
              {MENTORS.map(m => (
                <div key={m.id} className="flex items-center gap-2 text-xs text-blue-800">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot"/>
                  {m.name} — CGPA {m.cgpa} · {m.dept}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CGPA Mini Chart + Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card dm={dm}>
          <p className="font-semibold text-sm mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-500"/> CGPA Trend</p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={CGPA_HISTORY}>
              <defs>
                <linearGradient id="cgpaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dm ? "#374151" : "#f0f0f0"}/>
              <XAxis dataKey="sem" tick={{fontSize:10, fill: dm?"#6b7280":"#9ca3af"}}/>
              <YAxis domain={[3,5]} tick={{fontSize:10, fill: dm?"#6b7280":"#9ca3af"}}/>
              <Tooltip contentStyle={{borderRadius:8, fontSize:12}}/>
              <Area type="monotone" dataKey="cgpa" stroke="#6366f1" fill="url(#cgpaGrad)" strokeWidth={2} dot={{fill:"#6366f1",r:3}}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card dm={dm}>
          <p className="font-semibold text-sm mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-indigo-500"/> Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Register Course", icon: Plus, color: "indigo" },
              { label: "Upload Assignment", icon: Upload, color: "purple" },
              { label: "Apply Hostel", icon: Building2, color: "emerald" },
              { label: "New Ticket", icon: Ticket, color: "amber" },
            ].map(({ label, icon: Icon, color }) => (
              <button key={label} className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all hover:scale-105 ${dm ? "border-gray-700 hover:border-indigo-500 text-gray-300" : "border-gray-200 hover:border-indigo-300 text-gray-700"}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  color === "indigo" ? "bg-indigo-100 text-indigo-600" :
                  color === "purple" ? "bg-purple-100 text-purple-600" :
                  color === "emerald" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                }`}><Icon className="w-3.5 h-3.5"/></div>
                {label}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card dm={dm}>
        <p className="font-semibold text-sm mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-500"/> Upcoming Events</p>
        <div className="space-y-2">
          {EVENTS.slice(0,3).map(ev => (
            <div key={ev.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex flex-col items-center justify-center flex-shrink-0">
                <p className="text-indigo-700 text-xs font-bold leading-none">{ev.date.split("-")[2]}</p>
                <p className="text-indigo-500 text-xs">Mar</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{ev.title}</p>
                <p className={`text-xs truncate ${dm ? "text-gray-500" : "text-gray-400"}`}>{ev.time} · {ev.venue}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                ev.tag === "Academic" ? "bg-blue-100 text-blue-700" :
                ev.tag === "Political" ? "bg-purple-100 text-purple-700" :
                ev.tag === "Scholarship" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
              }`}>{ev.tag}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


// ─── ASSIGNMENTS PAGE ─────────────────────────────────────────────────────────
function AssignmentsPage({ dm }) {
  const [assignments, setAssignments] = useState(ASSIGNMENTS);
  const [uploading, setUploading] = useState(null);

  const handleUpload = (id) => {
    setUploading(id);
    setTimeout(() => {
      setAssignments(as => as.map(a => a.id === id ? { ...a, status: "submitted" } : a));
      setUploading(null);
    }, 1500);
  };

  const statusBadge = (s) => ({
    submitted: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    overdue: "bg-red-100 text-red-600",
  }[s] || "");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {["submitted","pending","overdue"].map(s => (
          <Card key={s} dm={dm} className="text-center">
            <p className="text-2xl font-bold">{assignments.filter(a => a.status === s).length}</p>
            <p className={`text-xs mt-0.5 capitalize ${dm ? "text-gray-400" : "text-gray-500"}`}>{s}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {assignments.map(a => (
          <Card key={a.id} dm={dm} className="card-hover">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.status === "submitted" ? "bg-emerald-100" : a.status === "overdue" ? "bg-red-100" : "bg-amber-100"}`}>
                <FileText className={`w-5 h-5 ${a.status === "submitted" ? "text-emerald-600" : a.status === "overdue" ? "text-red-500" : "text-amber-600"}`}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{a.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 capitalize ${statusBadge(a.status)}`}>{a.status}</span>
                </div>
                <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{a.course}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs flex items-center gap-1 ${dm ? "text-gray-400" : "text-gray-500"}`}>
                    <Clock className="w-3 h-3"/> Due: {a.deadline}
                  </span>
                  {a.marks !== null && (
                    <span className="text-xs font-semibold text-indigo-600">{a.marks}/{a.total} pts</span>
                  )}
                </div>
                {a.status !== "submitted" && (
                  <button onClick={() => handleUpload(a.id)} disabled={uploading === a.id}
                    className="mt-2 flex items-center gap-1.5 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-60">
                    {uploading === a.id ? <><span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"/>Uploading...</> : <><Upload className="w-3 h-3"/> Upload PDF</>}
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── CGPA PAGE ────────────────────────────────────────────────────────────────
function CGPAPage({ dm, user }) {
  const [whatIfScores, setWhatIfScores] = useState({});
  const regCourses = COURSES.filter(c => c.registered && c.score !== null);

  const calcCGPA = (scores) => {
    let totalPoints = 0, totalUnits = 0;
    regCourses.forEach(c => {
      const score = scores[c.id] !== undefined ? scores[c.id] : c.score;
      totalPoints += gradeToPoint(score) * c.units;
      totalUnits += c.units;
    });
    return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "0.00";
  };

  const currentCGPA = parseFloat(calcCGPA({}));
  const whatIfCGPA = parseFloat(calcCGPA(whatIfScores));
  const diff = (whatIfCGPA - currentCGPA).toFixed(2);

  return (
    <div className="space-y-4">
      {/* CGPA Display */}
      <div className="relative overflow-hidden rounded-2xl p-6" style={{background:"linear-gradient(135deg, #4f46e5, #7c3aed)"}}>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 80% 50%, white 0%, transparent 50%)"}}/>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-indigo-200 text-sm">Current CGPA</p>
            <p className="text-5xl font-bold text-white mt-1" style={{fontFamily:"Sora"}}>{user.cgpa}</p>
            <p className="text-indigo-200 text-sm mt-1">on a 5.0 scale · 300 Level</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold ${user.cgpa >= 4.5 ? "bg-emerald-400/30 text-emerald-200" : user.cgpa >= 3.5 ? "bg-blue-400/30 text-blue-200" : "bg-amber-400/30 text-amber-200"}`}>
              <Award className="w-4 h-4"/>
              {user.cgpa >= 4.5 ? "First Class" : user.cgpa >= 3.5 ? "Second Class Upper" : "Second Class Lower"}
            </div>
            <p className="text-indigo-200 text-xs mt-2">Keep it up! 🎯</p>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <Card dm={dm}>
        <p className="font-semibold text-sm mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-indigo-500"/> CGPA Progression</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={CGPA_HISTORY}>
            <CartesianGrid strokeDasharray="3 3" stroke={dm ? "#374151" : "#f0f0f0"}/>
            <XAxis dataKey="sem" tick={{fontSize:10, fill: dm?"#6b7280":"#9ca3af"}}/>
            <YAxis domain={[3,5]} tick={{fontSize:10, fill: dm?"#6b7280":"#9ca3af"}}/>
            <Tooltip contentStyle={{borderRadius:8, fontSize:12}}/>
            <Line type="monotone" dataKey="cgpa" stroke="#6366f1" strokeWidth={2.5} dot={{fill:"#6366f1",r:4}} activeDot={{r:6}}/>
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* What-If Calculator */}
      <Card dm={dm}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-indigo-500"/>
          <p className="font-semibold text-sm">What-If Calculator</p>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Simulated</span>
        </div>
        <div className="space-y-2 mb-4">
          {regCourses.map(c => (
            <div key={c.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className="flex-1">
                <p className="text-xs font-semibold">{c.code}</p>
                <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{c.units} units</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${c.score >= 70 ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{c.score}%</span>
                <span className="text-gray-400 text-xs">→</span>
                <input type="number" min="0" max="100"
                  value={whatIfScores[c.id] !== undefined ? whatIfScores[c.id] : c.score}
                  onChange={e => setWhatIfScores(s => ({ ...s, [c.id]: parseInt(e.target.value) || 0 }))}
                  className={`w-14 text-xs text-center py-1 px-2 rounded-lg border font-semibold focus:outline-none focus:border-indigo-400 ${dm ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-800"}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`p-3 rounded-xl ${dm ? "bg-gray-800" : "bg-indigo-50"} flex items-center justify-between`}>
          <div>
            <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>Simulated CGPA</p>
            <p className="text-2xl font-bold text-indigo-600">{whatIfCGPA}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>Change</p>
            <p className={`text-lg font-bold ${parseFloat(diff) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {parseFloat(diff) >= 0 ? "+" : ""}{diff}
            </p>
          </div>
        </div>
      </Card>

      {/* Grade Breakdown */}
      <Card dm={dm}>
        <p className="font-semibold text-sm mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-indigo-500"/> Grade Breakdown</p>
        <div className="space-y-2">
          {regCourses.map(c => (
            <div key={c.id} className="flex items-center gap-3">
              <p className="text-xs font-medium w-20 flex-shrink-0">{c.code}</p>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${c.score >= 70 ? "bg-emerald-500" : c.score >= 60 ? "bg-blue-500" : c.score >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{width: `${c.score}%`}}/>
              </div>
              <span className="text-xs font-bold w-8 text-right">{c.score}%</span>
              <span className={`text-xs font-bold w-4 ${c.score >= 70 ? "text-emerald-600" : c.score >= 60 ? "text-blue-600" : "text-amber-600"}`}>{gradeToLetter(c.score)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── HOSTEL PAGE ──────────────────────────────────────────────────────────────
function HostelPage({ dm, user }) {
  const [step, setStep] = useState("select"); // select | confirm | approved
  const [selected, setSelected] = useState(null);
  const [applying, setApplying] = useState(false);

  const eligible = HOSTELS.filter(h => h.gender === user.gender || (h.gender === "Female" && user.gender === "Female") || (h.gender === "Male" && user.gender === "Male"));
  // Show all for demo
  const available = HOSTELS.filter(h => h.occupied < h.capacity);

  const apply = () => {
    setApplying(true);
    setTimeout(() => { setApplying(false); setStep("approved"); }, 2000);
  };

  if (step === "approved") {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <BadgeCheck className="w-8 h-8"/>
          </div>
          <p className="text-xl font-bold mb-1" style={{fontFamily:"Sora"}}>Application Approved!</p>
          <p className="text-emerald-100 text-sm">Your hostel allocation has been confirmed</p>
        </div>

        <Card dm={dm}>
          <p className="font-semibold text-sm mb-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-indigo-500"/> Hostel Clearance Details</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Hall", value: selected?.name || "Idia Hall" },
              { label: "Room", value: "B204" },
              { label: "Bunk", value: "Top Bunk" },
              { label: "Floor", value: "2nd Floor" },
              { label: "Session", value: "2024/2025" },
              { label: "Status", value: "Cleared ✅" },
            ].map(({ label, value }) => (
              <div key={label} className={`p-3 rounded-xl ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
                <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{label}</p>
                <p className="text-sm font-semibold mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* QR Code Placeholder */}
          <div className={`p-6 rounded-xl border-2 border-dashed ${dm ? "border-gray-700" : "border-gray-200"} flex flex-col items-center gap-3`}>
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <div className="w-28 h-28 bg-white rounded-lg p-2">
                <div className="w-full h-full grid grid-cols-7 gap-0.5">
                  {Array.from({length:49}).map((_,i) => (
                    <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-gray-900" : "bg-transparent"}`}/>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm flex items-center gap-2 justify-center"><QrCode className="w-4 h-4 text-indigo-500"/> Digital Hostel Clearance QR</p>
              <p className={`text-xs mt-1 ${dm ? "text-gray-400" : "text-gray-500"}`}>Show this to the hostel warden at check-in</p>
              <p className="text-xs text-indigo-600 font-medium mt-1">TKN-{Math.random().toString(36).substring(2,10).toUpperCase()}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (step === "confirm" && selected) {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("select")} className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
          <ChevronLeft className="w-4 h-4"/> Back to halls
        </button>
        <Card dm={dm}>
          <p className="font-semibold text-sm mb-4">Confirm Application</p>
          <div className="space-y-3">
            {[
              { label: "Applicant", value: user.name },
              { label: "Matric No.", value: user.matric_no },
              { label: "Gender", value: user.gender },
              { label: "Level", value: `${user.level}L` },
              { label: "Selected Hall", value: selected.name },
              { label: "Availability", value: `${selected.capacity - selected.occupied} beds left` },
            ].map(({ label, value }) => (
              <div key={label} className={`flex justify-between p-3 rounded-xl ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
                <p className={`text-sm ${dm ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className={`mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800`}>
            ℹ️ Room and bunk assignment will be done automatically after warden approval. You'll receive your Digital QR clearance code once approved.
          </div>
          <button onClick={apply} disabled={applying} className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
            {applying ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Processing...</> : "Submit Application"}
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card dm={dm}>
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-indigo-500"/>
          <p className="font-semibold text-sm">Hostel Application</p>
        </div>
        <p className={`text-xs mb-4 ${dm ? "text-gray-400" : "text-gray-500"}`}>Select your preferred hall. Room/bunk is auto-assigned after warden approval.</p>
        <div className="flex gap-2 text-xs mb-4">
          {["All Halls", "Available", user.gender].map(f => (
            <span key={f} className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-medium">{f}</span>
          ))}
        </div>
        <div className="space-y-3">
          {HOSTELS.map(h => {
            const pct = Math.round((h.occupied / h.capacity) * 100);
            const full = h.occupied >= h.capacity;
            return (
              <div key={h.id} className={`p-4 rounded-xl border transition-all ${selected?.id === h.id ? "border-indigo-500 bg-indigo-50" : dm ? "border-gray-800 hover:border-gray-700" : "border-gray-200 hover:border-gray-300"} ${full ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{h.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${h.gender === "Female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}>{h.gender}</span>
                      <span className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{h.floors} floors</span>
                      {full && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Full</span>}
                    </div>
                  </div>
                  {!full && (
                    <button onClick={() => { setSelected(h); setStep("confirm"); }}
                      className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">Apply</button>
                  )}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={dm ? "text-gray-400" : "text-gray-500"}>{h.occupied}/{h.capacity} occupied</span>
                    <span className={pct >= 90 ? "text-red-500" : pct >= 70 ? "text-amber-500" : "text-emerald-500"}>{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-emerald-500"}`} style={{width:`${pct}%`}}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ─── TICKETS PAGE ─────────────────────────────────────────────────────────────
function TicketsPage({ dm }) {
  const [tickets, setTickets] = useState(TICKETS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: "Result Issue", description: "" });

  const submit = () => {
    if (!form.description.trim()) return;
    const id = `TKT-${Math.floor(2400 + Math.random()*100)}`;
    setTickets(t => [{ id, category: form.category, description: form.description, status: "Open", date: new Date().toISOString().split("T")[0] }, ...t]);
    setForm({ category: "Result Issue", description: "" });
    setShowForm(false);
  };

  const statusColor = { Open: "bg-amber-100 text-amber-700", Resolved: "bg-emerald-100 text-emerald-700", "In Progress": "bg-blue-100 text-blue-700" };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Support Tickets</p>
          <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{tickets.filter(t => t.status === "Open").length} open tickets</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 text-sm px-3 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">
          <Plus className="w-4 h-4"/> New Ticket
        </button>
      </div>

      {showForm && (
        <Card dm={dm} className="border-indigo-200">
          <p className="font-semibold text-sm mb-3">Open New Ticket</p>
          <div className="space-y-3">
            <div>
              <label className={`text-xs font-medium block mb-1 ${dm ? "text-gray-400" : "text-gray-600"}`}>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                className={`w-full text-sm p-2.5 rounded-xl border focus:outline-none focus:border-indigo-400 ${dm ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`}>
                {["Result Issue", "ID Card", "Portal Access", "Hostel Complaint", "Bursary", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-medium block mb-1 ${dm ? "text-gray-400" : "text-gray-600"}`}>Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                placeholder="Describe your issue in detail..."
                className={`w-full text-sm p-2.5 rounded-xl border focus:outline-none focus:border-indigo-400 resize-none ${dm ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-200"}`}/>
            </div>
            <div className="flex gap-2">
              <button onClick={submit} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700">Submit Ticket</button>
              <button onClick={() => setShowForm(false)} className={`px-4 py-2 rounded-xl text-sm font-medium ${dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>Cancel</button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {tickets.map(t => (
          <Card key={t.id} dm={dm} className="card-hover">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.status === "Resolved" ? "bg-emerald-100" : t.status === "In Progress" ? "bg-blue-100" : "bg-amber-100"}`}>
                <MessageSquare className={`w-5 h-5 ${t.status === "Resolved" ? "text-emerald-600" : t.status === "In Progress" ? "text-blue-600" : "text-amber-600"}`}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-indigo-600">{t.id}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[t.status]}`}>{t.status}</span>
                </div>
                <p className="text-sm font-semibold mt-0.5">{t.category}</p>
                <p className={`text-xs mt-0.5 ${dm ? "text-gray-400" : "text-gray-500"}`}>{t.description}</p>
                <p className={`text-xs mt-1 ${dm ? "text-gray-500" : "text-gray-400"}`}>{t.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── EVENTS PAGE ──────────────────────────────────────────────────────────────
function EventsPage({ dm }) {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Academic", "Political", "Social", "Scholarship"];
  const filtered = filter === "All" ? EVENTS : EVENTS.filter(e => e.tag === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tags.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`text-xs px-3 py-1.5 rounded-xl font-medium flex-shrink-0 transition-all ${filter === t ? "bg-indigo-600 text-white" : dm ? "bg-gray-800 text-gray-400" : "bg-white border border-gray-200 text-gray-600"}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(ev => (
          <Card key={ev.id} dm={dm} className="card-hover">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center flex-shrink-0 text-white">
                <p className="text-sm font-bold leading-none">{ev.date.split("-")[2]}</p>
                <p className="text-xs opacity-80">Mar</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{ev.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    ev.tag === "Academic" ? "bg-blue-100 text-blue-700" :
                    ev.tag === "Political" ? "bg-purple-100 text-purple-700" :
                    ev.tag === "Scholarship" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                  }`}>{ev.tag}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs flex items-center gap-1 ${dm ? "text-gray-400" : "text-gray-500"}`}><Clock className="w-3 h-3"/> {ev.time}</span>
                  <span className={`text-xs flex items-center gap-1 ${dm ? "text-gray-400" : "text-gray-500"}`}><MapPin className="w-3 h-3"/> {ev.venue}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── PLANNER PAGE (POMODORO) ──────────────────────────────────────────────────
function PlannerPage({ dm }) {
  const [mode, setMode] = useState("focus"); // focus | break
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [tasks, setTasks] = useState([
    { id:1, text:"Review CSC 301 lecture notes", done: false },
    { id:2, text:"Complete TCP/IP assignment", done: false },
    { id:3, text:"Read MTH 301 Chapter 7", done: true },
  ]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(s => {
        if (s === 0) {
          setMinutes(m => {
            if (m === 0) {
              setRunning(false);
              if (mode === "focus") { setSessions(s => s + 1); setMode("break"); setMinutes(5); }
              else { setMode("focus"); setMinutes(25); }
              return mode === "focus" ? 5 : 25;
            }
            return m - 1;
          });
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const reset = () => { setRunning(false); setMinutes(mode === "focus" ? 25 : 5); setSeconds(0); };
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(t => [...t, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  const totalSec = mode === "focus" ? 25*60 : 5*60;
  const elapsed = totalSec - (minutes*60 + seconds);
  const pct = Math.round((elapsed / totalSec) * 100);

  return (
    <div className="space-y-4">
      {/* Pomodoro Timer */}
      <Card dm={dm}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-sm flex items-center gap-2"><Timer className="w-4 h-4 text-indigo-500"/> Focus Mode</p>
          <div className="flex gap-1">
            {["focus","break"].map(m => (
              <button key={m} onClick={() => { setMode(m); setRunning(false); setMinutes(m === "focus" ? 25 : 5); setSeconds(0); }}
                className={`text-xs px-2.5 py-1 rounded-lg capitalize font-medium ${mode === m ? "bg-indigo-600 text-white" : dm ? "text-gray-400" : "text-gray-500"}`}>{m}</button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center py-4">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke={dm?"#374151":"#f3f4f6"} strokeWidth="8"/>
              <circle cx="60" cy="60" r="54" fill="none" stroke={mode === "focus" ? "#6366f1" : "#10b981"} strokeWidth="8"
                strokeLinecap="round" strokeDasharray={`${2*Math.PI*54}`} strokeDashoffset={`${2*Math.PI*54*(1-pct/100)}`}
                style={{transition:"stroke-dashoffset 1s linear"}}/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold" style={{fontFamily:"Sora"}}>{String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}</p>
              <p className={`text-xs capitalize mt-0.5 ${mode === "focus" ? "text-indigo-500" : "text-emerald-500"}`}>{mode}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setRunning(r => !r)} className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 min-w-[80px]">
              {running ? "Pause" : "Start"}
            </button>
            <button onClick={reset} className={`px-4 py-2 rounded-xl text-sm font-medium ${dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>Reset</button>
          </div>
          <div className="flex items-center gap-2 mt-3">
            {Array.from({length:4}).map((_,i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < sessions % 4 ? "bg-indigo-500" : dm ? "bg-gray-700" : "bg-gray-200"}`}/>
            ))}
            <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{sessions} sessions today</p>
          </div>
        </div>
      </Card>

      {/* Task List */}
      <Card dm={dm}>
        <p className="font-semibold text-sm mb-3 flex items-center gap-2"><BookMarked className="w-4 h-4 text-indigo-500"/> Study Tasks</p>
        <div className="flex gap-2 mb-3">
          <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Add a study task..."
            className={`flex-1 text-sm p-2.5 rounded-xl border focus:outline-none focus:border-indigo-400 ${dm ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-200"}`}/>
          <button onClick={addTask} className="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"><Plus className="w-4 h-4"/></button>
        </div>
        <div className="space-y-2">
          {tasks.map(t => (
            <div key={t.id} onClick={() => setTasks(ts => ts.map(x => x.id === t.id ? {...x, done: !x.done} : x))}
              className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${dm ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${t.done ? "bg-indigo-600 border-indigo-600" : dm ? "border-gray-600" : "border-gray-300"}`}>
                {t.done && <CheckCircle className="w-3 h-3 text-white"/>}
              </div>
              <p className={`text-sm flex-1 ${t.done ? "line-through text-gray-400" : ""}`}>{t.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}