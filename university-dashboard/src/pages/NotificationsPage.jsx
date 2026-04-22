import { Bell, CheckCircle2, CreditCard, MessageSquare, NotebookPen } from "lucide-react";
import { useMemo, useState } from "react";
import Card from "../components/common/Card";
import { NOTIFICATION_FEED } from "../data/mockData";

const getTypeMeta = (type) => {
  if (type === "ticket_reply") {
    return {
      label: "Ticket Reply",
      icon: MessageSquare,
      chip: "bg-blue-100 text-blue-700",
      iconWrap: "bg-blue-100",
      iconColor: "text-blue-600",
    };
  }
  if (type === "id_card") {
    return {
      label: "ID Card",
      icon: CreditCard,
      chip: "bg-emerald-100 text-emerald-700",
      iconWrap: "bg-emerald-100",
      iconColor: "text-emerald-600",
    };
  }
  return {
    label: "Assignment",
    icon: NotebookPen,
    chip: "bg-amber-100 text-amber-700",
    iconWrap: "bg-amber-100",
    iconColor: "text-amber-600",
  };
};

const timeAgo = (isoDate) => {
  const diff = Math.max(0, Date.now() - new Date(isoDate).getTime());
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function NotificationsPage({ dm }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const sortedNotifications = useMemo(() => (
    [...NOTIFICATION_FEED].sort((a, b) => new Date(b.time) - new Date(a.time))
  ), []);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return sortedNotifications;
    if (activeFilter === "unread") return sortedNotifications.filter((item) => !item.read);
    return sortedNotifications.filter((item) => item.type === activeFilter);
  }, [activeFilter, sortedNotifications]);

  const unreadCount = sortedNotifications.filter((item) => !item.read).length;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #0f766e, #0ea5e9)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 40%, white 0%, transparent 50%)" }} />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-cyan-100">Notification Center</p>
            <p className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: "Sora" }}>Latest Replies & Updates</p>
            <p className="mt-1 text-sm text-cyan-100">Tickets, ID card requests, assignment alerts and more.</p>
          </div>
          <div className="rounded-xl bg-white/15 px-3 py-2 text-right backdrop-blur">
            <p className="text-xs text-cyan-100">Unread</p>
            <p className="text-2xl font-bold text-white">{unreadCount}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "ticket_reply", label: "Ticket Replies" },
          { id: "id_card", label: "ID Cards" },
          { id: "assignment", label: "Assignments" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition-colors ${activeFilter === filter.id ? "bg-cyan-600 text-white" : dm ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card dm={dm} className="py-10 text-center">
            <Bell className="mx-auto h-8 w-8 text-gray-400" />
            <p className={`mt-2 font-semibold ${dm ? "text-white" : "text-gray-900"}`}>No notifications found</p>
            <p className="text-xs text-gray-500">Try another filter.</p>
          </Card>
        ) : (
          filtered.map((item) => {
            const meta = getTypeMeta(item.type);
            const Icon = meta.icon;
            return (
              <Card key={item.id} dm={dm} className={`card-hover ${!item.read ? "ring-1 ring-cyan-300/40" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.iconWrap}`}>
                    <Icon className={`h-5 w-5 ${meta.iconColor}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{item.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${meta.chip}`}>{meta.label}</span>
                    </div>

                    <p className={`mt-1 text-xs ${dm ? "text-gray-300" : "text-gray-600"}`}>{item.message}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>{item.source}</span>
                      <span>Ref: {item.relatedId}</span>
                      <span>{timeAgo(item.time)}</span>
                    </div>
                  </div>

                  {!item.read && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-cyan-100 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">
                      <CheckCircle2 className="h-3 w-3" />
                      New
                    </span>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
