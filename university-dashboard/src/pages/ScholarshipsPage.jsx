import { Award, CheckCircle2, ExternalLink, Landmark } from "lucide-react";
import Card from "../components/common/Card";
import { SCHOLARSHIPS } from "../data/mockData";

export default function ScholarshipsPage({ dm }) {
  const eligible = SCHOLARSHIPS.filter((item) => item.eligible);
  const ineligible = SCHOLARSHIPS.filter((item) => !item.eligible);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card dm={dm}>
          <p className="text-xs text-gray-500">Total Scholarships</p>
          <p className={`mt-1 text-2xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>{SCHOLARSHIPS.length}</p>
        </Card>
        <Card dm={dm}>
          <p className="text-xs text-gray-500">Eligible</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{eligible.length}</p>
        </Card>
        <Card dm={dm}>
          <p className="text-xs text-gray-500">Not Yet Eligible</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{ineligible.length}</p>
        </Card>
      </div>

      <div className="space-y-3">
        {SCHOLARSHIPS.map((scholarship) => (
          <Card key={scholarship.id} dm={dm} className="card-hover">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600">
                  <Landmark className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{scholarship.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{scholarship.provider}</p>
                  <p className="mt-1 text-xs text-gray-600">Min CGPA: {scholarship.minCgpa}/7.0</p>
                  <p className="mt-1 text-xs text-gray-600">Deadline: {scholarship.deadline}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${scholarship.eligible ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {scholarship.eligible ? <CheckCircle2 className="h-3 w-3" /> : <Award className="h-3 w-3" />}
                  {scholarship.eligible ? "Eligible" : "Not Eligible"}
                </span>
                <a
                  href={scholarship.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Apply
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
