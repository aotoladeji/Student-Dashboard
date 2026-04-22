import { Clock, MapPin } from "lucide-react";
import { useState } from "react";
import Card from "../components/common/Card";
import { EVENTS } from "../data/mockData";

export default function EventsPage({ dm }) {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Academic", "Political", "Social", "Scholarship"];
  const filteredEvents = filter === "All" ? EVENTS : EVENTS.filter((event) => event.tag === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${filter === tag ? "bg-indigo-600 text-white" : dm ? "bg-gray-800 text-gray-400" : "border border-gray-200 bg-white text-gray-600"}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} dm={dm} className="card-hover">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <p className="text-sm font-bold leading-none">{event.date.split("-")[2]}</p>
                <p className="text-xs opacity-80">Mar</p>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{event.title}</p>
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
                <div className="mt-1 flex items-center gap-3">
                  <span className={`flex items-center gap-1 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </span>
                  <span className={`flex items-center gap-1 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>
                    <MapPin className="h-3 w-3" />
                    {event.venue}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}