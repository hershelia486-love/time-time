const areas = {
  personal: { label: "개인", color: "personal", hint: "나 자신과 생활", example: "건강, 집안일, 공부, 마음 돌보기" },
  career: { label: "경력", color: "career", hint: "일과 성장", example: "업무, 취업, 사업, 실력 쌓기" },
  people: { label: "사람", color: "people", hint: "관계와 약속", example: "가족, 친구, 연락, 함께하는 시간" },
  leisure: { label: "여가", color: "leisure", hint: "회복과 즐거움", example: "취미, 휴식, 여행, 재미있는 일" }
};
const statusLabels = { planned: "계획", progress: "진행", completed: "완료" };
const routineStatusLabels = { ...statusLabels, postponed: "미룸" };
const typeLabels = { task: "할 일", event: "일정" };
const priorityLabels = { high: "중요", normal: "보통", low: "나중" };
const trackLabels = { red: "빨강", black: "검정" };
const moodFaces = [["awful", "😣"], ["down", "😕"], ["ok", "😐"], ["good", "🙂"], ["great", "😄"]];
const moodLabels = { awful: "😣", down: "😕", ok: "😐", good: "🙂", great: "😄" };
const tools = [
  [1, "나의 최종 목적 찾기", "북극성을 한 문장으로", "이미 원하는 삶을 살고 있다면, 오늘 어떤 선택을 하고 있을까요?", "나의 최종 목적"],
  [2, "프로젝트 만들기", "결과가 보이는 단위로", "지금 시작하면 미래의 삶을 앞당길 프로젝트는 무엇인가요?", "프로젝트 완료 기준"],
  [3, "EDO 목록 만들기", "제거 · 위임 · 외주화", "반복되지만 내가 직접 하지 않아도 되는 일은 무엇인가요?", "이번 주 EDO 결정"],
  [4, "우선순위로 프로젝트 겹치기", "하나의 행동, 여러 결과", "한 번의 집중이 둘 이상의 우선순위에 기여하게 하려면 어떻게 바꿀 수 있나요?", "겹칠 수 있는 효과"],
  [5, "나 없이도 일이 되게 하기", "일과 삶의 경계 설계", "내가 하루 비우면 멈추는 일은 무엇이고, 무엇을 문서화할 수 있나요?", "다음 운영 규칙"],
  [6, "전문가에게 맡기기", "방법보다 결과를 맡기기", "누구에게 결과 중심으로 맡길 수 있나요?", "필요한 결과 브리프"],
  [7, "돈 버는 방법 바꾸기", "가치와 제약을 점검", "현재의 일하는 방식은 내 시간과 가치에 어떤 제약을 만들고 있나요?", "작게 시험할 변화"],
  [8, "가치에 시간 쓰는 법", "달력에 가치를 놓기", "이번 주 꼭 지키고 싶은 가치는 무엇이며, 언제 실천할 수 있나요?", "보호할 가치 시간"],
  [9, "프리즘 생산성 창조하기", "작은 투자, 다양한 결과", "최근 한 행동이 예상보다 넓게 만든 긍정적 변화는 무엇인가요?", "발견한 프리즘 효과"],
  [10, "더 좋은 질문하기", "막힘을 가능성으로", "지금의 문제를 더 좋은 질문으로 바꾸면 어떻게 표현할 수 있나요?", "다음 주의 더 좋은 질문"]
];
const toolGuides = {
  1: { when: "방향을 잃었거나 할 일이 너무 많아 우선순위가 흐릴 때", steps: ["원하는 삶의 모습을 한 문장으로 씁니다.", "오늘 일정 중 그 문장과 맞지 않는 일을 하나 찾습니다.", "대신할 작은 행동 하나를 캘린더에 넣습니다."] },
  2: { when: "해야 할 일이 크고 막연해서 시작하기 어려울 때", steps: ["완료된 모습을 눈에 보이게 정의합니다.", "첫 20분 행동을 하나로 쪼갭니다.", "그 행동을 오늘 또는 미래 날짜에 기록합니다."] },
  3: { when: "반복 업무가 늘어나고 내가 모두 떠안고 있다고 느낄 때", steps: ["반복되는 일을 하나 적습니다.", "제거·위임·외주화·직접 실행 중 하나를 고릅니다.", "결정한 다음 행동을 할 일로 만듭니다."] },
  4: { when: "한 행동으로 여러 목표를 이루고 싶을 때", steps: ["현재 프로젝트를 하나 고릅니다.", "개인·경력·사람·여가 중 연결 가능한 영역을 표시합니다.", "겹쳐서 얻는 결과를 한 줄로 적습니다."] },
  5: { when: "내가 멈추면 일이 멈춘다는 압박을 느낄 때", steps: ["내가 직접 해야만 하는 일을 적습니다.", "문서화하거나 자동화할 한 단계만 고릅니다.", "이번 주 시험할 운영 규칙을 기록합니다."] },
  6: { when: "혼자 해결하려다 시간을 너무 많이 쓰고 있을 때", steps: ["원하는 결과를 한 문장으로 씁니다.", "도움을 줄 사람이나 전문 영역을 적습니다.", "요청하거나 알아볼 날짜를 일정에 넣습니다."] },
  7: { when: "시간과 수입의 교환 방식이 부담스럽게 느껴질 때", steps: ["현재 방식의 제약을 적습니다.", "더 가치 있는 결과를 한 가지 정의합니다.", "작게 실험할 변화를 계획으로 저장합니다."] },
  8: { when: "중요한 일을 늘 미루고 있다고 느낄 때", steps: ["이번 주 지키고 싶은 가치를 하나 고릅니다.", "그 가치를 위한 시간을 달력에서 찾습니다.", "방해받지 않도록 일정으로 기록합니다."] },
  9: { when: "작은 노력이 어떤 가치를 만드는지 잊기 쉬울 때", steps: ["최근 작은 행동 하나를 떠올립니다.", "그 행동에서 파생된 좋은 결과를 적습니다.", "다시 반복할 행동을 하나 선택합니다."] },
  10: { when: "문제만 반복해서 생각하고 멈춰 있을 때", steps: ["지금 막힌 문제를 그대로 적습니다.", "‘어떻게 하면 …할 수 있을까?’로 바꿉니다.", "답을 찾기 위한 작은 실험을 다음 행동으로 저장합니다."] }
};

function localDate(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}
const todayKey = localDate();
const defaultState = {
  purpose: "중요한 사람과 일에 온전히 주의를 쓰며, 내가 선택한 삶을 오늘부터 살아간다.",
  projects: [{ id: 1, title: "나의 90일 나침반", outcome: "네 가지 우선순위가 연결된 첫 90일 실행 계획을 완성한다.", dueDate: shiftDate(todayKey, 90), status: "progress", progress: 0 }],
  items: [
    { id: 201, title: "이번 주 가치 시간 정하기", type: "task", date: todayKey, area: "personal", status: "planned" },
    { id: 202, title: "핵심 프로젝트 20분 점검", type: "task", date: todayKey, area: "career", status: "progress" }
  ],
  routines: [
    { id: 101, title: "주간 성찰", cadence: "weekly", target: 1, area: "personal", completions: [], fixed: true, weekday: 6, fixedWeekdays: [6], active: true, statusByPeriod: {} },
    { id: 102, title: "월간 나침반 점검", cadence: "monthly", target: 1, area: "personal", completions: [], fixed: false, monthlyDay: 1, active: true, statusByPeriod: {} },
    { id: 103, title: "연간 삶의 방향 검토", cadence: "yearly", target: 1, area: "personal", completions: [], fixed: false, yearlyMonth: 1, yearlyDay: 1, active: true, statusByPeriod: {} }
  ],
  notes: {}, reflection: { win: "", friction: "", question: "" }, reflectionEntries: [], garden: { points: 0 }, moodLog: {}, thoughts: [], events: [], bookmarks: [], memos: [], photos: [], recordSeg: "bm", detailDate: todayKey, yearNum: Number(todayKey.slice(0, 4)), active: "today", selectedTool: null, randomToolId: null,
  calendarMonth: todayKey.slice(0, 7), selectedDate: todayKey, calendarWeekStart: todayKey, calendarLayout: "vertical", calendarMode: "month", routinePickerDate: null,
  editingItemId: null, editingProjectId: null, editingRoutineId: null, editingReflectionId: null,
  dashboardArea: "all", routineArea: "all", calendarArea: "all", calendarHorizon: "all", calendarStatus: "all", calendarPriority: "all"
};

