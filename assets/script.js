// ======================
// NẠP DỮ LIỆU CÂU HỎI
// ======================

const questions = [
    // Mẫu câu hỏi – bạn tự thêm vào
    {
        question: "Câu ví dụ: Đâu là màu của mùa xuân?",
        answers: [
            "Màu xanh lá*",
            "Màu đỏ",
            "Màu tím",
            "Màu vàng*"
        ]
    }
];

// ======================
// XỬ LÝ HIỂN THỊ
// ======================

const container = document.getElementById("question-container");

function loadQuestions() {
    const total = 50;

    // Lấy ngẫu nhiên 50 câu
    const selected = questions.sort(() => Math.random() - 0.5).slice(0, total);

    selected.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question";

        div.innerHTML = `
            <div><b>Câu ${i + 1}:</b> ${q.question}</div>
            ${q.answers
                .map((ans, idx) => {
                    const clean = ans.replace("*", "");
                    return `
                        <label>
                            <input type="checkbox" name="q${i}" value="${idx}">
                            ${clean}
                        </label><br>
                    `;
                })
                .join("")}
        `;

        container.appendChild(div);
    });
}

loadQuestions();

// ======================
// CHẤM ĐIỂM
// ======================

document.getElementById("submitBtn").onclick = submitQuiz;

function submitQuiz() {
    let score = 0;

    const questionElements = document.querySelectorAll(".question");

    questionElements.forEach((qEl, i) => {
        const q = questions[i];
        const selected = [...document.querySelectorAll(`input[name="q${i}"]:checked`)]
            .map(e => parseInt(e.value));

        const correct = q.answers
            .map((a, idx) => (a.includes("*") ? idx : -1))
            .filter(i => i >= 0);

        // So sánh
        if (JSON.stringify(selected.sort()) === JSON.stringify(correct.sort())) {
            score += 0.2; // Mỗi câu 0.2 điểm
        }
    });

    const result = document.getElementById("result");
    result.innerHTML = `Bạn đạt: <b>${score.toFixed(2)} / 10 điểm</b>`;

    clearInterval(timerInterval);
}

// ======================
// ĐẾM NGƯỢC 60 PHÚT
// ======================

let time = 60 * 60;
const timerDiv = document.getElementById("timer");
const timeoutSound = document.getElementById("timeoutSound");

const timerInterval = setInterval(() => {
    const m = Math.floor(time / 60);
    const s = time % 60;

    timerDiv.textContent = `⏳ ${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    if (time <= 0) {
        clearInterval(timerInterval);
        timeoutSound.play();
        submitQuiz();
    }

    time--;
}, 1000);
