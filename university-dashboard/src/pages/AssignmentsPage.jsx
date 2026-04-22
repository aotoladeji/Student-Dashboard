import { Clock, FileText, Upload } from "lucide-react";
import { useState } from "react";
import Card from "../components/common/Card";
import { ASSIGNMENTS } from "../data/mockData";

const statusBadge = (status) => ({
  submitted: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-600",
}[status] || "");

export default function AssignmentsPage({ dm }) {
  const [assignments, setAssignments] = useState(ASSIGNMENTS);
  const [uploading, setUploading] = useState(null);

  const handleUpload = (id) => {
    setUploading(id);
    setTimeout(() => {
      setAssignments((currentAssignments) => currentAssignments.map((assignment) => (
        assignment.id === id ? { ...assignment, status: "submitted" } : assignment
      )));
      setUploading(null);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {["submitted", "pending", "overdue"].map((status) => (
          <Card key={status} dm={dm} className="text-center">
            <p className="text-2xl font-bold">{assignments.filter((assignment) => assignment.status === status).length}</p>
            <p className={`mt-0.5 text-xs capitalize ${dm ? "text-gray-400" : "text-gray-500"}`}>{status}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <Card key={assignment.id} dm={dm} className="card-hover">
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${assignment.status === "submitted" ? "bg-emerald-100" : assignment.status === "overdue" ? "bg-red-100" : "bg-amber-100"}`}>
                <FileText className={`h-5 w-5 ${assignment.status === "submitted" ? "text-emerald-600" : assignment.status === "overdue" ? "text-red-500" : "text-amber-600"}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{assignment.title}</p>
                  <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusBadge(assignment.status)}`}>{assignment.status}</span>
                </div>
                <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{assignment.course}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className={`flex items-center gap-1 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>
                    <Clock className="h-3 w-3" />
                    Due: {assignment.deadline}
                  </span>
                  {assignment.marks !== null && <span className="text-xs font-semibold text-indigo-600">{assignment.marks}/{assignment.total} pts</span>}
                </div>
                {assignment.status !== "submitted" && (
                  <button
                    onClick={() => handleUpload(assignment.id)}
                    disabled={uploading === assignment.id}
                    className="mt-2 flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs text-white transition-all hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {uploading === assignment.id ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3 w-3" />
                        Upload PDF
                      </>
                    )}
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