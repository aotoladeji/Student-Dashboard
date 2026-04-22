import { BookMarked, CheckCircle, Plus, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import Card from "../components/common/Card";

export default function PlannerPage({ dm }) {
  const [mode, setMode] = useState("focus");
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review CSC 301 lecture notes", done: false },
    { id: 2, text: "Complete TCP/IP assignment", done: false },
    { id: 3, text: "Read MTH 301 Chapter 7", done: true },
  ]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!running) return undefined;

    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) => {
        if (currentSeconds === 0) {
          setMinutes((currentMinutes) => {
            if (currentMinutes === 0) {
              setRunning(false);
              if (mode === "focus") {
                setSessions((currentSessions) => currentSessions + 1);
                setMode("break");
                setMinutes(5);
              } else {
                setMode("focus");
                setMinutes(25);
              }
              return mode === "focus" ? 5 : 25;
            }

            return currentMinutes - 1;
          });
          return 59;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [running, mode]);

  const reset = () => {
    setRunning(false);
    setMinutes(mode === "focus" ? 25 : 5);
    setSeconds(0);
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks((currentTasks) => [...currentTasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  const totalSeconds = mode === "focus" ? 25 * 60 : 5 * 60;
  const elapsed = totalSeconds - (minutes * 60 + seconds);
  const pct = Math.round((elapsed / totalSeconds) * 100);

  return (
    <div className="space-y-4">
      <Card dm={dm}>
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Timer className="h-4 w-4 text-indigo-500" />
            Focus Mode
          </p>
          <div className="flex gap-1">
            {["focus", "break"].map((timerMode) => (
              <button
                key={timerMode}
                onClick={() => {
                  setMode(timerMode);
                  setRunning(false);
                  setMinutes(timerMode === "focus" ? 25 : 5);
                  setSeconds(0);
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${mode === timerMode ? "bg-indigo-600 text-white" : dm ? "text-gray-400" : "text-gray-500"}`}
              >
                {timerMode}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center py-4">
          <div className="relative h-36 w-36">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke={dm ? "#374151" : "#f3f4f6"} strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={mode === "focus" ? "#6366f1" : "#10b981"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - pct / 100)}`}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold" style={{ fontFamily: "Sora" }}>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
              <p className={`mt-0.5 text-xs capitalize ${mode === "focus" ? "text-indigo-500" : "text-emerald-500"}`}>{mode}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={() => setRunning((value) => !value)} className="min-w-[80px] rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              {running ? "Pause" : "Start"}
            </button>
            <button onClick={reset} className={`rounded-xl px-4 py-2 text-sm font-medium ${dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>Reset</button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={`h-3 w-3 rounded-full ${index < sessions % 4 ? "bg-indigo-500" : dm ? "bg-gray-700" : "bg-gray-200"}`} />
            ))}
            <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{sessions} sessions today</p>
          </div>
        </div>
      </Card>

      <Card dm={dm}>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <BookMarked className="h-4 w-4 text-indigo-500" />
          Study Tasks
        </p>
        <div className="mb-3 flex gap-2">
          <input
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && addTask()}
            placeholder="Add a study task..."
            className={`flex-1 rounded-xl border p-2.5 text-sm focus:border-indigo-400 focus:outline-none ${dm ? "border-gray-700 bg-gray-800 text-white placeholder-gray-500" : "border-gray-200 bg-white"}`}
          />
          <button onClick={addTask} className="rounded-xl bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setTasks((currentTasks) => currentTasks.map((currentTask) => (
                currentTask.id === task.id ? { ...currentTask, done: !currentTask.done } : currentTask
              )))}
              className={`flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-all ${dm ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}
            >
              <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${task.done ? "border-indigo-600 bg-indigo-600" : dm ? "border-gray-600" : "border-gray-300"}`}>
                {task.done && <CheckCircle className="h-3 w-3 text-white" />}
              </div>
              <p className={`flex-1 text-sm ${task.done ? "text-gray-400 line-through" : ""}`}>{task.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}