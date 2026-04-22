export const MOCK_USER = {
  id: 1,
  matric_no: "190404001",
  name: "Adaeze Okonkwo",
  email: "adaeze.okonkwo@stu.ui.edu.ng",
  gender: "Female",
  cgpa: 6.54,
  level: 300,
  department: "Computer Science",
  faculty: "Science",
  fees_paid: true,
  hall: "Idia Hall",
  hall_id: 1,
  avatar: "AO",
  phone: "08012345678",
};

export const CGPA_HISTORY = [
  { sem: "100L/1", cgpa: 5.32 },
  { sem: "100L/2", cgpa: 5.74 },
  { sem: "200L/1", cgpa: 6.02 },
  { sem: "200L/2", cgpa: 6.3 },
  { sem: "300L/1", cgpa: 6.54 },
];

export const COURSES = [
  { id: 1, code: "CSC 301", title: "Data Structures & Algorithms", units: 3, semester: "First", registered: true, score: 78 },
  { id: 2, code: "CSC 303", title: "Computer Networks", units: 3, semester: "First", registered: true, score: 85 },
  { id: 3, code: "MTH 301", title: "Linear Algebra", units: 3, semester: "First", registered: true, score: 71 },
  { id: 4, code: "CSC 305", title: "Software Engineering", units: 3, semester: "First", registered: false, score: null },
  { id: 5, code: "PHY 301", title: "Quantum Mechanics", units: 2, semester: "First", registered: false, score: null },
  { id: 6, code: "CSC 307", title: "Database Systems", units: 3, semester: "First", registered: true, score: 92 },
];

export const ASSIGNMENTS = [
  { id: 1, course: "CSC 301", title: "Binary Trees Implementation", deadline: "2025-03-15", status: "submitted", marks: 18, total: 20 },
  { id: 2, course: "CSC 303", title: "TCP/IP Protocol Analysis", deadline: "2025-03-18", status: "pending", marks: null, total: 25 },
  { id: 3, course: "MTH 301", title: "Matrix Transformations Problem Set", deadline: "2025-03-12", status: "overdue", marks: null, total: 20 },
  { id: 4, course: "CSC 307", title: "ER Diagram Design Project", deadline: "2025-03-22", status: "submitted", marks: 24, total: 25 },
];

export const HOSTELS = [
  { id: 1, name: "Idia Hall", gender: "Female", capacity: 400, occupied: 380, floors: 4 },
  { id: 2, name: "Queen Amina Hall", gender: "Female", capacity: 350, occupied: 290, floors: 3 },
  { id: 3, name: "Zik Hall", gender: "Male", capacity: 500, occupied: 478, floors: 5 },
  { id: 4, name: "Mellanby Hall", gender: "Male", capacity: 450, occupied: 320, floors: 4 },
  { id: 5, name: "Sultan Bello Hall", gender: "Male", capacity: 400, occupied: 399, floors: 4 },
];

export const TICKETS = [
  { id: "TKT-2401", category: "Result Issue", description: "Missing score for CSC 201", status: "Open", date: "2025-02-28" },
  { id: "TKT-2398", category: "ID Card", description: "Request for ID card replacement", status: "Resolved", date: "2025-02-10" },
  { id: "TKT-2350", category: "Portal Access", description: "Unable to access exam portal", status: "In Progress", date: "2025-01-22" },
];

export const EVENTS = [
  { id: 1, title: "SUG Presidential Debate", date: "2025-03-14", time: "4:00 PM", venue: "Freedom Square", tag: "Political" },
  { id: 2, title: "CSC Faculty Week Hackathon", date: "2025-03-17", time: "9:00 AM", venue: "Engineering Complex", tag: "Academic" },
  { id: 3, title: "Inter-Hall Cultural Festival", date: "2025-03-20", time: "2:00 PM", venue: "Sports Pavilion", tag: "Social" },
  { id: 4, title: "NLNG Scholarship Info Session", date: "2025-03-25", time: "11:00 AM", venue: "Senate Building", tag: "Scholarship" },
];

export const MENTORS = [
  { id: 1, name: "Chukwuemeka Eze", cgpa: 6.85, level: 400, hall: "Zik Hall", dept: "Computer Science", available: true },
  { id: 2, name: "Fatima Aliyu", cgpa: 6.89, level: 400, hall: "Idia Hall", dept: "Computer Science", available: true },
];

