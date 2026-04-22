import { Edit2, Mail, MapPin, Phone, Plus, X } from "lucide-react";
import { useState } from "react";
import Card from "../components/common/Card";
import { NEXT_OF_KIN } from "../data/mockData";

export default function NextOfKinPage({ dm }) {
  const [kinList, setKinList] = useState(NEXT_OF_KIN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: "", relationship: "", phone: "", email: "", address: "" });
    setIsModalOpen(true);
  };

  const handleEditClick = (kin) => {
    setEditingId(kin.id);
    setFormData(kin);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setKinList(kinList.filter((k) => k.id !== id));
  };

  const handleSave = () => {
    if (editingId) {
      setKinList(kinList.map((k) => (k.id === editingId ? { ...formData, id: editingId } : k)));
    } else {
      setKinList([...kinList, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>Next of Kin</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Add Contact
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {kinList.map((kin) => (
          <Card key={kin.id} dm={dm} className="card-hover">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{kin.name}</h3>
                <p className="mt-0.5 text-xs text-gray-500">{kin.relationship}</p>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" /> {kin.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" /> {kin.email}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{kin.address}</span>
                  </div>
                </div>
              </div>

              <div className="ml-3 flex flex-col gap-2">
                <button
                  onClick={() => handleEditClick(kin)}
                  className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(kin.id)}
                  className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card dm={dm} className="w-full max-w-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${dm ? "text-white" : "text-gray-900"}`}>
                {editingId ? "Edit Contact" : "Add Next of Kin"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Relationship"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
