
/* =================================
   1. SELECT HTML ELEMENTS
================================= */

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const completedCount = document.getElementById("completedCount");
const sessionCount = document.getElementById("sessionCount");


/* =================================
   2. POMODORO TIMER
================================= */

const FOCUS_TIME = 25 * 60;

let timeLeft = FOCUS_TIME;
let timerInterval = null;
let sessions = Number(localStorage.getItem("focusSessions")) || 0;

sessionCount.textContent = sessions;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");
}

function startTimer() {
  if (timerInterval !== null) return;

  if (timeLeft === 0) {
    timeLeft = FOCUS_TIME;
    updateTimerDisplay();
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      sessions++;
      localStorage.setItem("focusSessions", sessions);
      sessionCount.textContent = sessions;

      alert("Focus session completed! Take a short break.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = FOCUS_TIME;
  updateTimerDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();


/* =================================
   3. TASK MANAGEMENT
================================= */

let tasks = JSON.parse(localStorage.getItem("focusTasks")) || [];

function saveTasks() {
  localStorage.setItem("focusTasks", JSON.stringify(tasks));
}

function updateProgress() {
  const completed = tasks.filter(task => task.completed).length;
  completedCount.textContent = completed;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, taskText, deleteBtn);
    taskList.appendChild(li);
  });

  updateProgress();
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    id: Date.now() + Math.random(),
    text: text,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
});

renderTasks();
