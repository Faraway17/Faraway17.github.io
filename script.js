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
let currentGameMode = ''; // 'quiz' o 'pronunciation'
let currentInstruction = '';

// Elementos del DOM
const screens = {
    language: document.getElementById('screen-language'),
    gameMode: document.getElementById('screen-game-mode'),
    japaneseDecks: document.getElementById('screen-japanese-decks'),
    englishLevels: document.getElementById('screen-english-levels'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results')
};

// Inicializar eventos cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    // Botones de idioma
    document.getElementById('japanese-btn').addEventListener('click', function() {
        currentType = 'japanese';
        showScreen('gameMode');
    });
    
    document.getElementById('english-btn').addEventListener('click', function() {
        currentType = 'english';
        showScreen('gameMode');
    });

    // Botones de modo de juego
    document.getElementById('quiz-mode-btn').addEventListener('click', function() {
        currentGameMode = 'quiz';
        if (currentType === 'japanese') {
            showScreen('japaneseDecks');
        } else {
            showScreen('englishLevels');
        }
    });
    
    document.getElementById('pronunciation-mode-btn').addEventListener('click', function() {
        currentGameMode = 'pronunciation';
        if (currentType === 'japanese') {
            showScreen('japaneseDecks');
        } else {
            showScreen('englishLevels');
        }
    });

    // Botones de volver
    document.getElementById('back-from-mode').addEventListener('click', function() {
        showScreen('language');
    });
    
    document.getElementById('back-from-japanese').addEventListener('click', function() {
        showScreen('gameMode');
    });
    
    document.getElementById('back-from-english').addEventListener('click', function() {
        showScreen('gameMode');
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

    // Botón comprobar pronunciación
    document.getElementById('check-pronunciation-btn').addEventListener('click', checkPronunciation);

    // Permitir Enter en el input
    document.getElementById('pronunciation-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPronunciation();
        }
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
    
    // Configurar según el modo
    const quizSection = document.getElementById('quiz-section');
    const pronunciationSection = document.getElementById('pronunciation-section');
    const instruction = document.getElementById('game-instruction');
    
    if (currentGameMode === 'quiz') {
        quizSection.style.display = 'block';
        pronunciationSection.style.display = 'none';
        instruction.textContent = 'Elige la traducción correcta:';
    } else {
        quizSection.style.display = 'none';
        pronunciationSection.style.display = 'block';
        instruction.textContent = currentType === 'japanese' 
            ? 'Escribe la lectura en romaji o la traducción:' 
            : 'Escribe la palabra en inglés:';
    }
    
    // Actualizar título
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = currentType === 'japanese' 
        ? `🎌 ${currentGameMode === 'quiz' ? 'Quiz Japonés' : 'Pronunciación Japonesa'}` 
        : `🇬🇧 ${currentGameMode === 'quiz' ? 'Quiz Inglés' : 'Pronunciación Inglesa'}`;
    
    showScreen('game');
    nextQuestion();
}

// Siguiente pregunta
function nextQuestion() {
    const wordDisplay = document.getElementById('word-display');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const scoreElement = document.getElementById('score');
    const progress = document.getElementById('progress');
    const pronunciationInput = document.getElementById('pronunciation-input');

    // Resetear
    feedback.textContent = '';
    feedback.className = 'feedback';
    nextBtn.disabled = true;
    wordDisplay.className = 'word-display ' + currentType;
    pronunciationInput.value = '';
    pronunciationInput.disabled = false;
    document.getElementById('check-pronunciation-btn').disabled = false;

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

    // Mostrar palabra según el modo
    if (currentGameMode === 'quiz') {
        wordDisplay.textContent = randomWord.word;
        generateQuizOptions(randomWord);
    } else {
        // En modo pronunciación, mostramos la traducción y el usuario escribe la palabra original
        wordDisplay.textContent = randomWord.translation;
        currentCorrectAnswer = randomWord.word.toLowerCase(); // Para comparación case-insensitive
    }

    // Actualizar UI
    totalQuestions++;
    scoreElement.textContent = `Puntuación: ${score}/${totalQuestions-1}`;
    progress.style.width = `${(usedWords.length / currentDeck.length) * 100}%`;
}

// Generar opciones para modo quiz
function generateQuizOptions(randomWord) {
    const options = document.getElementById('options');
    const allOptions = [randomWord.translation];
    
    while (allOptions.length < 4) {
        const randomOption = currentDeck[Math.floor(Math.random() * currentDeck.length)].translation;
        if (!allOptions.includes(randomOption)) {
            allOptions.push(randomOption);
        }
    }

    allOptions.sort(() => Math.random() - 0.5);
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
}

// Verificar respuesta para modo quiz
function checkAnswer(selected, element) {
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    if (selected === currentCorrectAnswer) {
        element.classList.add('correct');
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'feedback correct';
        score++;
        nextBtn.disabled = false;
        
        options.forEach(opt => {
            if (opt.textContent === currentCorrectAnswer) {
                opt.classList.add('correct');
            }
        });
        
    } else {
        element.classList.add('incorrect');
        feedback.textContent = 'Incorrecto ❌ Intenta de nuevo';
        feedback.className = 'feedback incorrect';

        setTimeout(() => {
            if (!nextBtn.disabled) return;
            options.forEach(opt => {
                opt.style.pointerEvents = 'auto';
                opt.classList.remove('incorrect');
            });
            feedback.textContent = '¡Elige otra opción!';
            feedback.classList.remove('incorrect');
        }, 1000);
    }

    document.getElementById('score').textContent = `Puntuación: ${score}/${totalQuestions}`;
}

// Verificar pronunciación para modo escritura
function checkPronunciation() {
    const pronunciationInput = document.getElementById('pronunciation-input');
    const userAnswer = pronunciationInput.value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    if (userAnswer === '') {
        feedback.textContent = 'Por favor, escribe una respuesta';
        feedback.className = 'feedback incorrect';
        return;
    }

    // Deshabilitar input y botón
    pronunciationInput.disabled = true;
    document.getElementById('check-pronunciation-btn').disabled = true;

    if (userAnswer === currentCorrectAnswer.toLowerCase()) {
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'feedback correct';
        score++;
        nextBtn.disabled = false;
    } else {
        feedback.textContent = `Incorrecto ❌ La respuesta era: ${currentCorrectAnswer}`;
        feedback.className = 'feedback incorrect';
        nextBtn.disabled = false;
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
