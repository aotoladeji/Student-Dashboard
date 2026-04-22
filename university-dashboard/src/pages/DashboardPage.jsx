import {
  ArrowUpRight,
  Award,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  ClipboardList,
  ExternalLink,
  Ticket,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../components/common/Card";
import { CGPA_HISTORY, EVENTS, MENTORS } from "../data/mockData";

export default function DashboardPage({ dm, user }) {
  const showScholarship = user.cgpa >= 6.3;
  const showMentorship = user.cgpa < 3.5;

  const statCards = [
    { label: "CGPA", value: user.cgpa, suffix: "/ 7.0", icon: TrendingUp, color: "indigo", trend: "+0.17" },
    { label: "Registered Units", value: "12", suffix: "/ 24", icon: BookOpen, color: "purple", trend: "" },
    { label: "Assignments", value: "2", suffix: "pending", icon: ClipboardList, color: "amber", trend: "" },
    { label: "Support Tickets", value: "1", suffix: "open", icon: Ticket, color: "rose", trend: "" },
  ];

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl p-5 lg:p-6" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
        <div className="absolute right-0 top-0 h-48 w-48 opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="mb-1 text-sm text-indigo-200">Good morning 👋</p>
            <h2 className="text-xl font-bold text-white lg:text-2xl" style={{ fontFamily: "Sora" }}>{user.name}</h2>
            <p className="mt-1 text-sm text-indigo-200">{user.department} · {user.level}L · {user.faculty}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="rounded-xl bg-white/20 px-3 py-1.5 backdrop-blur">
              <p className="text-xs font-medium text-white">2024/2025 Session</p>
            </div>
            <div className="rounded-xl bg-white/20 px-3 py-1.5 backdrop-blur">
              <p className="text-xs font-medium text-white">First Semester</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map(({ label, value, suffix, icon, color, trend }) => {
          const StatIcon = icon;

          return (
            <Card key={label} dm={dm} className="card-hover">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  color === "indigo"
                    ? "bg-indigo-100 text-indigo-600"
                    : color === "purple"
                      ? "bg-purple-100 text-purple-600"
                      : color === "amber"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-rose-100 text-rose-600"
                }`}>
                  <StatIcon className="h-4 w-4" />
                </div>
                {trend && (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
                    {trend}
                  </span>
                )}
              </div>
              <p className={`text-2xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>{value}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                <span className={`font-medium ${dm ? "text-gray-300" : "text-gray-600"}`}>{suffix}</span>
                {" "}
                {label}
              </p>
            </Card>
          );
        })}
      </div>

      {showScholarship && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
            <Award className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-900">🎓 Scholarship Eligible!</p>
            <p className="mt-0.5 text-xs text-amber-700">Your CGPA qualifies you for prestigious scholarships. Apply now!</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "MTN Foundation",
                "NLNG",
                "Shell Scholarship",
              ].map((scholarship) => (
                <a key={scholarship} href="#" className="flex items-center gap-1 rounded-lg bg-amber-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-amber-700">
                  {scholarship}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {showMentorship && (
        <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="text-sm font-bold text-blue-900">Peer Mentorship Available</p>
            <p className="mt-0.5 text-xs text-blue-700">Connect with high-performing students in your hall for academic support.</p>
            <div className="mt-2 space-y-1">
              {MENTORS.map((mentor) => (
                <div key={mentor.id} className="flex items-center gap-2 text-xs text-blue-800">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" />
                  {mentor.name} — CGPA {mentor.cgpa} · {mentor.dept}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card dm={dm}>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            CGPA Trend
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={CGPA_HISTORY}>
              <defs>
                <linearGradient id="cgpaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dm ? "#374151" : "#f0f0f0"} />
              <XAxis dataKey="sem" tick={{ fontSize: 10, fill: dm ? "#6b7280" : "#9ca3af" }} />
              <YAxis domain={[0, 7]} tick={{ fontSize: 10, fill: dm ? "#6b7280" : "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="cgpa" stroke="#6366f1" fill="url(#cgpaGrad)" strokeWidth={2} dot={{ fill: "#6366f1", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card dm={dm}>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Zap className="h-4 w-4 text-indigo-500" />
            Quick Actions
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Register Course", icon: BookOpen, color: "indigo" },
              { label: "Upload Assignment", icon: Upload, color: "purple" },
              { label: "Apply Hostel", icon: Building2, color: "emerald" },
              { label: "New Ticket", icon: Ticket, color: "amber" },
            ].map(({ label, icon, color }) => {
              const ActionIcon = icon;

              return (
                <button
                  key={label}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all hover:scale-105 ${dm ? "border-gray-700 text-gray-300 hover:border-indigo-500" : "border-gray-200 text-gray-700 hover:border-indigo-300"}`}
                >
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    color === "indigo"
                      ? "bg-indigo-100 text-indigo-600"
                      : color === "purple"
                        ? "bg-purple-100 text-purple-600"
                        : color === "emerald"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600"
                  }`}>
                    <ActionIcon className="h-3.5 w-3.5" />
                  </div>
                  {label}
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      <Card dm={dm}>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Calendar className="h-4 w-4 text-indigo-500" />
          Upcoming Events
        </p>
        <div className="space-y-2">
          {EVENTS.slice(0, 3).map((event) => (
            <div key={event.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-indigo-100">
                <p className="text-xs font-bold leading-none text-indigo-700">{event.date.split("-")[2]}</p>
                <p className="text-xs text-indigo-500">Mar</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{event.title}</p>
                <p className={`truncate text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{event.time} · {event.venue}</p>
              </div>
              <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                event.tag === "Academic"
                  ? "bg-blue-100 text-blue-700"
                  : event.tag === "Political"
                    ? "bg-purple-100 text-purple-700"
                    : event.tag === "Scholarship"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
              }`}>
                {event.tag}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}