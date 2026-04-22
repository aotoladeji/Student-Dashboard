import { useState } from "react";
import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import { MOCK_USER } from "./data/mockData";
import AssignmentsPage from "./pages/AssignmentsPage";
import CGPAPage from "./pages/CGPAPage";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import ExamsPage from "./pages/ExamsPage";
import FeesPage from "./pages/FeesPage";
import HostelPage from "./pages/HostelPage";
import IDCardsPage from "./pages/IDCardsPage";
import LibraryPage from "./pages/LibraryPage";
import NextOfKinPage from "./pages/NextOfKinPage";
import NotificationsPage from "./pages/NotificationsPage";
import PlannerPage from "./pages/PlannerPage";
import RequestCardPage from "./pages/RequestCardPage";
import ScholarshipsPage from "./pages/ScholarshipsPage";
import SponsorsPage from "./pages/SponsorsPage";
import TicketsPage from "./pages/TicketsPage";
import ResultsPage from "./pages/ResultsPage";
import TranscriptPage from "./pages/TranscriptPage";
import WalletPage from "./pages/WalletPage";
import CoursesPage from "./CoursesPage";

const PAGE_COMPONENTS = {
  dashboard: DashboardPage,
  fees: FeesPage,
  courses: CoursesPage,
  assignments: AssignmentsPage,
  cgpa: CGPAPage,
  exams: ExamsPage,
  library: LibraryPage,
  scholarships: ScholarshipsPage,
  transcript: TranscriptPage,
  hostel: HostelPage,
  tickets: TicketsPage,
  notifications: NotificationsPage,
  events: EventsPage,
  planner: PlannerPage,
  nextofkin: NextOfKinPage,
  idcards: IDCardsPage,
  requestcard: RequestCardPage,
  results: ResultsPage,
  sponsors: SponsorsPage,
  wallet: WalletPage,
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveTab("dashboard");
    setSidebarOpen(false);
    setNotifOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={login} />;
  }

  const currentUser = user || MOCK_USER;
  const CurrentPage = PAGE_COMPONENTS[activeTab] || DashboardPage;

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      <Sidebar
        activeTab={activeTab}
        darkMode={darkMode}
        onClose={() => setSidebarOpen(false)}
        onTabChange={(nextTab) => {
          setActiveTab(nextTab);
          setSidebarOpen(false);
        }}
        sidebarOpen={sidebarOpen}
        user={currentUser}
      />

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex min-h-screen flex-col lg:pl-64">
        <TopBar
          activeTab={activeTab}
          darkMode={darkMode}
          notifOpen={notifOpen}
          onLogout={logout}
          onOpenNotificationsPage={() => {
            setActiveTab("notifications");
            setNotifOpen(false);
          }}
          onOpenSidebar={() => setSidebarOpen(true)}
          onToggleTheme={() => setDarkMode((value) => !value)}
          onToggleNotifications={() => setNotifOpen((value) => !value)}
          user={currentUser}
        />

        <main className="fade-up flex-1 p-4 lg:p-6" key={activeTab}>
          <CurrentPage dm={darkMode} user={currentUser} />
        </main>
      </div>
    </div>
  );
}