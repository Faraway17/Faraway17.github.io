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
    japanese: [
        { word: "こんにちは", options: ["Hola", "Adiós", "Gracias", "Agua"], correct: 0 },
        { word: "ありがとう", options: ["Perdón", "Gracias", "Casa", "Comer"], correct: 1 },
        { word: "水", options: ["Fuego", "Agua", "Tierra", "Aire"], correct: 1 }
    ],
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
    showScreen(screenResults);
    finalScore.textContent = `Tu puntuación final: ${score}/${currentQuiz.length}`;
}

// --- Pronunciación ---
const pronunciationWord = document.getElementById("pronunciation-word");
const startSpeechBtn = document.getElementById("start-speech");
const speechFeedback = document.getElementById("speech-feedback");
const nextPronunciationBtn = document.getElementById("next-pronunciation");

const pronunciationDeck = ["こんにちは", "ありがとう", "さようなら", "水", "食べる"];
let currentPronIndex = 0;

function loadPronunciationWord() {
    pronunciationWord.textContent = pronunciationDeck[currentPronIndex];
    speechFeedback.textContent = "";
}

startSpeechBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ja-JP"; // japonés
    recognition.start();

    recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        if (spoken === pronunciationDeck[currentPronIndex]) {
            speechFeedback.textContent = "✅ ¡Correcto!";
            speechFeedback.className = "feedback correct";
        } else {
            speechFeedback.textContent = "❌ Intenta de nuevo";
            speechFeedback.className = "feedback incorrect";
        }
    };

    recognition.onerror = () => {
        speechFeedback.textContent = "Error al reconocer la voz";
        speechFeedback.className = "feedback incorrect";
    };
});

nextPronunciationBtn.addEventListener("click", () => {
    currentPronIndex++;
    if (currentPronIndex >= pronunciationDeck.length) {
        currentPronIndex = 0;
    }
    loadPronunciationWord();
});

// --- Conexión de mazos y niveles ---
document.querySelectorAll(".deck").forEach(el => {
    el.addEventListener("click", () => {
        startQuiz("japanese");
    });
});

document.querySelectorAll(".level").forEach(el => {
    el.addEventListener("click", () => {
        const level = el.dataset.level; // a1, a2, b1, b2, c1, c2
        startQuiz("english_" + level);
    });
});
