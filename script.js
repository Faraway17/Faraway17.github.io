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

// Base de datos para pronunciación
const pronunciationDecks = {
    basic: [
        { word: "Hello", translation: "Hola" },
        { word: "Goodbye", translation: "Adiós" },
        { word: "Thank you", translation: "Gracias" },
        { word: "Please", translation: "Por favor" },
        { word: "Yes", translation: "Sí" },
        { word: "No", translation: "No" },
        { word: "Cat", translation: "Gato" },
        { word: "Dog", translation: "Perro" },
        { word: "House", translation: "Casa" },
        { word: "Water", translation: "Agua" }
    ],
    intermediate: [
        { word: "Beautiful", translation: "Hermoso" },
        { word: "Important", translation: "Importante" },
        { word: "Different", translation: "Diferente" },
        { word: "Excellent", translation: "Excelente" },
        { word: "Wonderful", translation: "Maravilloso" },
        { word: "Fantastic", translation: "Fantástico" },
        { word: "Computer", translation: "Computadora" },
        { word: "Telephone", translation: "Teléfono" },
        { word: "Restaurant", translation: "Restaurante" },
        { word: "University", translation: "Universidad" }
    ],
    advanced: [
        { word: "Pronunciation", translation: "Pronunciación" },
        { word: "Communication", translation: "Comunicación" },
        { word: "Opportunity", translation: "Oportunidad" },
        { word: "Responsibility", translation: "Responsabilidad" },
        { word: "International", translation: "Internacional" },
        { word: "Comprehensive", translation: "Comprensivo" },
        { word: "Development", translation: "Desarrollo" },
        { word: "Environment", translation: "Medio ambiente" },
        { word: "Government", translation: "Gobierno" },
        { word: "Technology", translation: "Tecnología" }
    ]
};

// Variables del juego
let currentDeck = [];
let usedWords = [];
let score = 0;
let totalQuestions = 0;
let currentCorrectAnswer = "";
let currentType = "";

// Variables para pronunciación
let pronunciationDeck = [];
let pronunciationUsedWords = [];
let pronunciationScore = 0;
let pronunciationTotalQuestions = 0;
let currentPronunciationWord = "";
let recognition = null;
let isListening = false;

// Elementos del DOM
const screens = {
    language: document.getElementById('screen-language'),
    japaneseDecks: document.getElementById('screen-japanese-decks'),
    englishLevels: document.getElementById('screen-english-levels'),
    pronunciation: document.getElementById('screen-pronunciation'),
    englishPronunciation: document.getElementById('screen-english-pronunciation'),
    game: document.getElementById('screen-game'),
    pronunciationGame: document.getElementById('screen-pronunciation-game'),
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

    document.getElementById('pronunciation-btn').addEventListener('click', function() {
        showScreen('pronunciation');
    });

    // Botones de volver
    document.getElementById('back-from-japanese').addEventListener('click', function() {
        showScreen('language');
    });
    
    document.getElementById('back-from-english').addEventListener('click', function() {
        showScreen('language');
    });

    document.getElementById('back-from-pronunciation').addEventListener('click', function() {
        showScreen('language');
    });

    document.getElementById('back-from-english-pronunciation').addEventListener('click', function() {
        showScreen('pronunciation');
    });

    document.getElementById('back-from-pronunciation-game').addEventListener('click', function() {
        if (pronunciationDeck.length > 0) {
            showScreen('englishPronunciation');
        } else {
            showScreen('pronunciation');
        }
    });

    // Botón siguiente pregunta
    document.getElementById('next-btn').addEventListener('click', nextQuestion);

    // Botones pronunciación
    document.getElementById('english-pronunciation-btn').addEventListener('click', function() {
        showScreen('englishPronunciation');
    });

    document.getElementById('pronunciation-next').addEventListener('click', nextPronunciationQuestion);

    // Botón de micrófono
    document.getElementById('start-listening').addEventListener('click', toggleListening);

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

    // Eventos para niveles de pronunciación
    document.querySelectorAll('#screen-english-pronunciation .pronunciation-level').forEach(level => {
        level.addEventListener('click', function() {
            const levelName = this.getAttribute('data-level');
            selectPronunciationLevel(levelName);
        });
    });

    // Inicializar reconocimiento de voz
    initializeSpeechRecognition();

    // Mostrar pantalla inicial
    showScreen('language');
});

// Inicializar reconocimiento de voz
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = function() {
            isListening = true;
            updateListeningUI();
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            handleSpeechResult(transcript);
        };
        
        recognition.onerror = function(event) {
            console.error('Error en reconocimiento de voz:', event.error);
            isListening = false;
            updateListeningUI();
            document.getElementById('listening-status').textContent = 'Error: ' + event.error;
        };
        
        recognition.onend = function() {
            isListening = false;
            updateListeningUI();
        };
    } else {
        console.warn('El reconocimiento de voz no es compatible con este navegador');
        document.getElementById('start-listening').disabled = true;
        document.getElementById('start-listening').innerHTML = '<span>Navegador no compatible</span>';
    }
}

