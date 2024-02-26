let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(time) {
  const pad = (val) => val.toString().padStart(2, '0');
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function updateTime() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000) + elapsedTime;
  display.textContent = formatTime(currentTime);
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
    isRunning = true;
    startBtn.textContent = 'Pause';
  } else {
    clearInterval(timer);
    elapsedTime += Math.floor((Date.now() - startTime) / 1000);
    isRunning = false;
    startBtn.textContent = 'Resume';
  }
}

function resetTimer() {
  clearInterval(timer);
  display.textContent = '00:00:00';
  isRunning = false;
  startBtn.textContent = 'Start';
  elapsedTime = 0;
  laps = [];
  lapsList.innerHTML = '';
}

function lapTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000) + elapsedTime;
  const lapTime = formatTime(currentTime);
  laps.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
