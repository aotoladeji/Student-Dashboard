import { useState } from "react";

const CARD_TYPES = [
  { id: "student", label: "Student ID Card" },
  { id: "library", label: "Library Card" },
  { id: "hostel", label: "Hostel Card" },
];

const PURPOSE_OPTIONS = [
  { value: "missing", label: "Missing" },
  { value: "damaged", label: "Damaged" },
  { value: "expired", label: "Expired" },
  { value: "name_correction", label: "Name Correction" },
  { value: "replacement", label: "Replacement" },
];

export default function RequestCardPage({ dm }) {
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [requestForm, setRequestForm] = useState({
    cardType: "student",
    purpose: "missing",
    reasonDetails: "",
    receiptFile: null,
    affidavitFile: null,
  });
  const [requests, setRequests] = useState([]);

  const handleRequestFieldChange = (field, value) => {
    setFormError("");
    setFormSuccess("");
    setRequestForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!requestForm.cardType || !requestForm.purpose || !requestForm.receiptFile) {
      setFormError("Card type, request purpose, and payment receipt are required.");
      return;
    }

    const cardLabel = CARD_TYPES.find((tab) => tab.id === requestForm.cardType)?.label || "ID Card";
    const purposeLabel = PURPOSE_OPTIONS.find((item) => item.value === requestForm.purpose)?.label || requestForm.purpose;

    const newRequest = {
      id: `REQ-${Date.now()}`,
      cardLabel,
      purpose: purposeLabel,
      reasonDetails: requestForm.reasonDetails,
      receiptName: requestForm.receiptFile.name,
      affidavitName: requestForm.affidavitFile ? requestForm.affidavitFile.name : "Not provided",
      submittedAt: new Date().toLocaleString(),
      status: "Submitted",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setRequestForm((prev) => ({
      ...prev,
      purpose: "missing",
      reasonDetails: "",
      receiptFile: null,
      affidavitFile: null,
    }));
    setFormSuccess("Card request submitted successfully.");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h2 className={`text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>Request Card</h2>
        <p className={`mt-1 text-sm ${dm ? "text-gray-400" : "text-gray-500"}`}>
          Submit your card request here with all required documents.
        </p>
      </div>

      <div className={`rounded-2xl border p-4 space-y-4 ${dm ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`text-base font-bold ${dm ? "text-white" : "text-gray-900"}`}>Card Request Submission</h3>
            <p className={`text-xs mt-1 ${dm ? "text-gray-400" : "text-gray-500"}`}>
              Attach payment receipt and any supporting affidavit.
            </p>
          </div>
          {requestForm.cardType === "student" && (
            <span className="rounded-full border border-indigo-300 bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-700">
              Smart Card Request
            </span>
          )}
        </div>

        <form className="space-y-3" onSubmit={handleRequestSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className={`text-xs font-semibold ${dm ? "text-gray-300" : "text-gray-700"}`}>Card Type</span>
              <select
                value={requestForm.cardType}
                onChange={(event) => handleRequestFieldChange("cardType", event.target.value)}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                  dm ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {CARD_TYPES.map((tab) => (
                  <option key={tab.id} value={tab.id}>{tab.label}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1">
              <span className={`text-xs font-semibold ${dm ? "text-gray-300" : "text-gray-700"}`}>Purpose of Request</span>
              <select
                value={requestForm.purpose}
                onChange={(event) => handleRequestFieldChange("purpose", event.target.value)}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                  dm ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {PURPOSE_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-1">
            <span className={`text-xs font-semibold ${dm ? "text-gray-300" : "text-gray-700"}`}>Request Details (Optional)</span>
            <textarea
              value={requestForm.reasonDetails}
              onChange={(event) => handleRequestFieldChange("reasonDetails", event.target.value)}
              rows={3}
              placeholder="Add more context for your request..."
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none ${
                dm
                  ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              }`}
            />
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="block space-y-1">
              <span className={`text-xs font-semibold ${dm ? "text-gray-300" : "text-gray-700"}`}>
                Upload Receipt / Proof of Payment <span className="text-rose-500">*</span>
              </span>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => handleRequestFieldChange("receiptFile", event.target.files?.[0] || null)}
                className={`w-full rounded-lg border px-3 py-2 text-xs outline-none file:mr-3 file:rounded-md file:border-0 file:px-2 file:py-1 file:text-xs file:font-semibold ${
                  dm
                    ? "bg-gray-800 border-gray-700 text-gray-300 file:bg-gray-700 file:text-gray-100"
                    : "bg-white border-gray-300 text-gray-700 file:bg-gray-100 file:text-gray-700"
                }`}
              />
            </label>

            <label className="block space-y-1">
              <span className={`text-xs font-semibold ${dm ? "text-gray-300" : "text-gray-700"}`}>Upload Affidavit (If Available)</span>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => handleRequestFieldChange("affidavitFile", event.target.files?.[0] || null)}
                className={`w-full rounded-lg border px-3 py-2 text-xs outline-none file:mr-3 file:rounded-md file:border-0 file:px-2 file:py-1 file:text-xs file:font-semibold ${
                  dm
                    ? "bg-gray-800 border-gray-700 text-gray-300 file:bg-gray-700 file:text-gray-100"
                    : "bg-white border-gray-300 text-gray-700 file:bg-gray-100 file:text-gray-700"
                }`}
              />
            </label>
          </div>

          {(requestForm.receiptFile || requestForm.affidavitFile) && (
            <div className={`rounded-lg border px-3 py-2 text-xs ${dm ? "border-gray-700 bg-gray-800 text-gray-300" : "border-gray-200 bg-gray-50 text-gray-600"}`}>
              <p>Receipt: {requestForm.receiptFile ? requestForm.receiptFile.name : "Not selected"}</p>
              <p>Affidavit: {requestForm.affidavitFile ? requestForm.affidavitFile.name : "Not selected"}</p>
            </div>
          )}

          {formError && (
            <p className={`rounded-lg px-3 py-2 text-xs font-medium ${dm ? "bg-red-900/40 text-red-200" : "bg-red-50 text-red-700"}`}>
              {formError}
            </p>
          )}

          {formSuccess && (
            <p className={`rounded-lg px-3 py-2 text-xs font-medium ${dm ? "bg-emerald-900/30 text-emerald-200" : "bg-emerald-50 text-emerald-700"}`}>
              {formSuccess}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-linear-to-r from-indigo-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Submit Card Request
          </button>
        </form>

        {requests.length > 0 && (
          <div className={`rounded-xl border px-3 py-3 text-xs ${dm ? "border-emerald-700 bg-emerald-900/30 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
            <p className="font-semibold text-sm">Request Submitted Successfully</p>
            <p className="mt-1">Ticket: {requests[0].id}</p>
            <p>Card Type: {requests[0].cardLabel}</p>
            <p>Purpose: {requests[0].purpose}</p>
            <p>Submitted: {requests[0].submittedAt}</p>
            <p>Receipt: {requests[0].receiptName}</p>
            <p>Affidavit: {requests[0].affidavitName}</p>
            <p>Status: {requests[0].status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
