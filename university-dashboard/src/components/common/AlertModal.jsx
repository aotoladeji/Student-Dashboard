import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

const ICONS = {
  success: { Icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100" },
  error: { Icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
  warning: { Icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-100" },
  info: { Icon: Info, color: "text-blue-500", bg: "bg-blue-100" },
};

export default function AlertModal({ open, onClose, type = "info", title, message, dm }) {
  if (!open) return null;
  const { Icon, color, bg } = ICONS[type] ?? ICONS.info;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div className={`w-full max-w-sm rounded-2xl shadow-xl ${dm ? "bg-gray-800" : "bg-white"} p-6 space-y-4`}>
        {/* Icon */}
        <div className="flex justify-center">
          <div className={`rounded-full ${bg} p-4`}>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
        </div>

        {/* Title */}
        {title && (
          <h3 className={`text-center text-base font-bold ${dm ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
        )}

        {/* Message */}
        <p className={`text-center text-sm ${dm ? "text-gray-300" : "text-gray-600"}`}>
          {message}
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
