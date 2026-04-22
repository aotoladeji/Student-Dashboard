import { AlertCircle, Calendar } from "lucide-react";
import Card from "../components/common/Card";
import { ATTENDANCE } from "../data/mockData";

export default function AttendancePage({ dm }) {
  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return "emerald";
    if (percentage >= 70) return "blue";
    if (percentage >= 50) return "amber";
    return "red";
  };

  const AttendanceItem = ({ course }) => {
    const color = getAttendanceColor(course.percentage);
    const colorClass = {
      emerald: "bg-emerald-100 text-emerald-700",
      blue: "bg-blue-100 text-blue-700",
      amber: "bg-amber-100 text-amber-700",
      red: "bg-red-100 text-red-700",
    }[color];

    return (
      <Card dm={dm} className="card-hover">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{course.course}</h3>
              <p className="text-xs text-gray-500">Last class: {course.lastClass}</p>
            </div>
            <span className={`rounded-lg px-2.5 py-1 text-sm font-bold ${colorClass}`}>{course.percentage.toFixed(1)}%</span>
          </div>

          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-full transition-all ${
                  color === "emerald"
                    ? "bg-emerald-500"
                    : color === "blue"
                      ? "bg-blue-500"
                      : color === "amber"
                        ? "bg-amber-500"
                        : "bg-red-500"
                }`}
                style={{ width: `${course.percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              {course.attended} of {course.total} classes attended
            </p>
          </div>
        </div>
      </Card>
    );
  };

  const lowAttendance = ATTENDANCE.filter((a) => a.percentage < 75);

  return (
    <div className="space-y-5">
      {lowAttendance.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/20">
          <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-medium text-amber-900 dark:text-amber-300">Low Attendance Warning</p>
            <p className="text-xs text-amber-800 dark:text-amber-200">
              You have {lowAttendance.length} course(s) with attendance below 75%. Please ensure you attend more classes to avoid de-registration.
            </p>
          </div>
        </div>
      )}

      <h2 className={`mb-4 text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>Course Attendance</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {ATTENDANCE.map((course) => (
          <AttendanceItem key={course.id} course={course} />
        ))}
      </div>

      <Card dm={dm} className="space-y-2 bg-blue-50 dark:bg-blue-900/20">
        <h4 className="font-bold text-blue-900 dark:text-blue-300">📋 Attendance Policy</h4>
        <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
          <li>✓ Minimum 75% attendance required to sit for exams</li>
          <li>✓ Below 70% may result in course de-registration</li>
          <li>✓ Contact your course lecturer for excused absences</li>
        </ul>
      </Card>
    </div>
  );
}
