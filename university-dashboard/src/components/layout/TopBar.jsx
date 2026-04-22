import { AlertTriangle, Bell, LogOut, Menu, Moon, Sun } from "lucide-react";
import { NOTIFICATION_FEED } from "../../data/mockData";
import { TAB_TITLES } from "../../data/navigation";

const PREVIEW_NOTIFICATIONS = [...NOTIFICATION_FEED]
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 3)
  .map((item) => ({
    msg: item.title,
    time: item.time,
    type: item.type === "assignment" ? "warn" : "info",
  }));

const getTimeAgo = (isoDate) => {
  const diff = Math.max(0, Date.now() - new Date(isoDate).getTime());
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function TopBar({ activeTab, darkMode, notifOpen, onOpenSidebar, onToggleNotifications, onToggleTheme, onLogout, onOpenNotificationsPage, user }) {
  const dm = darkMode;

  return (
    <header className={`sticky top-0 z-30 flex items-center gap-3 border-b px-4 py-3 backdrop-blur-sm ${dm ? "border-gray-800 bg-gray-950/90" : "border-gray-200 bg-white/90"}`}>
      <button onClick={onOpenSidebar} className="rounded-xl p-2 hover:bg-gray-100 lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-base font-bold" style={{ fontFamily: "Sora" }}>
          {TAB_TITLES[activeTab] || "Dashboard"}
        </h1>
        <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>300 Level · 2024/2025 Session</p>
      </div>

      <span className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:flex ${user.fees_paid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
        <span className={`pulse-dot h-1.5 w-1.5 rounded-full ${user.fees_paid ? "bg-emerald-500" : "bg-red-500"}`} />
        {user.fees_paid ? "Fees Paid" : "Fees Unpaid"}
      </span>

      <div className="relative">
        <button onClick={onToggleNotifications} className={`relative rounded-xl p-2 ${dm ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {notifOpen && (
          <div className={`fade-up absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border p-3 shadow-xl ${dm ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
            <p className="mb-2 text-sm font-semibold">Notifications</p>
            {PREVIEW_NOTIFICATIONS.map((notification, index) => (
              <div key={`${notification.msg}-${index}`} className={`mb-1 flex gap-2.5 rounded-xl p-2 ${dm ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notification.type === "warn" ? "bg-amber-100" : "bg-indigo-100"}`}>
                  {notification.type === "warn" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  ) : (
                    <Bell className="h-4 w-4 text-indigo-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium">{notification.msg}</p>
                  <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{getTimeAgo(notification.time)}</p>
                </div>
              </div>
            ))}

            <button
              onClick={onOpenNotificationsPage}
              className="mt-1 w-full rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              View All Notifications
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onToggleTheme}
        className={`flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium ${dm ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
      >
        {dm ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="hidden sm:inline">{dm ? "Light" : "Dark"}</span>
      </button>

      <button
        onClick={onLogout}
        className="flex items-center gap-1.5 rounded-xl bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sign Out</span>
      </button>
    </header>
  );
}