export const NEXT_OF_KIN = [
  { id: 1, name: "Mrs. Nneka Okonkwo", relationship: "Mother", phone: "08012345678", email: "nneka.okonkwo@gmail.com", address: "123 Palm Avenue, Lagos, Nigeria" },
  { id: 2, name: "Mr. Chinedu Okonkwo", relationship: "Father", phone: "08098765432", email: "chinedu.okonkwo@gmail.com", address: "123 Palm Avenue, Lagos, Nigeria" },
];

export const ID_CARDS = [
  { id: 1, cardType: "Student ID", issuedDate: "2023-10-15", expiryDate: "2025-10-15", status: "collected", cardNumber: "UIB-230100001" },
  { id: 2, cardType: "Library Card", issuedDate: "2023-10-20", expiryDate: "2025-10-20", status: "collected", cardNumber: "LIB-230100001" },
  { id: 3, cardType: "Examination Card", issuedDate: "2025-01-10", expiryDate: "2025-12-31", status: "not_collected", cardNumber: "EXAM-250100001" },
  { id: 4, cardType: "Sports Card", issuedDate: "2024-06-01", expiryDate: "2025-05-31", status: "collected", cardNumber: "SPORT-240100001" },
];

export const MY_SPONSORS = [
  { id: 1, name: "MTN Foundation Nigeria", type: "Corporate Sponsor", sponsorshipType: "Full Tuition", amount: 750000, startDate: "2023-09-01", endDate: "2025-06-30", status: "active", contact: "sponsor@mtnfoundation.com" },
  { id: 2, name: "NLNG Scholarship", type: "Government Sponsor", sponsorshipType: "Partial Tuition & Accommodation", amount: 500000, startDate: "2024-09-01", endDate: "2025-06-30", status: "active", contact: "nlng@scholarship.gov.ng" },
];

export const WALLET = {
  balance: 125450,
  accountNumber: "1234567890",
  bank: "University Payment System",
  transactions: [
    { id: 1, type: "credit", description: "Sponsorship Fund Deposit", amount: 500000, date: "2025-03-01", status: "completed" },
    { id: 2, type: "debit", description: "Hostel Fee Payment", amount: 180000, date: "2025-03-05", status: "completed" },
    { id: 3, type: "debit", description: "Tuition Payment", amount: 300000, date: "2025-02-15", status: "completed" },
    { id: 4, type: "credit", description: "Manual Top-up", amount: 150000, date: "2025-01-20", status: "completed" },
    { id: 5, type: "debit", description: "Withdrawal Request (Pending Approval)", amount: 50000, date: "2025-03-10", status: "pending" },
  ],
  withdrawalRequests: [
    { id: "WR-001", amount: 50000, date: "2025-03-10", reason: "Personal Expenses", status: "pending", approvalDate: null },
    { id: "WR-002", amount: 30000, date: "2025-02-20", reason: "Book Purchase", status: "approved", approvalDate: "2025-02-22" },
    { id: "WR-003", amount: 25000, date: "2025-01-15", reason: "Emergency", status: "rejected", approvalDate: "2025-01-16" },
  ],
};

export const EXAMS = [
  { id: 1, course: "CSC 301", examType: "Semester", date: "2025-04-15", time: "10:00 AM", venue: "Engineering Building Hall 1", duration: "2 hours", status: "scheduled" },
  { id: 2, course: "CSC 303", examType: "Semester", date: "2025-04-17", time: "2:00 PM", venue: "Science Building Hall 2", duration: "2 hours", status: "scheduled" },
  { id: 3, course: "MTH 301", examType: "Semester", date: "2025-04-20", time: "9:00 AM", venue: "Engineering Building Hall 3", duration: "2.5 hours", status: "scheduled" },
  { id: 4, course: "CSC 307", examType: "Semester", date: "2025-04-22", time: "10:00 AM", venue: "Science Building Hall 1", duration: "2 hours", status: "scheduled" },
];

export const SCHOLARSHIPS = [
  { id: 1, name: "MTN Foundation Scholarship", provider: "MTN Foundation", minCgpa: 5.5, deadline: "2026-05-15", eligible: true, url: "#" },
  { id: 2, name: "NLNG Undergraduate Scholarship", provider: "NLNG", minCgpa: 5.0, deadline: "2026-06-01", eligible: true, url: "#" },
  { id: 3, name: "Shell Petroleum Scholarship", provider: "Shell", minCgpa: 6.0, deadline: "2026-05-28", eligible: true, url: "#" },
  { id: 4, name: "Federal Merit Bursary", provider: "Federal Government", minCgpa: 6.6, deadline: "2026-06-10", eligible: false, url: "#" },
];

