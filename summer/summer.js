// ==============================
// UI 요소
// ==============================
const songSelect = document.getElementById("songSelect");
const userText = document.getElementById("userText");
const generateBtn = document.getElementById("generateBtn");
const canvas = document.getElementById("canvas");
const resetBtn = document.getElementById("resetBtn");

const nextBtn = document.getElementById("next_btn");
const userInputSection = document.querySelector("section.user-input");
const lastView = document.querySelector("section.last_view");


// ==============================
// 시 선택 버튼 생성
// ==============================
POEMS.forEach((p) => {
  const btn = document.createElement("button");

  btn.textContent = p.title;
  btn.dataset.id = p.id;
  btn.className = "song-btn";

  // 클릭 시 선택 / 해제
  btn.addEventListener("click", () => {
    btn.classList.toggle("selected");
  });

  songSelect.appendChild(btn);
});


// ==============================
// 다음 버튼
// ==============================
nextBtn.addEventListener("click", () => {
  // 형제 섹션의 _active 제거
  const siblings = Array.from(userInputSection.parentElement.children);

  siblings.forEach((sib) => {
    sib.classList.remove("_active");
  });

  // 사용자 입력 영역 활성화
  userInputSection.classList.add("_active");
});


// ==============================
// 시 생성
// ==============================
generateBtn.addEventListener("click", () => {
  // 결과 화면으로 이동
  const siblings = Array.from(lastView.parentElement.children);

  siblings.forEach((sib) => {
    sib.classList.remove("_active");
  });

  lastView.classList.add("_active");


  // 기존 결과 초기화
  canvas.innerHTML = "";


  // ==========================
  // 선택된 시 가져오기
  // ==========================
  const selectedIds = Array.from(
    songSelect.querySelectorAll(".song-btn.selected")
  ).map((btn) => Number(btn.dataset.id));


  let poemWords = [];

  POEMS.forEach((p) => {
    if (selectedIds.includes(p.id)) {
      const words = p.text
        .split(/\s+/)
        .filter(Boolean);

      poemWords = poemWords.concat(words);
    }
  });


  // ==========================
  // 사용자 입력 단어 가져오기
  // ==========================
  const userWords = userText.value
    .split(/\s+/)
    .filter(Boolean);


  // ==========================
  // 랜덤 셔플 함수
  // ==========================
  const shuffle = (array) => {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  };


  // 시 단어 랜덤 섞기
  poemWords = shuffle(poemWords);

  // 사용자 단어 랜덤 섞기
  const shuffledUserWords = shuffle(userWords);


  // ==========================
  // 사용자 단어 최소 5개 보장
  // ==========================

  // 결과에 넣을 사용자 단어
  // 입력한 단어가 5개 이상이면 최소 5개 선택
  // 5개 미만이면 입력한 단어 전부 선택
  const userWordCount = Math.min(shuffledUserWords.length, 5);

  const selectedUserWords = shuffledUserWords.slice(
    0,
    userWordCount
  );


  // ==========================
  // 시 단어 선택
  // ==========================

  // 전체 결과는 최대 20어절
  const MAX_WORDS = 20;

  // 사용자 단어를 넣고 남은 자리를 시 단어로 채움
  const poemWordCount = Math.max(
    0,
    MAX_WORDS - selectedUserWords.length
  );

  const selectedPoemWords = poemWords.slice(
    0,
    poemWordCount
  );


  // ==========================
  // 최종 단어 합치기
  // ==========================
  let words = [
    ...selectedPoemWords,
    ...selectedUserWords,
  ];


  // 최종적으로 한 번 더 섞기
  // → 사용자 단어가 앞/뒤에 몰리지 않음
  words = shuffle(words);


  // ==========================
  // 캔버스에 단어 카드 생성
  // ==========================
  words.forEach((word) => {
    const span = document.createElement("span");

    span.className = "word-card";
    span.textContent = word;

    canvas.appendChild(span);
  });
});


// ==============================
// 초기화
// ==============================
resetBtn.addEventListener("click", () => {
  location.reload();
});
