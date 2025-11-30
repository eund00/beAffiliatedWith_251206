/* -----------------------------
        요소 선택
    ----------------------------- */
const wordMap = document.getElementById("wordMap");
const stanzaCard = document.getElementById("stanzaCard");
const stanzaTitle = document.getElementById("stanzaTitle");
const stanzaText = document.getElementById("stanzaText");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const randomizeBtn = document.getElementById("randomizeBtn");
const menuBtn = document.getElementById("menuBtn");
const menuBox = document.getElementById("menuBox");
const poemSelect = document.getElementById("poemSelect");

/* -----------------------------
        상태
    ----------------------------- */
let currentPoemIndex = 0;
let stanzaIndex = 0;
let wordsElements = [];

/* -----------------------------
        시 선택 옵션 초기화
    ----------------------------- */
POEMS.forEach((poem, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = poem.title;
  poemSelect.appendChild(option);
});

poemSelect.addEventListener("change", () => {
  currentPoemIndex = parseInt(poemSelect.value);
  stanzaIndex = 0;
  buildWordMap();
  showStanza(0);
});

/* -----------------------------
        tokenize 유틸
    ----------------------------- */
const tokenize = (t) => t.replace(/\n/g, " \n ").split(/\s+/).filter(Boolean);

/* -----------------------------
        단어 맵 생성
    ----------------------------- */
function buildWordMap() {
  const poem = POEMS[currentPoemIndex];
  wordMap.innerHTML = "";
  wordsElements = [];

  const tokens = tokenize(poem.stanzas.join(" "));

  const rect = wordMap.getBoundingClientRect();
  const W = rect.width || window.innerWidth;
  const H = rect.height || window.innerHeight;

  tokens.forEach((tok) => {
    const el = document.createElement("div");
    el.className = "word";
    el.textContent = tok === "\n" ? "" : tok;

    const fontSize = 14 + Math.random() * 18;
    el.style.fontSize = fontSize + "px";

    const left = Math.random() * W * 0.9;
    const top = Math.random() * H * 0.9;
    const rot = (Math.random() - 0.5) * 12;

    el.style.left = left + "px";
    el.style.top = top + "px";
    el.style.transform = `rotate(${rot}deg)`;

    wordsElements.push({ el, left, top, rot });
    wordMap.appendChild(el);
  });
}

/* -----------------------------
        단어 재배치
    ----------------------------- */
function randomizeWords() {
  const rect = wordMap.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height;

  wordsElements.forEach((w) => {
    w.left = Math.random() * W * 0.9;
    w.top = Math.random() * H * 0.9;
    w.el.style.left = w.left + "px";
    w.el.style.top = w.top + "px";
  });
}

/* -----------------------------
        연 표시 + 단어 강조
    ----------------------------- */
function showStanza(i) {
  const poem = POEMS[currentPoemIndex];
  stanzaIndex = Math.max(0, Math.min(i, poem.stanzas.length - 1));

  stanzaTitle.textContent = `${poem.title} — (${stanzaIndex + 1}/${
    poem.stanzas.length
  })`;
  stanzaText.textContent = poem.stanzas[stanzaIndex];

  const currentWords = new Set(
    poem.stanzas[stanzaIndex].split(/\s+/).filter(Boolean)
  );

  wordsElements.forEach((w) => {
    const wordText = w.el.textContent.trim();
    if (currentWords.has(wordText)) {
      w.el.classList.add("here_point");
      w.el.style.opacity = 1;
      w.el.style.zIndex = 2;
    } else {
      w.el.classList.remove("here_point");
      w.el.style.opacity = 0.3;
      w.el.style.zIndex = 1;
    }
  });
}

/* -----------------------------
        이벤트
    ----------------------------- */
stanzaCard.addEventListener("click", () => showStanza(stanzaIndex + 1));
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showStanza(stanzaIndex + 1);
});
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showStanza(stanzaIndex - 1);
});
randomizeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  randomizeWords();
});

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("close");
  menuBox.classList.toggle("close");
});

window.addEventListener("resize", randomizeWords);
/* -----------------------------
    열기 닫기 토글
----------------------------- */

const button = document.querySelector(".poem_list-btn");
const select = document.getElementById("poemSelect");

button.addEventListener("click", () => {
  select.classList.toggle("close");
  button.classList.toggle("close");
});
/* -----------------------------
        초기화
    ----------------------------- */
buildWordMap();
showStanza(0);
