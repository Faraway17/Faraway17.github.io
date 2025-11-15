// Base de datos expandida
const japaneseDecks = {
    basico: [
        { word: "学校", translation: "escuela" },
        { word: "本", translation: "libro" },
        { word: "水", translation: "agua" },
        { word: "猫", translation: "gato" },
        { word: "犬", translation: "perro" },
        { word: "手", translation: "mano" }
    ],
    intermedio: [
        { word: "伝説", translation: "leyenda" },
        { word: "嗜好", translation: "preferencia" },
        { word: "大体", translation: "aproximadamente" },
        { word: "感触", translation: "sensación" },
        { word: "狐", translation: "zorro" },
        { word: "空", translation: "cielo" }
    ],
    avanzado: [
        { word: "微妙", translation: "delicado" },
        { word: "矛盾", translation: "contradicción" },
        { word: "絆", translation: "vínculo" },
        { word: "無駄", translation: "inútil" },
        { word: "微妙", translation: "sutil" },
        { word: "觉悟", translation: "determinación" }
    ],
    kanji: [
        { word: "愛", translation: "amor" },
        { word: "夢", translation: "sueño" },
        { word: "力", translation: "poder" },
        { word: "美", translation: "belleza" },
        { word: "心", translation: "corazón" },
        { word: "道", translation: "camino" }
    ],
    verbos: [
        { word: "食べる", translation: "comer" },
        { word: "飲む", translation: "beber" },
        { word: "行く", translation: "ir" },
        { word: "来る", translation: "venir" },
        { word: "見る", translation: "ver" },
        { word: "話す", translation: "hablar" }
    ],
    avanzado2: [
        { word: "絢爛", translation: "brillante" },
        { word: "邂逅", translation: "encuentro" },
        { word: "刹那", translation: "momento" },
        { word: "悠久", translation: "eternidad" },
        { word: "混沌", translation: "caos" },
        { word: "輪廻", translation: "reencarnación" }
    ]
};

const englishLevels = {
    a1: [
        { word: "Hello", translation: "Hola" },
        { word: "Goodbye", translation: "Adiós" },
        { word: "Thank you", translation: "Gracias" },
        { word: "Please", translation: "Por favor" },
        { word: "Yes", translation: "Sí" },
        { word: "No", translation: "No" }
    ],
    a2: [
        { word: "House", translation: "Casa" },
        { word: "Family", translation: "Familia" },
        { word: "Food", translation: "Comida" },
        { word: "Water", translation: "Agua" },
        { word: "Friend", translation: "Amigo" },
        { word: "School", translation: "Escuela" }
    ],
    b1: [
        { word: "Actually", translation: "En realidad" },
        { word: "Although", translation: "Aunque" },
        { word: "Because", translation: "Porque" },
        { word: "However", translation: "Sin embargo" },
        { word: "Therefore", translation: "Por lo tanto" },
        { word: "Meanwhile", translation: "Mientras tanto" }
    ],
    b2: [
        { word: "Accomplish", translation: "Lograr" },
        { word: "Significant", translation: "Significativo" },
        { word: "Furthermore", translation: "Además" },
        { word: "Nevertheless", translation: "No obstante" },
        { word: "Consequently", translation: "En consecuencia" },
        { word: "Ultimately", translation: "Finalmente" }
    ],
    c1: [
        { word: "Ambiguous", translation: "Ambiguo" },
        { word: "Comprehensive", translation: "Exhaustivo" },
        { word: "Substantial", translation: "Sustancial" },
        { word: "Nevertheless", translation: "Sin embargo" },
        { word: "Consequently", translation: "En consecuencia" },
        { word: "Furthermore", translation: "Además" }
    ],
    c2: [
        { word: "Ubiquitous", translation: "Ubicuo" },
        { word: "Meticulous", translation: "Meticuloso" },
        { word: "Pragmatic", translation: "Pragmático" },
        { word: "Inevitable", translation: "Inevitable" },
        { word: "Paradigm", translation: "Paradigma" },
        { word: "Quintessential", translation: "Quintaesencia" }
    ]
};

// Variables del juego
let currentDeck = [];
let usedWords = [];
let score = 0;
let totalQuestions = 0;
let currentCorrectAnswer = "";
let currentType = ""; // 'japanese' o 'english'

// Elementos del DOM
const screens = {
    language: document.getElementById('screen-language'),
    japaneseDecks: document.getElementById('screen-japanese-decks'),
    englishLevels: document.getElementById('screen-english-levels'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results')
};

// Inicializar eventos cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    // Botones de idioma
    document.getElementById('japanese-btn').addEventListener('click', function() {
        showScreen('japaneseDecks');
    });
    
    document.getElementById('english-btn').addEventListener('click', function() {
        showScreen('englishLevels');
    });

    // Botones de volver
    document.getElementById('back-from-japanese').addEventListener('click', function() {
        showScreen('language');
    });
    
    document.getElementById('back-from-english').addEventListener('click', function() {
        showScreen('language');
    });

    // Botón siguiente pregunta
    document.getElementById('next-btn').addEventListener('click', nextQuestion);

    // Botón volver a selección desde resultados
    document.getElementById('back-to-selection').addEventListener('click', backToSelection);

    // Eventos para mazos japoneses
    document.querySelectorAll('#screen-japanese-decks .deck').forEach(deck => {
        deck.addEventListener('click', function() {
            const deckName = this.getAttribute('data-deck');
            selectDeck(deckName, 'japanese');
        });
    });

    // Eventos para niveles inglés
    document.querySelectorAll('#screen-english-levels .level').forEach(level => {
        level.addEventListener('click', function() {
            const levelName = this.getAttribute('data-level');
            selectLevel(levelName, 'english');
        });
    });

    // Mostrar pantalla inicial
    showScreen('language');
});

