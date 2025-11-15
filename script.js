// Base de datos para reconocimiento de voz
const japaneseDecks = {
    basico: [
        { word: "学校", translation: "gakkou", pronunciation: "gak-koh" },
        { word: "本", translation: "hon", pronunciation: "hohn" },
        { word: "水", translation: "mizu", pronunciation: "mee-zoo" },
        { word: "猫", translation: "neko", pronunciation: "neh-koh" },
        { word: "犬", translation: "inu", pronunciation: "ee-noo" },
        { word: "手", translation: "te", pronunciation: "teh" }
    ],
    intermedio: [
        { word: "伝説", translation: "densetsu", pronunciation: "den-seh-tsoo" },
        { word: "嗜好", translation: "shikou", pronunciation: "shee-koh" },
        { word: "大体", translation: "daitai", pronunciation: "dai-tai" },
        { word: "感触", translation: "kanshoku", pronunciation: "kan-shoh-koo" },
        { word: "狐", translation: "kitsune", pronunciation: "kit-soo-neh" },
        { word: "空", translation: "sora", pronunciation: "soh-rah" }
    ]
};

const englishLevels = {
    a1: [
        { word: "Hello", translation: "hello", pronunciation: "heh-loh" },
        { word: "Goodbye", translation: "goodbye", pronunciation: "good-bye" },
        { word: "Thank you", translation: "thank you", pronunciation: "thank yoo" },
        { word: "Please", translation: "please", pronunciation: "pleez" },
        { word: "Yes", translation: "yes", pronunciation: "yes" },
        { word: "No", translation: "no", pronunciation: "noh" }
    ],
    a2: [
        { word: "House", translation: "house", pronunciation: "howss" },
        { word: "Family", translation: "family", pronunciation: "fam-uh-lee" },
        { word: "Food", translation: "food", pronunciation: "food" },
        { word: "Water", translation: "water", pronunciation: "wah-ter" },
        { word: "Friend", translation: "friend", pronunciation: "frend" },
        { word: "School", translation: "school", pronunciation: "skool" }
    ]
};

// Variables del juego
let currentDeck = [];
let usedWords = [];
let score = 0;
let totalQuestions = 0;
let currentCorrectAnswer = "";
let currentType = "";
let answeredCorrectly = false;
let recognition = null;

// Elementos del DOM
const screens = {
    language: document.getElementById('screen-language'),
    japaneseDecks: document.getElementById('screen-japanese-decks'),
    englishLevels: document.getElementById('screen-english-levels'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results')
};

// Inicializar eventos
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

    // Botones del juego
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('skip-btn').addEventListener('click', skipQuestion);
    document.getElementById('back-to-selection').addEventListener('click', backToSelection);

    // Botón de reconocimiento de voz
    document.getElementById('start-listening').addEventListener('click', startVoiceRecognition);

    // Eventos para mazos y niveles
    document.querySelectorAll('#screen-japanese-decks .deck').forEach(deck => {
        deck.addEventListener('click', function() {
            const deckName = this.getAttribute('data-deck');
            selectDeck(deckName, 'japanese');
        });
    });

    document.querySelectorAll('#screen-english-levels .level').forEach(level => {
        level.addEventListener('click', function() {
            const levelName = this.getAttribute('data-level');
            selectLevel(levelName, 'english');
        });
    });

    // Inicializar reconocimiento de voz si está disponible
    initializeSpeechRecognition();
    
    showScreen('language');
});

// Inicializar reconocimiento de voz
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Por defecto inglés
        
        recognition.onstart = function() {
            document.getElementById('voice-status').textContent = 'Escuchando... Habla ahora';
            document.getElementById('start-listening').classList.add('listening');
        };
        
        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript.toLowerCase().trim();
            document.getElementById('user-speech').textContent = `"${speechResult}"`;
            checkSpeechAnswer(speechResult);
        };
        
        recognition.onerror = function(event) {
            document.getElementById('voice-status').textContent = 'Error: ' + event.error;
            document.getElementById('start-listening').classList.remove('listening');
        };
        
        recognition.onend = function() {
            document.getElementById('start-listening').classList.remove('listening');
            document.getElementById('voice-status').textContent = 'Presiona para hablar de nuevo';
        };
    } else {
        document.getElementById('voice-status').textContent = 'Reconocimiento de voz no soportado en este navegador';
        document.getElementById('start-listening').disabled = true;
    }
}

