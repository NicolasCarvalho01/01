const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const resultSection = document.getElementById('result-section');
const resultText = document.getElementById('result-text');
const retryBtn = document.getElementById('retry-btn');

let currentQuestion = 0;
let score = 0;

// Respostas corretas (índices baseados em 0)
const correctAnswers = ['q1-b', 'q2-c', 'q3-b','q4-d','q5-c','q6-a','q7-b','q8-c','q9-d','q10-b'];

function showQuestion(index) {
    questions.forEach((question, i) => {
        question.classList.toggle('active', i === index);
    });
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

function checkAnswers() {
    // Verifica cada resposta e soma a pontuação
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selectedAnswer && selectedAnswer.id === correctAnswers[index]) {
            score++;
        }
    });

    // Exibe o resultado
    resultText.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
    document.querySelector('.quiz-container').style.display = 'none';
    resultSection.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

// Finaliza o quiz ao clicar em "Enviar"
submitBtn.addEventListener('click', () => {
    checkAnswers();
});

// Reinicia o quiz
retryBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    document.querySelector('.quiz-container').style.display = 'block';
    resultSection.style.display = 'none';
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    showQuestion(currentQuestion);
});

// Inicializa o quiz
showQuestion(currentQuestion);
