import { Badge, Calendar, Mail, MapPin } from "lucide-react";
import Card from "../components/common/Card";
import { MY_SPONSORS } from "../data/mockData";

export default function SponsorsPage({ dm }) {
  const sponsorshipTypeColors = {
    "Full Tuition": "indigo",
    "Partial Tuition & Accommodation": "purple",
    "Partial Tuition": "blue",
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "emerald"
      : status === "expired"
        ? "gray"
        : "amber";
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className={`mb-4 text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>My Sponsors</h2>
        <p className="text-sm text-gray-600">View and manage all your active sponsorships and scholarships</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MY_SPONSORS.map((sponsor) => (
          <Card key={sponsor.id} dm={dm} className="card-hover">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{sponsor.name}</h3>
                <p className="text-xs text-gray-500">{sponsor.type}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                getStatusColor(sponsor.status) === "emerald"
                  ? "bg-emerald-100 text-emerald-700"
                  : getStatusColor(sponsor.status) === "gray"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-amber-100 text-amber-700"
              }`}>
                {sponsor.status}
              </span>
            </div>

            <div className="space-y-2.5 border-t border-gray-200 pt-3 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm">
                <Badge className="h-4 w-4 text-indigo-600" />
                <span className="text-gray-600">{sponsor.sponsorshipType}</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Amount</span>
                <span className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>₦{sponsor.amount.toLocaleString()}</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(sponsor.startDate).toLocaleDateString()} - {new Date(sponsor.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-3.5 w-3.5" />
                  <a href={`mailto:${sponsor.contact}`} className="text-indigo-600 hover:underline">
                    {sponsor.contact}
                  </a>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {MY_SPONSORS.length === 0 && (
        <div className="rounded-lg border border-gray-200 px-4 py-8 text-center dark:border-gray-700">
          <p className="text-gray-600">No active sponsorships at the moment</p>
        </div>
      )}
    </div>
  );
}
