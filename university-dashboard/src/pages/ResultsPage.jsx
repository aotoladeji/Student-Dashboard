import { Award, BookOpen, CheckCircle, ChevronDown, ChevronUp, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import Card from "../components/common/Card";
import { SEMESTER_RESULTS } from "../data/mockData";
import { gradeToLetter, gradeToPoint } from "../utils/grades";

const gradeColor = (score) => {
  if (score >= 70) return { bg: "bg-emerald-100", text: "text-emerald-700", dark: "bg-emerald-900/40 text-emerald-300" };
  if (score >= 60) return { bg: "bg-blue-100", text: "text-blue-700", dark: "bg-blue-900/40 text-blue-300" };
  if (score >= 50) return { bg: "bg-indigo-100", text: "text-indigo-700", dark: "bg-indigo-900/40 text-indigo-300" };
  if (score >= 45) return { bg: "bg-amber-100", text: "text-amber-700", dark: "bg-amber-900/40 text-amber-300" };
  if (score >= 40) return { bg: "bg-orange-100", text: "text-orange-700", dark: "bg-orange-900/40 text-orange-300" };
  return { bg: "bg-red-100", text: "text-red-700", dark: "bg-red-900/40 text-red-300" };
};

const calcSemGPA = (courses) => {
  let totalPoints = 0;
  let totalUnits = 0;
  courses.forEach(({ score, units }) => {
    totalPoints += gradeToPoint(score) * units;
    totalUnits += units;
  });
  return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "0.00";
};

function SemesterCard({ semester, dm, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const gpa = calcSemGPA(semester.courses);
  const totalUnits = semester.courses.reduce((s, c) => s + c.units, 0);
  const totalPoints = semester.courses.reduce((s, c) => s + gradeToPoint(c.score) * c.units, 0);
  const failed = semester.courses.filter((c) => c.score < 40);

  const gpaNum = parseFloat(gpa);
  const gpaGradient =
    gpaNum >= 6.0
      ? "linear-gradient(135deg, #059669, #10b981)"
      : gpaNum >= 5.0
        ? "linear-gradient(135deg, #2563eb, #4f46e5)"
        : gpaNum >= 4.0
          ? "linear-gradient(135deg, #d97706, #f59e0b)"
          : "linear-gradient(135deg, #dc2626, #ef4444)";

  return (
    <div className={`rounded-2xl overflow-hidden border ${dm ? "border-gray-700" : "border-gray-200"}`}>
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between p-4 transition-colors ${dm ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-bold" style={{ background: gpaGradient }}>
            {gpa}
          </div>
          <div className="text-left">
            <p className={`font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{semester.label}</p>
            <p className="text-xs text-gray-500">
              {semester.session} · {totalUnits} units · {semester.courses.length} courses
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {failed.length > 0 && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
              {failed.length} failed
            </span>
          )}
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${semester.status === "released" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {semester.status === "released" ? "Released" : "Pending"}
          </span>
          {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </div>
      </button>

      {/* Course rows */}
      {open && (
        <div className={`divide-y ${dm ? "divide-gray-700 bg-gray-900" : "divide-gray-100 bg-gray-50"}`}>
          {/* Table header */}
          <div className={`grid grid-cols-12 gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide ${dm ? "text-gray-400" : "text-gray-500"}`}>
            <span className="col-span-2">Code</span>
            <span className="col-span-4">Course Title</span>
            <span className="col-span-1 text-center">Units</span>
            <span className="col-span-1 text-center">CA</span>
            <span className="col-span-1 text-center">Exam</span>
            <span className="col-span-1 text-center">Total</span>
            <span className="col-span-1 text-center">Grade</span>
            <span className="col-span-1 text-center">Points</span>
          </div>

          {semester.courses.map((course) => {
            const colors = gradeColor(course.score);
            return (
              <div key={course.code} className={`grid grid-cols-12 gap-2 px-4 py-3 text-sm items-center ${dm ? "hover:bg-gray-800" : "hover:bg-white"} transition-colors`}>
                <span className={`col-span-2 font-mono font-semibold text-xs ${dm ? "text-indigo-300" : "text-indigo-600"}`}>{course.code}</span>
                <span className={`col-span-4 ${dm ? "text-gray-200" : "text-gray-800"}`}>{course.title}</span>
                <span className={`col-span-1 text-center font-medium ${dm ? "text-gray-300" : "text-gray-700"}`}>{course.units}</span>
                <span className={`col-span-1 text-center ${dm ? "text-gray-400" : "text-gray-500"}`}>{course.ca}</span>
                <span className={`col-span-1 text-center ${dm ? "text-gray-400" : "text-gray-500"}`}>{course.exam}</span>
                <span className={`col-span-1 text-center font-bold ${dm ? "text-white" : "text-gray-900"}`}>{course.score}</span>
                <span className={`col-span-1 text-center`}>
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${dm ? colors.dark : `${colors.bg} ${colors.text}`}`}>
                    {gradeToLetter(course.score)}
                  </span>
                </span>
                <span className={`col-span-1 text-center font-medium ${dm ? "text-gray-300" : "text-gray-700"}`}>{gradeToPoint(course.score).toFixed(1)}</span>
              </div>
            );
          })}

          {/* Semester summary row */}
          <div className={`flex items-center justify-between px-4 py-3 text-sm font-semibold ${dm ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}`}>
            <span>Semester Summary</span>
            <div className="flex gap-6 text-right">
              <div>
                <span className="block text-xs font-normal text-gray-500">Total Units</span>
                <span>{totalUnits}</span>
              </div>
              <div>
                <span className="block text-xs font-normal text-gray-500">Credit Points</span>
                <span>{totalPoints.toFixed(1)}</span>
              </div>
              <div>
                <span className="block text-xs font-normal text-gray-500">GPA</span>
                <span className="text-indigo-500">{gpa}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage({ dm, user }) {
  const [activeSem, setActiveSem] = useState("all");

  const releasedSemesters = SEMESTER_RESULTS.filter((s) => s.status === "released");
  const allCourses = releasedSemesters.flatMap((s) => s.courses);
  const overallGPA = calcSemGPA(allCourses);
  const totalUnits = allCourses.reduce((s, c) => s + c.units, 0);
  const highestScore = Math.max(...allCourses.map((c) => c.score));
  const passedAll = allCourses.every((c) => c.score >= 40);

  const displayed = activeSem === "all" ? SEMESTER_RESULTS : SEMESTER_RESULTS.filter((s) => s.id === activeSem);

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)" }} />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-indigo-200">Cumulative GPA</p>
            <p className="mt-1 text-5xl font-bold text-white" style={{ fontFamily: "Sora" }}>{overallGPA}</p>
            <p className="mt-1 text-sm text-indigo-200">{user?.name ?? "Student"} · {user?.level ?? 300}L · {user?.department ?? "Computer Science"}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold ${parseFloat(overallGPA) >= 6.3 ? "bg-emerald-400/30 text-emerald-200" : parseFloat(overallGPA) >= 4.9 ? "bg-blue-400/30 text-blue-200" : "bg-amber-400/30 text-amber-200"}`}>
              <Award className="h-4 w-4" />
              {parseFloat(overallGPA) >= 6.3 ? "First Class" : parseFloat(overallGPA) >= 4.9 ? "Second Class Upper" : "Second Class Lower"}
            </div>
            <p className="text-xs text-indigo-200">{releasedSemesters.length} semesters released</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: BookOpen, label: "Total Units", value: totalUnits, color: "indigo" },
          { icon: TrendingUp, label: "Cumulative GPA", value: overallGPA, color: "emerald" },
          { icon: Award, label: "Highest Score", value: `${highestScore}%`, color: "violet" },
          { icon: passedAll ? CheckCircle : Clock, label: "Standing", value: passedAll ? "Good" : "Bad", color: passedAll ? "emerald" : "red" },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} dm={dm} className="py-3">
            <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-${color}-100`}>
              <Icon className={`h-5 w-5 text-${color}-600`} />
            </div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`mt-0.5 text-lg font-bold ${dm ? "text-white" : "text-gray-900"}`}>{value}</p>
          </Card>
        ))}
      </div>

      {/* Semester filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSem("all")}
          className={`rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors ${activeSem === "all" ? "bg-indigo-600 text-white" : dm ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
        >
          All Semesters
        </button>
        {SEMESTER_RESULTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSem(s.id)}
            className={`rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors ${activeSem === s.id ? "bg-indigo-600 text-white" : dm ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
          >
            {s.id}
          </button>
        ))}
      </div>

      {/* Semester result cards */}
      <div className="space-y-3">
        {displayed.map((sem, i) => (
          <SemesterCard key={sem.id} semester={sem} dm={dm} defaultOpen={i === 0} />
        ))}
      </div>

      {/* Grade legend */}
      <Card dm={dm}>
        <p className={`mb-3 text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>Grade Scale</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { range: "70–100", grade: "A", point: "7.0", bg: "bg-emerald-100", text: "text-emerald-700" },
            { range: "60–69", grade: "B", point: "6.0", bg: "bg-blue-100", text: "text-blue-700" },
            { range: "50–59", grade: "C", point: "5.0", bg: "bg-indigo-100", text: "text-indigo-700" },
            { range: "45–49", grade: "D", point: "4.0", bg: "bg-amber-100", text: "text-amber-700" },
            { range: "40–44", grade: "E", point: "3.0", bg: "bg-orange-100", text: "text-orange-700" },
            { range: "0–39", grade: "F", point: "0.0", bg: "bg-red-100", text: "text-red-700" },
          ].map(({ range, grade, point, bg, text }) => (
            <div key={grade} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 ${bg}`}>
              <span className={`font-bold ${text}`}>{grade}</span>
              <span className={`text-gray-500`}>({range}) · {point}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
