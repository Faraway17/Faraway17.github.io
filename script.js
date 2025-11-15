// Base de datos de mazos
const decks = {
    basico: [
        { japanese: "学校", spanish: "escuela" },
        { japanese: "本", spanish: "libro" },
        { japanese: "水", spanish: "agua" },
        { japanese: "猫", spanish: "gato" },
        { japanese: "犬", spanish: "perro" },
        { japanese: "手", spanish: "mano" }
    ],
    intermedio: [
        { japanese: "伝説", spanish: "leyenda" },
        { japanese: "嗜好", spanish: "preferencia" },
        { japanese: "大体", spanish: "aproximadamente" },
        { japanese: "感触", spanish: "sensación" },
        { japanese: "狐", spanish: "zorro" },
        { japanese: "空", spanish: "cielo" }
    ],
    avanzado: [
        { japanese: "微妙", spanish: "delicado" },
        { japanese: "矛盾", spanish: "contradicción" },
        { japanese: "絆", spanish: "vínculo" },
        { japanese: "無駄", spanish: "inútil" },
        { japanese: "微妙", spanish: "sutil" },
        { japanese: "觉悟", spanish: "determinación" }
    ]
};

// Variables del juego
let currentDeck = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let usedIndices = [];
let currentCorrectAnswer = "";
let answeredCorrectly = false;

// Elementos del DOM
const deckSelection = document.getElementById('deck-selection');
const gameContainer = document.getElementById('game-container');
const japaneseWordElement = document.getElementById('japanese-word');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const resultsElement = document.getElementById('results');
const finalScoreElement = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');

// Selección de mazos
document.querySelectorAll('.deck-card').forEach(card => {
    card.addEventListener('click', () => {
        const deckType = card.getAttribute('data-deck');
        startGame(deckType);
    });
});

// Iniciar juego con mazo seleccionado
function startGame(deckType) {
    currentDeck = decks[deckType];
    deckSelection.style.display = 'none';
    gameContainer.style.display = 'block';
    initGame();
}

// Inicializar el juego
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = 0;
    usedIndices = [];
    answeredCorrectly = false;
    updateScore();
    showQuestion();
    resultsElement.style.display = 'none';
    document.querySelector('.quiz-area').style.display = 'block';
}

// Mostrar una pregunta
function showQuestion() {
    // Resetear estado
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    nextBtn.disabled = true;
    answeredCorrectly = false;
    
    // Verificar si ya se usaron todas las palabras
    if (usedIndices.length >= currentDeck.length) {
        showFinalResults();
        return;
    }
    
    // Seleccionar palabra aleatoria no usada
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * currentDeck.length);
    } while (usedIndices.includes(randomIndex));
    
    usedIndices.push(randomIndex);
    const currentWord = currentDeck[randomIndex];
    currentCorrectAnswer = currentWord.spanish;
    
    // Mostrar la palabra japonesa
    japaneseWordElement.textContent = currentWord.japanese;
    
    // Generar opciones
    generateOptions(currentWord.spanish);
    
    // Actualizar progreso
    updateProgress();
    totalQuestions++;
}

// Generar opciones de respuesta
function generateOptions(correctAnswer) {
    // Limpiar opciones anteriores
    optionsContainer.innerHTML = '';
    
    // Crear array de opciones (1 correcta + 3 incorrectas)
    const options = [correctAnswer];
    
    // Añadir opciones incorrectas
    while (options.length < 4) {
        const randomWord = currentDeck[Math.floor(Math.random() * currentDeck.length)];
        if (!options.includes(randomWord.spanish)) {
            options.push(randomWord.spanish);
        }
    }
    
    // Mezclar opciones
    shuffleArray(options);
    
    // Crear botones de opciones
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option, optionElement));
        optionsContainer.appendChild(optionElement);
    });
}

// Verificar respuesta
function checkAnswer(selectedOption, optionElement) {
    // Si ya se respondió correctamente, no hacer nada
    if (answeredCorrectly) return;
    
    // Deshabilitar todas las opciones temporalmente
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    if (selectedOption === currentCorrectAnswer) {
        // Respuesta correcta - MOSTRAR LA CORRECTA EN VERDE
        answeredCorrectly = true;
        score++;
        
        // Mostrar todas las respuestas correctas
        allOptions.forEach(opt => {
            if (opt.textContent === currentCorrectAnswer) {
                opt.classList.add('correct');
            }
        });
        
        feedbackElement.textContent = '¡Correcto! 🎉';
        feedbackElement.classList.add('correct');
        nextBtn.disabled = false;
        
    } else {
        // Respuesta incorrecta - SOLO MARCAR LA INCORRECTA EN ROJO TEMPORAL
        optionElement.classList.add('incorrect');
        feedbackElement.textContent = 'Incorrecto ❌ - ¡Intenta de nuevo!';
        feedbackElement.classList.add('incorrect');
        
        // Reactivar las opciones después de un breve momento para permitir reintentos
        setTimeout(() => {
            if (!answeredCorrectly) {
                allOptions.forEach(opt => {
                    opt.style.pointerEvents = 'auto';
                    // Quitar la clase de incorrecto
                    opt.classList.remove('incorrect');
                });
                feedbackElement.textContent = '¡Elige otra opción!';
                feedbackElement.classList.remove('incorrect');
            }
        }, 800);
    }
    
    updateScore();
}

// Actualizar puntuación
function updateScore() {
    scoreElement.textContent = `Puntuación: ${score}/${totalQuestions}`;
}

// Actualizar barra de progreso
function updateProgress() {
    const progress = (usedIndices.length / currentDeck.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Mostrar resultados finales
function showFinalResults() {
    document.querySelector('.quiz-area').style.display = 'none';
    resultsElement.style.display = 'block';
    finalScoreElement.textContent = `Tu puntuación final: ${score}/${currentDeck.length}`;
}

// Función para mezclar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Event Listeners
nextBtn.addEventListener('click', showQuestion);
restartBtn.addEventListener('click', () => {
    gameContainer.style.display = 'none';
    deckSelection.style.display = 'block';
});

// Iniciar en la pantalla de selección de mazos
window.addEventListener('load', () => {
    deckSelection.style.display = 'block';
    gameContainer.style.display = 'none';
});
