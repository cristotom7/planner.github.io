const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const calendar = document.getElementById("calendar");
const selectedDateEl = document.getElementById("selectedDate");
const reminderInput = document.getElementById("reminder-input");
const reminderList = document.getElementById("reminder-list");

let selectedDate = null;
let reminders = {};

function populateSelectors() {
  for (let i = 0; i < 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = monthNames[i];
    monthSelect.appendChild(option);
  }

  for (let y = 2000; y <= 2100; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.text = y;
    yearSelect.appendChild(option);
  }

  const now = new Date();
  monthSelect.value = now.getMonth();
  yearSelect.value = now.getFullYear();
  renderCalendar();
}

function renderCalendar() {
  calendar.innerHTML = "";

  const year = parseInt(yearSelect.value);
  const month = parseInt(monthSelect.value);

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Add day headers
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(d => {
    const dayEl = document.createElement("div");
    dayEl.className = "day";
    dayEl.textContent = d;
    calendar.appendChild(dayEl);
  });

  // Add empty divs before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // Add actual days
  for (let day = 1; day <= totalDays; day++) {
    const dateEl = document.createElement("div");
    dateEl.className = "date";
    dateEl.textContent = day;

    const fullDate = `${year}-${month + 1}-${day}`;
    dateEl.dataset.date = fullDate;

    if (fullDate === selectedDate) {
      dateEl.classList.add("selected");
    }

    dateEl.addEventListener("click", () => {
      selectedDate = fullDate;
      selectedDateEl.textContent = `Selected Date: ${selectedDate}`;
      updateCalendarHighlight();
      showReminders();
    });

    calendar.appendChild(dateEl);
  }
}

function updateCalendarHighlight() {
  document.querySelectorAll(".date").forEach(dateEl => {
    if (dateEl.dataset.date === selectedDate) {
      dateEl.classList.add("selected");
    } else {
      dateEl.classList.remove("selected");
    }
  });
}

function addReminder() {
  const text = reminderInput.value.trim();
  if (!text || !selectedDate) return;

  if (!reminders[selectedDate]) {
    reminders[selectedDate] = [];
  }

  reminders[selectedDate].push(text);
  reminderInput.value = '';
  showReminders();
}

function showReminders() {
  reminderList.innerHTML = "";

  if (!reminders[selectedDate] || reminders[selectedDate].length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No reminders";
    reminderList.appendChild(empty);
    return;
  }

  reminders[selectedDate].forEach((reminder, index) => {
    const li = document.createElement("li");
    li.textContent = reminder;
    reminderList.appendChild(li);
  });
}

// React to dropdown changes
monthSelect.addEventListener("change", renderCalendar);
yearSelect.addEventListener("change", renderCalendar);

// Init
populateSelectors();