// Manejar resultado del reconocimiento de voz
function handleSpeechResult(transcript) {
    const userTranscription = document.getElementById('user-transcription');
    const feedback = document.getElementById('pronunciation-feedback');
    
    userTranscription.textContent = `Dijiste: "${transcript}"`;
    
    // Comparar con la palabra objetivo (case insensitive)
    if (transcript.toLowerCase() === currentPronunciationWord.toLowerCase()) {
        pronunciationScore++;
        feedback.textContent = '¡Correcto! 🎉';
        feedback.className = 'pronunciation-feedback correct';
        document.getElementById('pronunciation-next').disabled = false;
    } else {
        feedback.textContent = 'Incorrecto ❌ Intenta de nuevo';
        feedback.className = 'pronunciation-feedback incorrect';
        // Permitir reintentar
        setTimeout(() => {
            if (!document.getElementById('pronunciation-next').disabled) return;
            feedback.textContent = '¡Intenta de nuevo!';
            feedback.classList.remove('incorrect');
            userTranscription.textContent = '';
        }, 2000);
    }
    
    document.getElementById('pronunciation-score').textContent = `Puntuación: ${pronunciationScore}/${pronunciationTotalQuestions}`;
}

// Alternar escucha
function toggleListening() {
    if (!recognition) return;
    
    if (isListening) {
        recognition.stop();
    } else {
        try {
            recognition.start();
        } catch (error) {
            console.error('Error al iniciar reconocimiento:', error);
        }
    }
}

// Actualizar UI de escucha
function updateListeningUI() {
    const button = document.getElementById('start-listening');
    const status = document.getElementById('listening-status');
    
    if (isListening) {
        button.classList.add('listening');
        button.innerHTML = '<span class="microphone-icon">🔴</span><span>Escuchando...</span>';
        status.textContent = 'Habla ahora...';
    } else {
        button.classList.remove('listening');
        button.innerHTML = '<span class="microphone-icon">🎤</span><span>Haz clic y di la palabra</span>';
        status.textContent = '';
    }
}

// Cambiar pantalla
function showScreen(screenName) {
    // Ocultar todas las pantallas
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla solicitada
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    } else {
        console.error('Pantalla no encontrada:', screenName);
        screens.language.classList.add('active');
    }
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

// Seleccionar nivel de pronunciación
function selectPronunciationLevel(levelName) {
    pronunciationDeck = pronunciationDecks[levelName];
    startPronunciationGame();
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

// Iniciar juego de pronunciación
function startPronunciationGame() {
    pronunciationUsedWords = [];
    pronunciationScore = 0;
    pronunciationTotalQuestions = 0;
    
    showScreen('pronunciationGame');
    nextPronunciationQuestion();
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

// Siguiente pregunta de pronunciación
function nextPronunciationQuestion() {
    const targetWord = document.getElementById('target-word');
    const translation = document.getElementById('translation');
    const nextBtn = document.getElementById('pronunciation-next');
    const scoreElement = document.getElementById('pronunciation-score');
    const progress = document.getElementById('pronunciation-progress');
    const userTranscription = document.getElementById('user-transcription');
    const feedback = document.getElementById('pronunciation-feedback');

    // Resetear
    nextBtn.disabled = true;
    userTranscription.textContent = '';
    feedback.textContent = '';
    feedback.className = 'pronunciation-feedback';

    // Verificar si terminó
    if (pronunciationUsedWords.length >= pronunciationDeck.length) {
        showPronunciationResults();
        return;
    }

    // Obtener palabra aleatoria
    let randomWord;
    do {
        randomWord = pronunciationDeck[Math.floor(Math.random() * pronunciationDeck.length)];
    } while (pronunciationUsedWords.includes(randomWord.word));

    pronunciationUsedWords.push(randomWord.word);
    currentPronunciationWord = randomWord.word;

    // Mostrar palabra y traducción
    targetWord.textContent = randomWord.word;
    translation.textContent = randomWord.translation;

    // Actualizar UI
    pronunciationTotalQuestions++;
    scoreElement.textContent = `Puntuación: ${pronunciationScore}/${pronunciationTotalQuestions}`;
    progress.style.width = `${(pronunciationUsedWords.length / pronunciationDeck.length) * 100}%`;
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

// Mostrar resultados de pronunciación
function showPronunciationResults() {
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = `Puntuación final: ${pronunciationScore}/${pronunciationDeck.length}`;
    showScreen('results');
}

// Volver a selección - FUNCIÓN CORREGIDA
function backToSelection() {
    // Determinar de dónde venimos basado en qué decks están activos
    if (pronunciationDeck.length > 0) {
        // Venimos de pronunciación
        showScreen('englishPronunciation');
    } else if (currentType === 'japanese') {
        showScreen('japaneseDecks');
    } else if (currentType === 'english') {
        showScreen('englishLevels');
    } else {
        // Por defecto, volver al inicio
        showScreen('language');
    }
}
