import { MessageSquare, Plus } from "lucide-react";
import { useState } from "react";
import Card from "../components/common/Card";
import { TICKETS } from "../data/mockData";

const statusColor = {
  Open: "bg-amber-100 text-amber-700",
  Resolved: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-blue-100 text-blue-700",
};

export default function TicketsPage({ dm }) {
  const [tickets, setTickets] = useState(TICKETS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: "Result Issue", description: "" });

  const submit = () => {
    if (!form.description.trim()) return;

    const id = `TKT-${Math.floor(2400 + Math.random() * 100)}`;
    setTickets((currentTickets) => [
      {
        id,
        category: form.category,
        description: form.description,
        status: "Open",
        date: new Date().toISOString().split("T")[0],
      },
      ...currentTickets,
    ]);
    setForm({ category: "Result Issue", description: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Support Tickets</p>
          <p className={`text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{tickets.filter((ticket) => ticket.status === "Open").length} open tickets</p>
        </div>
        <button onClick={() => setShowForm((value) => !value)} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          New Ticket
        </button>
      </div>

      {showForm && (
        <Card dm={dm} className="border-indigo-200">
          <p className="mb-3 text-sm font-semibold">Open New Ticket</p>
          <div className="space-y-3">
            <div>
              <label className={`mb-1 block text-xs font-medium ${dm ? "text-gray-400" : "text-gray-600"}`}>Category</label>
              <select
                value={form.category}
                onChange={(event) => setForm((currentForm) => ({ ...currentForm, category: event.target.value }))}
                className={`w-full rounded-xl border p-2.5 text-sm focus:border-indigo-400 focus:outline-none ${dm ? "border-gray-700 bg-gray-800 text-white" : "border-gray-200 bg-white"}`}
              >
                {["Result Issue", "ID Card", "Portal Access", "Hostel Complaint", "Bursary", "Other"].map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`mb-1 block text-xs font-medium ${dm ? "text-gray-400" : "text-gray-600"}`}>Description</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((currentForm) => ({ ...currentForm, description: event.target.value }))}
                rows={3}
                placeholder="Describe your issue in detail..."
                className={`w-full resize-none rounded-xl border p-2.5 text-sm focus:border-indigo-400 focus:outline-none ${dm ? "border-gray-700 bg-gray-800 text-white placeholder-gray-500" : "border-gray-200 bg-white"}`}
              />
            </div>

            <div className="flex gap-2">
              <button onClick={submit} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Submit Ticket</button>
              <button onClick={() => setShowForm(false)} className={`rounded-xl px-4 py-2 text-sm font-medium ${dm ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>Cancel</button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <Card key={ticket.id} dm={dm} className="card-hover">
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${ticket.status === "Resolved" ? "bg-emerald-100" : ticket.status === "In Progress" ? "bg-blue-100" : "bg-amber-100"}`}>
                <MessageSquare className={`h-5 w-5 ${ticket.status === "Resolved" ? "text-emerald-600" : ticket.status === "In Progress" ? "text-blue-600" : "text-amber-600"}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-indigo-600">{ticket.id}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[ticket.status]}`}>{ticket.status}</span>
                </div>
                <p className="mt-0.5 text-sm font-semibold">{ticket.category}</p>
                <p className={`mt-0.5 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{ticket.description}</p>
                <p className={`mt-1 text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{ticket.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}