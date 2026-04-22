import {
  BarChart3,
  Banknote,
  BookOpen,
  Building2,
  Calendar,
  ClipboardList,
  Ticket,
  Timer,
  TrendingUp,
  Users,
  CreditCard,
  Wallet,
  Heart,
  FileText,
  Book,
  Award,
  ClipboardCheck,
  Bell,
} from "lucide-react";

export const DASHBOARD_ITEM = { id: "dashboard", icon: BarChart3, label: "Dashboard", title: "Dashboard" };

export const NAV_SECTIONS = [
  {
    id: "registrations",
    label: "School Registrations",
    items: [
      { id: "fees", icon: Banknote, label: "Fees", title: "Fees" },
      { id: "courses", icon: BookOpen, label: "Courses & Registration", title: "Courses & Registration" },
      { id: "hostel", icon: Building2, label: "Hostel Application", title: "Hostel Application" },
      { id: "wallet", icon: Wallet, label: "Wallet", title: "Wallet" },
    ],
  },
  {
    id: "lifestyle",
    label: "Student Lifestyle",
    items: [
      { id: "results", icon: ClipboardCheck, label: "Results", title: "Results" },
      { id: "exams", icon: FileText, label: "Lectures & Exams", title: "Lectures & Exams" },
      { id: "library", icon: Book, label: "Library", title: "Library" },
      { id: "idcards", icon: CreditCard, label: "ID Cards", title: "ID Cards" },
      { id: "assignments", icon: ClipboardList, label: "Assignments", title: "Assignments" },
      { id: "scholarships", icon: Award, label: "Scholarships", title: "Scholarships" },
      { id: "cgpa", icon: TrendingUp, label: "CGPA Tracker", title: "CGPA Tracker" },
      { id: "transcript", icon: FileText, label: "Academic Transcript", title: "Academic Transcript" },
      { id: "nextofkin", icon: Heart, label: "Next of Kin", title: "Next of Kin" },
      { id: "sponsors", icon: Users, label: "My Sponsors", title: "My Sponsors" },
    ],
  },
  {
    id: "events-socials",
    label: "School Events & Socials",
    items: [
      { id: "notifications", icon: Bell, label: "Notifications", title: "Notifications" },
      { id: "events", icon: Calendar, label: "Events Feed", title: "Events Feed" },
      { id: "planner", icon: Timer, label: "Study Planner", title: "Study Planner" },
      { id: "tickets", icon: Ticket, label: "Support Tickets", title: "Support Tickets" },
    ],
  },
];

export const NAV_ITEMS = [
  DASHBOARD_ITEM,
  ...NAV_SECTIONS.flatMap((section) => section.items),
];

export const TAB_TITLES = {
  ...Object.fromEntries(NAV_ITEMS.map(({ id, title }) => [id, title])),
  requestcard: "Request Card",
};