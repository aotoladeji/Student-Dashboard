import { BadgeCheck, Building2, ChevronLeft, CreditCard, QrCode, Wallet, X } from "lucide-react";
import { useState } from "react";
import Card from "../components/common/Card";
import AlertModal from "../components/common/AlertModal";
import { HOSTELS } from "../data/mockData";

const getQrFill = (index, hostelId) => ((index * 7) + hostelId * 3) % 5 < 2;
const getClearanceToken = (user, hostelName) => {
  const hostelKey = hostelName.replace(/\s+/g, "").toUpperCase().slice(0, 4);
  return `TKN-${hostelKey}-${String(user.id).padStart(3, "0")}`;
};

export default function HostelPage({ dm, user }) {
  const [step, setStep] = useState("select");
  const [selected, setSelected] = useState(null);
  const [applying, setApplying] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isHostelFeePaid, setIsHostelFeePaid] = useState(false);
  const [alertModal, setAlertModal] = useState({ open: false, type: "info", title: "", message: "" });
  const hostelFeeAmount = 180000;
  const normalizedGender = (user?.gender || "").trim().toLowerCase();
  const eligibleHostels = HOSTELS.filter(
    (hostel) => hostel.gender.toLowerCase() === normalizedGender
  );

  const showAlert = (type, title, message) => {
    setAlertModal({ open: true, type, title, message });
  };

  const apply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setStep("approved");
      setIsHostelFeePaid(false);
      setPaymentMethod(null);
      setIsPaymentModalOpen(false);
    }, 2000);
  };

  const handleProceedToPay = () => {
    setPaymentMethod(null);
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) return;

    setIsPaymentModalOpen(false);
    setIsHostelFeePaid(true);
    showAlert(
      "success",
      "Hostel Fee Payment Initiated",
      `Your hostel fee payment of ₦${hostelFeeAmount.toLocaleString()} via ${paymentMethod} has been initiated successfully.`
    );
  };

  if (step === "approved") {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-center text-white">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <BadgeCheck className="h-8 w-8" />
          </div>
          <p className="mb-1 text-xl font-bold" style={{ fontFamily: "Sora" }}>Application Approved!</p>
          <p className="text-sm text-emerald-100">Your hostel allocation has been confirmed</p>
        </div>

        <Card dm={dm}>
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <Building2 className="h-4 w-4 text-indigo-500" />
            Hostel Clearance Details
          </p>
          <div className="mb-4 grid grid-cols-2 gap-3">
            {[
              { label: "Hall", value: selected?.name || "Idia Hall" },
              { label: "Room", value: "B204" },
              { label: "Floor", value: "2nd Floor" },
              { label: "Session", value: "2024/2025" },
              { label: "Status", value: isHostelFeePaid ? "Cleared & Paid ✅" : "Cleared (Payment Pending)" },
            ].map(({ label, value }) => (
              <div key={label} className={`rounded-xl p-3 ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
                <p className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{label}</p>
                <p className="mt-0.5 text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {!isHostelFeePaid ? (
            <button
              onClick={handleProceedToPay}
              className="mb-4 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Proceed to Pay Hostel Fee
            </button>
          ) : (
            <div className={`mb-4 rounded-xl border px-4 py-3 text-sm font-medium ${dm ? "border-emerald-700 bg-emerald-900/30 text-emerald-300" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
              Hostel fee payment has been initiated. Keep your payment reference for clearance checks.
            </div>
          )}

          <div className={`flex flex-col items-center gap-3 rounded-xl border-2 border-dashed p-6 ${dm ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
              <div className="h-28 w-28 rounded-lg bg-white p-2">
                <div className="grid h-full w-full grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, index) => (
                    <div key={index} className={`rounded-sm ${getQrFill(index, selected?.id || 1) ? "bg-gray-900" : "bg-transparent"}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="flex items-center justify-center gap-2 text-sm font-semibold">
                <QrCode className="h-4 w-4 text-indigo-500" />
                Digital Hostel Clearance QR
              </p>
              <p className={`mt-1 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>Show this to the hostel warden at check-in</p>
              <p className="mt-1 text-xs font-medium text-indigo-600">{getClearanceToken(user, selected?.name || "Idia Hall")}</p>
            </div>
          </div>
        </Card>

        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
            <Card dm={dm} className="my-auto w-full max-w-md space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <h3 className={`text-lg font-bold ${dm ? "text-white" : "text-gray-900"}`}>Hostel Fee Payment</h3>
                <button onClick={() => setIsPaymentModalOpen(false)} className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-2 rounded-lg p-3 ${dm ? "bg-slate-900/40" : "bg-slate-50"}`}>
                <h4 className={`text-xs font-bold uppercase ${dm ? "text-slate-300" : "text-slate-600"}`}>Student Information</h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3"><p className="text-gray-500">Full Name</p><p className={`font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{user.name}</p></div>
                  <div className="flex justify-between gap-3"><p className="text-gray-500">Matric Number</p><p className={`font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{user.matric_no}</p></div>
                  <div className="flex justify-between gap-3"><p className="text-gray-500">Selected Hall</p><p className={`font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{selected?.name || "N/A"}</p></div>
                  <div className="flex justify-between gap-3 border-t border-gray-200 pt-2 dark:border-gray-700"><p className={`font-semibold ${dm ? "text-white" : "text-gray-900"}`}>Amount</p><p className="font-bold text-amber-600">₦{hostelFeeAmount.toLocaleString()}</p></div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase ${dm ? "text-slate-300" : "text-slate-600"}`}>Select Payment Method</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setPaymentMethod("Remita")}
                    className={`w-full rounded-lg border-2 p-3 text-left transition ${paymentMethod === "Remita" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : dm ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className={`h-5 w-5 ${paymentMethod === "Remita" ? "text-blue-600" : ""}`} />
                      <div>
                        <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>Remita</p>
                        <p className="text-xs text-gray-500">Online payment platform</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("Wallet")}
                    className={`w-full rounded-lg border-2 p-3 text-left transition ${paymentMethod === "Wallet" ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" : dm ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className={`h-5 w-5 ${paymentMethod === "Wallet" ? "text-emerald-600" : ""}`} />
                      <div>
                        <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>Student Wallet</p>
                        <p className="text-xs text-gray-500">Pay from your wallet balance</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${dm ? "border-gray-700 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  disabled={!paymentMethod}
                  className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirm Payment
                </button>
              </div>
            </Card>
          </div>
        )}

        <AlertModal
          open={alertModal.open}
          onClose={() => setAlertModal((prev) => ({ ...prev, open: false }))}
          type={alertModal.type}
          title={alertModal.title}
          message={alertModal.message}
          dm={dm}
        />
      </div>
    );
  }

  if (step === "confirm" && selected) {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("select")} className="flex items-center gap-2 text-sm font-medium text-indigo-600">
          <ChevronLeft className="h-4 w-4" />
          Back to halls
        </button>

        <Card dm={dm}>
          <p className="mb-4 text-sm font-semibold">Confirm Application</p>
          <div className="space-y-3">
            {[
              { label: "Applicant", value: user.name },
              { label: "Matric No.", value: user.matric_no },
              { label: "Gender", value: user.gender },
              { label: "Level", value: `${user.level}L` },
              { label: "Selected Hall", value: selected.name },
              { label: "Availability", value: `${selected.capacity - selected.occupied} beds left` },
            ].map(({ label, value }) => (
              <div key={label} className={`flex justify-between rounded-xl p-3 ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
                <p className={`text-sm ${dm ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            ℹ️ Room assignment will be done automatically after warden approval. You&apos;ll receive your digital QR clearance code once approved.
          </div>
          <button onClick={apply} disabled={applying} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {applying ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card dm={dm}>
        <div className="mb-1 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-indigo-500" />
          <p className="text-sm font-semibold">Hostel Application</p>
        </div>
        <p className={`mb-4 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>Select your preferred hall. Room and bunk are auto-assigned after warden approval.</p>

        <div className="mb-4 flex gap-2 text-xs">
          {[`${user.gender} Halls`, "Available", user.gender].map((filterLabel) => (
            <span key={filterLabel} className="rounded-lg bg-indigo-100 px-2.5 py-1 font-medium text-indigo-700">{filterLabel}</span>
          ))}
        </div>

        <div className="space-y-3">
          {eligibleHostels.map((hostel) => {
            const pct = Math.round((hostel.occupied / hostel.capacity) * 100);
            const full = hostel.occupied >= hostel.capacity;

            return (
              <div
                key={hostel.id}
                className={`rounded-xl border p-4 transition-all ${selected?.id === hostel.id ? "border-indigo-500 bg-indigo-50" : dm ? "border-gray-800 hover:border-gray-700" : "border-gray-200 hover:border-gray-300"} ${full ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">{hostel.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${hostel.gender === "Female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}>{hostel.gender}</span>
                      <span className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{hostel.floors} floors</span>
                      {full && <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">Full</span>}
                    </div>
                  </div>
                  {!full && (
                    <button onClick={() => { setSelected(hostel); setStep("confirm"); }} className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">
                      Apply
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className={dm ? "text-gray-400" : "text-gray-500"}>{hostel.occupied}/{hostel.capacity} occupied</span>
                    <span className={pct >= 90 ? "text-red-500" : pct >= 70 ? "text-amber-500" : "text-emerald-500"}>{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
          {eligibleHostels.length === 0 && (
            <div className={`rounded-xl border p-4 text-sm ${dm ? "border-gray-800 text-gray-300" : "border-gray-200 text-gray-600"}`}>
              No hostels are currently configured for your gender category.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}