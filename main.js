// 取得 DOM
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workModeBtn = document.getElementById('workModeBtn');
const breakModeBtn = document.getElementById('breakModeBtn');
const workInput = document.getElementById('workInput');
const breakInput = document.getElementById('breakInput');
const setBtn = document.getElementById('setBtn');
const beep = document.getElementById('beep');
const muteCheckbox = document.getElementById('muteCheckbox');

let workMinutes = 25;
let breakMinutes = 5;
let currentMode = 'work'; // 'work' or 'break'
let timeLeft = workMinutes * 60;
let timer = null;
let isRunning = false;
let isMuted = false;

// 顯示時間
function updateDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const sec = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
}

// 倒數
function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;
    if (!isMuted) {
      try {
        beep.currentTime = 0;
        beep.play();
      } catch (e) { /* 靜音或播放錯誤不處理 */ }
    }
    alert(currentMode === 'work' ? '休息時間到囉！' : '回來工作囉！');
  }
}

// 開始
startBtn.onclick = () => {
  if (!isRunning) {
    timer = setInterval(countdown, 1000);
    isRunning = true;
  }
};
// 暫停
pauseBtn.onclick = () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
};
// 重設
resetBtn.onclick = () => {
  clearInterval(timer);
  isRunning = false;
  if (currentMode === 'work') {
    timeLeft = workMinutes * 60;
  } else {
    timeLeft = breakMinutes * 60;
  }
  updateDisplay();
};
// 切換模式
workModeBtn.onclick = () => {
  switchMode('work');
};
breakModeBtn.onclick = () => {
  switchMode('break');
};
function switchMode(mode) {
  clearInterval(timer);
  isRunning = false;
  currentMode = mode;
  if (mode === 'work') {
    timeLeft = workMinutes * 60;
    workModeBtn.classList.add('active');
    breakModeBtn.classList.remove('active');
  } else {
    timeLeft = breakMinutes * 60;
    breakModeBtn.classList.add('active');
    workModeBtn.classList.remove('active');
  }
  updateDisplay();
}

// 設定自訂時間
setBtn.onclick = () => {
  let w = parseInt(workInput.value, 10);
  let b = parseInt(breakInput.value, 10);
  if (isNaN(w) || w < 1 || w > 60) w = 25;
  if (isNaN(b) || b < 1 || b > 30) b = 5;
  workMinutes = w;
  breakMinutes = b;
  if (currentMode === 'work') {
    timeLeft = workMinutes * 60;
  } else {
    timeLeft = breakMinutes * 60;
  }
  updateDisplay();
};
// 靜音開關
muteCheckbox.onchange = function() {
  isMuted = this.checked;
  beep.muted = isMuted;
};

// 初始畫面
updateDisplay();
