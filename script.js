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
let currentLanguage = '';
let currentDeck = [];
let currentType = ''; // 'japanese' o 'english'
let usedWords = [];
let score = 0;
let totalQuestions = 0;
let currentCorrectAnswer = "";

// Elementos del DOM
const screens = {
    language: document.getElementById('screen-language'),
    japaneseDecks: document.getElementById('screen-japanese-decks'),
    englishLevels: document.getElementById('screen-english-levels'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results')
};

// Cambiar pantalla
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Seleccionar idioma
function selectLanguage(language) {
    currentLanguage = language;
    if (language === 'japanese') {
        showScreen('japaneseDecks');
    } else {
        showScreen('englishLevels');
    }
}

// Volver a selección de idioma
function backToLanguage() {
    showScreen('language');
}

// Seleccionar mazo japonés
function selectDeck(deckName) {
    currentDeck = japaneseDecks[deckName];
    currentType = 'japanese';
    startGame();
}

// Seleccionar nivel inglés
function selectLevel(levelName) {
    currentDeck = englishLevels[levelName];
    currentType = 'english';
    startGame();
}

// Iniciar juego
function startGame() {
    usedWords = [];
    score = 0;
    totalQuestions = 0;
    showScreen('game');
    
    // Actualizar título según idioma
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = currentType === 'japanese' ? '🎌 Quiz Japonés' : '🇬🇧 Quiz Inglés';
    
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
        button.onclick = () => checkAnswer(option, button);
        options.appendChild(button);
    });

    // Actualizar UI
    totalQuestions++;
    scoreElement.textContent = `Puntuación: ${score}/${totalQuestions}`;
    progress.style.width = `${(usedWords.length / currentDeck.length) * 100}%`;
}

// Verificar respuesta
function checkAnswer(selected, element) {
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    // Deshabilitar todas las opciones
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    if (selected === currentCorrectAnswer) {
        // Correcto
        element.classList.add('correct');
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'feedback correct';
        score++;
        nextBtn.disabled = false;
    } else {
        // Incorrecto
        element.classList.add('incorrect');
        feedback.textContent = 'Incorrecto ❌ Intenta de nuevo';
        feedback.className = 'feedback incorrect';
        
        // Mostrar la correcta
        options.forEach(opt => {
            if (opt.textContent === currentCorrectAnswer) {
                opt.classList.add('correct');
            }
        });

        // Permitir reintentar después de 1 segundo
        setTimeout(() => {
            if (!nextBtn.disabled) return;
            options.forEach(opt => {
                opt.style.pointerEvents = 'auto';
                opt.classList.remove('incorrect');
            });
            feedback.textContent = '¡Intenta de nuevo!';
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

// Iniciar en pantalla de idioma
showScreen('language');
