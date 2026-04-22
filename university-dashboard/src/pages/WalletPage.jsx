import { ArrowDown, ArrowUp, Clock, Eye, EyeOff, Plus, TrendingUp, Wallet as WalletIcon, X } from "lucide-react";
import { useState } from "react";
import Card from "../components/common/Card";
import AlertModal from "../components/common/AlertModal";
import { WALLET } from "../data/mockData";

export default function WalletPage({ dm }) {
  const [showBalance, setShowBalance] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("fund"); // fund, withdraw
  const [walletBalance, setWalletBalance] = useState(WALLET.balance);
  const [transactions, setTransactions] = useState(WALLET.transactions);
  const [withdrawalRequests, setWithdrawalRequests] = useState(WALLET.withdrawalRequests);
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [fundingChannel, setFundingChannel] = useState("bank");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [withdrawBankName, setWithdrawBankName] = useState("");
  const [withdrawAccountName, setWithdrawAccountName] = useState("");
  const [withdrawAccountNumber, setWithdrawAccountNumber] = useState("");
  const [alertModal, setAlertModal] = useState({ open: false, type: "info", title: "", message: "" });

  const showAlert = (type, title, message) =>
    setAlertModal({ open: true, type, title, message });

  const handleOpenModal = (type) => {
    setModalType(type);
    setAmount("");
    setReason("");
    setFundingChannel("bank");
    setBankName("");
    setAccountName("");
    setAccountNumber("");
    setPaymentReference("");
    setWithdrawBankName("");
    setWithdrawAccountName("");
    setWithdrawAccountNumber("");
    setIsModalOpen(true);
  };

  const handleFund = () => {
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) return;

    if (fundingChannel === "bank") {
      if (!bankName.trim() || !accountName.trim() || !accountNumber.trim() || !paymentReference.trim()) {
        showAlert("warning", "Missing Bank Entry", "Provide bank name, account name, account number, and payment reference to continue.");
        return;
      }

      const pendingFundTxn = {
        id: Date.now(),
        type: "credit",
        description: `Bank Transfer Top-up (${bankName.trim()})`,
        amount: parsedAmount,
        date: new Date().toISOString().slice(0, 10),
        status: "pending",
      };
      setTransactions((prev) => [pendingFundTxn, ...prev]);
      setIsModalOpen(false);
      showAlert(
        "info",
        "Funding Submitted",
        `Your bank transfer entry of ₦${parsedAmount.toLocaleString()} has been submitted for confirmation.`
      );
      return;
    }

    const fundedTxn = {
      id: Date.now(),
      type: "credit",
      description: "Wallet Top-up via Remita",
      amount: parsedAmount,
      date: new Date().toISOString().slice(0, 10),
      status: "completed",
    };
    setTransactions((prev) => [fundedTxn, ...prev]);
    setWalletBalance((prev) => prev + parsedAmount);
    setIsModalOpen(false);
    showAlert(
      "success",
      "Wallet Funded",
      `₦${parsedAmount.toLocaleString()} was funded successfully via Remita.`
    );
  };

  const handleWithdraw = () => {
    const parsedAmount = parseFloat(amount);
    if (!amount || !reason.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    if (!withdrawBankName.trim() || !withdrawAccountName.trim() || !withdrawAccountNumber.trim()) {
      showAlert("warning", "Missing Payout Bank Info", "Provide destination bank name, account name, and account number for this withdrawal.");
      return;
    }

    if (!/^\d{10}$/.test(withdrawAccountNumber.trim())) {
      showAlert("warning", "Invalid Account Number", "Destination account number must be 10 digits.");
      return;
    }

    const now = new Date().toISOString().slice(0, 10);
    const withdrawalTxn = {
      id: Date.now(),
      type: "debit",
      description: `Withdrawal Request (${withdrawBankName.trim()})`,
      amount: parsedAmount,
      date: now,
      status: "pending",
    };
    const withdrawalReq = {
      id: `WR-${Date.now()}`,
      amount: parsedAmount,
      date: now,
      reason: reason.trim(),
      bankName: withdrawBankName.trim(),
      accountName: withdrawAccountName.trim(),
      accountNumber: withdrawAccountNumber.trim(),
      status: "pending",
      approvalDate: null,
    };

    setTransactions((prev) => [withdrawalTxn, ...prev]);
    setWithdrawalRequests((prev) => [withdrawalReq, ...prev]);
    setIsModalOpen(false);
    showAlert(
      "warning",
      "Withdrawal Requested",
      `Withdrawal of ₦${parsedAmount.toLocaleString()} is awaiting admin approval.`
    );
  };

  const filteredTransactions = transactions.filter((txn) => {
    if (transactionFilter === "all") return true;
    if (transactionFilter === "credit") return txn.type === "credit";
    if (transactionFilter === "debit") return txn.type === "debit";
    if (transactionFilter === "pending") return txn.status === "pending";
    return true;
  });

  const getStatusColor = (status) => {
    if (status === "completed") return "emerald";
    if (status === "pending") return "amber";
    if (status === "rejected") return "red";
    return "blue";
  };

  const getTransactionIcon = (type) => {
    return type === "credit" ? (
      <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
        <ArrowUp className="h-4 w-4" />
      </div>
    ) : (
      <div className="rounded-lg bg-rose-100 p-2 text-rose-600">
        <ArrowDown className="h-4 w-4" />
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Balance Card */}
      <Card dm={dm} className="bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-200">Available Balance</p>
              <div className="mt-1 flex items-center gap-3">
                <h2 className="text-3xl font-bold text-white">
                    {showBalance ? `₦${walletBalance.toLocaleString()}` : "••••••••"}
                </h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="rounded-lg bg-white/20 p-2 backdrop-blur hover:bg-white/30"
                >
                  {showBalance ? <EyeOff className="h-4 w-4 text-white" /> : <Eye className="h-4 w-4 text-white" />}
                </button>
              </div>
            </div>
            <WalletIcon className="h-12 w-12 text-white/30" />
          </div>

          <div className="border-t border-white/20 pt-3">
            <p className="text-xs text-indigo-200">Account Number: {WALLET.accountNumber}</p>
            <p className="text-xs text-indigo-200">Bank: {WALLET.bank}</p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleOpenModal("fund")}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" /> Fund Wallet
        </button>
        <button
          onClick={() => handleOpenModal("withdraw")}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
        >
          <ArrowUp className="h-4 w-4" /> Withdraw
        </button>
      </div>

      {/* Transactions Section */}
      <div>
        <h3 className={`mb-3 flex items-center gap-2 font-bold ${dm ? "text-white" : "text-gray-900"}`}>
          <TrendingUp className="h-5 w-5" /> Transaction History
        </h3>

        <div className="mb-3 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All" },
            { id: "credit", label: "Credits" },
            { id: "debit", label: "Debits" },
            { id: "pending", label: "Pending" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setTransactionFilter(f.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${transactionFilter === f.id ? "bg-indigo-600 text-white" : dm ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filteredTransactions.map((txn) => (
            <Card key={txn.id} dm={dm} className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTransactionIcon(txn.type)}
                  <div>
                    <p className={`text-sm font-medium ${dm ? "text-white" : "text-gray-900"}`}>{txn.description}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-bold ${
                    txn.type === "credit"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}>
                    {txn.type === "credit" ? "+" : "-"}₦{Math.abs(txn.amount).toLocaleString()}
                  </p>
                  <span className={`text-xs font-medium capitalize ${
                    getStatusColor(txn.status) === "emerald"
                      ? "text-emerald-600"
                      : getStatusColor(txn.status) === "amber"
                        ? "text-amber-600"
                        : "text-blue-600"
                  }`}>
                    {txn.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
          {filteredTransactions.length === 0 && (
            <Card dm={dm}>
              <p className={`text-sm ${dm ? "text-gray-300" : "text-gray-600"}`}>No transactions found for this filter.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Withdrawal Requests */}
      <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
        <h3 className={`mb-3 flex items-center gap-2 font-bold ${dm ? "text-white" : "text-gray-900"}`}>
          <Clock className="h-5 w-5" /> Withdrawal Requests
        </h3>

        <div className="space-y-2">
          {withdrawalRequests.map((req) => (
            <Card key={req.id} dm={dm} className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${dm ? "text-white" : "text-gray-900"}`}>₦{req.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{req.reason} • {req.date}</p>
                  <p className="text-xs text-gray-500">To: {req.bankName || "N/A"} • {req.accountName || "N/A"} ({req.accountNumber || "N/A"})</p>
                </div>

                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                  req.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : req.status === "approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                }`}>
                  {req.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card dm={dm} className="w-full max-w-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${dm ? "text-white" : "text-gray-900"}`}>
                {modalType === "fund" ? "Fund Your Wallet" : "Request Withdrawal"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Amount (₦)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {modalType === "withdraw" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600">Reason for Withdrawal</label>
                    <textarea
                      placeholder="Enter reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600">Destination Bank Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Access Bank"
                      value={withdrawBankName}
                      onChange={(e) => setWithdrawBankName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600">Destination Account Name</label>
                    <input
                      type="text"
                      placeholder="Recipient account name"
                      value={withdrawAccountName}
                      onChange={(e) => setWithdrawAccountName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600">Destination Account Number</label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="10-digit account number"
                      value={withdrawAccountNumber}
                      onChange={(e) => setWithdrawAccountNumber(e.target.value.replace(/\D/g, ""))}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <p className="text-xs text-gray-500">⚠️ Withdrawal requires approval and valid destination bank details.</p>
                </div>
              )}

              {modalType === "fund" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600">Funding Method</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFundingChannel("bank")}
                        type="button"
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${fundingChannel === "bank" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
                      >
                        Bank Transfer
                      </button>
                      <button
                        onClick={() => setFundingChannel("remita")}
                        type="button"
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${fundingChannel === "remita" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
                      >
                        Remita
                      </button>
                    </div>
                  </div>

                  {fundingChannel === "bank" ? (
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs font-medium text-gray-600">Bank Name</label>
                        <input
                          type="text"
                          placeholder="e.g. GTBank"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Account Name</label>
                        <input
                          type="text"
                          placeholder="Sender account name"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Account Number</label>
                        <input
                          type="text"
                          placeholder="Sender account number"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Payment Reference</label>
                        <input
                          type="text"
                          placeholder="Bank transfer reference"
                          value={paymentReference}
                          onChange={(e) => setPaymentReference(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`rounded-lg p-3 text-xs border ${dm ? "bg-slate-900/40 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                      Remita funding is processed instantly and updates your wallet balance once confirmed.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={modalType === "fund" ? handleFund : handleWithdraw}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                {modalType === "fund" ? "Fund Now" : "Request Withdrawal"}
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Info Box */}
      <Card dm={dm} className={`space-y-2 rounded-lg p-3 ${dm ? "bg-slate-900/40" : "bg-slate-50"} border ${dm ? "border-slate-700" : "border-slate-200"}`}>
        <h4 className={`font-bold ${dm ? "text-slate-200" : "text-slate-900"}`}>💳 Wallet Features</h4>
        <ul className={`space-y-1 text-xs ${dm ? "text-slate-300" : "text-slate-700"}`}>
          <li>✓ Fund from bank accounts, ATM, or mobile money</li>
          <li>✓ Pay tuition, hostel fees & other school charges without approval</li>
          <li>✓ Withdrawals require admin approval</li>
          <li>✓ Track all transactions in real-time</li>
        </ul>
      </Card>

      <AlertModal
        open={alertModal.open}
        onClose={() => setAlertModal((p) => ({ ...p, open: false }))}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        dm={dm}
      />
    </div>
  );
}
