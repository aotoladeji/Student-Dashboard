import { RefreshCw, Repeat2 } from "lucide-react";
import Card from "../components/common/Card";
import { LIBRARY } from "../data/mockData";

export default function LibraryPage({ dm }) {
  const borrowedBooks = LIBRARY.filter((book) => book.status === "borrowed");
  const getStatusColor = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return "red";
    if (daysLeft < 3) return "amber";
    return "emerald";
  };

  const BookCard = ({ book }) => {
    const statusColor = getStatusColor(book.dueDate);
    const today = new Date();
    const due = new Date(book.dueDate);
    const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    return (
      <Card dm={dm} className="card-hover">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{book.title}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>
            </div>
            <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
              statusColor === "red"
                ? "bg-red-100 text-red-700"
                : statusColor === "amber"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
            }`}>
              {daysLeft < 0 ? `Overdue ${Math.abs(daysLeft)}d` : `${Math.max(0, daysLeft)}d left`}
            </span>
          </div>

          <div className={`space-y-1.5 border-t pt-3 text-sm ${dm ? "border-gray-700" : "border-gray-200"}`}>
            <p className="text-gray-600">
              <span className="font-medium">Barcode:</span> {book.barcode}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Due:</span> {new Date(book.dueDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Renewals Left:</span> {book.renewalsLeft}
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200">
              <Repeat2 className="h-3.5 w-3.5" /> Renew
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
              <RefreshCw className="h-3.5 w-3.5" /> Return
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className={`mb-4 text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>
          My Books ({borrowedBooks.length})
        </h2>
        <p className="text-sm text-gray-600">Manage your library borrowings and renewals</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p className="col-span-2 text-center text-gray-500">No borrowed books</p>
        )}
      </div>

      <Card dm={dm} className={`space-y-2 ${dm ? "bg-indigo-950/40" : "bg-indigo-50"}`}>
        <h4 className={`font-bold ${dm ? "text-indigo-300" : "text-indigo-900"}`}>📚 Library Information</h4>
        <ul className={`space-y-1 text-xs ${dm ? "text-indigo-200" : "text-indigo-800"}`}>
          <li>✓ Maximum 5 books can be borrowed at a time</li>
          <li>✓ Borrowing period: 14 days</li>
          <li>✓ Renewal available up to 3 times (7 days each)</li>
          <li>✓ Late return fee: ₦50 per book per day</li>
        </ul>
      </Card>
    </div>
  );
}
