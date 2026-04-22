import { useMemo, useRef, useState } from "react";
import { FlipHorizontal2, Download } from "lucide-react";
import { ID_CARDS, MOCK_USER } from "../data/mockData";

export default function IDCardsPage({ dm }) {
  const [activeCard, setActiveCard] = useState("student");
  const [flipped, setFlipped] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const frontExportRef = useRef(null);
  const backExportRef = useRef(null);

  const tabs = [
    { id: "student", label: "Student ID Card" },
    { id: "library", label: "Library Card" },
    { id: "hostel", label: "Hostel Card" },
  ];

  const user = MOCK_USER;

  const cardMeta = useMemo(() => {
    const studentData = ID_CARDS.find((card) => card.cardType === "Student ID");
    const libraryData = ID_CARDS.find((card) => card.cardType === "Library Card");
    const hostelData = ID_CARDS.find((card) => card.cardType === "Hostel Card");

    return {
      student: {
        status: studentData?.status ?? "collected",
        number: studentData?.cardNumber ?? "UIB-230100001",
      },
      library: {
        status: libraryData?.status ?? "collected",
        number: libraryData?.cardNumber ?? "LIB-230100001",
      },
      hostel: {
        status: hostelData?.status ?? "not_collected",
        number: hostelData?.cardNumber ?? "HST-240100001",
      },
    };
  }, []);

  const StatusBadge = ({ status }) => (
    <span
      className={`absolute top-3 right-3 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
        status === "collected"
          ? "bg-emerald-100/95 text-emerald-800 border-emerald-300"
          : "bg-amber-100/95 text-amber-800 border-amber-300"
      }`}
    >
      {status === "collected" ? "Collected" : "Yet to Collect"}
    </span>
  );

  /* ── STUDENT ID CARD ── */
  const StudentFront = () => (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-indigo-700 via-indigo-600 to-purple-700 text-white flex flex-col p-5 select-none">
      <StatusBadge status={cardMeta.student.status} />
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80">University of Ibadan</p>
          <p className="text-[9px] opacity-60">Student Identity Card</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold border border-white/30">
          🎓
        </div>
      </div>

      {/* Avatar + Info */}
      <div className="flex gap-4 flex-1 items-center">
        <div className="w-16 h-20 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold shrink-0">
          {user.avatar}
        </div>
        <div className="space-y-1 min-w-0">
          <p className="font-bold text-base leading-tight">{user.name}</p>
          <p className="text-[11px] opacity-80">{user.department}</p>
          <p className="text-[11px] opacity-80">Faculty of {user.faculty}</p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Matric No.</p>
              <p className="text-[11px] font-semibold">{user.matric_no}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Level</p>
              <p className="text-[11px] font-semibold">{user.level}L</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
        <p className="text-[10px] opacity-70">{cardMeta.student.number}</p>
        <p className="text-[10px] opacity-70">Expires: Oct 2026</p>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
    </div>
  );

  const StudentBack = () => (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-indigo-800 via-indigo-700 to-purple-800 text-white flex flex-col p-5 select-none">
      <StatusBadge status={cardMeta.student.status} />
      <div className="mb-3">
        <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80">University of Ibadan</p>
        <p className="text-[9px] opacity-60">Ibadan, Oyo State, Nigeria</p>
      </div>

      {/* Barcode strip */}
      <div className="bg-white rounded-lg p-2 flex items-center justify-center mb-3">
        <div className="flex gap-px h-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="bg-gray-900" style={{ width: i % 3 === 0 ? "3px" : "1.5px" }} />
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] text-white/70 mb-3">{cardMeta.student.number} | {user.matric_no}</p>

      <div className="space-y-1.5 text-[10px] flex-1">
        <p className="opacity-80">📞 Emergency: 08012345678</p>
        <p className="opacity-80">📧 {user.email}</p>
      </div>

      <div className={`mt-3 pt-3 border-t border-white/20 text-[9px] opacity-60`}>
        <p>This card is the property of University of Ibadan. If found, please return to the Student Affairs Division.</p>
      </div>
    </div>
  );

  /* ── LIBRARY CARD ── */
  const LibraryFront = () => (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-emerald-700 via-teal-600 to-cyan-700 text-white flex flex-col p-5 select-none">
      <StatusBadge status={cardMeta.library.status} />
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80">University of Ibadan</p>
          <p className="text-[10px] font-bold">Central Library</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm border border-white/30">
          📚
        </div>
      </div>

      <div className="flex gap-4 flex-1 items-center">
        <div className="w-16 h-20 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold shrink-0">
          {user.avatar}
        </div>
        <div className="space-y-1 min-w-0">
          <p className="font-bold text-base leading-tight">{user.name}</p>
          <p className="text-[11px] opacity-80">{user.department}</p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Library ID</p>
              <p className="text-[11px] font-semibold">{cardMeta.library.number}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Matric No.</p>
              <p className="text-[11px] font-semibold">{user.matric_no}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Max Books</p>
              <p className="text-[11px] font-semibold">5</p>
            </div>
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Level</p>
              <p className="text-[11px] font-semibold">{user.level}L</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
        <p className="text-[10px] opacity-70">Issued: Oct 2023</p>
        <p className="text-[10px] opacity-70">Expires: Oct 2026</p>
      </div>

      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
    </div>
  );

  const LibraryBack = () => (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-emerald-800 via-teal-700 to-cyan-800 text-white flex flex-col p-5 select-none">
      <StatusBadge status={cardMeta.library.status} />
      <div className="mb-3">
        <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80">University of Ibadan Library</p>
        <p className="text-[9px] opacity-60">library@ui.edu.ng | +234-02-000-0000</p>
      </div>

      <div className="bg-white rounded-lg p-2 flex items-center justify-center mb-3">
        <div className="flex gap-px h-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="bg-gray-900" style={{ width: i % 4 === 0 ? "3px" : "1.5px" }} />
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] text-white/70 mb-3">{cardMeta.library.number}</p>

      <div className="space-y-1 text-[10px] flex-1 opacity-80">
        <p>📌 Borrowing period: 14 days</p>
        <p>📌 Maximum books: 5 at a time</p>
        <p>📌 Renewals: Up to 3 times</p>
        <p>📌 Late fee: ₦50/book/day</p>
      </div>

      <div className="mt-3 pt-3 border-t border-white/20 text-[9px] opacity-60">
        <p>This card grants access to all University of Ibadan library resources. Not transferable.</p>
      </div>
    </div>
  );

  /* ── HOSTEL CARD ── */
  const HostelFront = () => (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-rose-600 via-pink-600 to-fuchsia-700 text-white flex flex-col p-5 select-none">
      <StatusBadge status={cardMeta.hostel.status} />
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80">University of Ibadan</p>
          <p className="text-[10px] font-bold">Student Hostel Card</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm border border-white/30">
          🏠
        </div>
      </div>

      <div className="flex gap-4 flex-1 items-center">
        <div className="w-16 h-20 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold shrink-0">
          {user.avatar}
        </div>
        <div className="space-y-1 min-w-0">
          <p className="font-bold text-base leading-tight">{user.name}</p>
          <p className="text-[11px] opacity-80">{user.department}</p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Hostel</p>
              <p className="text-[11px] font-semibold">{user.hall}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Matric No.</p>
              <p className="text-[11px] font-semibold">{user.matric_no}</p>
            </div>
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Session</p>
              <p className="text-[11px] font-semibold">2024/2025</p>
            </div>
            <div>
              <p className="text-[9px] opacity-60 uppercase tracking-wide">Level</p>
              <p className="text-[11px] font-semibold">{user.level}L</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
        <p className="text-[10px] opacity-70">{cardMeta.hostel.number}</p>
        <p className="text-[10px] opacity-70">Valid: 2024/2025 Session</p>
      </div>

      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
    </div>
  );

  const HostelBack = () => (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-rose-800 via-pink-700 to-fuchsia-800 text-white flex flex-col p-5 select-none">
      <StatusBadge status={cardMeta.hostel.status} />
      <div className="mb-3">
        <p className="text-[10px] font-semibold tracking-widest uppercase opacity-80">{user.hall}</p>
        <p className="text-[9px] opacity-60">Student Affairs Division, UI</p>
      </div>

      <div className="bg-white rounded-lg p-2 flex items-center justify-center mb-3">
        <div className="flex gap-px h-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="bg-gray-900" style={{ width: i % 5 === 0 ? "3px" : "1.5px" }} />
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] text-white/70 mb-3">{cardMeta.hostel.number} | {user.matric_no}</p>

      <div className="space-y-1 text-[10px] flex-1 opacity-80">
        <p>📌 Present card at hostel gate for access</p>
        <p>📌 Visitors allowed: 8am – 8pm only</p>
        <p>📌 Card is non-transferable</p>
        <p>📌 Emergency: Porters Lodge ext. 100</p>
      </div>

      <div className="mt-3 pt-3 border-t border-white/20 text-[9px] opacity-60">
        <p>This card is the property of the University of Ibadan. Loss must be reported to the Student Affairs Office immediately.</p>
      </div>
    </div>
  );

  const cardMap = {
    student: { front: <StudentFront />, back: <StudentBack /> },
    library: { front: <LibraryFront />, back: <LibraryBack /> },
    hostel: { front: <HostelFront />, back: <HostelBack /> },
  };

  const handleTabChange = (id) => {
    setActiveCard(id);
    setFlipped(false);
  };

  const handleSavePdf = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);

      const renderFaceToImage = async (node) => {
        const canvas = await html2canvas(node, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          logging: false,
        });
        return {
          dataUrl: canvas.toDataURL("image/png"),
          width: canvas.width,
          height: canvas.height,
        };
      };

      if (!frontExportRef.current || !backExportRef.current) {
        throw new Error("Card export surface is not ready.");
      }

      const frontImage = await renderFaceToImage(frontExportRef.current);
      const backImage = await renderFaceToImage(backExportRef.current);

      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const addImagePage = (image, title) => {
        const margin = 24;
        const titleY = 28;
        const imageTop = 42;
        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - imageTop - margin;
        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
        const drawWidth = image.width * ratio;
        const drawHeight = image.height * ratio;
        const x = (pageWidth - drawWidth) / 2;
        const y = imageTop + (maxHeight - drawHeight) / 2;

        pdf.setFontSize(13);
        pdf.text(title, margin, titleY);
        pdf.addImage(image.dataUrl, "PNG", x, y, drawWidth, drawHeight);
      };

      const selectedLabel = tabs.find((tab) => tab.id === activeCard)?.label || "ID Card";
      addImagePage(frontImage, `${selectedLabel} - Front`);
      pdf.addPage();
      addImagePage(backImage, `${selectedLabel} - Back`);

      pdf.save(`${selectedLabel.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Unable to export card PDF", error);
      window.alert("Could not generate PDF right now. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Page title */}
      <div>
        <h2 className={`text-xl font-bold ${dm ? "text-white" : "text-gray-900"}`}>My ID Cards</h2>
        <p className={`text-sm mt-1 ${dm ? "text-gray-400" : "text-gray-500"}`}>Tap the card or use the flip button to see front & back</p>
      </div>

      {/* Tabs */}
      <div className={`flex rounded-xl p-1 gap-1 ${dm ? "bg-gray-800" : "bg-gray-100"}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeCard === tab.id
                ? "bg-indigo-600 text-white shadow"
                : dm
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card display */}
      <div className="space-y-3">
        {/* Side label */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold ${dm ? "text-gray-300" : "text-gray-700"}`}>
            {flipped ? "Back Side" : "Front Side"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setFlipped((f) => !f)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 transition-all"
            >
              <FlipHorizontal2 className="h-3.5 w-3.5" /> Flip
            </button>
            <button
              onClick={handleSavePdf}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className="h-3.5 w-3.5" /> {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Card face — click to flip */}
        <div
          className="w-full cursor-pointer"
          style={{ height: "220px" }}
          onClick={() => setFlipped((f) => !f)}
        >
          {flipped ? cardMap[activeCard].back : cardMap[activeCard].front}
        </div>

        {/* Dot indicator */}
        <div className="flex justify-center gap-2 pt-1">
          <div className={`w-2 h-2 rounded-full transition-all ${!flipped ? "bg-indigo-500 w-5" : dm ? "bg-gray-600" : "bg-gray-300"}`} />
          <div className={`w-2 h-2 rounded-full transition-all ${flipped ? "bg-indigo-500 w-5" : dm ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>

        <p className={`text-center text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>Click card or tap Flip to switch sides</p>
      </div>

      {/* Hidden high-resolution export surfaces for PDF capture */}
      <div className="fixed top-0 pointer-events-none" style={{ left: "-9999px" }} aria-hidden="true">
        <div ref={frontExportRef} style={{ width: "860px", height: "540px" }}>
          {cardMap[activeCard].front}
        </div>
        <div ref={backExportRef} style={{ width: "860px", height: "540px" }}>
          {cardMap[activeCard].back}
        </div>
      </div>
    </div>
  );
}