let state = load();
let activeDrag = null;
let dragLongPressTimer = null;
let suppressNextActionClick = false;
const requestedTab = new URLSearchParams(location.search).get("tab");
if (["today", "calendar", "routines", "projects", "records", "tools", "reflect"].includes(requestedTab)) state.active = requestedTab;
function load() {
  try {
    const stored = JSON.parse(localStorage.getItem("ttc-pwa-v1"));
    const hasLegacyReflection = Object.values(stored?.reflection || {}).some(Boolean);
    const migratedReflections = hasLegacyReflection ? [{ id: Date.now(), createdAt: new Date().toISOString(), ...stored.reflection }] : [];
    return {
      ...defaultState, ...stored,
      projects: (stored?.projects ?? defaultState.projects).map(project => ({ ...project, dueDate: project.dueDate || "", status: project.status || "planned", progress: Math.max(0, Math.min(100, Number(project.progress) || 0)) })),
      items: (stored?.items ?? defaultState.items).map((item, index) => ({ ...item, priority: item.priority || "normal", track: item.track || (item.priority === "high" ? "red" : "black"), sortOrder: Number.isFinite(item.sortOrder) ? item.sortOrder : index, projectId: item.projectId ?? null, timeSlot: item.timeSlot ?? null })),
      garden: (stored && stored.garden) || { points: 0 },
      bookmarks: Array.isArray(stored && stored.bookmarks) ? stored.bookmarks : [],
      memos: Array.isArray(stored && stored.memos) ? stored.memos : [],
      photos: Array.isArray(stored && stored.photos) ? stored.photos : [],
      moodLog: (stored && stored.moodLog) || {},
      thoughts: Array.isArray(stored && stored.thoughts) ? stored.thoughts : [],
      events: Array.isArray(stored && stored.events) ? stored.events : [],
      routines: (stored?.routines ?? defaultState.routines).map(routine => {
        const weekday = Number.isInteger(routine.weekday) ? routine.weekday : 0;
        const fixedWeekdays = Array.isArray(routine.fixedWeekdays) ? routine.fixedWeekdays.filter(day => Number.isInteger(day) && day >= 0 && day <= 6) : (routine.fixed ? [weekday] : []);
        return { ...routine, area: routine.area || "personal", fixed: fixedWeekdays.length > 0, weekday, fixedWeekdays: [...new Set(fixedWeekdays)].sort((a, b) => a - b), monthlyDay: Math.max(1, Math.min(28, Number(routine.monthlyDay) || 1)), yearlyMonth: Math.max(1, Math.min(12, Number(routine.yearlyMonth) || 1)), yearlyDay: Math.max(1, Math.min(28, Number(routine.yearlyDay) || 1)), active: routine.active !== false, statusByPeriod: routine.statusByPeriod || {}, statusByDate: routine.statusByDate || {}, dailyRecords: routine.dailyRecords || {}, scheduledDates: routine.scheduledDates || [], sortOrderByDate: routine.sortOrderByDate || {} };
      }),
      reflectionEntries: stored?.reflectionEntries ?? migratedReflections,
      reflection: stored?.reflectionEntries ? (stored?.reflection ?? defaultState.reflection) : defaultState.reflection,
      editingItemId: null, editingProjectId: null, editingRoutineId: null, editingReflectionId: null
    };
  } catch { return structuredClone(defaultState); }
}
function syncAndroidWidget() {
  try {
    if (!window.AndroidWidgetBridge?.updateSummary) return;
    const todayRoutines = state.routines.filter(routine => routineOccursOnDate(routine, todayKey));
    const completed = todayRoutines.filter(routine => routineDayStatus(routine, todayKey) === "completed").length;
    const nextRoutine = todayRoutines.find(routine => routineDayStatus(routine, todayKey) !== "completed");
    window.AndroidWidgetBridge.updateSummary(JSON.stringify({ completed, total: todayRoutines.length, nextTitle: nextRoutine?.title || "오늘의 루틴을 모두 마쳤어요", updatedAt: new Date().toISOString() }));
  } catch (_) {}
}
function persist() { const { editingItemId, editingProjectId, editingRoutineId, editingReflectionId, ...saved } = state; localStorage.setItem("ttc-pwa-v1", JSON.stringify({ ...saved, active: "today", selectedTool: null })); syncAndroidWidget(); }
function esc(value) { return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[char])); }
function header(eyebrow, title, lead) { return `<div class="app-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><span class="retro-stamp">LOCAL MODE · 1988</span></div><button class="fullscreen-button" data-action="fullscreen" aria-label="전체 화면으로 보기" title="전체 화면으로 보기">⛶</button></div><p class="lead">${lead}</p>`; }
function nav() {
  const tabs = [["today", "⌂", "오늘"], ["calendar", "▦", "캘린더"], ["routines", "↻", "루틴"], ["projects", "◫", "목표"], ["records", "🗂", "기록"], ["reflect", "☷", "감정"]];
  return `<nav class="nav six-tabs">${tabs.map(([key, icon, label]) => `<button class="${state.active === key ? "active" : ""}" data-tab="${key}"><span class="navicon">${icon}</span>${label}</button>`).join("")}</nav>`;
}
function monthParts(monthKey) { return monthKey.split("-").map(Number); }
function monthName(monthKey) { const [year, month] = monthParts(monthKey); return `${year}년 ${month}월`; }
function dateFromKey(key) { return new Date(`${key}T00:00:00`); }
function dateKey(date) { return localDate(date); }
function shiftDate(key, days) { const date = dateFromKey(key); date.setDate(date.getDate() + days); return dateKey(date); }
function mondayIndex(key) { return (dateFromKey(key).getDay() + 6) % 7; }
function startOfWeek(key) { return shiftDate(key, -mondayIndex(key)); }
function weekDates(key) { const start = startOfWeek(key); return Array.from({ length: 7 }, (_, index) => shiftDate(start, index)); }
function weekdayLabel(key) { return ["월", "화", "수", "목", "금", "토", "일"][mondayIndex(key)]; }
function weekdayOptions(selected = 0) { return ["월", "화", "수", "목", "금", "토", "일"].map((label, index) => `<option value="${index}" ${Number(selected) === index ? "selected" : ""}>${label}요일</option>`).join(""); }
function weekdayName(day) { return ["월", "화", "수", "목", "금", "토", "일"][Number(day)] || "월"; }
function routineWeekdays(routine) { return Array.isArray(routine.fixedWeekdays) ? routine.fixedWeekdays : (routine.fixed ? [routine.weekday ?? 0] : []); }
function isFixedRoutine(routine) { return routineWeekdays(routine).length > 0; }
function routineScheduleLabel(routine) {
  if (routine.cadence === "monthly") return `매월 ${routine.monthlyDay || 1}일`;
  if (routine.cadence === "yearly") return `매년 ${routine.yearlyMonth || 1}월 ${routine.yearlyDay || 1}일`;
  const days = routineWeekdays(routine);
  return days.length ? `${days.map(weekdayName).join("·")}요일 고정` : "직접 날짜 선택";
}
function routineOccursOnDate(routine, date) {
  if (!routine.active) return false;
  const record = routine.dailyRecords?.[date];
  const day = dateFromKey(date);
  const monthlyMatch = routine.cadence === "monthly" && day.getDate() === (routine.monthlyDay || 1);
  const yearlyMatch = routine.cadence === "yearly" && day.getMonth() + 1 === (routine.yearlyMonth || 1) && day.getDate() === (routine.yearlyDay || 1);
  const weeklyMatch = routine.cadence === "weekly" && isFixedRoutine(routine) && routineWeekdays(routine).includes(mondayIndex(date));
  return Boolean(record?.status === "postponed" || routine.scheduledDates.includes(date) || weeklyMatch || monthlyMatch || yearlyMatch);
}
function weekdayChecklist(selected = [], prefix = "routine") { const selectedDays = new Set(selected); return `<fieldset class="weekday-picker"><legend>고정 실행 요일 <small>여러 날 선택 가능</small></legend><div>${["월", "화", "수", "목", "금", "토", "일"].map((label, index) => `<label class="weekday-check"><input type="checkbox" data-${prefix}-weekday value="${index}" ${selectedDays.has(index) ? "checked" : ""}><span>${label}</span></label>`).join("")}</div></fieldset>`; }
function checkedWeekdays(prefix = "routine") { return [...document.querySelectorAll(`[data-${prefix}-weekday]:checked`)].map(input => Number(input.value)).filter(day => day >= 0 && day <= 6).sort((a, b) => a - b); }
function moveMonth(delta) {
  const [year, month] = monthParts(state.calendarMonth);
  const date = new Date(year, month - 1 + delta, 1);
  state.calendarMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  state.selectedDate = `${state.calendarMonth}-01`;
  persist(); render();
}
function areaOptions(selected) { return Object.entries(areas).map(([key, area]) => `<option value="${key}" ${selected === key ? "selected" : ""}>${area.label} · ${area.hint}</option>`).join(""); }
function statusOptions(selected) { return Object.entries(statusLabels).map(([key, label]) => `<option value="${key}" ${selected === key ? "selected" : ""}>${label}</option>`).join(""); }
function routineStatusOptions(selected) { return Object.entries(routineStatusLabels).map(([key, label]) => `<option value="${key}" ${selected === key ? "selected" : ""}>${label}</option>`).join(""); }
function typeOptions(selected) { return Object.entries(typeLabels).map(([key, label]) => `<option value="${key}" ${selected === key ? "selected" : ""}>${label}</option>`).join(""); }
function priorityOptions(selected) { return Object.entries(priorityLabels).map(([key, label]) => `<option value="${key}" ${selected === key ? "selected" : ""}>${label}</option>`).join(""); }
function priorityRank(item) { return ({ high: 0, normal: 1, low: 2 })[item.priority || "normal"]; }
function priorityTag(item) { return `<span class="priority-tag priority-${item.priority || "normal"}">${priorityLabels[item.priority || "normal"]}</span>`; }
function filterItems(items, { area = "all", horizon = "all", status = "all", priority = "all" } = {}) {
  return items.filter(item => {
    const inArea = area === "all" || item.area === area;
    const inStatus = status === "all" || item.status === status;
    const inPriority = priority === "all" || item.priority === priority;
    const inHorizon = horizon === "all" || (horizon === "past" && item.date < todayKey) || (horizon === "today" && item.date === todayKey) || (horizon === "future" && item.date > todayKey);
    return inArea && inStatus && inPriority && inHorizon;
  }).sort((a, b) => a.date.localeCompare(b.date) || (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || priorityRank(a) - priorityRank(b));
}
function progressStats(items = state.items) {
  const total = items.length;
  const completed = items.filter(item => item.status === "completed").length;
  const progress = items.filter(item => item.status === "progress").length;
  const planned = items.filter(item => item.status === "planned").length;
  return { total, completed, progress, planned, percent: total ? Math.round((completed / total) * 100) : 0 };
}
function projectOptions(selected = null) { return `<option value="">연결 안 함</option>${state.projects.map(project => `<option value="${project.id}" ${Number(selected) === project.id ? "selected" : ""}>${esc(project.title)}</option>`).join("")}`; }
function daysUntil(date) { return Math.round((dateFromKey(date) - dateFromKey(todayKey)) / 86400000); }
function projectDueCopy(project) {
  if (!project.dueDate) return "마감일을 아직 정하지 않았습니다.";
  const days = daysUntil(project.dueDate);
  if (days < 0) return `${Math.abs(days)}일 지났습니다 · 기한 재조정 필요`;
  if (days === 0) return "오늘이 마감일입니다.";
  return `마감까지 ${days}일 · ${project.dueDate}`;
}
function projectStats(project) {
  const items = state.items.filter(item => Number(item.projectId) === Number(project.id));
  const itemProgress = items.length ? Math.round((items.filter(item => item.status === "completed").length / items.length) * 100) : 0;
  const progress = items.length ? itemProgress : project.progress;
  const status = progress >= 100 ? "completed" : (project.status === "completed" ? "completed" : (progress > 0 || project.status === "progress" ? "progress" : "planned"));
  return { ...project, items, progress, status, completedItems: items.filter(item => item.status === "completed").length };
}
function itemEditCard(item) {
  return `<article class="card form edit-form"><div class="topline"><span class="pill ochre">할 일·일정 수정</span><button class="linkbtn" data-action="cancel-item-edit">취소</button></div><label>제목<input id="edit-item-title" value="${esc(item.title)}"></label><div class="row"><label>유형<select id="edit-item-type">${typeOptions(item.type)}</select></label><label>영역<select id="edit-item-area">${areaOptions(item.area)}</select></label></div><div class="row"><label>날짜<input id="edit-item-date" type="date" value="${item.date}"></label><label>상태<select id="edit-item-status">${statusOptions(item.status)}</select></label></div><label>색 분류 🔴/⚫<select id="edit-item-track"><option value="red" ${trackOf(item) === "red" ? "selected" : ""}>🔴 오늘 꼭 하나 (중요)</option><option value="black" ${trackOf(item) === "black" ? "selected" : ""}>⚫ 틈틈이 (잡무)</option></select></label><label>연결할 프로젝트<select id="edit-item-project">${projectOptions(item.projectId)}</select></label><button class="primary" data-action="save-item-edit" data-id="${item.id}">수정 저장</button></article>`;
}
function itemCard(item) {
  if (state.editingItemId === item.id) return itemEditCard(item);
  const area = areas[item.area] || areas.personal;
  return `<article class="item-card state-${item.status}"><div class="item-card-top"><span class="area-tag area-${area.color}">${area.label}</span><div>${priorityTag(item)}<span class="status-tag status-${item.status}">${statusLabels[item.status]}</span></div></div><strong>${esc(item.title)}</strong><p>${typeLabels[item.type]} · ${item.date}</p><div class="move-controls"><button class="outline" data-action="bring-forward" data-id="${item.id}">‹ 하루 당기기</button><button class="postpone-button" data-action="postpone-item" data-id="${item.id}">하루 미루기 ›</button></div><div class="item-actions"><select data-item-status="${item.id}" aria-label="${esc(item.title)} 상태">${statusOptions(item.status)}</select><button class="outline" data-action="edit-item" data-id="${item.id}">수정</button><button class="delete-button" data-action="delete-item" data-id="${item.id}">삭제</button></div></article>`;
}
function timeGroups() {
  const ordered = [...state.items].sort((a, b) => a.date.localeCompare(b.date));
  return {
    past: ordered.filter(item => item.date < todayKey),
    today: ordered.filter(item => item.date === todayKey),
    future: ordered.filter(item => item.date > todayKey)
  };
}
function compactTask(item) {
  const area = areas[item.area] || areas.personal;
  return `<button class="compact-task state-${item.status}" data-action="open-item" data-id="${item.id}" data-drag-type="task" data-drag-id="${item.id}" data-drag-date="${item.date}"><span class="drag-handle" title="길게 눌러 이동" aria-label="길게 눌러 이동">⋮⋮</span><div><strong>${esc(item.title)}</strong><small>${item.date} · ${typeLabels[item.type]} · 눌러서 수정</small></div><div><span class="area-tag area-${area.color}">${areas[item.area].label}</span>${priorityTag(item)}<span class="status-tag status-${item.status}">${statusLabels[item.status]}</span></div></button>`;
}
function taskFold(title, items, kind, open = false, limit = null) {
  const visible = limit ? items.slice(0, limit) : items;
  const completed = items.filter(item => item.status === "completed").length;
  return `<details class="fold-card fold-${kind}" ${open ? "open" : ""}><summary><span>${title}<small>${items.length}개</small></span><b>${completed}/${items.length || 0} 완료</b></summary><div class="fold-content">${visible.length ? visible.map(compactTask).join("") : `<p class="fold-empty">기록이 없습니다.</p>`}${limit && items.length > visible.length ? `<p class="more-note">외 ${items.length - visible.length}개는 캘린더에서 확인하세요.</p>` : ""}</div></details>`;
}
function routineFold(cadence, open = false) {
  const routines = state.routines.filter(routine => routine.cadence === cadence && routine.active).map(routine => routineStats(routine));
  const title = `${cadenceLabel(cadence)} 루틴`;
  const done = routines.filter(routine => routine.done).length;
  return `<details class="fold-card routine-fold" ${open ? "open" : ""}><summary><span>${title}<small>${routines.length}개</small></span><b>${done}/${routines.length || 0} 달성</b></summary><div class="fold-content">${routines.length ? routines.map(routine => `<button class="compact-routine state-${routine.status}" data-action="open-routine" data-id="${routine.id}"><div><strong>${esc(routine.title)}</strong><small>${routine.completed}/${routine.target}일 · ${routine.percent}% · ${routineScheduleLabel(routine)}</small></div><span class="pill ${routine.done ? "gold" : routine.cadence === "weekly" ? "" : routine.cadence === "monthly" ? "ochre" : "violet"}">${routine.done ? "달성" : routineStatusLabels[routine.status]}</span></button>`).join("") : `<p class="fold-empty">설정한 루틴이 없습니다.</p>`}</div></details>`;
}

function areaCommand(key, area) {
  const stat = progressStats(state.items.filter(item => item.area === key));
  return `<button class="area-command area-${area.color}" data-action="open-area" data-id="${key}"><span>${area.label}</span><b>${stat.percent}%</b><small>${area.hint} · ${stat.completed}/${stat.total || 0} 완료</small></button>`;
}
function areaGuide() {
  return `<details class="area-guide"><summary>영역을 어떻게 고르나요? <small>처음이면 여기부터</small></summary><div>${Object.values(areas).map(area => `<section class="area-guide-row area-${area.color}"><strong>${area.label} · ${area.hint}</strong><span>${area.example}</span></section>`).join("")}</div><p>하나가 애매하면 지금 가장 먼저 챙기고 싶은 쪽을 고르면 충분합니다. 나중에 언제든 수정할 수 있습니다.</p></details>`;
}
function todayProjectCard(project, nextAction) {
  if (!project) return `<section class="board-link-card project-board"><div><span class="board-kicker">프로젝트</span><strong>아직 연결한 프로젝트가 없습니다.</strong><small>결과를 하나 정하면 오늘의 다음 행동을 연결할 수 있습니다.</small></div><button class="outline" data-tab="projects">프로젝트 만들기</button></section>`;
  const stats = projectStats(project);
  return `<section class="board-link-card project-board"><div><span class="board-kicker">프로젝트 · ${stats.progress}%</span><strong>${esc(project.title)}</strong><small>${nextAction ? esc(nextAction.title) : projectDueCopy(stats)}</small><div class="mini-progress"><span style="width:${stats.progress}%"></span></div></div><button class="outline" data-action="open-project" data-id="${project.id}">현황 보기</button></section>`;
}
function todayToolCard(tool) {
  return `<section class="board-link-card tool-board"><div><span class="board-kicker">오늘의 도구 ${tool[0]}</span><strong>${esc(tool[1])}</strong><small>${esc(tool[2])}</small></div><button class="outline" data-action="open-tool-direct" data-id="${tool[0]}">기록하기</button></section>`;
}
function todayReflectionCard(entry) {
  const copy = entry ? `최근 질문: ${entry.question || entry.friction || entry.win || "성찰을 이어가 보세요."}` : "오늘 하루가 끝날 때 잘한 선택과 마찰을 짧게 기록하세요.";
  return `<section class="board-link-card reflection-board"><div><span class="board-kicker">저녁 성찰</span><strong>${entry ? "최근 성찰 이어보기" : "오늘의 성찰 준비"}</strong><small>${esc(copy)}</small></div><button class="outline" data-action="open-reflect">성찰하기</button></section>`;
}
function statusDropBoard(items, routines) {
  return `<details class="drag-status-board" open><summary><span>④ 끌어 놓기로 상태 변경</span><small>카드를 길게 눌러 계획·진행·완료 칸에 놓으세요.</small></summary><div class="status-drop-grid">${Object.entries(statusLabels).map(([status, label]) => { const taskRows = items.filter(item => item.status === status).map(compactTask).join(""); const routineRows = routines.filter(routine => routine.status === status).map(routineTodayRow).join(""); return `<section class="status-drop-zone status-${status}" data-drop-status="${status}"><strong>${label}</strong><div>${taskRows || routineRows ? `${taskRows}${routineRows}` : `<p>여기에 놓기</p>`}</div></section>`; }).join("")}</div></details>`;
}
function today() {
  const scopedItems = filterItems(state.items, { area: state.dashboardArea });
  const next = scopedItems.find(item => item.status !== "completed" && item.date >= todayKey) || scopedItems.find(item => item.status !== "completed");
  const stats = progressStats(scopedItems);
  const groups = { past: scopedItems.filter(item => item.date < todayKey), today: scopedItems.filter(item => item.date === todayKey), future: scopedItems.filter(item => item.date > todayKey) };
  const priorities = scopedItems.filter(item => item.priority === "high" && item.status !== "completed").slice(0, 3);
  const routines = state.routines.map(routine => routineStats(routine));
  const todayRoutines = state.routines.filter(routine => routineOccursOnDate(routine, todayKey)).map(routine => routineStats(routine));
  const routineDone = routines.filter(item => item.done).length;
  const project = state.projects[0];
  const projectAction = project ? state.items.find(item => item.projectId === project.id && item.status !== "completed") : null;
  const featuredTool = tools.find(tool => tool[0] === state.randomToolId) || tools.find(tool => tool[0] === 10);
  const latestReflection = state.reflectionEntries?.[0];
  const scopeLabel = state.dashboardArea === "all" ? "전체" : areas[state.dashboardArea].label;
  return `${header("TIME TIPPING COMPASS", "오늘의 나침반", "생각은 가볍게 꺼내고, 지금 할 일은 하나로 좁힙니다.")}
  <section class="card purpose"><div class="topline"><span class="pill ochre">◈ 최종 목적</span><button class="linkbtn" data-action="edit-purpose">다듬기 ›</button></div><p class="purpose-copy">${esc(state.purpose)}</p></section>
  <section class="today-board-head"><div><strong>${scopeLabel} · 오늘 실행 보드</strong><small>일정·습관·생각을 한 화면에서 연결합니다.</small></div><button class="quick-add-button" data-action="open-calendar">+ 한 줄 계획</button></section>
  ${next ? `<section class="card focus-card"><div class="topline"><span class="board-kicker">① 지금 한 가지</span><div>${priorityTag(next)}<span class="status-tag status-${next.status}">${statusLabels[next.status]}</span></div></div><div class="action-title">${esc(next.title)}</div><p class="action-detail">${typeLabels[next.type]} · ${next.date} · ${areas[next.area].label}</p><div class="row"><button class="outline" data-action="open-item" data-id="${next.id}">수정하기</button><button class="primary" data-action="complete-item" data-id="${next.id}">완료 ✓</button></div></section>` : `<section class="card empty"><strong>지금 남은 계획이 없습니다.</strong><p>새 할 일이나 작은 습관을 하나 정해 보세요.</p></section>`}
  <section class="card board-timeline"><div class="topline"><div><span class="board-kicker">② 오늘 시간표</span><strong>일정과 할 일</strong></div><button class="linkbtn" data-action="open-calendar-date" data-id="${todayKey}">주간 보기 ›</button></div><div class="board-timeline-list">${groups.today.length ? groups.today.map(compactTask).join("") : `<p class="fold-empty">오늘 등록된 일정·할 일이 없습니다.</p>`}</div></section>
  <section class="card board-routines"><div class="topline"><div><span class="board-kicker">③ 주간 루틴</span><strong>${todayRoutines.filter(routine => routineDayStatus(routine, todayKey) === "completed").length}/${todayRoutines.length} 오늘 완료</strong></div><button class="linkbtn" data-tab="routines">이번 주 점검 ›</button></div><p class="notice">오늘 한 일은 완료, 하고 있는 일은 진행, 못 한 일은 미룸으로 바꾸세요. 다른 날짜에는 영향을 주지 않습니다.</p><div class="board-routine-list">${todayRoutines.length ? todayRoutines.map(routineTodayRow).join("") : `<p class="fold-empty">오늘 실행할 루틴이 없습니다. 루틴 탭에서 작게 시작해 보세요.</p>`}</div></section>
  <section class="today-link-grid">${todayProjectCard(project, projectAction)}${todayToolCard(featuredTool)}${todayReflectionCard(latestReflection)}</section>
  <section class="card summary-card"><div class="overall-percent">${stats.percent}%</div><div><strong>${scopeLabel} 달성률</strong><div class="progress"><span style="width:${stats.percent}%"></span></div><p>계획 ${stats.planned} · 진행 ${stats.progress} · 완료 ${stats.completed}</p></div><button class="linkbtn" data-action="open-filtered-calendar">전체 일정·수정 ›</button></section>
  <div class="section-title"><span>4대 영역 바로가기</span><span class="meta">눌러서 기록 관리</span></div>${areaGuide()}<section class="area-command-grid">${Object.entries(areas).map(([key, area]) => areaCommand(key, area)).join("")}</section>
  ${priorities.length ? `<div class="section-title"><span>중요 우선순위</span><button class="linkbtn" data-action="clear-dashboard-area">전체 보기</button></div><section class="priority-lane">${priorities.map(item => `<button class="priority-row" data-action="open-item" data-id="${item.id}"><span class="area-tag area-${areas[item.area].color}">${areas[item.area].label}</span><strong>${esc(item.title)}</strong><span>수정 ›</span></button>`).join("")}</section>` : ""}
  <details class="today-more"><summary>지난 기록·예정·주기별 루틴 더 보기</summary><section class="home-folds">${taskFold("지난 기록", groups.past, "past", false, 2)}${taskFold("예정된 할 일", groups.future, "future", false, 3)}${routineFold("weekly", true)}${routineFold("monthly")}${routineFold("yearly")}</section></details>`;
}

function formatWeekDate(key) {
  const date = dateFromKey(key);
  return `${date.getMonth() + 1}/${date.getDate()} ${weekdayLabel(key)}`;
}
function weekRoutinePlan(date) {
  const routines = state.routines.filter(routine => routineOccursOnDate(routine, date)).map(routine => routineStats(routine, dateFromKey(date))).sort((a, b) => (a.sortOrderByDate?.[date] ?? 0) - (b.sortOrderByDate?.[date] ?? 0) || a.title.localeCompare(b.title));
  if (!routines.length) return `<p class="week-empty">설정된 루틴이 없습니다.</p>`;
  return `<div class="week-routines">${routines.map(routine => routineDayRow(routine, date, true)).join("")}</div>`;
}
function weekDayCard(date, filters) {
  const entries = filterItems(state.items, filters).filter(item => item.date === date);
  const chosen = date === state.selectedDate;
  return `<article class="week-day ${chosen ? "selected" : ""}" data-drop-date="${date}"><button class="week-day-title" data-action="select-date" data-id="${date}"><strong>${formatWeekDate(date)}</strong><span>${entries.length}개 · 열기</span></button><div class="week-items">${entries.length ? entries.map(compactTask).join("") : `<p class="week-empty">일정 없음</p>`}</div>${weekRoutinePlan(date)}<div class="week-day-actions"><button class="linkbtn" data-action="select-date" data-id="${date}">이 날짜에 기록 추가 ›</button>${state.routines.filter(routine => !isFixedRoutine(routine) && routine.active).length ? `<button class="linkbtn" data-action="open-routine-picker" data-id="${date}">비고정 루틴 선택 ›</button>` : ""}</div></article>`;
}
function routineDatePicker() {
  const date = state.routinePickerDate;
  if (!date) return "";
  const choices = state.routines.filter(routine => !isFixedRoutine(routine) && routine.active);
  return `<section class="card routine-date-picker"><div class="topline"><span class="pill ochre">${formatWeekDate(date)} · 비고정 루틴</span><button class="linkbtn" data-action="close-routine-picker">닫기</button></div><p class="notice">필요한 루틴만 이 날짜에 선택하세요. 선택하지 않은 루틴은 오늘의 목록에 나타나지 않습니다.</p><div class="routine-picker-list">${choices.length ? choices.map(routine => { const selected = routine.scheduledDates.includes(date); return `<div class="routine-picker-row"><strong>${esc(routine.title)}</strong><button class="${selected ? "outline" : "primary"}" data-action="toggle-routine-date" data-id="${routine.id}|${date}">${selected ? "선택 해제" : "이 날짜에 선택"}</button></div>`; }).join("") : `<p class="fold-empty">선택 가능한 비고정 루틴이 없습니다.</p>`}</div></section>`;
}
function weeklyCalendar(filters) {
  const start = startOfWeek(state.calendarWeekStart || state.selectedDate || todayKey);
  const days = weekDates(start);
  return `<section class="card week-calendar ${state.calendarLayout}"><div class="calendar-title"><button class="month-button" data-action="prev-week">‹</button><strong>${formatWeekDate(days[0])} — ${formatWeekDate(days[6])}</strong><button class="month-button" data-action="next-week">›</button></div><div class="week-layout-switch"><button class="filter-chip ${state.calendarLayout === "vertical" ? "active" : ""}" data-action="set-week-layout" data-id="vertical">세로 보기</button><button class="filter-chip ${state.calendarLayout === "horizontal" ? "active" : ""}" data-action="set-week-layout" data-id="horizontal">가로 보기</button></div><div class="week-board">${days.map(date => weekDayCard(date, filters)).join("")}</div></section>${routineDatePicker()}`;
}

function calendarView() {
  const [year, month] = monthParts(state.calendarMonth);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const dayCount = new Date(year, month, 0).getDate();
  const selected = state.selectedDate?.startsWith(state.calendarMonth) ? state.selectedDate : `${state.calendarMonth}-01`;
  const filters = { area: state.calendarArea, horizon: state.calendarHorizon, status: state.calendarStatus, priority: state.calendarPriority };
  const filteredItems = filterItems(state.items, filters);
  const allStats = progressStats(filteredItems);
  const routineList = state.routines.map(routine => routineStats(routine));
  const routineTarget = routineList.reduce((total, routine) => total + routine.target, 0);
  const routineComplete = routineList.reduce((total, routine) => total + Math.min(routine.count, routine.target), 0);
  const routinePercent = routineTarget ? Math.round((routineComplete / routineTarget) * 100) : 0;
  const cells = Array.from({ length: firstDay + dayCount }, (_, index) => {
    if (index < firstDay) return `<div class="calendar-cell blank"></div>`;
    const day = index - firstDay + 1;
    const date = `${state.calendarMonth}-${String(day).padStart(2, "0")}`;
    const entries = filteredItems.filter(item => item.date === date);
    const dots = entries.slice(0, 3).map(item => `<i class="calendar-dot area-${item.area} state-${item.status}"></i>`).join("");
    return `<button class="calendar-cell ${date === selected ? "selected" : ""} ${date === todayKey ? "today-cell" : ""}" data-action="select-date" data-id="${date}"><span>${day}</span>${entries.length ? `<em>${entries.length}</em><div class="dot-row">${dots}</div>` : ""}</button>`;
  }).join("");
  const selectedItems = state.items.filter(item => item.date === selected).sort((a, b) => priorityRank(a) - priorityRank(b));
  const monthlyPlanner = `<section class="card calendar-card"><div class="calendar-title"><button class="month-button" data-action="prev-month">‹</button><strong>${monthName(state.calendarMonth)}</strong><button class="month-button" data-action="next-month">›</button></div><div class="weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div><div class="calendar-grid">${cells}</div><p class="calendar-key"><i class="area-personal"></i>개인 <i class="area-career"></i>경력 <i class="area-people"></i>사람 <i class="area-leisure"></i>여가</p></section>`;
  const planner = state.calendarMode === "week" ? weeklyCalendar(filters) : monthlyPlanner;
  return `${header("PLAN / DO / REVIEW", "계획 캘린더", "필터를 눌러 필요한 기록만 보고, 카드를 눌러 바로 수정합니다.")}
  <section class="calendar-view-controls"><div><button class="filter-chip ${state.calendarMode === "month" ? "active" : ""}" data-action="set-calendar-mode" data-id="month">월간 보기</button><button class="filter-chip ${state.calendarMode === "week" ? "active" : ""}" data-action="set-calendar-mode" data-id="week">요일별 보기</button></div><label>기록 날짜 바로 선택<input id="calendar-date-picker" type="date" value="${selected}"></label><button class="outline date-go-button" data-action="go-selected-date">날짜로 이동</button></section>
  <section class="filter-panel"><div class="filter-label">시간대</div><div class="filter-row"><button class="filter-chip ${state.calendarHorizon === "all" ? "active" : ""}" data-action="calendar-horizon" data-id="all">전체</button><button class="filter-chip ${state.calendarHorizon === "past" ? "active" : ""}" data-action="calendar-horizon" data-id="past">지난 기록</button><button class="filter-chip ${state.calendarHorizon === "today" ? "active" : ""}" data-action="calendar-horizon" data-id="today">오늘</button><button class="filter-chip ${state.calendarHorizon === "future" ? "active" : ""}" data-action="calendar-horizon" data-id="future">예정</button></div><div class="filter-label">상태</div><div class="filter-row"><button class="filter-chip ${state.calendarStatus === "all" ? "active" : ""}" data-action="calendar-status" data-id="all">전체 상태</button>${Object.entries(statusLabels).map(([key, label]) => `<button class="filter-chip status-${key} ${state.calendarStatus === key ? "active" : ""}" data-action="calendar-status" data-id="${key}">${label}</button>`).join("")}</div></section>
  <section class="card calendar-summary"><div><strong>필터 결과 달성률</strong><span class="big-percent">${allStats.percent}%</span></div><div class="progress"><span style="width:${allStats.percent}%"></span></div><p>${filteredItems.length}개 중 계획 ${allStats.planned} · 진행 ${allStats.progress} · 완료 ${allStats.completed}</p></section>
  <section class="card calendar-routine-summary"><div><strong>이번 주기 루틴</strong><span class="big-percent">${routinePercent}%</span></div><div class="progress"><span style="width:${routinePercent}%"></span></div><p>${routineComplete}/${routineTarget || 0}회 달성 · 주간·월간·연간 루틴을 포함합니다.</p><button class="linkbtn" data-tab="reflect">루틴 기록 보기 ›</button></section>
  <details class="quick-results" open><summary>지금 보고 있는 기록 <small>${filteredItems.length}개</small></summary><div class="quick-results-list">${filteredItems.length ? filteredItems.slice(0, 8).map(compactTask).join("") : `<p class="fold-empty">현재 필터에 맞는 기록이 없습니다.</p>`}${filteredItems.length > 8 ? `<p class="more-note">${filteredItems.length - 8}개가 더 있습니다. 필터를 좁혀 보세요.</p>` : ""}</div></details>
  <section class="area-progress-grid">${Object.entries(areas).map(([key, area]) => { const stat = progressStats(state.items.filter(item => item.area === key)); return `<button class="area-progress area-${area.color}" data-action="calendar-area" data-id="${key}"><strong>${area.label}</strong><span>${stat.percent}%</span><small>${stat.completed}/${stat.total || 0} 완료 · 보기</small></button>`; }).join("")}</section>
  ${planner}
  <div class="section-title"><span>${selected.replaceAll("-", ".")} 기록</span><span class="meta">${selectedItems.length}개</span></div>
  <section class="card form item-form"><label>제목<input id="item-title" placeholder="예: 고객 미팅 준비"></label><div class="row"><label>유형<select id="item-type">${typeOptions("task")}</select></label><label>영역<select id="item-area">${areaOptions(state.calendarArea === "all" ? "personal" : state.calendarArea)}</select></label></div><div class="row"><label>날짜<input id="item-date" type="date" value="${selected}"></label><label>상태<select id="item-status">${statusOptions("planned")}</select></label></div><label>색 분류 🔴/⚫<select id="item-track"><option value="red">🔴 오늘 꼭 하나 (중요)</option><option value="black" selected>⚫ 틈틈이 (잡무)</option></select></label><label>연결할 프로젝트<select id="item-project">${projectOptions()}</select></label><button class="primary" data-action="add-item">일정·할 일 추가</button></section>
  <div class="item-list">${selectedItems.length ? selectedItems.map(itemCard).join("") : `<section class="card empty">선택한 날짜에 기록된 계획이 없습니다.</section>`}</div>`;
}

function projectCard(project) {
  if (state.editingProjectId === project.id) return `<section class="card form edit-form"><div class="topline"><span class="pill ochre">프로젝트 현황 수정</span><button class="linkbtn" data-action="cancel-project-edit">취소</button></div><label>프로젝트 이름<input id="edit-project-title" value="${esc(project.title)}"></label><label>완료 기준<textarea id="edit-project-outcome">${esc(project.outcome)}</textarea></label><div class="row"><label>마감일<input id="edit-project-due-date" type="date" value="${project.dueDate || ""}"></label><label>진행 상태<select id="edit-project-status">${statusOptions(project.status || "planned")}</select></label></div><label>직접 정한 진행률 <input id="edit-project-progress" type="number" inputmode="numeric" min="0" max="100" value="${project.progress || 0}"><small>연결한 할 일이 있으면 완료 비율로 자동 계산됩니다.</small></label><button class="primary" data-action="save-project-edit" data-id="${project.id}">현황 저장</button></section>`;
  const stats = projectStats(project);
  return `<section class="card project state-${stats.status}"><div class="topline"><span class="pill ${stats.status === "completed" ? "gold" : stats.status === "progress" ? "moss" : "ochre"}">${statusLabels[stats.status]}</span><span class="project-due ${project.dueDate && daysUntil(project.dueDate) < 0 ? "overdue" : ""}">${projectDueCopy(stats)}</span></div><h3>${esc(project.title)}</h3><p>${esc(project.outcome)}</p><div class="project-progress-line"><strong>${stats.progress}% 진행</strong><span>${stats.items.length ? `연결된 할 일 ${stats.completedItems}/${stats.items.length} 완료` : "직접 입력한 진행률"}</span></div><div class="progress"><span style="width:${stats.progress}%"></span></div><div class="item-actions"><button class="outline" data-action="edit-project" data-id="${project.id}">현황 수정</button><button class="delete-button" data-action="delete-project" data-id="${project.id}">삭제</button></div></section>`;
}
function projects() {
  return `${header("GOAL · 목표", "목표", "오늘의 빨강이 향하는 큰 방향입니다.")}
  <section class="card form"><label>새 프로젝트 이름<input id="project-title" placeholder="예: 90일 나침반 완성"></label><label>완료되면 무엇이 달라지나요?<textarea id="project-outcome" placeholder="눈으로 확인할 수 있는 결과를 적어 주세요"></textarea></label><div class="row"><label>마감일<input id="project-due-date" type="date" value="${shiftDate(todayKey, 30)}"></label><label>시작 상태<select id="project-status">${statusOptions("planned")}</select></label></div><label>시작 진행률<input id="project-progress" type="number" inputmode="numeric" min="0" max="100" value="0"><small>연결한 할 일이 있으면 완료한 할 일의 비율로 자동 표시됩니다.</small></label><button class="primary" data-action="add-project">프로젝트 만들기</button></section>
  <div class="section-title"><span>진행 중인 프로젝트</span><span class="meta">${state.projects.length}개</span></div>${state.projects.map(projectCard).join("")}`;
}

function toolsView() {
  const selected = tools.find(tool => tool[0] === state.selectedTool);
  const guide = selected ? toolGuides[selected[0]] : null;
  const hasSavedNote = selected && (selected[0] === 1 ? state.purpose !== defaultState.purpose : Boolean(state.notes[selected[0]]));
  const featured = tools.find(tool => tool[0] === state.randomToolId) || tools.find(tool => tool[0] === 6);
  const savedTools = tools.filter(tool => tool[0] === 1 ? state.purpose !== defaultState.purpose : Boolean(state.notes[tool[0]]));
  return `${header("10가지 시간 장악 도구", "도구 상자", "도구를 모두 읽지 않아도 됩니다. 지금 필요한 한 장만 뽑아 짧게 기록하세요.")}
  <section class="random-tool-card"><span class="pill ochre">오늘의 도구 한 장</span><div><span class="tool-number">${featured[0]}</span><div><h2>${featured[1]}</h2><p>${featured[2]}</p></div></div><button class="primary" data-action="random-tool">새 도구 뽑기 · 기록하기</button><small>기록은 저장되고, 아래 ‘저장한 도구 기록’에서 다시 수정할 수 있습니다.</small></section>
  <details class="tool-library"><summary>10가지 도구 전체 보기 <small>필요할 때만 열기</small></summary><div class="tool-grid">${tools.map(tool => `<button class="tool" data-tool="${tool[0]}"><span class="tool-number">${tool[0]}</span><span class="tool-copy"><strong>${tool[1]}</strong><span>${tool[2]}${state.notes[tool[0]] ? " · 기록됨" : ""}</span></span><span>›</span></button>`).join("")}</div></details>
  <details class="tool-library saved-tools" ${savedTools.length ? "open" : ""}><summary>저장한 도구 기록 <small>${savedTools.length}개</small></summary><div class="saved-tool-list">${savedTools.length ? savedTools.map(tool => `<button class="saved-tool-row" data-tool="${tool[0]}"><span class="tool-number">${tool[0]}</span><span><strong>${tool[1]}</strong><small>${esc(tool[0] === 1 ? state.purpose : state.notes[tool[0]])}</small></span><b>수정 ›</b></button>`).join("") : `<p class="fold-empty">저장한 도구 기록이 없습니다.</p>`}</div></details>
  ${selected ? `<section class="sheet"><span class="pill">도구 ${selected[0]}</span><h2>${selected[1]}</h2><q>${selected[3]}</q><aside class="tool-guide"><strong>언제 사용하나요?</strong><p>${guide.when}</p><strong>3단계로 써 보세요.</strong><ol>${guide.steps.map(step => `<li>${step}</li>`).join("")}</ol></aside><label>${selected[4]}<textarea id="tool-note" placeholder="짧게 적어도 충분합니다.">${esc(selected[0] === 1 ? state.purpose : (state.notes[selected[0]] || ""))}</textarea></label><div class="row"><button class="outline" data-action="close-tool">닫기</button><button class="primary" data-action="save-tool" data-id="${selected[0]}">${hasSavedNote ? "기록 수정 저장" : "기록 저장"}</button></div>${hasSavedNote ? `<button class="delete-button full-delete" data-action="delete-tool-note" data-id="${selected[0]}">${selected[0] === 1 ? "기본 목적문으로 되돌리기" : "이 도구 기록 삭제"}</button>` : ""}</section>` : ""}`;
}

function periodKey(cadence, date = new Date()) {
  if (cadence === "monthly") return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  if (cadence === "yearly") return String(date.getFullYear());
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const first = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((utc - first) / 86400000) + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
function cadenceLabel(cadence) { return ({ weekly: "주간", monthly: "월간", yearly: "연간" })[cadence]; }
function periodDates(cadence, date = new Date()) {
  const anchor = localDate(date);
  if (cadence === "weekly") return weekDates(anchor);
  if (cadence === "monthly") { const [year, month] = anchor.slice(0, 7).split("-").map(Number); const last = new Date(year, month, 0).getDate(); return Array.from({ length: last }, (_, index) => `${year}-${String(month).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`); }
  const year = Number(anchor.slice(0, 4)); const start = `${year}-01-01`; const last = new Date(year, 11, 31).getDate(); return Array.from({ length: Math.round((new Date(`${year}-12-${String(last).padStart(2, "0")}`) - new Date(start)) / 86400000) + 1 }, (_, index) => shiftDate(start, index));
}
function routineDayStatus(routine, date) { return routine.dailyRecords?.[date]?.status || (routineOccursOnDate(routine, date) ? "planned" : null); }
function routineExpectedDates(routine, dates) {
  return dates.filter(date => routineOccursOnDate(routine, date));
}
function routineDailySummary(routine, date = new Date()) {
  const dates = periodDates(routine.cadence, date);
  const expectedDates = routineExpectedDates(routine, dates);
  const anchor = localDate(date);
  const sameCurrentPeriod = periodKey(routine.cadence, dateFromKey(todayKey)) === periodKey(routine.cadence, date);
  const cutoff = sameCurrentPeriod ? todayKey : (anchor < todayKey ? dates[dates.length - 1] : dates[0]);
  const dueDates = expectedDates.filter(key => key <= cutoff);
  const rows = dueDates.map(key => ({ date: key, status: routineDayStatus(routine, key) || "planned" }));
  const completed = rows.filter(row => row.status === "completed").length;
  const progress = rows.filter(row => row.status === "progress").length;
  const postponed = rows.filter(row => row.status === "postponed").length;
  const planned = rows.filter(row => row.status === "planned").length;
  return { dates, expectedDates, dueDates, rows, completed, progress, postponed, planned, target: dueDates.length, percent: dueDates.length ? Math.round((completed / dueDates.length) * 100) : 0 };
}
function routineStats(routine, date = new Date()) {
  const key = periodKey(routine.cadence, date);
  const daily = routineDailySummary(routine, date);
  const legacyCount = (routine.completions || []).filter(item => item.key === key).length;
  const count = Math.max(daily.completed, legacyCount);
  const target = daily.target || Math.max(1, Number(routine.target) || 1);
  const status = daily.target ? (daily.completed >= daily.target ? "completed" : (daily.progress || daily.completed ? "progress" : (daily.postponed && !daily.planned ? "postponed" : "planned"))) : (routine.statusByPeriod?.[key] || (legacyCount >= target ? "completed" : (legacyCount ? "progress" : "planned")));
  return { ...routine, ...daily, key, count, target, status, done: status === "completed", percent: daily.target ? daily.percent : (status === "completed" ? 100 : Math.min(100, Math.round((count / target) * 100))) };
}
function routineEditCard(routine) {
  return `<section class="card form edit-form"><div class="topline"><span class="pill ochre">루틴 설정 수정</span><button class="linkbtn" data-action="cancel-routine-edit">취소</button></div><p class="notice">여기서는 이름·반복 시점만 바꿉니다. 오늘 했는지는 위쪽의 체크 목록에서 기록하세요.</p><label>루틴 이름<input id="edit-routine-title" value="${esc(routine.title)}"></label><div class="row"><label>영역<select id="edit-routine-area">${areaOptions(routine.area || "personal")}</select></label><label>반복 주기<select id="edit-routine-cadence"><option value="weekly" ${routine.cadence === "weekly" ? "selected" : ""}>매주</option><option value="monthly" ${routine.cadence === "monthly" ? "selected" : ""}>매월</option><option value="yearly" ${routine.cadence === "yearly" ? "selected" : ""}>매년</option></select></label></div><fieldset class="routine-timing-fields"><legend>언제 체크할까요?</legend>${weekdayChecklist(routineWeekdays(routine), "edit-routine")}<div class="row"><label>월간 루틴 날짜<input id="edit-routine-monthly-day" type="number" inputmode="numeric" min="1" max="28" value="${routine.monthlyDay || 1}"><small>매월 이 날짜에 표시</small></label><label>연간 루틴 날짜<select id="edit-routine-yearly-month">${Array.from({ length: 12 }, (_, index) => `<option value="${index + 1}" ${Number(routine.yearlyMonth) === index + 1 ? "selected" : ""}>${index + 1}월</option>`).join("")}</select><input id="edit-routine-yearly-day" type="number" inputmode="numeric" min="1" max="28" value="${routine.yearlyDay || 1}"><small>매년 이 날짜에 표시</small></label></div></fieldset><label>사용 여부<select id="edit-routine-active"><option value="true" ${routine.active ? "selected" : ""}>표시하고 기록하기</option><option value="false" ${!routine.active ? "selected" : ""}>잠시 보류</option></select></label><button class="primary" data-action="save-routine-edit" data-id="${routine.id}">설정 저장</button></section>`;
}
function routineTimingNotice(routine) {
  if (routine.cadence === "monthly") return `매월 ${routine.monthlyDay || 1}일에 오늘의 루틴에 나타납니다.`;
  if (routine.cadence === "yearly") return `매년 ${routine.yearlyMonth || 1}월 ${routine.yearlyDay || 1}일에 오늘의 루틴에 나타납니다.`;
  return isFixedRoutine(routine) ? `${routineScheduleLabel(routine)}에 오늘의 루틴에 나타납니다.` : "캘린더에서 선택한 날짜에 오늘의 루틴에 나타납니다.";
}
function routineCard(routine) {
  if (state.editingRoutineId === routine.id) return routineEditCard(routine);
  const area = areas[routine.area] || areas.personal;
  return `<section class="card routine-card state-${routine.status} ${routine.active ? "" : "inactive-routine"}"><div class="topline"><span class="pill ${routine.done ? "gold" : routine.cadence === "weekly" ? "" : routine.cadence === "monthly" ? "ochre" : "violet"}">${cadenceLabel(routine.cadence)} · ${routineScheduleLabel(routine)}</span><span class="area-tag area-${area.color}">${area.label}</span></div><h3>${esc(routine.title)}</h3><p class="routine-timing-copy">${routineTimingNotice(routine)}</p><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${routine.target}" aria-valuenow="${routine.completed}"><span style="width:${routine.percent}%"></span></div><p class="routine-status">${!routine.active ? "보류 중입니다. 설정 수정에서 다시 표시할 수 있습니다." : `${routine.completed}/${routine.target}일 완료 · 진행 ${routine.progress}일 · 미룸 ${routine.postponed}일`}</p><div class="routine-controls"><button class="outline" data-action="edit-routine" data-id="${routine.id}">설정 수정</button><button class="delete-button" data-action="delete-routine" data-id="${routine.id}">삭제</button></div></section>`;
}
function routinesView() {
  const ordered = ["weekly", "monthly", "yearly"].flatMap(cadence => state.routines.filter(routine => routine.cadence === cadence).map(routine => routineStats(routine)));
  return `<div class="section-title"><span>루틴 설정</span><span class="meta">체크는 위의 오늘·기간 목록에서</span></div>
  <section class="card form routine-form"><p class="notice">루틴은 하나씩 짧게 등록하세요. 매주는 요일을 고르고, 매월·매년은 나타날 날짜만 고르면 됩니다.</p><label>새 루틴 이름<input id="routine-title" placeholder="예: 월·수·금 스트레칭"></label><div class="row"><label>영역<select id="routine-area">${areaOptions("personal")}</select></label><label>반복 주기<select id="routine-cadence"><option value="weekly">매주</option><option value="monthly">매월</option><option value="yearly">매년</option></select></label></div><fieldset class="routine-timing-fields"><legend>언제 체크할까요?</legend>${weekdayChecklist([], "routine")}<div class="row"><label>월간 루틴 날짜<input id="routine-monthly-day" type="number" inputmode="numeric" min="1" max="28" value="1"><small>매월 이 날짜에 표시</small></label><label>연간 루틴 날짜<select id="routine-yearly-month">${Array.from({ length: 12 }, (_, index) => `<option value="${index + 1}">${index + 1}월</option>`).join("")}</select><input id="routine-yearly-day" type="number" inputmode="numeric" min="1" max="28" value="1"><small>매년 이 날짜에 표시</small></label></div></fieldset><button class="primary" data-action="add-routine">루틴 추가</button></section>
  <div class="routine-list">${["weekly", "monthly", "yearly"].map((cadence, index) => { const group = ordered.filter(routine => routine.cadence === cadence); return `<details class="routine-detail-fold" ${index === 0 ? "open" : ""}><summary>${cadenceLabel(cadence)} 루틴 <small>${group.length}개</small></summary><div class="routine-fold-content">${group.length ? group.map(routineCard).join("") : `<p class="fold-empty">설정한 루틴이 없습니다.</p>`}</div></details>`; }).join("")}</div>`;
}

function reflectionCard(entry) {
  const date = new Date(entry.createdAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
  return `<article class="card reflection-card"><div class="topline"><span class="pill moss">저장된 성찰</span><span class="meta">${date}</span></div><p><strong>잘한 선택</strong>${esc(entry.win || "—")}</p><p><strong>마찰</strong>${esc(entry.friction || "—")}</p><p><strong>더 좋은 질문</strong>${esc(entry.question || "—")}</p><div class="item-actions"><button class="outline" data-action="edit-reflection" data-id="${entry.id}">수정</button><button class="delete-button" data-action="delete-reflection" data-id="${entry.id}">삭제</button></div></article>`;
}
function reflect() {
  const reflection = state.reflection || defaultState.reflection;
  const editing = Boolean(state.editingReflectionId);
  const entries = state.reflectionEntries || [];
  return `${header("EMOTION · 감정", "감정", "감정을 고치지 말고 관찰하세요. 다음 선택이 더 선명해집니다.")}
  <section class="card reflection-routine-link"><strong>루틴은 별도 탭에서 관리합니다.</strong><p>오늘의 작은 습관, 주간 반복, 목표 달성을 한 곳에서 확인하세요.</p><button class="outline" data-tab="routines">루틴 탭 열기</button></section>
  <div class="section-title"><span>${editing ? "성찰 수정" : "새 성찰 기록"}</span><span class="meta">${entries.length}개 저장됨</span></div>
  <section class="card form"><label>오늘 나를 가장 흔든 감정은?<textarea id="win" placeholder="예: 오후에 갑자기 무기력했다">${esc(reflection.win)}</textarea></label><label>그 감정이 어떤 계획을 밀어냈나? (없으면 없음)<textarea id="friction" placeholder="예: 빨강 20분 점검을 미룰 뻔했다">${esc(reflection.friction)}</textarea></label><label>내일 그 감정이 오면 뭘 다르게?<textarea id="question" placeholder="예: 5분 타이머만 켜고 앉는다">${esc(reflection.question)}</textarea></label><div class="row">${editing ? `<button class="outline" data-action="cancel-reflection-edit">취소</button>` : ""}<button class="primary" data-action="save-reflect">${editing ? "성찰 수정 저장" : "성찰 저장"}</button></div><p class="notice">루틴·일정·성찰 기록은 이 브라우저와 기기에만 저장됩니다.</p></section>
  <div class="section-title"><span>성찰 기록 목록</span><span class="meta">수정·삭제 가능</span></div><section class="reflection-list">${entries.length ? entries.map(reflectionCard).join("") : `<section class="card empty">아직 저장된 성찰이 없습니다.</section>`}</section>`;
}

function routineDayRow(routine, date, draggable = false) {
  const status = routineDayStatus(routine, date) || "planned";
  const area = areas[routine.area] || areas.personal;
  return `<section class="routine-day-row state-${status}" ${draggable ? `data-drag-type="routine" data-drag-id="${routine.id}" data-drag-date="${date}"` : ""}><div>${draggable ? `<span class="drag-handle" title="길게 눌러 날짜 이동" aria-label="길게 눌러 날짜 이동">⋮⋮</span>` : ""}<span class="pill ${status === "completed" ? "gold" : ""}">${isFixedRoutine(routine) ? "고정" : routine.cadence === "weekly" ? "비고정" : cadenceLabel(routine.cadence)}</span><span class="area-tag area-${area.color}">${area.label}</span><strong>${esc(routine.title)}</strong></div><div class="routine-day-controls"><select data-routine-day-status="${routine.id}|${date}" aria-label="${esc(routine.title)} ${formatWeekDate(date)} 상태">${routineStatusOptions(status)}</select><button class="outline" data-action="postpone-routine-day" data-id="${routine.id}|${date}" ${status === "completed" ? "disabled" : ""}>미루기</button></div></section>`;
}
function routineTodayRow(routine) { return routineDayRow(routine, todayKey); }
function routineAreaGroups(routines, date = todayKey) {
  const groups = Object.entries(areas).map(([key, area]) => ({ key, area, routines: routines.filter(routine => routine.area === key) })).filter(group => group.routines.length);
  if (!groups.length) return `<p class="fold-empty">이 영역에 오늘 실행할 루틴이 없습니다.</p>`;
  return groups.map(group => `<section class="routine-area-group area-${group.area.color}"><div class="routine-area-heading"><strong>${group.area.label} · ${group.area.hint}</strong><span>${group.routines.filter(routine => routineDayStatus(routine, date) === "completed").length}/${group.routines.length} 완료</span></div><div>${group.routines.map(routine => routineDayRow(routine, date)).join("")}</div></section>`).join("");
}
function todayNonFixedPicker() {
  const choices = state.routines.filter(routine => routine.active && routine.cadence === "weekly" && !isFixedRoutine(routine) && !routineOccursOnDate(routine, todayKey));
  return `<details class="today-routine-picker"><summary>오늘 실천할 비고정 루틴 추가 <small>${choices.length}개</small></summary><p>오늘 할 루틴만 추가하세요. 추가하면 위의 오늘 루틴 목록에 바로 나타납니다.</p>${choices.length ? `<div>${choices.map(routine => `<button class="outline" data-action="schedule-routine-today" data-id="${routine.id}">+ ${esc(routine.title)} <small>${(areas[routine.area] || areas.personal).label}</small></button>`).join("")}</div>` : `<p class="fold-empty">추가할 비고정 루틴이 없습니다.</p>`}</details>`;
}
function weeklyRoutineManager() {
  const days = weekDates(state.calendarWeekStart || state.selectedDate || todayKey);
  return `<section class="weekly-routine-manager"><div class="section-title"><span>이번 주 루틴 점검</span><span class="meta">매일 상태를 직접 바꿔 기록</span></div><p class="notice">완료를 눌러도 다른 날짜는 그대로 남습니다. 못 한 날은 ‘미룸’을 누르면 다음 날에 다시 확인할 수 있습니다.</p><div class="routine-day-board">${days.map(date => { const routines = state.routines.filter(routine => routineOccursOnDate(routine, date)).map(routine => routineStats(routine, dateFromKey(date))); const completed = routines.filter(routine => routineDayStatus(routine, date) === "completed").length; return `<section class="routine-day-column ${date === todayKey ? "today-column" : ""}"><div class="routine-day-heading"><strong>${formatWeekDate(date)}</strong><span>${completed}/${routines.length} 완료</span></div>${routines.length ? routines.map(routine => routineDayRow(routine, date, true)).join("") : `<p class="week-empty">루틴 없음</p>`}</section>`; }).join("")}</div></section>`;
}
function routines() {
  const allTodayRoutines = state.routines.filter(routine => routineOccursOnDate(routine, todayKey)).map(routine => routineStats(routine));
  const todayRoutines = state.routineArea === "all" ? allTodayRoutines : allTodayRoutines.filter(routine => routine.area === state.routineArea);
  const week = weekDates(state.selectedDate || todayKey);
  return `${header("SMALL HABITS / REPEAT", "루틴", "작은 습관을 놓치지 않도록 오늘 실행, 반복 요일, 전체 목록을 한곳에 모았습니다.")}
  <section class="card routine-today-card"><div class="topline"><div><strong>오늘의 루틴</strong><small>고정·비고정·월간·연간 중 오늘 할 일</small></div><span class="pill ochre">${todayRoutines.filter(routine => routineDayStatus(routine, todayKey) === "completed").length}/${todayRoutines.length} 완료</span></div><div class="routine-area-filter"><button class="filter-chip ${state.routineArea === "all" ? "active" : ""}" data-action="routine-area" data-id="all">전체</button>${Object.entries(areas).map(([key, area]) => `<button class="filter-chip area-${area.color} ${state.routineArea === key ? "active" : ""}" data-action="routine-area" data-id="${key}">${area.label}</button>`).join("")}</div><div class="routine-today-list">${routineAreaGroups(todayRoutines)}</div>${state.routineArea === "all" ? todayNonFixedPicker() : ""}</section>
  <section class="card routine-week-card"><div class="calendar-title"><button class="month-button" data-action="prev-week">‹</button><strong>${formatWeekDate(week[0])} — ${formatWeekDate(week[6])}</strong><button class="month-button" data-action="next-week">›</button></div><div class="routine-week-strip">${week.map(date => { const count = state.routines.filter(routine => routineOccursOnDate(routine, date)).length; return `<button class="${date === todayKey ? "today-slot" : ""}" data-action="open-calendar-date" data-id="${date}"><strong>${weekdayLabel(date)}</strong><span>${date.slice(-2)}</span><small>${count}개</small></button>`; }).join("")}</div></section>
  ${weeklyRoutineManager()}
  ${routinesView()}`;
}

function nowTime() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }
function logEvent(type, text, date = todayKey) { state.events = state.events || []; state.events.unshift({ id: Date.now() + Math.random(), date, time: nowTime(), type, text }); if (state.events.length > 800) state.events = state.events.slice(0, 800); }
function trackOf(item) { return item.track || (item.priority === "high" ? "red" : "black"); }
function addWater(n) { state.garden = state.garden || { points: 0 }; state.garden.points += n; }
function seedCard() {
  const p = (state.garden && state.garden.points) || 0;
  const stage = Math.min(4, Math.floor(p / 12));
  const plant = ["🌱", "🌿", "🪴", "🌷", "🌸"][stage];
  const msg = stage >= 4 ? "활짝 폈어요 🌸 매일이 쌓인 결과예요" : "오늘 꼭 하나·매일의 약속을 해내면 물을 줘요. 줄지 않고 자라기만 해요 🌿";
  return `<section class="seed-card"><div class="seed-plant">${plant}</div><div class="seed-txt"><b>오늘의 새싹</b><small>${msg}</small></div><div class="seed-pts"><b>${p}</b><small>물방울</small></div></section>`;
}
function moodStrip() {
  const list = (state.moodLog && state.moodLog[todayKey]) || [];
  const current = list.length ? list[list.length - 1].mood : null;
  return `<section class="mood-strip"><span class="mood-lab">지금 기분?</span><div class="mood-faces">${moodFaces.map(([key, face]) => `<button class="mood-face ${current === key ? "sel" : ""}" data-action="set-mood" data-id="${key}|${todayKey}" aria-label="${key}">${face}</button>`).join("")}</div></section>`;
}
function redFocus() {
  const reds = state.items.filter(item => trackOf(item) === "red" && item.status !== "completed" && item.date <= todayKey).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return `<section class="card block-red"><div class="block-kick"><span class="cdot red"></span>오늘 꼭 하나 <small>가장 중요한 한 가지</small></div>${reds.length ? reds.map((item, index) => { const area = areas[item.area] || areas.personal; return `<div class="red-focus ${index === 0 ? "first" : ""}"><div class="rf-top"><span class="area-tag area-${area.color}">${area.label}</span><span class="status-tag status-${item.status}">${statusLabels[item.status]}</span></div><div class="rf-title">${esc(item.title)}</div><div class="rf-btns"><button class="outline mini" data-action="postpone-red" data-id="${item.id}">미루기</button><button class="primary mini" data-action="complete-item" data-id="${item.id}">완료 ✓</button></div></div>`; }).join("") : `<p class="fold-empty">오늘 꼭 할 하나가 아직 없어요. 캘린더에서 가장 중요한 일을 정해보세요.</p>`}<button class="linkbtn" data-action="open-calendar">＋ 오늘의 하나 정하기 ›</button></section>`;
}
function blueHabits() {
  const todays = state.routines.filter(routine => routineOccursOnDate(routine, todayKey));
  const done = todays.filter(routine => routineDayStatus(routine, todayKey) === "completed").length;
  return `<section class="card block-blue"><div class="block-kick"><span class="cdot blue"></span>매일의 약속 <span class="cnt">${done} / ${todays.length}</span></div>${todays.length ? `<div class="habit-list">${todays.map(routine => { const on = routineDayStatus(routine, todayKey) === "completed"; return `<button class="habit ${on ? "on" : ""}" data-action="toggle-habit" data-id="${routine.id}"><span class="hbox">${on ? "✓" : ""}</span><span class="hname">${esc(routine.title)}</span></button>`; }).join("")}</div>` : `<p class="fold-empty">오늘 실행할 습관이 없습니다.</p>`}<button class="linkbtn" data-tab="routines">습관 관리 ›</button></section>`;
}
function blackBlock() {
  const blacks = state.items.filter(item => trackOf(item) === "black" && item.status !== "completed" && item.date <= todayKey);
  return `<details class="card block-black"><summary><span class="cdot black"></span>틈틈이 <small>여유 될 때 · ${blacks.length}개</small></summary><div class="black-inner">${blacks.length ? blacks.map(item => `<button class="black-row" data-action="complete-item" data-id="${item.id}"><span class="hbox sm"></span>${esc(item.title)}</button>`).join("") : `<p class="fold-empty">잡무가 없습니다.</p>`}</div></details>`;
}
function todayNew() {
  const open = (state.thoughts || []).filter(thought => thought.status === "open").length;
  const project = state.projects[0];
  const projectAction = project ? state.items.find(item => item.projectId === project.id && item.status !== "completed") : null;
  return `${header("TIME TIPPING COMPASS", "오늘", "지금 할 것만. 색으로 좁히고, 습관은 체크로.")}
  ${moodStrip()}
  ${seedCard()}
  <section class="quick-thought"><input id="quick-thought" placeholder="떠오른 생각 한 줄… (나중에 분류)"><button class="qt-btn" data-action="add-thought">담기 +</button></section>
  ${open ? `<button class="thought-flag" data-action="open-day-detail" data-id="${todayKey}">💭 정리 안 한 생각 ${open}개 · 다이어리에서 분류 ›</button>` : ""}
  ${redFocus()}
  ${blueHabits()}
  ${blackBlock()}
  <section class="today-link-grid">${todayProjectCard(project, projectAction)}${todayReflectionCard(state.reflectionEntries && state.reflectionEntries[0])}</section>
  <div class="row two-btn"><button class="outline" data-action="open-day-detail" data-id="${todayKey}">📖 오늘 다이어리</button><button class="outline" data-action="open-year">📅 연간 보기</button></div>
  <details class="today-more"><summary>나의 목적 보기</summary><section class="card purpose"><div class="topline"><span class="pill ochre">◈ 최종 목적</span><button class="linkbtn" data-action="edit-purpose">다듬기 ›</button></div><p class="purpose-copy">${esc(state.purpose)}</p></section></details>`;
}
function dayDetail() {
  const date = state.detailDate || todayKey;
  const moods = (state.moodLog && state.moodLog[date]) || [];
  const evts = (state.events || []).filter(event => event.date === date).slice().sort((a, b) => a.time.localeCompare(b.time));
  const dayItems = state.items.filter(item => item.date === date);
  const redDone = dayItems.filter(item => trackOf(item) === "red" && item.status === "completed").length;
  const habits = state.routines.filter(routine => routineOccursOnDate(routine, date));
  const habitDone = habits.filter(routine => routineDayStatus(routine, date) === "completed").length;
  const blackCnt = dayItems.filter(item => trackOf(item) === "black").length;
  const open = (state.thoughts || []).filter(thought => thought.status === "open");
  return `${header("DIARY · DAY", "하루 다이어리", "시간은 자동으로 기록됩니다. 생각은 잡거나 버리세요.")}
  <div class="day-nav"><button class="month-button" data-action="detail-prev">‹</button><strong>${date.replaceAll("-", ".")} (${weekdayLabel(date)})</strong><button class="month-button" data-action="detail-next">›</button></div>
  <div class="day-chips"><span class="dchip red">🔴 ${redDone}</span><span class="dchip blue">🔵 ${habitDone}/${habits.length}</span><span class="dchip black">⚫ ${blackCnt}</span></div>
  <section class="card"><div class="block-kick">🌡 감정 관찰</div>${moods.length ? `<div class="mood-track">${moods.map(m => `<span class="mt"><b>${moodLabels[m.mood] || "·"}</b><small>${m.time || ""}</small></span>`).join("")}</div>` : `<p class="fold-empty">이 날 기록된 기분이 없습니다.</p>`}</section>
  <section class="card"><div class="block-kick">🕘 시간 타임라인 <small class="auto-badge">자동 생성</small></div>${evts.length ? `<div class="tl">${evts.map(event => `<div class="tl-ev"><span class="tl-time">${event.time}</span><span class="tl-dot ${event.type}"></span><div class="tl-body">${esc(event.text)}</div></div>`).join("")}</div>` : `<p class="fold-empty">아직 기록된 행동이 없습니다. 기분 체크·습관 완료·생각 담기를 하면 시간순으로 쌓입니다.</p>`}</section>
  <section class="card"><div class="block-kick">💭 생각 정리함 <small>잡을 건 잡고, 버릴 건 버림</small></div><div class="capture"><input id="day-thought" placeholder="떠오른 생각 한 줄…"><button class="qt-btn" data-action="add-thought">담기 +</button></div><div class="thought-list">${open.length ? open.map(thought => `<div class="thought"><div class="tx">💭 ${esc(thought.text)}</div><div class="triage"><button data-action="assign-thought" data-id="${thought.id}|red">🔴 빨강</button><button data-action="assign-thought" data-id="${thought.id}|black">⚫ 검정</button><button class="tr-x" data-action="trash-thought" data-id="${thought.id}">🗑 버림</button></div></div>`).join("") : `<p class="fold-empty">정리할 생각이 없습니다.</p>`}</div></section>
  <section class="board-link-card reflection-board"><div><span class="board-kicker">🌙 저녁 감정 성찰</span><strong>오늘 나를 흔든 감정 하나</strong></div><button class="outline" data-action="open-reflect">성찰하기</button></section>
  <div class="row"><button class="outline" data-action="open-calendar">‹ 캘린더로</button></div>`;
}
function yearView() {
  const year = state.yearNum || Number(todayKey.slice(0, 4));
  const monNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const monthsHtml = monNames.map((mn, m) => {
    const first = (new Date(year, m, 1).getDay() + 6) % 7;
    const days = new Date(year, m + 1, 0).getDate();
    let cells = "";
    for (let i = 0; i < first; i++) cells += `<span class="ycell blank"></span>`;
    for (let d = 1; d <= days; d++) {
      const date = `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const blue = state.routines.filter(routine => routine.dailyRecords && routine.dailyRecords[date] && routine.dailyRecords[date].status === "completed").length;
      const redDone = state.items.some(item => item.date === date && item.status === "completed" && trackOf(item) === "red");
      let cls = "ycell";
      if (blue >= 1) cls += " b" + Math.min(blue, 4);
      if (redDone) cls += " red";
      if (date === todayKey) cls += " today";
      cells += `<span class="${cls}"></span>`;
    }
    return `<button class="ymon" data-action="year-open-month" data-id="${year}-${String(m + 1).padStart(2, "0")}"><span class="ymh">${mn}</span><span class="ygrid">${cells}</span></button>`;
  }).join("");
  const highlights = state.items.filter(item => trackOf(item) === "red" && item.status === "completed" && item.date.startsWith(String(year))).sort((a, b) => a.date.localeCompare(b.date));
  const weekCounts = [0, 0, 0, 0, 0, 0, 0];
  state.routines.forEach(routine => { Object.entries(routine.dailyRecords || {}).forEach(([date, rec]) => { if (rec.status === "completed" && date.startsWith(String(year))) weekCounts[mondayIndex(date)]++; }); });
  const maxW = Math.max(1, ...weekCounts);
  const wdNames = ["월", "화", "수", "목", "금", "토", "일"];
  return `${header("DIARY · YEAR", `${year} 연간`, "달마다 · 요일마다 무엇을 했는지 한눈에 봅니다.")}
  <div class="day-nav"><button class="month-button" data-action="year-prev">‹</button><strong>${year}</strong><button class="month-button" data-action="year-next">›</button></div>
  <section class="card"><div class="block-kick">🗓 12개월 <small>탭하면 그 달로</small></div><div class="year-months">${monthsHtml}</div><p class="year-legend"><span class="ycell b1"></span><span class="ycell b2"></span><span class="ycell b3"></span><span class="ycell b4"></span> 습관 적음→많음 · <span class="ycell red"></span> 빨강 달성</p></section>
  <section class="card"><div class="block-kick">🔴 올해의 하이라이트 <small>해낸 빨강</small></div>${highlights.length ? highlights.map(highlight => `<div class="hl-row"><strong>${esc(highlight.title)}</strong><small>${highlight.date.replaceAll("-", ".")} · ${(areas[highlight.area] || areas.personal).label}</small></div>`).join("") : `<p class="fold-empty">아직 완료한 빨강이 없습니다. 올해 목표 하나를 🔴로 정하고 해내 보세요.</p>`}</section>
  <section class="card"><div class="block-kick">🔵 요일별 습관 <small>어느 요일에 많이 해냈나</small></div><div class="weekbars">${wdNames.map((w, i) => `<div class="wb"><span class="wd">${w}</span><div class="wtrack"><div class="wfill" style="width:${Math.round(weekCounts[i] / maxW * 100)}%"></div></div><span class="wc">${weekCounts[i]}</span></div>`).join("")}</div></section>
  <div class="row"><button class="outline" data-action="open-calendar">‹ 캘린더로</button></div>`;
}
function idbOpen() { return new Promise((res, rej) => { const r = indexedDB.open("ttc-photos", 1); r.onupgradeneeded = () => r.result.createObjectStore("img"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
function idbPut(id, blob) { return idbOpen().then(db => new Promise((res, rej) => { const tx = db.transaction("img", "readwrite"); tx.objectStore("img").put(blob, id); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); })); }
function idbGet(id) { return idbOpen().then(db => new Promise(res => { const tx = db.transaction("img", "readonly"); const rq = tx.objectStore("img").get(id); rq.onsuccess = () => res(rq.result); rq.onerror = () => res(null); })).catch(() => null); }
function idbDel(id) { return idbOpen().then(db => new Promise(res => { const tx = db.transaction("img", "readwrite"); tx.objectStore("img").delete(id); tx.oncomplete = () => res(); tx.onerror = () => res(); })).catch(() => {}); }
function downscaleImage(file, max, q) { return new Promise(res => { const img = new Image(); img.onload = () => { let w = img.width, h = img.height; if (Math.max(w, h) > max) { const s = max / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); } const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h); c.toBlob(b => res(b || file), "image/jpeg", q); }; img.onerror = () => res(file); img.src = URL.createObjectURL(file); }); }
function handlePhotoFile(file) { downscaleImage(file, 1280, 0.82).then(blob => { const id = "p" + Date.now(); return idbPut(id, blob).then(() => { state.photos = state.photos || []; state.photos.unshift({ id, date: state.detailDate || todayKey, createdAt: new Date().toISOString() }); persist(); render(); }); }).catch(() => alert("사진을 저장하지 못했습니다.")); }
function bmType(url) { return /youtu\.?be/i.test(url) ? "yt" : /threads\.net/i.test(url) ? "th" : "web"; }
function bmMeta(t) { return ({ yt: ["ic yt", "▶"], th: ["ic th", "@"], web: ["ic web", "🌐"] })[t] || ["ic web", "🌐"]; }
function bookmarkList() {
  const bms = state.bookmarks || [];
  return `<div class="add"><input id="bm-input" placeholder="링크 붙여넣기 (웹·유튜브·스레드)"><button class="qt-btn" data-action="add-bookmark">담기</button></div><div class="list">${bms.length ? bms.map(b => { const m = bmMeta(b.type || "web"); const host = b.url.replace(/^https?:\/\//, "").split("/")[0]; return `<div class="bm"><span class="${m[0]}">${m[1]}</span><button class="tx" data-action="open-bookmark" data-id="${b.id}"><b>${esc(b.title || host)}</b><small>${esc(host)}</small></button><button class="rec-del" data-action="delete-bookmark" data-id="${b.id}">✕</button></div>`; }).join("") : `<p class="fold-empty">저장한 링크가 없습니다. 위에 붙여넣어 담아보세요.</p>`}</div><p class="rec-hint">안드로이드 설치형 앱에선 공유시트로 바로 담을 수 있어요.</p>`;
}
function memoList() {
  const ms = state.memos || [];
  return `<div class="add"><input id="memo-input" placeholder="메모 한 줄…"><button class="qt-btn" data-action="add-memo">담기</button></div><div class="list">${ms.length ? ms.map(m => `<div class="memo"><b>${esc(m.title)}</b>${m.body ? `<p>${esc(m.body)}</p>` : ""}<small>${new Date(m.createdAt).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}</small><button class="rec-del memo-del" data-action="delete-memo" data-id="${m.id}">✕</button></div>`).join("") : `<p class="fold-empty">저장한 메모가 없습니다.</p>`}</div>`;
}
function photoGrid() {
  const ph = state.photos || [];
  return `<div class="photogrid"><label class="ph add">＋<input id="photo-input" type="file" accept="image/*" hidden></label>${ph.map(p => `<button class="ph" data-action="delete-photo" data-id="${p.id}" title="눌러서 삭제"><img class="ph-img" data-pid="${p.id}" alt=""></button>`).join("")}</div><p class="rec-hint">사진은 이 기기(IndexedDB)에 저장돼요. 사진을 누르면 삭제됩니다.</p>`;
}
function recordsView() {
  const seg = state.recordSeg || "bm";
  const btn = (v, label) => `<button class="${seg === v ? "on" : ""}" data-action="record-seg" data-id="${v}">${label}</button>`;
  const body = seg === "memo" ? memoList() : seg === "photo" ? photoGrid() : bookmarkList();
  return `${header("SAVE / KEEP", "기록", "링크·메모·사진을 모아두는 곳. 실행용 생각 정리함과는 별개예요.")}
  <div class="seg">${btn("bm", "🔖 북마크")}${btn("memo", "✏️ 메모")}${btn("photo", "🖼 사진")}</div>
  ${body}`;
}
function render() {
  const views = { today: todayNew, calendar: calendarView, routines, projects, tools: toolsView, reflect, records: recordsView, day: dayDetail, year: yearView };
  document.querySelector("#app").innerHTML = `${views[state.active]()}${scrollControls()}${nav()}`;
  syncAndroidWidget();
  bind();
}
function scrollControls() {
  return `<nav class="scroll-controls" aria-label="화면 이동"><button class="scroll-control-button" data-action="scroll-top" title="맨 위로 이동" aria-label="맨 위로 이동"><span aria-hidden="true">↑</span><small>위로</small></button><button class="scroll-control-button" data-action="scroll-bottom" title="맨 아래로 이동" aria-label="맨 아래로 이동"><span aria-hidden="true">↓</span><small>아래</small></button></nav>`;
}
function bind() {
  document.querySelectorAll("[data-tab]").forEach(button => button.onclick = () => { state.active = button.dataset.tab; render(); });
  document.querySelectorAll("[data-tool]").forEach(button => button.onclick = () => { state.selectedTool = Number(button.dataset.tool); render(); });
  document.querySelectorAll("[data-action]").forEach(button => button.onclick = () => { if (suppressNextActionClick) { suppressNextActionClick = false; return; } act(button.dataset.action, button.dataset.id); });
  document.querySelectorAll("[data-item-status]").forEach(select => select.onchange = () => { const item = state.items.find(entry => entry.id === Number(select.dataset.itemStatus)); if (item) { item.status = select.value; persist(); render(); } });
  document.querySelectorAll("[data-routine-status]").forEach(select => select.onchange = () => { const routine = state.routines.find(entry => entry.id === Number(select.dataset.routineStatus)); if (routine) { const stats = routineStats(routine); routine.statusByPeriod[stats.key] = select.value; persist(); render(); } });
  document.querySelectorAll("[data-routine-day-status]").forEach(select => select.onchange = () => { const [routineId, date] = select.dataset.routineDayStatus.split("|"); const routine = state.routines.find(entry => entry.id === Number(routineId)); if (routine) { setRoutineDayStatus(routine, date, select.value); persist(); render(); } });
  document.querySelectorAll(".ph-img[data-pid]").forEach(img => { idbGet(img.dataset.pid).then(blob => { if (blob) img.src = URL.createObjectURL(blob); }); });
  const photoInput = document.querySelector("#photo-input"); if (photoInput) photoInput.onchange = event => { const file = event.target.files && event.target.files[0]; if (file) handlePhotoFile(file); };
  bindDragInteractions();
}
function setRoutineDayStatus(routine, date, status) {
  routine.dailyRecords = routine.dailyRecords || {};
  routine.dailyRecords[date] = { status, updatedAt: new Date().toISOString() };
  if (status === "postponed") {
    const nextDate = shiftDate(date, 1);
    routine.scheduledDates = [...new Set((routine.scheduledDates || []).concat(nextDate))];
  }
}
function dragTargetAt(event) {
  const element = document.elementFromPoint(event.clientX, event.clientY);
  return element?.closest("[data-drop-date], [data-drop-status]");
}
function dragCardAt(event) {
  const element = document.elementFromPoint(event.clientX, event.clientY);
  return element?.closest("[data-drag-type]");
}
function clearDragVisuals() {
  document.body.classList.remove("drag-active");
  document.querySelectorAll(".dragging,.drag-over,.drag-available").forEach(element => element.classList.remove("dragging", "drag-over", "drag-available"));
}
function startDrag(card, pointerId) {
  activeDrag = { type: card.dataset.dragType, id: Number(card.dataset.dragId), date: card.dataset.dragDate };
  if (pointerId !== undefined && card.setPointerCapture) { try { card.setPointerCapture(pointerId); } catch {} }
  card.classList.add("dragging");
  document.body.classList.add("drag-active");
  document.querySelectorAll("[data-drop-date], [data-drop-status]").forEach(target => target.classList.add("drag-available"));
}
function reorderTasksForDate(item, date, event) {
  const target = dragCardAt(event);
  const peers = state.items.filter(entry => entry.date === date && entry.id !== item.id).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  let insertAt = peers.length;
  if (target?.dataset.dragType === "task" && target.dataset.dragDate === date) {
    const targetId = Number(target.dataset.dragId);
    const targetIndex = peers.findIndex(entry => entry.id === targetId);
    if (targetIndex >= 0) {
      const rect = target.getBoundingClientRect();
      insertAt = targetIndex + (event.clientY > rect.top + rect.height / 2 ? 1 : 0);
    }
  }
  peers.splice(insertAt, 0, item);
  peers.forEach((entry, index) => { entry.sortOrder = index * 10; });
}
function reorderRoutinesForDate(routine, date, event) {
  const target = dragCardAt(event);
  const peers = state.routines.filter(entry => entry.id !== routine.id && routineOccursOnDate(entry, date)).sort((a, b) => (a.sortOrderByDate?.[date] ?? 0) - (b.sortOrderByDate?.[date] ?? 0));
  let insertAt = peers.length;
  if (target?.dataset.dragType === "routine" && target.dataset.dragDate === date) {
    const targetId = Number(target.dataset.dragId);
    const targetIndex = peers.findIndex(entry => entry.id === targetId);
    if (targetIndex >= 0) {
      const rect = target.getBoundingClientRect();
      insertAt = targetIndex + (event.clientY > rect.top + rect.height / 2 ? 1 : 0);
    }
  }
  peers.splice(insertAt, 0, routine);
  peers.forEach((entry, index) => { entry.sortOrderByDate = entry.sortOrderByDate || {}; entry.sortOrderByDate[date] = index * 10; });
}
function applyDateDrop(date, event) {
  if (!activeDrag) return;
  if (activeDrag.type === "task") {
    const item = state.items.find(entry => entry.id === activeDrag.id);
    if (!item) return;
    item.date = date;
    reorderTasksForDate(item, date, event);
    state.selectedDate = date;
    state.calendarWeekStart = startOfWeek(date);
    state.calendarMonth = date.slice(0, 7);
  } else {
    const routine = state.routines.find(entry => entry.id === activeDrag.id);
    if (!routine) return;
    if (isFixedRoutine(routine)) {
      const originDay = mondayIndex(activeDrag.date);
      const day = mondayIndex(date);
      routine.fixedWeekdays = [...new Set(routineWeekdays(routine).filter(entry => entry !== originDay).concat(day))].sort((a, b) => a - b);
      routine.fixed = true;
      routine.weekday = routine.fixedWeekdays[0];
    } else {
      routine.scheduledDates = [...new Set(routine.scheduledDates.filter(entry => entry !== activeDrag.date).concat(date))];
    }
    reorderRoutinesForDate(routine, date, event);
  }
  persist();
  render();
}
function applyStatusDrop(status) {
  if (!activeDrag) return;
  if (activeDrag.type === "task") {
    const item = state.items.find(entry => entry.id === activeDrag.id);
    if (item) item.status = status;
  } else {
    const routine = state.routines.find(entry => entry.id === activeDrag.id);
    if (routine) {
      setRoutineDayStatus(routine, activeDrag.date || todayKey, status);
    }
  }
  persist();
  render();
}
function finishDrag(event) {
  const target = dragTargetAt(event);
  const date = target?.dataset.dropDate;
  const status = target?.dataset.dropStatus;
  suppressNextActionClick = true;
  if (date) applyDateDrop(date, event);
  else if (status) applyStatusDrop(status);
  activeDrag = null;
  clearDragVisuals();
  setTimeout(() => { suppressNextActionClick = false; }, 0);
}
function bindDragInteractions() {
  document.querySelectorAll("[data-drag-type]").forEach(card => {
    card.onpointerdown = event => {
      if (!event.target.closest(".drag-handle")) return;
      clearTimeout(dragLongPressTimer);
      dragLongPressTimer = setTimeout(() => startDrag(card, event.pointerId), 350);
    };
    card.onpointermove = event => {
      if (!activeDrag) return;
      event.preventDefault();
      const target = dragTargetAt(event);
      document.querySelectorAll(".drag-over").forEach(element => element.classList.remove("drag-over"));
      if (target) target.classList.add("drag-over");
    };
    card.onpointerup = event => {
      clearTimeout(dragLongPressTimer);
      dragLongPressTimer = null;
      if (activeDrag) finishDrag(event);
    };
    card.onpointercancel = () => {
      clearTimeout(dragLongPressTimer);
      dragLongPressTimer = null;
      activeDrag = null;
      clearDragVisuals();
    };
  });
}
function act(action, id) {
  if (action === "record-seg") { state.recordSeg = id; render(); return; }
  if (action === "add-bookmark") { const input = document.querySelector("#bm-input"); const url = input && input.value.trim(); if (!url) return; state.bookmarks = state.bookmarks || []; state.bookmarks.unshift({ id: Date.now(), url: /^https?:/.test(url) ? url : "https://" + url, title: "", type: bmType(url) }); persist(); render(); return; }
  if (action === "open-bookmark") { const b = (state.bookmarks || []).find(x => x.id === Number(id)); if (b) window.open(b.url, "_blank", "noopener"); return; }
  if (action === "delete-bookmark") { state.bookmarks = (state.bookmarks || []).filter(x => x.id !== Number(id)); persist(); render(); return; }
  if (action === "add-memo") { const input = document.querySelector("#memo-input"); const text = input && input.value.trim(); if (!text) return; state.memos = state.memos || []; state.memos.unshift({ id: Date.now(), title: text, body: "", createdAt: new Date().toISOString() }); persist(); render(); return; }
  if (action === "delete-memo") { state.memos = (state.memos || []).filter(x => x.id !== Number(id)); persist(); render(); return; }
  if (action === "delete-photo") { if (confirm("이 사진을 삭제할까요?")) { idbDel(String(id)); state.photos = (state.photos || []).filter(p => p.id !== String(id)); persist(); render(); } return; }
  if (action === "set-mood") { const [mood, date] = String(id).split("|"); state.moodLog = state.moodLog || {}; (state.moodLog[date] = state.moodLog[date] || []).push({ mood, time: nowTime() }); logEvent("mood", `기분 체크 ${moodLabels[mood] || ""}`, date); persist(); render(); return; }
  if (action === "add-thought") { const input = document.querySelector("#quick-thought") || document.querySelector("#day-thought"); const text = input && input.value.trim(); if (!text) return; state.thoughts = state.thoughts || []; state.thoughts.unshift({ id: Date.now(), text, createdAt: new Date().toISOString(), status: "open" }); logEvent("thought", `생각 기록: ${text}`, todayKey); persist(); render(); return; }
  if (action === "assign-thought") { const [tid, track] = String(id).split("|"); const t = (state.thoughts || []).find(x => x.id === Number(tid)); if (!t) return; t.status = "assigned"; t.track = track; state.items.unshift({ id: Date.now(), title: t.text, type: "task", area: "personal", date: todayKey, status: "planned", priority: track === "red" ? "high" : "normal", track, projectId: null }); logEvent(track, `${track === "red" ? "🔴" : "⚫"} 계획에 추가: ${t.text}`, todayKey); persist(); render(); return; }
  if (action === "trash-thought") { const t = (state.thoughts || []).find(x => x.id === Number(id)); if (t) t.status = "trashed"; persist(); render(); return; }
  if (action === "toggle-habit") { const r = state.routines.find(x => x.id === Number(id)); if (!r) return; const done = routineDayStatus(r, todayKey) === "completed"; setRoutineDayStatus(r, todayKey, done ? "planned" : "completed"); if (!done) { addWater(1); logEvent("blue", `🔵 ${r.title}`, todayKey); } persist(); render(); return; }
  if (action === "postpone-red") { const item = state.items.find(entry => entry.id === Number(id)); if (!item) return; if (confirm("잠깐 — 지금 미루려는 게 '사실'인가요?\n확인 = 하루 미룸 · 취소 = 2분만 해보기")) { item.date = shiftDate(item.date, 1); item.status = "planned"; state.selectedDate = item.date; persist(); render(); } return; }
  if (action === "open-day-detail") { state.active = "day"; state.detailDate = id || todayKey; render(); return; }
  if (action === "detail-prev") { state.detailDate = shiftDate(state.detailDate || todayKey, -1); render(); return; }
  if (action === "detail-next") { state.detailDate = shiftDate(state.detailDate || todayKey, 1); render(); return; }
  if (action === "open-year") { state.active = "year"; state.yearNum = Number((state.detailDate || todayKey).slice(0, 4)); render(); return; }
  if (action === "year-prev") { state.yearNum = (state.yearNum || Number(todayKey.slice(0, 4))) - 1; render(); return; }
  if (action === "year-next") { state.yearNum = (state.yearNum || Number(todayKey.slice(0, 4))) + 1; render(); return; }
  if (action === "year-open-month") { state.active = "calendar"; state.calendarMode = "month"; state.calendarMonth = id; state.selectedDate = `${id}-01`; render(); return; }
  if (action === "scroll-top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (action === "scroll-bottom") { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }); return; }
  if (action === "fullscreen") { const root = document.documentElement; const toggle = document.fullscreenElement ? document.exitFullscreen() : root.requestFullscreen?.(); if (toggle?.catch) toggle.catch(() => alert("브라우저 설정에서 전체 화면을 허용해 주세요.")); return; }
  if (action === "edit-purpose") { state.active = "tools"; state.selectedTool = 1; render(); return; }
  if (action === "open-calendar") { state.active = "calendar"; state.calendarMonth = todayKey.slice(0, 7); state.selectedDate = todayKey; render(); return; }
  if (action === "open-calendar-date") { state.active = "calendar"; state.calendarMode = "week"; state.selectedDate = id; state.calendarWeekStart = startOfWeek(id); state.calendarMonth = id.slice(0, 7); persist(); render(); return; }
  if (action === "open-project") { state.active = "projects"; render(); return; }
  if (action === "open-tool-direct") { state.active = "tools"; state.selectedTool = Number(id); render(); return; }
  if (action === "open-reflect") { state.active = "reflect"; render(); return; }
  if (action === "open-filtered-calendar") { state.active = "calendar"; state.calendarArea = state.dashboardArea; state.calendarHorizon = "all"; state.calendarStatus = "all"; state.calendarPriority = "all"; state.calendarMonth = todayKey.slice(0, 7); state.selectedDate = todayKey; render(); return; }
  if (action === "open-area") { state.dashboardArea = id; render(); return; }
  if (action === "clear-dashboard-area") { state.dashboardArea = "all"; render(); return; }
  if (action === "open-item") { const item = state.items.find(entry => entry.id === Number(id)); if (!item) return; state.active = "calendar"; state.calendarMonth = item.date.slice(0, 7); state.selectedDate = item.date; state.editingItemId = item.id; render(); return; }
  if (action === "calendar-area") { state.calendarArea = id; render(); return; }
  if (action === "calendar-horizon") { state.calendarHorizon = id; render(); return; }
  if (action === "calendar-status") { state.calendarStatus = id; render(); return; }
  if (action === "calendar-priority") { state.calendarPriority = id; render(); return; }
  if (action === "routine-area") { state.routineArea = id; render(); return; }
  if (action === "set-calendar-mode") { state.calendarMode = id; state.calendarWeekStart = startOfWeek(state.selectedDate); render(); return; }
  if (action === "set-week-layout") { state.calendarLayout = id; render(); return; }
  if (action === "prev-week") { state.calendarWeekStart = shiftDate(startOfWeek(state.calendarWeekStart), -7); state.selectedDate = state.calendarWeekStart; state.calendarMonth = state.selectedDate.slice(0, 7); persist(); render(); return; }
  if (action === "next-week") { state.calendarWeekStart = shiftDate(startOfWeek(state.calendarWeekStart), 7); state.selectedDate = state.calendarWeekStart; state.calendarMonth = state.selectedDate.slice(0, 7); persist(); render(); return; }
  if (action === "go-selected-date") { const date = document.querySelector("#calendar-date-picker").value; if (!date) return; state.selectedDate = date; state.calendarMonth = date.slice(0, 7); state.calendarWeekStart = startOfWeek(date); persist(); render(); return; }
  if (action === "open-routine-picker") { state.routinePickerDate = id; render(); return; }
  if (action === "close-routine-picker") { state.routinePickerDate = null; render(); return; }
  if (action === "toggle-routine-date") { const [routineId, date] = id.split("|"); const routine = state.routines.find(entry => entry.id === Number(routineId)); if (!routine) return; routine.scheduledDates = routine.scheduledDates.includes(date) ? routine.scheduledDates.filter(entry => entry !== date) : [...routine.scheduledDates, date]; persist(); render(); return; }
  if (action === "schedule-routine-today") { const routine = state.routines.find(entry => entry.id === Number(id)); if (!routine) return; routine.scheduledDates = [...new Set((routine.scheduledDates || []).concat(todayKey))]; persist(); render(); return; }
  if (action === "open-routine") { state.active = "routines"; state.editingRoutineId = Number(id); render(); return; }
  if (action === "open-routine-week") { state.active = "routines"; render(); return; }
  if (action === "complete-item") { const item = state.items.find(entry => entry.id === Number(id)); if (item) { item.status = "completed"; addWater(trackOf(item) === "red" ? 3 : 1); logEvent(trackOf(item) === "red" ? "red" : "black", `${trackOf(item) === "red" ? "🔴" : "⚫"} ${item.title} 완료`, todayKey); persist(); render(); } return; }
  if (action === "postpone-item") { const item = state.items.find(entry => entry.id === Number(id)); if (item && confirm(`'${item.title}' 할 일을 정말 하루 미루겠습니까?\n미루는 대신 새 날짜에 다시 확인해야 합니다.`)) { item.date = shiftDate(item.date, 1); item.status = "planned"; state.selectedDate = item.date; state.calendarMonth = item.date.slice(0, 7); state.calendarWeekStart = startOfWeek(item.date); persist(); render(); } return; }
  if (action === "bring-forward") { const item = state.items.find(entry => entry.id === Number(id)); if (item) { item.date = shiftDate(item.date, -1); state.selectedDate = item.date; state.calendarMonth = item.date.slice(0, 7); state.calendarWeekStart = startOfWeek(item.date); persist(); render(); } return; }
  if (action === "select-date") { state.selectedDate = id; state.calendarWeekStart = startOfWeek(id); persist(); render(); return; }
  if (action === "prev-month") { moveMonth(-1); return; }
  if (action === "next-month") { moveMonth(1); return; }
  if (action === "edit-item") { state.editingItemId = Number(id); render(); return; }
  if (action === "cancel-item-edit") { state.editingItemId = null; render(); return; }
  if (action === "save-item-edit") { const item = state.items.find(entry => entry.id === Number(id)); if (!item) return; const title = document.querySelector("#edit-item-title").value.trim(); const date = document.querySelector("#edit-item-date").value; if (!title || !date) { alert("제목과 날짜를 모두 입력해 주세요."); return; } Object.assign(item, { title, date, type: document.querySelector("#edit-item-type").value, area: document.querySelector("#edit-item-area").value, status: document.querySelector("#edit-item-status").value, track: document.querySelector("#edit-item-track").value, priority: document.querySelector("#edit-item-track").value === "red" ? "high" : "normal", projectId: Number(document.querySelector("#edit-item-project").value) || null }); state.selectedDate = date; state.calendarMonth = date.slice(0, 7); state.editingItemId = null; persist(); render(); return; }
  if (action === "add-item") { const title = document.querySelector("#item-title").value.trim(); const type = document.querySelector("#item-type").value; const area = document.querySelector("#item-area").value; const date = document.querySelector("#item-date").value; const status = document.querySelector("#item-status").value; const track = document.querySelector("#item-track").value; const priority = track === "red" ? "high" : "normal"; const projectId = Number(document.querySelector("#item-project").value) || null; if (!title || !date) { alert("제목과 날짜를 모두 입력해 주세요."); return; } state.items.unshift({ id: Date.now(), title, type, area, date, status, priority, track, projectId }); logEvent("add", `＋ ${title}`, date); state.selectedDate = date; state.calendarMonth = date.slice(0, 7); persist(); render(); return; }
  if (action === "delete-item") { const item = state.items.find(entry => entry.id === Number(id)); if (item && confirm(`'${item.title}' 기록을 삭제할까요?`)) { state.items = state.items.filter(entry => entry.id !== item.id); persist(); render(); } return; }
  if (action === "add-project") { const title = document.querySelector("#project-title").value.trim(); const outcome = document.querySelector("#project-outcome").value.trim(); const dueDate = document.querySelector("#project-due-date").value; if (!title || !outcome) { alert("프로젝트 이름과 완료 기준을 모두 적어 주세요."); return; } state.projects.unshift({ id: Date.now(), title, outcome, dueDate, status: document.querySelector("#project-status").value, progress: Math.max(0, Math.min(100, Number(document.querySelector("#project-progress").value) || 0)) }); persist(); render(); return; }
  if (action === "edit-project") { state.editingProjectId = Number(id); render(); return; }
  if (action === "cancel-project-edit") { state.editingProjectId = null; render(); return; }
  if (action === "save-project-edit") { const project = state.projects.find(entry => entry.id === Number(id)); if (!project) return; const title = document.querySelector("#edit-project-title").value.trim(); const outcome = document.querySelector("#edit-project-outcome").value.trim(); if (!title || !outcome) { alert("프로젝트 이름과 완료 기준을 모두 적어 주세요."); return; } Object.assign(project, { title, outcome, dueDate: document.querySelector("#edit-project-due-date").value, status: document.querySelector("#edit-project-status").value, progress: Math.max(0, Math.min(100, Number(document.querySelector("#edit-project-progress").value) || 0)) }); state.editingProjectId = null; persist(); render(); return; }
  if (action === "delete-project") { const project = state.projects.find(entry => entry.id === Number(id)); if (project && confirm(`'${project.title}' 프로젝트를 삭제할까요?`)) { state.projects = state.projects.filter(entry => entry.id !== project.id); persist(); render(); } return; }
  if (action === "close-tool") { state.selectedTool = null; render(); return; }
  if (action === "random-tool") { const choices = tools.filter(tool => tool[0] !== state.randomToolId); const picked = choices[Math.floor(Math.random() * choices.length)]; state.randomToolId = picked[0]; state.selectedTool = picked[0]; persist(); render(); return; }
  if (action === "save-tool") { const note = document.querySelector("#tool-note").value.trim(); if (!note) { alert("기록할 내용을 적어 주세요."); return; } if (Number(id) === 1) state.purpose = note; else state.notes[id] = note; persist(); state.selectedTool = Number(id); render(); return; }
  if (action === "delete-tool-note") { if (Number(id) === 1) { if (confirm("최종 목적을 기본 문장으로 되돌릴까요?")) state.purpose = defaultState.purpose; } else if (confirm("이 도구 기록을 삭제할까요?")) delete state.notes[id]; persist(); state.selectedTool = Number(id); render(); return; }
  if (action === "add-routine") { const title = document.querySelector("#routine-title").value.trim(); const cadence = document.querySelector("#routine-cadence").value; const area = document.querySelector("#routine-area").value; const fixedWeekdays = cadence === "weekly" ? checkedWeekdays("routine") : []; if (!title) { alert("루틴 이름을 적어 주세요."); return; } state.routines.unshift({ id: Date.now(), title, cadence, area, target: 1, completions: [], fixed: fixedWeekdays.length > 0, weekday: fixedWeekdays[0] ?? 0, fixedWeekdays, monthlyDay: Math.max(1, Math.min(28, Number(document.querySelector("#routine-monthly-day").value) || 1)), yearlyMonth: Math.max(1, Math.min(12, Number(document.querySelector("#routine-yearly-month").value) || 1)), yearlyDay: Math.max(1, Math.min(28, Number(document.querySelector("#routine-yearly-day").value) || 1)), active: true, statusByPeriod: {}, statusByDate: {}, dailyRecords: {}, scheduledDates: [], sortOrderByDate: {} }); persist(); render(); return; }
  if (action === "edit-routine") { state.editingRoutineId = Number(id); render(); return; }
  if (action === "cancel-routine-edit") { state.editingRoutineId = null; render(); return; }
  if (action === "save-routine-edit") { const routine = state.routines.find(entry => entry.id === Number(id)); if (!routine) return; const title = document.querySelector("#edit-routine-title").value.trim(); const cadence = document.querySelector("#edit-routine-cadence").value; const fixedWeekdays = cadence === "weekly" ? checkedWeekdays("edit-routine") : []; if (!title) { alert("루틴 이름을 적어 주세요."); return; } Object.assign(routine, { title, cadence, area: document.querySelector("#edit-routine-area").value, fixed: fixedWeekdays.length > 0, weekday: fixedWeekdays[0] ?? 0, fixedWeekdays, monthlyDay: Math.max(1, Math.min(28, Number(document.querySelector("#edit-routine-monthly-day").value) || 1)), yearlyMonth: Math.max(1, Math.min(12, Number(document.querySelector("#edit-routine-yearly-month").value) || 1)), yearlyDay: Math.max(1, Math.min(28, Number(document.querySelector("#edit-routine-yearly-day").value) || 1)), active: document.querySelector("#edit-routine-active").value === "true" }); state.editingRoutineId = null; persist(); render(); return; }
  if (action === "postpone-routine-day") { const [routineId, date] = String(id).split("|"); const routine = state.routines.find(entry => entry.id === Number(routineId)); if (!routine || !routine.active) return; setRoutineDayStatus(routine, date, "postponed"); persist(); render(); return; }
  if (action === "log-routine" || action === "log-routine-date") { const [routineId, logDate] = String(id).split("|"); const routine = state.routines.find(entry => entry.id === Number(routineId)); if (!routine || !routine.active) return; setRoutineDayStatus(routine, logDate || todayKey, "completed"); persist(); render(); return; }
  if (action === "delete-routine") { const routine = state.routines.find(entry => entry.id === Number(id)); if (routine && confirm(`'${routine.title}' 루틴을 삭제할까요?`)) { state.routines = state.routines.filter(entry => entry.id !== routine.id); persist(); render(); } return; }
  if (action === "edit-reflection") { const entry = state.reflectionEntries.find(record => record.id === Number(id)); if (!entry) return; state.reflection = { win: entry.win, friction: entry.friction, question: entry.question }; state.editingReflectionId = entry.id; render(); return; }
  if (action === "cancel-reflection-edit") { state.reflection = { ...defaultState.reflection }; state.editingReflectionId = null; render(); return; }
  if (action === "delete-reflection") { const entry = state.reflectionEntries.find(record => record.id === Number(id)); if (entry && confirm("이 성찰 기록을 삭제할까요?")) { state.reflectionEntries = state.reflectionEntries.filter(record => record.id !== entry.id); persist(); render(); } return; }
  if (action === "save-reflect") { const draft = { win: document.querySelector("#win").value.trim(), friction: document.querySelector("#friction").value.trim(), question: document.querySelector("#question").value.trim() }; if (!Object.values(draft).some(Boolean)) { alert("성찰 내용을 하나 이상 적어 주세요."); return; } if (state.editingReflectionId) { const entry = state.reflectionEntries.find(record => record.id === state.editingReflectionId); if (entry) Object.assign(entry, draft, { updatedAt: new Date().toISOString() }); } else state.reflectionEntries.unshift({ id: Date.now(), createdAt: new Date().toISOString(), ...draft }); logEvent("reflect", "🌙 저녁 감정 성찰 기록", todayKey); state.reflection = { ...defaultState.reflection }; state.editingReflectionId = null; persist(); render(); return; }
}

render();
if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("./service-worker.js?v=15").catch(() => {});
