import { Award, BarChart3, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../components/common/Card";
import { CGPA_HISTORY, COURSES } from "../data/mockData";
import { gradeToLetter, gradeToPoint } from "../utils/grades";

export default function CGPAPage({ dm, user }) {
  const [whatIfScores, setWhatIfScores] = useState({});
  const registeredCourses = COURSES.filter((course) => course.registered && course.score !== null);

  const calcCGPA = (scores) => {
    let totalPoints = 0;
    let totalUnits = 0;

    registeredCourses.forEach((course) => {
      const score = scores[course.id] !== undefined ? scores[course.id] : course.score;
      totalPoints += gradeToPoint(score) * course.units;
      totalUnits += course.units;
    });

    return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "0.00";
  };

  const currentCGPA = parseFloat(calcCGPA({}));
  const whatIfCGPA = parseFloat(calcCGPA(whatIfScores));
  const diff = (whatIfCGPA - currentCGPA).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)" }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-200">Current CGPA</p>
            <p className="mt-1 text-5xl font-bold text-white" style={{ fontFamily: "Sora" }}>{user.cgpa}</p>
            <p className="mt-1 text-sm text-indigo-200">on a 7.0 scale · 300 Level</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold ${user.cgpa >= 6.3 ? "bg-emerald-400/30 text-emerald-200" : user.cgpa >= 4.9 ? "bg-blue-400/30 text-blue-200" : "bg-amber-400/30 text-amber-200"}`}>
              <Award className="h-4 w-4" />
              {user.cgpa >= 6.3 ? "First Class" : user.cgpa >= 4.9 ? "Second Class Upper" : "Second Class Lower"}
            </div>
            <p className="mt-2 text-xs text-indigo-200">Keep it up! 🎯</p>
          </div>
        </div>
      </div>

      <Card dm={dm}>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          CGPA Progression
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={CGPA_HISTORY}>
            <CartesianGrid strokeDasharray="3 3" stroke={dm ? "#374151" : "#f0f0f0"} />
            <XAxis dataKey="sem" tick={{ fontSize: 10, fill: dm ? "#6b7280" : "#9ca3af" }} />
            <YAxis domain={[0, 7]} tick={{ fontSize: 10, fill: dm ? "#6b7280" : "#9ca3af" }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="cgpa" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card dm={dm}>
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-4 w-4 text-indigo-500" />
          <p className="text-sm font-semibold">What-If Calculator</p>
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">Simulated</span>
        </div>
        <div className="mb-4 space-y-2">
          {registeredCourses.map((course) => (
            <div key={course.id} className={`flex items-center gap-3 rounded-xl p-2.5 ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className="flex-1">
                <p className="text-xs font-semibold">{course.code}</p>
                <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{course.units} units</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded px-2 py-0.5 text-xs font-bold ${course.score >= 70 ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{course.score}%</span>
                <span className="text-xs text-gray-400">→</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={whatIfScores[course.id] !== undefined ? whatIfScores[course.id] : course.score}
                  onChange={(event) => setWhatIfScores((scores) => ({ ...scores, [course.id]: parseInt(event.target.value, 10) || 0 }))}
                  className={`w-14 rounded-lg border px-2 py-1 text-center text-xs font-semibold focus:border-indigo-400 focus:outline-none ${dm ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-white text-gray-800"}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`flex items-center justify-between rounded-xl p-3 ${dm ? "bg-gray-800" : "bg-indigo-50"}`}>
          <div>
            <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>Simulated CGPA</p>
            <p className="text-2xl font-bold text-indigo-600">{whatIfCGPA}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>Change</p>
            <p className={`text-lg font-bold ${parseFloat(diff) >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {parseFloat(diff) >= 0 ? "+" : ""}
              {diff}
            </p>
          </div>
        </div>
      </Card>

      <Card dm={dm}>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <BarChart3 className="h-4 w-4 text-indigo-500" />
          Grade Breakdown
        </p>
        <div className="space-y-2">
          {registeredCourses.map((course) => (
            <div key={course.id} className="flex items-center gap-3">
              <p className="w-20 shrink-0 text-xs font-medium">{course.code}</p>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${course.score >= 70 ? "bg-emerald-500" : course.score >= 60 ? "bg-blue-500" : course.score >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${course.score}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-bold">{course.score}%</span>
              <span className={`w-4 text-xs font-bold ${course.score >= 70 ? "text-emerald-600" : course.score >= 60 ? "text-blue-600" : "text-amber-600"}`}>
                {gradeToLetter(course.score)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}