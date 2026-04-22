import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { DASHBOARD_ITEM, NAV_SECTIONS } from "../../data/navigation";

export default function Sidebar({
  activeTab,
  darkMode,
  onClose,
  onTabChange,
  sidebarOpen,
  user,
}) {
  const dm = darkMode;
  const [idCardsMenuOpen, setIdCardsMenuOpen] = useState(false);

  useEffect(() => {
    if (activeTab === "idcards" || activeTab === "requestcard") {
      setIdCardsMenuOpen(true);
    }
  }, [activeTab]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${dm ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"} lg:translate-x-0`}
    >
      <div className={`flex items-center gap-3 border-b px-5 py-4 ${dm ? "border-gray-800" : "border-gray-100"}`}>
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl shadow-lg">
          <img src={logo} alt="UI Student Portal" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight" style={{ fontFamily: "Sora" }}>UI Student Portal</p>
          <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>Student Hub</p>
        </div>
        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600 lg:hidden">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className={`mx-4 mt-4 flex items-center gap-3 rounded-xl p-3 ${dm ? "bg-gray-800" : "bg-indigo-50"}`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
          {user.avatar}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">{user.name}</p>
          <p className={`truncate text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{user.matric_no}</p>
        </div>
        <div className="ml-auto">
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${user.cgpa >= 6.3 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {user.cgpa}
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
        <button
          onClick={() => onTabChange(DASHBOARD_ITEM.id)}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
            activeTab === DASHBOARD_ITEM.id
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : dm
                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <DASHBOARD_ITEM.icon className="h-4 w-4 shrink-0" />
          {DASHBOARD_ITEM.label}
          {activeTab === DASHBOARD_ITEM.id && <ChevronRight className="ml-auto h-3 w-3" />}
        </button>

        {NAV_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-1.5">
            <p className={`px-2 text-[11px] font-semibold uppercase tracking-wide ${dm ? "text-gray-500" : "text-gray-400"}`}>
              {section.label}
            </p>
            {section.items.map(({ id, icon, label }) => {
              const NavIcon = icon;

              if (id === "idcards") {
                const isCardsActive = activeTab === id;
                const isSubpageActive = activeTab === "requestcard";
                const isActive = isCardsActive || isSubpageActive;

                return (
                  <div key={id} className="space-y-1">
                    <button
                      onClick={() => {
                        onTabChange(id);
                        setIdCardsMenuOpen((prev) => !prev);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : dm
                            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <NavIcon className="h-4 w-4 shrink-0" />
                      {label}
                      <ChevronDown className={`ml-auto h-3.5 w-3.5 transition-transform ${idCardsMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {idCardsMenuOpen && (
                      <div className={`ml-8 rounded-lg border px-2 py-1 ${dm ? "border-gray-800 bg-gray-900/50" : "border-gray-100 bg-gray-50"}`}>
                        <button
                          onClick={() => onTabChange("requestcard")}
                          className={`flex w-full items-center rounded-md px-2 py-2 text-xs font-semibold transition-all ${
                            isSubpageActive
                              ? "bg-indigo-100 text-indigo-700"
                              : dm
                                ? "text-gray-300 hover:bg-gray-800"
                                : "text-gray-600 hover:bg-white"
                          }`}
                        >
                          Request Card
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    activeTab === id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : dm
                        ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <NavIcon className="h-4 w-4 shrink-0" />
                  {label}
                  {activeTab === id && <ChevronRight className="ml-auto h-3 w-3" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}