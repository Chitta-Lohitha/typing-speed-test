const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed tests are a fun way to improve accuracy.",
  "Practice daily to see improvements in WPM.",
  "JavaScript makes the web interactive and dynamic.",
  "Focus and consistency are keys to faster typing."
];

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const toggleModeBtn = document.getElementById("toggleMode");

let currentSentence = "";
let startTime, interval;

function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function startTest() {
  currentSentence = getRandomSentence();
  sentenceEl.textContent = currentSentence;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  startTime = new Date().getTime();
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
  startBtn.style.display = "none";
  restartBtn.style.display = "inline-block";

  interval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    timerEl.textContent = timeElapsed;

    const typedText = inputEl.value;
    const wordsTyped = typedText.trim().split(" ").length;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    if (timeElapsed > 0) wpmEl.textContent = isFinite(wpm) ? wpm : 0;

    const correctChars = countCorrectChars(currentSentence, typedText);
    const accuracy = Math.round((correctChars / typedText.length) * 100);
    accuracyEl.textContent = isFinite(accuracy) ? accuracy : 100;

    if (typedText.length === currentSentence.length) stopTest();
  }, 1000);
}

function stopTest() {
  clearInterval(interval);
  inputEl.disabled = true;
  localStorage.setItem("lastWPM", wpmEl.textContent);
  localStorage.setItem("lastAccuracy", accuracyEl.textContent);
}

function countCorrectChars(str1, str2) {
  let count = 0;
  for (let i = 0; i < str2.length; i++) {
    if (str1[i] === str2[i]) count++;
  }
  return count;
}

startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", startTest);

toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
