/* Project K.I.L.O.S. - BP Tracker Page Script */

/* ============================================================
   1. BP HISTORY
   ============================================================ */
const BP_HISTORY_KEY = "bpHistory";
const MAX_HISTORY = 10;

function getBpHistory() {
  try {
    const raw = localStorage.getItem(BP_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveBpHistory(history) {
  localStorage.setItem(BP_HISTORY_KEY, JSON.stringify(history));
}

function getBpStatus(systolic, diastolic) {
  if (systolic > 180 || diastolic > 120) {
    return { label: "Crisis", icon: "priority_high", classes: "bg-error text-on-error" };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return { label: "High", icon: "priority_high", classes: "bg-error-container text-on-error-container" };
  }
  if (systolic >= 130 || diastolic >= 80) {
    return { label: "High", icon: "warning", classes: "bg-error-container text-on-error-container" };
  }
  if (systolic >= 120 && diastolic < 80) {
    return { label: "Elevated", icon: "warning", classes: "bg-[#ffecb3] text-[#795548]" };
  }
  return { label: "Normal", icon: "check", classes: "bg-secondary-container text-on-secondary-container" };
}

function formatHistoryTimestamp(iso) {
  const date = new Date(iso);
  const now = new Date();
  const timeStr = date.toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit", hour12: true });

  if (date.toDateString() === now.toDateString()) return `Ngayon, ${timeStr}`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return `Kahapon, ${timeStr}`;

  const dateStr = date.toLocaleDateString("en-PH", { month: "short", day: "numeric" });
  return `${dateStr}, ${timeStr}`;
}

function renderBpHistory() {
  const tbody = document.querySelector("[data-history-body]");
  const clearBtn = document.querySelector("[data-clear-history]");
  const history = getBpHistory();

  if (clearBtn) {
    clearBtn.disabled = history.length === 0;
  }

  if (!tbody) return;

  if (history.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="p-6 text-center text-on-surface-variant align-middle" style="height: 300px;">Wala pang naitatalang BP reading.</td>
      </tr>`;
    return;
  }

  tbody.innerHTML = history.map((entry, i) => {
    const status = getBpStatus(entry.systolic, entry.diastolic);
    const rowBg = i % 2 === 0 ? "bg-surface" : "bg-surface-container-lowest";
    return `
      <tr class="${rowBg}">
        <td class="p-4 border-b border-outline-variant text-on-surface-variant">${formatHistoryTimestamp(entry.timestamp)}</td>
        <td class="p-4 border-b border-outline-variant font-medium">${entry.systolic} / ${entry.diastolic}</td>
        <td class="p-4 border-b border-outline-variant">
          <span class="inline-flex items-center gap-1 ${status.classes} px-2 py-1 rounded-full text-xs font-label-caps">
            <span class="material-symbols-outlined text-[14px]">${status.icon}</span> ${status.label}
          </span>
        </td>
      </tr>`;
  }).join("");
}

/* ============================================================
   2. SUCCESS-STATE COUNTDOWN
   ============================================================ */
let successCountdownInterval = null;

function clearSuccessCountdown() {
  if (successCountdownInterval) {
    clearInterval(successCountdownInterval);
    successCountdownInterval = null;
  }
}

function startSuccessCountdown() {
  clearSuccessCountdown();

  let secondsLeft = 5;
  const numEl = document.querySelector("[data-countdown-num]");
  const successStateEl = document.getElementById("successState");
  if (numEl) numEl.textContent = secondsLeft;

  successCountdownInterval = setInterval(() => {
    secondsLeft -= 1;

    if (secondsLeft <= 0) {
      clearSuccessCountdown();
      if (successStateEl) successStateEl.classList.add("hidden");
      const formEl = document.getElementById("bpForm");
      if (formEl) formEl.reset();
      return;
    }

    if (numEl) numEl.textContent = secondsLeft;
  }, 1000);
}

/* ============================================================
   3. BP TRACKER FORM
   Called by main.js's router on every navigation to /tracker,
   since fresh innerHTML has no listeners attached.
   ============================================================ */
function initBpForm() {
  updateTrackerGreeting();
  renderBpHistory();

  const form = document.getElementById("bpForm");
  if (!form) return;

  const successState = document.getElementById("successState");
  const resetBtn = document.getElementById("resetForm");
  const urgentCard = document.querySelector("[data-urgent-card]");
  const clearHistoryBtn = document.querySelector("[data-clear-history]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const systolic = parseInt(document.getElementById("systolic").value, 10);
    const diastolic = parseInt(document.getElementById("diastolic").value, 10);
    if (isNaN(systolic) || isNaN(diastolic)) return;

    const history = getBpHistory();
    history.unshift({ systolic, diastolic, timestamp: new Date().toISOString() });
    history.length = Math.min(history.length, MAX_HISTORY);
    saveBpHistory(history);
    renderBpHistory();

    const status = getBpStatus(systolic, diastolic);
    if (urgentCard) {
      urgentCard.classList.toggle("hidden", status.label !== "Crisis");
    }

    successState.classList.remove("hidden");
    startSuccessCountdown();
  });

  resetBtn.addEventListener("click", () => {
    clearSuccessCountdown();
    successState.classList.add("hidden");
    form.reset();
  });

  if (clearHistoryBtn) {
    const deleteOverlay = document.getElementById("delete-confirm-overlay");
    const confirmBtn = document.getElementById("confirm-delete-btn");
    const cancelBtn = document.getElementById("cancel-delete-btn");

    clearHistoryBtn.addEventListener("click", () => {
      deleteOverlay.classList.remove("hidden");
    });

    cancelBtn.addEventListener("click", () => {
      deleteOverlay.classList.add("hidden");
    });

    deleteOverlay.addEventListener("click", (e) => {
      if (e.target === deleteOverlay) deleteOverlay.classList.add("hidden");
    });

    confirmBtn.addEventListener("click", () => {
      saveBpHistory([]);
      renderBpHistory();
      if (urgentCard) urgentCard.classList.add("hidden");
      deleteOverlay.classList.add("hidden");
    });
  }
}