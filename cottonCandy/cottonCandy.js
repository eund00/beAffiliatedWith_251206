const canvas = document.getElementById("canvas");
const poemOutput = document.getElementById("poemOutput");
const finalPoem = document.getElementById("finalPoem");
const finalWrap = document.getElementById("finalWrap");
const timerEl = document.getElementById("timer");
const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const poemSelect = document.getElementById("poemSelect");
const poemOutputContainer = document.getElementById("poemOutputContainer");
const retryBtn = document.getElementById("retryBtn");

let words = [];
let selectedWords = [];
let startTime;
const DURATION = 30;
let selectedPoemIndexes = [];

// 시 선택 토글
poemSelect.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const idx = parseInt(e.target.dataset.index);
    if (selectedPoemIndexes.includes(idx)) {
      selectedPoemIndexes = selectedPoemIndexes.filter((i) => i !== idx);
      e.target.classList.remove("selected");
    } else {
      selectedPoemIndexes.push(idx);
      e.target.classList.add("selected");
    }
  }
});

// 단어 생성
function createWords(POEM_WORDS) {
  canvas.innerHTML = "";
  words = [];
  selectedWords = [];
  poemOutput.innerHTML = "";

  // 배열 셔플 (Fisher–Yates)
  const shuffledWords = [...POEM_WORDS]; // 원본 보호
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }

  // 최대 40개 단어 사용
  const limitedWords = shuffledWords.slice(0, 40);

  limitedWords.forEach((text) => {
    const el = document.createElement("div");
    el.className = "word";
    el.textContent = text;
    el.style.display = "block";

    el.addEventListener("click", () => {
      if (!el.classList.contains("_selected")) {
        el.classList.add("_selected");
        selectedWords.push(text);

        const span = document.createElement("span");
        span.textContent = text;
        poemOutput.appendChild(span);
      }
    });

    canvas.appendChild(el);
    words.push({
      el,
      x: Math.random() * (canvas.clientWidth - 100),
      y: -Math.random() * 100,
      speed: 0.3 + Math.random() * 1,
    });
  });
}

// 단어 낙하 애니메이션
function animate() {
  const elapsed = (Date.now() - startTime) / 1000;
  const remaining = Math.max(0, Math.ceil(DURATION - elapsed));
  timerEl.textContent = remaining;

  if (elapsed >= DURATION) {
    words.forEach((w) => w.el.remove());
    timerEl.style.display = "none";
    poemOutputContainer.style.display = "none";

    // 최종 시 보여주기
    finalPoem.innerHTML = "";
    selectedWords.forEach((word, idx) => {
      const span = document.createElement("span");
      span.textContent = word;
      finalPoem.appendChild(span);
    });
    finalWrap.style.display = "block";

    // 다시하기 버튼 표시
    retryBtn.style.display = "inline-block";
    return;
  }

  words.forEach((w) => {
    w.y += w.speed;
    if (w.y > canvas.clientHeight) {
      w.y = -20;
      w.x = Math.random() * (canvas.clientWidth - 100);
    }
    w.el.style.top = w.y + "px";
    w.el.style.left = w.x + "px";
  });

  requestAnimationFrame(animate);
}

// 시작 버튼 클릭
startBtn.addEventListener("click", () => {
  finalPoem.style.display = "block";

  if (selectedPoemIndexes.length === 0) return alert("시를 선택해주세요!");
  if (selectedPoemIndexes.length < 3) {
    return alert("시를 3개 이상 선택해주세요!");
  }

  // 선택된 시들의 단어 합치기
  let POEM_WORDS = [];
  selectedPoemIndexes.forEach((i) => {
    POEM_WORDS = POEM_WORDS.concat(POEMS[i].words);
  });

  intro.style.display = "none";
  canvas.style.display = "block";
  poemOutputContainer.style.display = "block";
  timerEl.style.display = "block";

  createWords(POEM_WORDS);
  startTime = Date.now();
  animate();
});

// 다시하기 버튼 클릭
retryBtn.addEventListener("click", () => {
  finalPoem.style.display = "none";
  retryBtn.style.display = "none";
  canvas.style.display = "none";
  poemOutputContainer.style.display = "none";
  timerEl.style.display = "none";
  finalWrap.style.display = "none";

  // 선택 초기화
  selectedPoemIndexes = [];
  document
    .querySelectorAll("#poemSelect button")
    .forEach((btn) => btn.classList.remove("selected"));

  intro.style.display = "block";
});