export const LIBRARY = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest", dueDate: "2025-04-10", status: "borrowed", renewalsLeft: 2, barcode: "LIB-20250001" },
  { id: 2, title: "Computer Networks", author: "Andrew Tanenbaum", dueDate: "2025-03-25", status: "borrowed", renewalsLeft: 1, barcode: "LIB-20250002" },
  { id: 3, title: "Database System Concepts", author: "Silberschatz", dueDate: "2025-05-15", status: "borrowed", renewalsLeft: 3, barcode: "LIB-20250003" },
];

export const ACADEMIC_TRANSCRIPT = {
  matricNo: "190404001",
  name: "Adaeze Okonkwo",
  department: "Computer Science",
  level: "300L",
  gpa: 6.54,
  semesters: [
    { sem: "100L/1", cgpa: 5.32, units: 18, credits: 54 },
    { sem: "100L/2", cgpa: 5.74, units: 18, credits: 56 },
    { sem: "200L/1", cgpa: 6.02, units: 18, credits: 60 },
    { sem: "200L/2", cgpa: 6.3, units: 18, credits: 63 },
    { sem: "300L/1", cgpa: 6.54, units: 12, credits: 52 },
  ],
};

export const COURSE_REGISTRATION = [
  { id: 1, code: "CSC 301", title: "Data Structures & Algorithms", units: 3, semester: "First", registered: true, registrationDate: "2025-01-15", status: "active" },
  { id: 2, code: "CSC 303", title: "Computer Networks", units: 3, semester: "First", registered: true, registrationDate: "2025-01-15", status: "active" },
  { id: 3, code: "MTH 301", title: "Linear Algebra", units: 3, semester: "First", registered: true, registrationDate: "2025-01-15", status: "active" },
  { id: 4, code: "CSC 307", title: "Database Systems", units: 3, semester: "First", registered: true, registrationDate: "2025-01-15", status: "active" },
];

export const FEES = [
  { id: 1, title: "Tuition Fee", category: "Academic", amount: 300000, dueDate: "2025-02-01", status: "paid", paidDate: "2025-01-20" },
  { id: 2, title: "Hostel Accommodation", category: "Welfare", amount: 180000, dueDate: "2025-02-10", status: "paid", paidDate: "2025-02-05" },
  { id: 3, title: "ICT/Portal Access Fee", category: "Technology", amount: 25000, dueDate: "2025-02-15", status: "paid", paidDate: "2025-02-10" },
  { id: 4, title: "Laboratory Fee", category: "Academic", amount: 40000, dueDate: "2025-03-01", status: "pending", paidDate: null },
  { id: 5, title: "Student Union Fee", category: "Administrative", amount: 15000, dueDate: "2025-03-05", status: "pending", paidDate: null },
  { id: 6, title: "Library Development Levy", category: "Library", amount: 10000, dueDate: "2025-03-08", status: "pending", paidDate: null },
];

export const REGISTRATION_STATUS = {
  open: false,           // flip to true to simulate open registration
  openDate: "2025-01-15",
  closeDate: "2025-03-01",
  nextOpenDate: "2025-07-01",
};

