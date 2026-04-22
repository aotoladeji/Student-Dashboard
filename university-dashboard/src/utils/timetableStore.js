const TIMETABLE_STORAGE_KEY = "uniportal_timetable_v1";

const defaultTimetable = {
  lectureCourses: [],
  examCourses: [],
  lectureOverrides: {},
  examOverrides: {},
  customEntries: [],
  examNotes: {},
  updatedAt: null,
};

export function getTimetableData() {
  if (typeof window === "undefined") return { ...defaultTimetable };
  try {
    const raw = window.localStorage.getItem(TIMETABLE_STORAGE_KEY);
    if (!raw) return { ...defaultTimetable };
    const parsed = JSON.parse(raw);
    return { ...defaultTimetable, ...parsed };
  } catch {
    return { ...defaultTimetable };
  }
}

export function saveTimetableData(patch) {
  if (typeof window === "undefined") return;
  const current = getTimetableData();
  const next = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(next));
}

export { TIMETABLE_STORAGE_KEY };
