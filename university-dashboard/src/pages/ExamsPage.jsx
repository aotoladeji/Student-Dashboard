import { Calendar, Clock, FileText, MapPin, Plus, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Card from "../components/common/Card";
import { EXAMS } from "../data/mockData";
import { getTimetableData, saveTimetableData } from "../utils/timetableStore";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DAY_ORDER = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5 };

function sortLectureItems(items) {
  return [...items].sort((a, b) => {
    const dayA = DAY_ORDER[a.days?.[0]] || 9;
    const dayB = DAY_ORDER[b.days?.[0]] || 9;
    if (dayA !== dayB) return dayA - dayB;
    return (a.time || "").localeCompare(b.time || "");
  });
}

export default function ExamsPage({ dm }) {
  const [lectureEditMode, setLectureEditMode] = useState(false);
  const [examEditMode, setExamEditMode] = useState(false);
  const [lectureCourses, setLectureCourses] = useState([]);
  const [customEntries, setCustomEntries] = useState([]);
  const [examCourses, setExamCourses] = useState([]);
  const [editor, setEditor] = useState(null);
  const [scratch, setScratch] = useState({});

  useEffect(() => {
    const saved = getTimetableData();

    const fallbackExamCourses = EXAMS.map((exam) => ({
      id: `exam-${exam.id}`,
      code: exam.course,
      title: `${exam.course} Examination`,
      examDate: exam.date,
      examTime: exam.time,
      examVenue: exam.venue,
      examType: exam.examType,
      status: exam.status,
      duration: exam.duration,
    }));

    setLectureCourses(saved.lectureCourses || []);
    setCustomEntries(saved.customEntries || []);
    setExamCourses(saved.examCourses?.length ? saved.examCourses : fallbackExamCourses);
  }, []);

  useEffect(() => {
    const lectureOverrides = lectureCourses.reduce((acc, course) => {
      if (typeof course.id === "number") {
        acc[course.id] = {
          days: course.days,
          time: course.time,
          venue: course.venue,
        };
      }
      return acc;
    }, {});

    const examOverrides = examCourses.reduce((acc, exam) => {
      if (typeof exam.id === "number") {
        acc[exam.id] = {
          examDate: exam.examDate,
          examTime: exam.examTime,
          examVenue: exam.examVenue,
        };
      }
      return acc;
    }, {});

    saveTimetableData({
      lectureCourses,
      customEntries,
      examCourses,
      lectureOverrides,
      examOverrides,
    });
  }, [lectureCourses, customEntries, examCourses]);

  const today = new Date();
  const upcomingExams = useMemo(
    () => examCourses.filter((exam) => new Date(exam.examDate) > today),
    [examCourses, today]
  );
  const pastExams = useMemo(
    () => examCourses.filter((exam) => new Date(exam.examDate) <= today),
    [examCourses, today]
  );

  const openEditor = (type, data) => {
    setScratch({ ...data });
    setEditor({ type });
  };

  const closeEditor = () => {
    setEditor(null);
    setScratch({});
  };

  const saveEditor = () => {
    if (!editor) return;

    if (editor.type === "lecture") {
      setLectureCourses((prev) => prev.map((item) => (item.id === scratch.id ? { ...item, ...scratch } : item)));
    }

    if (editor.type === "custom") {
      setCustomEntries((prev) => prev.map((item) => (item.id === scratch.id ? { ...item, ...scratch } : item)));
    }

    if (editor.type === "new-custom") {
      if (!scratch.label?.trim()) return;
      setCustomEntries((prev) => [{ ...scratch, id: `custom-${Date.now()}` }, ...prev]);
    }

    if (editor.type === "exam") {
      setExamCourses((prev) => prev.map((item) => (item.id === scratch.id ? { ...item, ...scratch } : item)));
    }

    closeEditor();
  };

  const deleteCustom = (id) => {
    setCustomEntries((prev) => prev.filter((item) => item.id !== id));
    closeEditor();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className={`text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>Lecture Timetable</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEditor("new-custom", { label: "", days: ["Monday"], time: "", venue: "" })}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold ${dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
            >
              <Plus className="h-3.5 w-3.5" /> Add Entry
            </button>
            <button
              onClick={() => setLectureEditMode((prev) => !prev)}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold ${lectureEditMode ? "bg-amber-500 text-white" : dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
            >
              <Sparkles className="h-3.5 w-3.5" /> {lectureEditMode ? "Done" : "Edit"}
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {sortLectureItems(lectureCourses).map((lecture) => (
            <Card
              key={lecture.id}
              dm={dm}
              className={`card-hover ${lectureEditMode ? "cursor-pointer hover:border-indigo-400" : ""}`}
              onClick={lectureEditMode ? () => openEditor("lecture", lecture) : undefined}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{lecture.code}</h3>
                    <p className="text-xs text-gray-500">{lecture.title}</p>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">Course</span>
                </div>
                <div className="space-y-1.5 border-t border-gray-200 pt-2 text-sm dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" /> {(lecture.days || []).join(" / ")}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" /> {lecture.time}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" /> {lecture.venue}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {customEntries.map((entry) => (
            <Card
              key={entry.id}
              dm={dm}
              className={`card-hover ${lectureEditMode ? "cursor-pointer hover:border-indigo-400" : ""}`}
              onClick={lectureEditMode ? () => openEditor("custom", entry) : undefined}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{entry.label}</h3>
                    <p className="text-xs text-gray-500">Personal lecture entry</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">Custom</span>
                </div>
                <div className="space-y-1.5 border-t border-gray-200 pt-2 text-sm dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" /> {(entry.days || []).join(" / ")}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" /> {entry.time || "-"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" /> {entry.venue || "-"}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {lectureCourses.length === 0 && customEntries.length === 0 && (
            <p className="md:col-span-2 text-center text-sm text-gray-500">
              No lecture timetable found yet. Open Course Registration timetable once to sync, then edit here.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className={`text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>Exams Timetable</h2>
          <button
            onClick={() => setExamEditMode((prev) => !prev)}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold ${examEditMode ? "bg-amber-500 text-white" : dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
          >
            <Sparkles className="h-3.5 w-3.5" /> {examEditMode ? "Done" : "Edit"}
          </button>
        </div>

        <h3 className={`mb-3 font-semibold ${dm ? "text-white" : "text-gray-900"}`}>Upcoming Exams ({upcomingExams.length})</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingExams.length > 0 ? (
            upcomingExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                dm={dm}
                editable={examEditMode}
                onClick={() => openEditor("exam", exam)}
              />
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500">No upcoming exams</p>
          )}
        </div>

        <h3 className={`mb-3 mt-6 font-semibold ${dm ? "text-white" : "text-gray-900"}`}>Past Exams ({pastExams.length})</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {pastExams.length > 0 ? (
            pastExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                dm={dm}
                editable={examEditMode}
                onClick={() => openEditor("exam", exam)}
              />
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500">No past exams</p>
          )}
        </div>
      </div>

      {editor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <Card dm={dm} className="my-auto w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-bold ${dm ? "text-white" : "text-gray-900"}`}>
                {editor.type === "lecture" && "Edit Lecture Entry"}
                {editor.type === "custom" && "Edit Personal Lecture Entry"}
                {editor.type === "new-custom" && "Add Personal Lecture Entry"}
                {editor.type === "exam" && "Edit Exam Entry"}
              </h3>
              <button onClick={closeEditor} className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>

            {(editor.type === "lecture" || editor.type === "custom" || editor.type === "new-custom") && (
              <div className="space-y-3">
                {(editor.type === "custom" || editor.type === "new-custom") && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Label</label>
                    <input
                      value={scratch.label || ""}
                      onChange={(e) => setScratch((prev) => ({ ...prev, label: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-600">Days</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {WEEK_DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          const currentDays = scratch.days || [];
                          setScratch((prev) => ({
                            ...prev,
                            days: currentDays.includes(day)
                              ? currentDays.filter((d) => d !== day)
                              : [...currentDays, day],
                          }));
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${scratch.days?.includes(day) ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-300 text-gray-600"}`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Time</label>
                  <input
                    value={scratch.time || ""}
                    onChange={(e) => setScratch((prev) => ({ ...prev, time: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Venue</label>
                  <input
                    value={scratch.venue || ""}
                    onChange={(e) => setScratch((prev) => ({ ...prev, venue: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {editor.type === "exam" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Exam Date</label>
                  <input
                    type="date"
                    value={scratch.examDate || ""}
                    onChange={(e) => setScratch((prev) => ({ ...prev, examDate: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Exam Time</label>
                  <input
                    value={scratch.examTime || ""}
                    onChange={(e) => setScratch((prev) => ({ ...prev, examTime: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Exam Venue</label>
                  <input
                    value={scratch.examVenue || ""}
                    onChange={(e) => setScratch((prev) => ({ ...prev, examVenue: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {editor.type === "custom" && (
                <button
                  onClick={() => deleteCustom(scratch.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
              <button
                onClick={closeEditor}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEditor}
                className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function ExamCard({ exam, dm, editable, onClick }) {
  return (
    <Card dm={dm} className={`card-hover ${editable ? "cursor-pointer hover:border-indigo-400" : ""}`} onClick={editable ? onClick : undefined}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{exam.code}</h3>
            <p className="text-xs text-gray-500">{exam.examType || "Semester"} Examination</p>
          </div>
          <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
            {exam.status || "scheduled"}
          </span>
        </div>

        <div className="space-y-1.5 border-t border-gray-200 pt-3 text-sm dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" /> {new Date(exam.examDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" /> {exam.examTime}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" /> {exam.examVenue}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="h-4 w-4" /> Duration: {exam.duration || "2 hours"}
          </div>
        </div>
      </div>
    </Card>
  );
}
