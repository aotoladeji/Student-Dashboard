import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, X, Wallet, CreditCard, Printer, Eye } from "lucide-react";
import Card from "../components/common/Card";
import AlertModal from "../components/common/AlertModal";
import { FEES, MOCK_USER } from "../data/mockData";

// Receipt ref IDs keyed by fee id (static mock)
const RECEIPT_REFS = { 1: "RCT-2025-00101", 2: "RCT-2025-00102", 3: "RCT-2025-00103" };

export default function FeesPage({ dm }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [receiptFee, setReceiptFee] = useState(null);
  const [alertModal, setAlertModal] = useState({ open: false, type: "info", title: "", message: "" });

  const showAlert = (type, title, message) =>
    setAlertModal({ open: true, type, title, message });

  const paidFees = FEES.filter((fee) => fee.status === "paid");
  const pendingFees = FEES.filter((fee) => fee.status === "pending");

  const totalRequired = FEES.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = paidFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPending = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);

  const handlePayClick = (fee) => {
    setSelectedFee(fee);
    setPaymentMethod(null);
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (paymentMethod) {
      setIsPaymentModalOpen(false);
      showAlert(
        "success",
        "Payment Initiated",
        `Your payment of ₦${selectedFee.amount.toLocaleString()} via ${paymentMethod} has been initiated successfully.`
      );
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card dm={dm}>
          <p className="text-xs text-gray-500">All Required Fees</p>
          <p className={`mt-1 text-2xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>₦{totalRequired.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-500">{FEES.length} item(s)</p>
        </Card>

        <Card dm={dm}>
          <p className="text-xs text-gray-500">Paid Fees</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">₦{totalPaid.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-500">{paidFees.length} item(s)</p>
        </Card>

        <Card dm={dm}>
          <p className="text-xs text-gray-500">Pending Fees</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">₦{totalPending.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-500">{pendingFees.length} item(s)</p>
        </Card>
      </div>

      <div>
        <h2 className={`mb-3 text-lg font-bold ${dm ? "text-white" : "text-gray-900"}`}>Pending Fees</h2>
        <div className="space-y-2">
          {pendingFees.length > 0 ? (
            pendingFees.map((fee) => (
              <Card key={fee.id} dm={dm} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{fee.title}</p>
                    <p className="text-xs text-gray-500">{fee.category} • Due {fee.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-600">₦{fee.amount.toLocaleString()}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        <Clock3 className="h-3 w-3" /> Pending
                      </span>
                      <button
                        onClick={() => handlePayClick(fee)}
                        className="rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card dm={dm}>
              <p className="text-sm text-emerald-600">No pending fee at the moment.</p>
            </Card>
          )}
        </div>
      </div>

      <div>
        <h2 className={`mb-3 text-lg font-bold ${dm ? "text-white" : "text-gray-900"}`}>Paid Fees</h2>
        <div className="space-y-2">
          {paidFees.map((fee) => (
            <Card key={fee.id} dm={dm} className="py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>{fee.title}</p>
                  <p className="text-xs text-gray-500">{fee.category} • Paid {fee.paidDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">₦{fee.amount.toLocaleString()}</p>
                  <div className="mt-2 flex flex-col gap-1 items-end">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" /> Paid
                    </span>
                    <button
                      onClick={() => setReceiptFee(fee)}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <Eye className="h-3 w-3" /> Receipt
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card dm={dm} className={`${dm ? "bg-slate-900/40" : "bg-slate-50"} border ${dm ? "border-slate-700" : "border-slate-200"}`}>
        <div className="flex items-start gap-2">
          <AlertCircle className={`mt-0.5 h-4 w-4 ${dm ? "text-slate-400" : "text-slate-600"}`} />
          <p className={`text-xs ${dm ? "text-slate-300" : "text-slate-700"}`}>
            Fees in this page are grouped into all required fees, pending fees, and paid fees for quick tracking.
          </p>
        </div>
      </Card>

      {/* Payment Verification Dialog */}
      {isPaymentModalOpen && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <Card dm={dm} className="w-full max-w-md space-y-4 my-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${dm ? "text-white" : "text-gray-900"}`}>Verify & Pay</h3>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className={`p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Student Information */}
            <div className={`space-y-2 rounded-lg p-3 ${dm ? "bg-slate-900/40" : "bg-slate-50"}`}>
              <h4 className={`text-xs font-bold uppercase ${dm ? "text-slate-300" : "text-slate-600"}`}>
                Student Information
              </h4>
              <div className="space-y-1.5">
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                    {MOCK_USER.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Matric Number</p>
                  <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                    {MOCK_USER.matric_no}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                    {MOCK_USER.department}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Faculty</p>
                  <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                    {MOCK_USER.faculty}
                  </p>
                </div>
              </div>
            </div>

            {/* Fee Details */}
            <div className={`space-y-2 rounded-lg p-3 ${dm ? "bg-slate-900/40" : "bg-slate-50"}`}>
              <h4 className={`text-xs font-bold uppercase ${dm ? "text-slate-300" : "text-slate-600"}`}>
                Fee Details
              </h4>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500">Fee Type</p>
                  <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                    {selectedFee.title}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500">Category</p>
                  <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                    {selectedFee.category}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                  <div className="flex justify-between">
                    <p className={`text-sm font-bold ${dm ? "text-white" : "text-gray-900"}`}>Amount</p>
                    <p className="text-lg font-bold text-amber-600">₦{selectedFee.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <h4 className={`text-xs font-bold uppercase ${dm ? "text-slate-300" : "text-slate-600"}`}>
                Select Payment Method
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod("Remita")}
                  className={`w-full flex items-center gap-3 rounded-lg border-2 p-3 transition ${
                    paymentMethod === "Remita"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : dm
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className={`h-5 w-5 ${paymentMethod === "Remita" ? "text-blue-600" : ""}`} />
                  <div className="text-left">
                    <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                      Remita
                    </p>
                    <p className="text-xs text-gray-500">Online payment platform</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("Wallet")}
                  className={`w-full flex items-center gap-3 rounded-lg border-2 p-3 transition ${
                    paymentMethod === "Wallet"
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                      : dm
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Wallet className={`h-5 w-5 ${paymentMethod === "Wallet" ? "text-emerald-600" : ""}`} />
                  <div className="text-left">
                    <p className={`text-sm font-semibold ${dm ? "text-white" : "text-gray-900"}`}>
                      Student Wallet
                    </p>
                    <p className="text-xs text-gray-500">Pay from your account</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  dm
                    ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={!paymentMethod}
                className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Payment
              </button>
            </div>
          </Card>
        </div>
      )}

      <AlertModal
        open={alertModal.open}
        onClose={() => setAlertModal((p) => ({ ...p, open: false }))}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        dm={dm}
      />

      {/* Receipt Dialog */}
      {receiptFee && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="w-full max-w-md my-auto">
            {/* Screen-only close bar */}
            <div className="mb-2 flex justify-end print:hidden">
              <button
                onClick={() => setReceiptFee(null)}
                className="rounded-full bg-white p-1 shadow hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Receipt — white always for print clarity */}
            <div id="fee-receipt" className="rounded-xl bg-white p-6 shadow-xl text-gray-900 space-y-5">
              {/* Header */}
              <div className="text-center border-b border-dashed border-gray-300 pb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">University Portal</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">Fee Payment Receipt</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Ref: <span className="font-mono font-semibold">{RECEIPT_REFS[receiptFee.id] ?? "RCT-2025-XXXXX"}</span>
                </p>
              </div>

              {/* Student Info */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Student Details</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-semibold text-right">{MOCK_USER.name}</span>
                  <span className="text-gray-500">Matric No.</span>
                  <span className="font-semibold text-right font-mono">{MOCK_USER.matric_no}</span>
                  <span className="text-gray-500">Department</span>
                  <span className="font-semibold text-right">{MOCK_USER.department}</span>
                  <span className="text-gray-500">Faculty</span>
                  <span className="font-semibold text-right">{MOCK_USER.faculty}</span>
                </div>
              </div>

              {/* Fee Info */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Payment Details</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <span className="text-gray-500">Fee Type</span>
                  <span className="font-semibold text-right">{receiptFee.title}</span>
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-right">{receiptFee.category}</span>
                  <span className="text-gray-500">Date Paid</span>
                  <span className="font-semibold text-right">{receiptFee.paidDate}</span>
                  <span className="text-gray-500">Status</span>
                  <span className="font-semibold text-right text-emerald-600">Paid ✓</span>
                </div>
              </div>

              {/* Amount */}
              <div className="rounded-lg bg-emerald-50 p-3 flex justify-between items-center border border-emerald-200">
                <span className="text-sm font-bold text-gray-700">Amount Paid</span>
                <span className="text-2xl font-bold text-emerald-600">₦{receiptFee.amount.toLocaleString()}</span>
              </div>

              {/* Footer */}
              <p className="text-center text-[10px] text-gray-400 border-t border-dashed border-gray-300 pt-3">
                This receipt was auto-generated by the University Student Portal.<br />
                Keep a copy for your records.
              </p>

              {/* Print button — hidden when printing */}
              <button
                onClick={() => window.print()}
                className="print:hidden w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
              >
                <Printer className="h-4 w-4" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
