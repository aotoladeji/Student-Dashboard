import { Download, FileText } from "lucide-react";
import Card from "../components/common/Card";
import { ACADEMIC_TRANSCRIPT, COURSE_REGISTRATION } from "../data/mockData";

export default function TranscriptPage({ dm }) {
  const calculateCGPA = () => {
    const total = ACADEMIC_TRANSCRIPT.semesters.reduce((sum, sem) => sum + sem.cgpa, 0);
    return (total / ACADEMIC_TRANSCRIPT.semesters.length).toFixed(2);
  };

  const totalCredits = ACADEMIC_TRANSCRIPT.semesters.reduce((sum, sem) => sum + sem.credits, 0);
  const totalUnits = ACADEMIC_TRANSCRIPT.semesters.reduce((sum, sem) => sum + sem.units, 0);

  return (
    <div className="space-y-5">
      {/* Academic Summary */}
      <Card dm={dm} className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-indigo-200">Overall CGPA</p>
            <h2 className="mt-1 text-3xl font-bold text-white">{ACADEMIC_TRANSCRIPT.gpa.toFixed(2)}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
              <p className="text-xs text-indigo-200">Total Units</p>
              <p className="mt-1 text-xl font-bold text-white">{totalUnits}</p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
              <p className="text-xs text-indigo-200">Total Credits</p>
              <p className="mt-1 text-xl font-bold text-white">{totalCredits}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Student Info */}
      <Card dm={dm}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Matric Number</p>
            <p className={`font-medium ${dm ? "text-white" : "text-gray-900"}`}>{ACADEMIC_TRANSCRIPT.matricNo}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Name</p>
            <p className={`font-medium ${dm ? "text-white" : "text-gray-900"}`}>{ACADEMIC_TRANSCRIPT.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Department</p>
            <p className={`font-medium ${dm ? "text-white" : "text-gray-900"}`}>{ACADEMIC_TRANSCRIPT.department}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Level</p>
            <p className={`font-medium ${dm ? "text-white" : "text-gray-900"}`}>{ACADEMIC_TRANSCRIPT.level}</p>
          </div>
        </div>
      </Card>

      {/* Semester by Semester */}
      <div>
        <h3 className={`mb-3 flex items-center gap-2 font-bold ${dm ? "text-white" : "text-gray-900"}`}>
          <FileText className="h-5 w-5" /> Semester Performance
        </h3>

        <div className="space-y-2">
          {ACADEMIC_TRANSCRIPT.semesters.map((sem) => (
            <Card key={sem.sem} dm={dm} className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${dm ? "text-white" : "text-gray-900"}`}>{sem.sem}</p>
                  <p className="text-xs text-gray-500">
                    {sem.units} units • {sem.credits} credits
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-indigo-600">{sem.cgpa}</p>
                  <p className="text-xs text-gray-500">CGPA</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Registration */}
      <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
        <h3 className={`mb-3 flex items-center gap-2 font-bold ${dm ? "text-white" : "text-gray-900"}`}>
          <FileText className="h-5 w-5" /> Registered Courses
        </h3>

        <div className="space-y-2">
          {COURSE_REGISTRATION.map((course) => (
            <Card key={course.id} dm={dm} className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${dm ? "text-white" : "text-gray-900"}`}>
                    {course.code}: {course.title}
                  </p>
                  <p className="text-xs text-gray-500">{course.units} units • Registered: {course.registrationDate}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {course.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Download Button */}
      <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700">
        <Download className="h-4 w-4" /> Download Transcript
      </button>

      <Card dm={dm} className={`space-y-2 rounded-lg p-3 ${dm ? "bg-slate-900/40" : "bg-slate-50"} border ${dm ? "border-slate-700" : "border-slate-200"}`}>
        <h4 className={`font-bold ${dm ? "text-slate-200" : "text-slate-900"}`}>📝 Transcript Information</h4>
        <ul className={`space-y-1 text-xs ${dm ? "text-slate-300" : "text-slate-700"}`}>
          <li>✓ This is an official academic transcript</li>
          <li>✓ Valid for official purposes only</li>
          <li>✓ Contains all registered courses and grades</li>
          <li>✓ CGPA calculated to 2 decimal places</li>
        </ul>
      </Card>
    </div>
  );
}