export const SEMESTER_RESULTS = [
  {
    id: "300L/1",
    label: "300 Level – First Semester",
    session: "2024/2025",
    status: "released",
    courses: [
      { code: "CSC 301", title: "Data Structures & Algorithms", units: 3, score: 78, ca: 28, exam: 50 },
      { code: "CSC 303", title: "Computer Networks", units: 3, score: 85, ca: 35, exam: 50 },
      { code: "MTH 301", title: "Linear Algebra", units: 3, score: 71, ca: 24, exam: 47 },
      { code: "CSC 307", title: "Database Systems", units: 3, score: 92, ca: 38, exam: 54 },
    ],
  },
  {
    id: "200L/2",
    label: "200 Level – Second Semester",
    session: "2023/2024",
    status: "released",
    courses: [
      { code: "CSC 202", title: "Object-Oriented Programming", units: 3, score: 80, ca: 30, exam: 50 },
      { code: "CSC 204", title: "Operating Systems", units: 3, score: 74, ca: 26, exam: 48 },
      { code: "MTH 202", title: "Calculus II", units: 3, score: 66, ca: 22, exam: 44 },
      { code: "STA 202", title: "Probability & Statistics", units: 3, score: 73, ca: 25, exam: 48 },
      { code: "CSC 206", title: "Computer Architecture", units: 3, score: 61, ca: 20, exam: 41 },
      { code: "ELE 202", title: "Digital Electronics", units: 3, score: 55, ca: 18, exam: 37 },
    ],
  },
  {
    id: "200L/1",
    label: "200 Level – First Semester",
    session: "2023/2024",
    status: "released",
    courses: [
      { code: "CSC 201", title: "Discrete Mathematics", units: 3, score: 69, ca: 23, exam: 46 },
      { code: "CSC 203", title: "Programming Languages", units: 3, score: 75, ca: 27, exam: 48 },
      { code: "MTH 201", title: "Calculus I", units: 3, score: 58, ca: 18, exam: 40 },
      { code: "CSC 205", title: "Data Communication", units: 3, score: 72, ca: 24, exam: 48 },
      { code: "PHY 201", title: "Electromagnetism", units: 2, score: 63, ca: 20, exam: 43 },
      { code: "GST 201", title: "Communication Skills", units: 2, score: 70, ca: 24, exam: 46 },
    ],
  },
  {
    id: "100L/2",
    label: "100 Level – Second Semester",
    session: "2022/2023",
    status: "released",
    courses: [
      { code: "CSC 102", title: "Introduction to Programming", units: 3, score: 76, ca: 28, exam: 48 },
      { code: "MTH 102", title: "Elementary Mathematics II", units: 3, score: 64, ca: 22, exam: 42 },
      { code: "PHY 102", title: "Physics Practical II", units: 2, score: 70, ca: 25, exam: 45 },
      { code: "CHM 102", title: "General Chemistry II", units: 2, score: 52, ca: 16, exam: 36 },
      { code: "GST 102", title: "Use of English II", units: 2, score: 68, ca: 22, exam: 46 },
      { code: "CSC 104", title: "Computer Logic", units: 3, score: 74, ca: 26, exam: 48 },
    ],
  },
  {
    id: "100L/1",
    label: "100 Level – First Semester",
    session: "2022/2023",
    status: "released",
    courses: [
      { code: "CSC 101", title: "Introduction to Computer Science", units: 3, score: 62, ca: 20, exam: 42 },
      { code: "MTH 101", title: "Elementary Mathematics I", units: 3, score: 55, ca: 17, exam: 38 },
      { code: "PHY 101", title: "General Physics I", units: 2, score: 50, ca: 16, exam: 34 },
      { code: "CHM 101", title: "General Chemistry I", units: 2, score: 48, ca: 15, exam: 33 },
      { code: "GST 101", title: "Use of English I", units: 2, score: 60, ca: 20, exam: 40 },
      { code: "BIO 101", title: "General Biology", units: 2, score: 57, ca: 18, exam: 39 },
    ],
  },
];

export const NOTIFICATION_FEED = [
  {
    id: "N-3012",
    type: "ticket_reply",
    title: "Ticket Reply: Result Issue",
    message: "Your ticket TKT-2401 has been reviewed. CSC 201 score has been updated and is now visible on your result page.",
    source: "Support Desk",
    relatedId: "TKT-2401",
    time: "2026-04-21T08:15:00Z",
    read: false,
  },
  {
    id: "N-3011",
    type: "id_card",
    title: "ID Card Is Ready",
    message: "Your replacement student ID card request has been approved. Card is ready for collection at Student Affairs.",
    source: "ID Card Office",
    relatedId: "TKT-2398",
    time: "2026-04-21T07:00:00Z",
    read: false,
  },
  {
    id: "N-3010",
    type: "assignment",
    title: "Assignment Reminder",
    message: "TCP/IP Protocol Analysis (CSC 303) is due tomorrow. Upload before 11:59 PM to avoid penalty.",
    source: "Course Lecturer",
    relatedId: "CSC 303",
    time: "2026-04-20T19:40:00Z",
    read: true,
  },
  {
    id: "N-3009",
    type: "ticket_reply",
    title: "Ticket Reply: Portal Access",
    message: "Your exam portal access has been restored. Please clear browser cache and try again.",
    source: "ICT Helpdesk",
    relatedId: "TKT-2350",
    time: "2026-04-20T15:12:00Z",
    read: true,
  },
  {
    id: "N-3008",
    type: "assignment",
    title: "Assignment Graded",
    message: "Binary Trees Implementation (CSC 301) has been graded: 18/20.",
    source: "Course Lecturer",
    relatedId: "CSC 301",
    time: "2026-04-19T10:20:00Z",
    read: true,
  },
];