// Cambiar pantalla
function showScreen(screenName) {
    // Ocultar todas las pantallas
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla solicitada
    screens[screenName].classList.add('active');
}

// Seleccionar mazo japonés
function selectDeck(deckName, type) {
    currentDeck = japaneseDecks[deckName];
    currentType = type;
    startGame();
}

// Seleccionar nivel inglés
function selectLevel(levelName, type) {
    currentDeck = englishLevels[levelName];
    currentType = type;
    startGame();
}

// Iniciar juego
function startGame() {
    usedWords = [];
    score = 0;
    totalQuestions = 0;
    
    // Actualizar título según idioma
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = currentType === 'japanese' ? '🎌 Quiz Japonés' : '🇬🇧 Quiz Inglés';
    
    showScreen('game');
    nextQuestion();
}

// Siguiente pregunta
function nextQuestion() {
    const wordDisplay = document.getElementById('word-display');
    const options = document.getElementById('options');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const scoreElement = document.getElementById('score');
    const progress = document.getElementById('progress');

    // Resetear
    feedback.textContent = '';
    feedback.className = 'feedback';
    nextBtn.disabled = true;
    wordDisplay.className = 'word-display ' + currentType;

    // Verificar si terminó
    if (usedWords.length >= currentDeck.length) {
        showResults();
        return;
    }

    // Obtener palabra aleatoria
    let randomWord;
    do {
        randomWord = currentDeck[Math.floor(Math.random() * currentDeck.length)];
    } while (usedWords.includes(randomWord.word));

    usedWords.push(randomWord.word);
    currentCorrectAnswer = randomWord.translation;

    // Mostrar palabra
    wordDisplay.textContent = randomWord.word;

    // Generar opciones
    const allOptions = [randomWord.translation];
    while (allOptions.length < 4) {
        const randomOption = currentDeck[Math.floor(Math.random() * currentDeck.length)].translation;
        if (!allOptions.includes(randomOption)) {
            allOptions.push(randomOption);
        }
    }

    // Mezclar opciones
    allOptions.sort(() => Math.random() - 0.5);

    // Crear botones de opciones
    options.innerHTML = '';
    allOptions.forEach(option => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', function() {
            checkAnswer(option, button);
        });
        options.appendChild(button);
    });

    // Actualizar UI
    totalQuestions++;
    scoreElement.textContent = `Puntuación: ${score}/${totalQuestions}`;
    progress.style.width = `${(usedWords.length / currentDeck.length) * 100}%`;
}

// Verificar respuesta - MODIFICADO: No mostrar respuesta correcta al equivocarse
function checkAnswer(selected, element) {
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    // Deshabilitar todas las opciones temporalmente
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    if (selected === currentCorrectAnswer) {
        // Respuesta correcta - MOSTRAR LA CORRECTA EN VERDE
        element.classList.add('correct');
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'feedback correct';
        score++;
        nextBtn.disabled = false;
        
        // Mostrar todas las respuestas correctas (solo cuando aciertas)
        options.forEach(opt => {
            if (opt.textContent === currentCorrectAnswer) {
                opt.classList.add('correct');
            }
        });
        
    } else {
        // Respuesta incorrecta - SOLO MARCAR LA INCORRECTA EN ROJO, NO MOSTRAR LA CORRECTA
        element.classList.add('incorrect');
        feedback.textContent = 'Incorrecto ❌ Intenta de nuevo';
        feedback.className = 'feedback incorrect';

        // NO MOSTRAR LA RESPUESTA CORRECTA - ELIMINADO EL BLOQUE QUE LA MARCA EN VERDE

        // Permitir reintentar después de 1 segundo
        setTimeout(() => {
            if (!nextBtn.disabled) return; // Si ya se activó el botón siguiente (por acertar), no hacer nada
            options.forEach(opt => {
                opt.style.pointerEvents = 'auto';
                // Quitar solo la clase de incorrecto, mantener todo lo demás
                opt.classList.remove('incorrect');
            });
            feedback.textContent = '¡Elige otra opción!';
            feedback.classList.remove('incorrect');
        }, 1000);
    }

    document.getElementById('score').textContent = `Puntuación: ${score}/${totalQuestions}`;
}

// Mostrar resultados
function showResults() {
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = `Puntuación final: ${score}/${currentDeck.length}`;
    showScreen('results');
}

// Volver a selección
function backToSelection() {
    if (currentType === 'japanese') {
        showScreen('japaneseDecks');
    } else {
        showScreen('englishLevels');
    }
}
