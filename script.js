// --- Función para mostrar pantallas ---
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

// --- Referencias a pantallas ---
const screenLanguage = document.getElementById("screen-language");
const screenJapaneseDecks = document.getElementById("screen-japanese-decks");
const screenEnglishLevels = document.getElementById("screen-english-levels");
const screenGame = document.getElementById("screen-game");
const screenResults = document.getElementById("screen-results");
const screenPronunciation = document.getElementById("screen-pronunciation");

// --- Botones principales ---
const japaneseBtn = document.getElementById("japanese-btn");
const englishBtn = document.getElementById("english-btn");
const pronunciationBtn = document.getElementById("pronunciation-btn");

// --- Botones de volver ---
document.getElementById("back-from-japanese").addEventListener("click", () => showScreen(screenLanguage));
document.getElementById("back-from-english").addEventListener("click", () => showScreen(screenLanguage));
document.getElementById("back-from-pronunciation").addEventListener("click", () => showScreen(screenLanguage));
document.getElementById("back-to-selection").addEventListener("click", () => showScreen(screenLanguage));

// --- Navegación inicial ---
japaneseBtn.addEventListener("click", () => showScreen(screenJapaneseDecks));
englishBtn.addEventListener("click", () => showScreen(screenEnglishLevels));
pronunciationBtn.addEventListener("click", () => {
    showScreen(screenPronunciation);
    loadPronunciationWord();
});

// --- Juego Quiz ---
const wordDisplay = document.getElementById("word-display");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress");
const finalScore = document.getElementById("final-score");

let currentQuestion = 0;
let score = 0;
let currentQuiz = [];

// --- Datos de preguntas por idioma/nivel ---
const quizSets = {
    // Japonés
    japanese_basico: [
        { word: "こんにちは", options: ["Hola", "Adiós", "Gracias", "Agua"], correct: 0 },
        { word: "さようなら", options: ["Adiós", "Hola", "Perdón", "Casa"], correct: 0 },
        { word: "ありがとう", options: ["Gracias", "Agua", "Comer", "Dormir"], correct: 0 }
    ],
    japanese_intermedio: [
        { word: "学校", options: ["Escuela", "Casa", "Libro", "Mesa"], correct: 0 },
        { word: "先生", options: ["Profesor", "Estudiante", "Amigo", "Padre"], correct: 0 },
        { word: "友達", options: ["Amigo", "Trabajo", "Viaje", "Comida"], correct: 0 }
    ],
    japanese_avanzado: [
        { word: "経済", options: ["Economía", "Historia", "Matemáticas", "Política"], correct: 0 },
        { word: "文化", options: ["Cultura", "Lengua", "País", "Fiesta"], correct: 0 },
        { word: "自然", options: ["Naturaleza", "Ciudad", "Tecnología", "Trabajo"], correct: 0 }
    ],
    japanese_kanji: [
        { word: "火", options: ["Fuego", "Agua", "Tierra", "Aire"], correct: 0 },
        { word: "木", options: ["Árbol", "Casa", "Libro", "Puerta"], correct: 0 },
        { word: "山", options: ["Montaña", "Río", "Mar", "Valle"], correct: 0 }
    ],
    japanese_verbos: [
        { word: "食べる", options: ["Comer", "Beber", "Dormir", "Correr"], correct: 0 },
        { word: "見る", options: ["Ver", "Escuchar", "Hablar", "Caminar"], correct: 0 },
        { word: "書く", options: ["Escribir", "Leer", "Cantar", "Jugar"], correct: 0 }
    ],
    japanese_avanzado2: [
        { word: "哲学", options: ["Filosofía", "Matemáticas", "Historia", "Arte"], correct: 0 },
        { word: "文学", options: ["Literatura", "Ciencia", "Economía", "Política"], correct: 0 },
        { word: "心理学", options: ["Psicología", "Biología", "Química", "Física"], correct: 0 }
    ],

    // Inglés niveles
    english_a1: [
        { word: "Dog", options: ["Perro", "Gato", "Casa", "Agua"], correct: 0 },
        { word: "House", options: ["Casa", "Carro", "Libro", "Mesa"], correct: 0 },
        { word: "Book", options: ["Mesa", "Libro", "Puerta", "Zapato"], correct: 1 }
    ],
    english_a2: [
        { word: "I am happy", options: ["Estoy feliz", "Estoy cansado", "Estoy triste", "Estoy ocupado"], correct: 0 },
        { word: "She is tall", options: ["Ella es baja", "Ella es alta", "Ella es joven", "Ella es vieja"], correct: 1 }
    ],
    english_b1: [
        { word: "Travel", options: ["Viajar", "Comer", "Dormir", "Correr"], correct: 0 },
        { word: "Conversation", options: ["Conversación", "Canción", "Habitación", "Celebración"], correct: 0 }
    ],
    english_b2: [
        { word: "Opinion", options: ["Opinión", "Opción", "Operación", "Oposición"], correct: 0 },
        { word: "Debate", options: ["Debate", "Discusión", "Juego", "Trabajo"], correct: 0 }
    ],
    english_c1: [
        { word: "Thesis", options: ["Tesis", "Trabajo", "Libro", "Ensayo"], correct: 0 },
        { word: "Research", options: ["Investigación", "Recreación", "Revisión", "Reacción"], correct: 0 }
    ],
    english_c2: [
        { word: "Proficient", options: ["Competente", "Incompetente", "Principiante", "Avanzado"], correct: 0 },
        { word: "Native", options: ["Nativo", "Extranjero", "Turista", "Profesor"], correct: 0 }
    ]
};

// --- Iniciar quiz ---
function startQuiz(setKey) {
    currentQuiz = quizSets[setKey];
    currentQuestion = 0;
    score = 0;
    showScreen(screenGame);
    loadQuestion();
}

function loadQuestion() {
    const q = currentQuiz[currentQuestion];
    wordDisplay.textContent = q.word;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("div");
        btn.classList.add("option");
        btn.textContent = opt;
        btn.addEventListener("click", () => checkAnswer(i));
        optionsContainer.appendChild(btn);
    });
    updateScore();
    updateProgress();
}

function checkAnswer(selected) {
    const q = currentQuiz[currentQuestion];
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((btn, i) => {
        btn.classList.remove("correct", "incorrect");
        if (i === q.correct) btn.classList.add("correct");
        else if (i === selected) btn.classList.add("incorrect");
    });
    if (selected === q.correct) {
        feedback.textContent = "✅ ¡Correcto!";
        feedback.className = "feedback correct";
        score++;
    } else {
        feedback.textContent = "❌ Incorrecto";
        feedback.className = "feedback incorrect";
    }
    updateScore();
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < currentQuiz.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function updateScore() {
    scoreDisplay.textContent = `Puntuación: ${score}/${currentQuiz.length}`;
}

function updateProgress() {
    const progressPercent = ((currentQuestion + 1) / currentQuiz.length) * 100;
    progressBar.style.width = progressPercent + "%";
}

function showResults() {
    show
