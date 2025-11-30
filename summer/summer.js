// UI 요소
const songSelect = document.getElementById("songSelect");
const userText = document.getElementById("userText");
const generateBtn = document.getElementById("generateBtn");
const canvas = document.getElementById("canvas");
const resetBtn = document.getElementById("resetBtn");

// 시 선택 버튼 생성
POEMS.forEach((p) => {
  const btn = document.createElement("button");
  btn.textContent = p.title;
  btn.dataset.id = p.id; // 시 ID 저장
  btn.className = "song-btn";

  // 클릭 시 선택/해제 토글
  btn.addEventListener("click", () => {
    btn.classList.toggle("selected");
  });

  songSelect.appendChild(btn);
});

const nextBtn = document.getElementById("next_btn");
const userInputSection = document.querySelector("section.user-input");

nextBtn.addEventListener("click", () => {
  // 형제 섹션들 모두 _active 제거
  const siblings = Array.from(userInputSection.parentElement.children);
  siblings.forEach((sib) => sib.classList.remove("_active"));

  // user-input 섹션에 _active 추가
  userInputSection.classList.add("_active");
});

const lastView = document.querySelector("section.last_view");

// 새 시 생성
generateBtn.addEventListener("click", () => {
  // 형제 섹션들 모두 _active 제거
  const siblings = Array.from(lastView.parentElement.children);
  siblings.forEach((sib) => sib.classList.remove("_active"));

  // user-input 섹션에 _active 추가
  lastView.classList.add("_active");

  canvas.innerHTML = "";
  // 선택된 시 단어 가져오기
  const selectedIds = Array.from(
    songSelect.querySelectorAll(".song-btn.selected")
  ).map((btn) => parseInt(btn.dataset.id));

  let words = [];
  POEMS.forEach((p) => {
    if (selectedIds.includes(p.id)) {
      words = words.concat(p.text.split(/\s+/));
    }
  });

  // 사용자 입력 단어 추가
  const userWords = userText.value.split(/\s+/).filter(Boolean);
  words = words.concat(userWords);

  // 랜덤 섞기
  words.sort(() => Math.random() - 0.5);

  // 캔버스에 단어 카드로 배치
  words.forEach((w) => {
    const span = document.createElement("span");
    span.className = "word-card";
    span.textContent = w;
    canvas.appendChild(span);
  });
});

// 초기화
resetBtn.addEventListener("click", () => {
  location.reload();
});
