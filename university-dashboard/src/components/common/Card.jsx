export default function Card({ children, className = "", dm, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-4 ${dm ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"} ${className}`}
    >
      {children}
    </div>
  );
}