// Cambiar idioma de reconocimiento
function setRecognitionLanguage(language) {
    if (recognition) {
        recognition.lang = language === 'japanese' ? 'ja-JP' : 'en-US';
    }
}

// Iniciar reconocimiento de voz
function startVoiceRecognition() {
    if (recognition && !answeredCorrectly) {
        document.getElementById('user-speech').textContent = '';
        document.getElementById('user-speech').className = 'user-speech';
        recognition.start();
    }
}

// Verificar respuesta de voz
function checkSpeechAnswer(speech) {
    const userSpeechElement = document.getElementById('user-speech');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    
    // Limpiar y normalizar ambas cadenas para comparación
    const userAnswer = speech.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    const correctAnswer = currentCorrectAnswer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    
    console.log('Usuario dijo:', userAnswer);
    console.log('Respuesta correcta:', correctAnswer);
    
    // Comparación flexible (permite pequeños errores)
    const isCorrect = userAnswer.includes(correctAnswer) || 
                     correctAnswer.includes(userAnswer) ||
                     calculateSimilarity(userAnswer, correctAnswer) > 0.7;
    
    if (isCorrect) {
        // Respuesta correcta
        answeredCorrectly = true;
        score++;
        userSpeechElement.classList.add('correct');
        feedback.textContent = '¡Perfecto! 🎉 Pronunciación correcta';
        feedback.className = 'feedback correct';
        nextBtn.disabled = false;
    } else {
        // Respuesta incorrecta
        userSpeechElement.classList.add('incorrect');
        feedback.textContent = `Intenta de nuevo. Deberías decir: "${currentCorrectAnswer}"`;
        feedback.className = 'feedback incorrect';
    }
    
    document.getElementById('score').textContent = `Puntuación: ${score}/${totalQuestions}`;
}

// Calcular similitud entre cadenas (para comparación flexible)
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
}

// Distancia de edición (Levenshtein)
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

// Funciones de navegación y juego (las mismas que antes, pero adaptadas)
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function selectDeck(deckName, type) {
    currentDeck = japaneseDecks[deckName];
    currentType = type;
    setRecognitionLanguage(type);
    startGame();
}

function selectLevel(levelName, type) {
    currentDeck = englishLevels[levelName];
    currentType = type;
    setRecognitionLanguage(type);
    startGame();
}

function startGame() {
    usedWords = [];
    score = 0;
    totalQuestions = 0;
    answeredCorrectly = false;
    
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = currentType === 'japanese' ? '🎌 Quiz de Voz Japonés' : '🇬🇧 Quiz de Voz Inglés';
    
    showScreen('game');
    nextQuestion();
}

function nextQuestion() {
    resetQuestionState();
    
    if (usedWords.length >= currentDeck.length) {
        showResults();
        return;
    }
    
    let randomWord;
    do {
        randomWord = currentDeck[Math.floor(Math.random() * currentDeck.length)];
    } while (usedWords.includes(randomWord.word));
    
    usedWords.push(randomWord.word);
    currentCorrectAnswer = randomWord.translation;
    
    // Mostrar palabra y ayuda de pronunciación
    document.getElementById('word-display').textContent = randomWord.word;
    document.getElementById('word-display').className = 'word-display ' + currentType;
    document.getElementById('pronunciation-hint').textContent = `Pronunciación: ${randomWord.pronunciation}`;
    
    totalQuestions++;
    document.getElementById('score').textContent = `Puntuación: ${score}/${totalQuestions}`;
    document.getElementById('progress').style.width = `${(usedWords.length / currentDeck.length) * 100}%`;
}

function resetQuestionState() {
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('next-btn').disabled = true;
    document.getElementById('user-speech').textContent = '';
    document.getElementById('user-speech').className = 'user-speech';
    document.getElementById('voice-status').textContent = 'Presiona el botón y habla';
    answeredCorrectly = false;
}

function skipQuestion() {
    if (!answeredCorrectly) {
        document.getElementById('feedback').textContent = `La respuesta era: "${currentCorrectAnswer}"`;
        document.getElementById('feedback').className = 'feedback incorrect';
        document.getElementById('next-btn').disabled = false;
    }
}

function showResults() {
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = `Puntuación final: ${score}/${currentDeck.length}`;
    showScreen('results');
}

function backToSelection() {
    if (currentType === 'japanese') {
        showScreen('japaneseDecks');
    } else {
        showScreen('englishLevels');
    }
}
