// Base de datos de japonés por niveles JLPT
const japaneseDecks = {
    n5: [
        { word: "私", translation: "yo" },
        { word: "あなた", translation: "tú" },
        { word: "人", translation: "persona" },
        { word: "男", translation: "hombre" },
        { word: "女", translation: "mujer" },
        { word: "子", translation: "niño" },
        { word: "先生", translation: "profesor" },
        { word: "学生", translation: "estudiante" },
        { word: "会社", translation: "empresa" },
        { word: "社員", translation: "empleado" },
        { word: "学校", translation: "escuela" },
        { word: "大学", translation: "universidad" },
        { word: "病院", translation: "hospital" },
        { word: "店", translation: "tienda" },
        { word: " restaurant", translation: "restaurante" },
        { word: "駅", translation: "estación" },
        { word: "空港", translation: "aeropuerto" },
        { word: "日本", translation: "Japón" },
        { word: "日本語", translation: "idioma japonés" },
        { word: "英語", translation: "inglés" }
    ],
    n4: [
        { word: "運動", translation: "ejercicio" },
        { word: "試合", translation: "partido" },
        { word: "選手", translation: "atleta" },
        { word: "勝つ", translation: "ganar" },
        { word: "負ける", translation: "perder" },
        { word: "練習", translation: "práctica" },
        { word: "準備", translation: "preparación" },
        { word: "調査", translation: "investigación" },
        { word: "研究", translation: "estudio/investigación" },
        { word: "開発", translation: "desarrollo" },
        { word: "製造", translation: "manufactura" },
        { word: "生産", translation: "producción" },
        { word: "技術", translation: "técnica" },
        { word: "科学", translation: "ciencia" },
        { word: "医学", translation: "medicina" },
        { word: "法律", translation: "ley" },
        { word: "政治", translation: "política" },
        { word: "経済", translation: "economía" },
        { word: "社会", translation: "sociedad" },
        { word: "文化", translation: "cultura" }
    ],
    n3: [
        { word: "確認", translation: "confirmación" },
        { word: "承認", translation: "aprobación" },
        { word: "許可", translation: "permiso" },
        { word: "禁止", translation: "prohibición" },
        { word: "要求", translation: "demanda" },
        { word: "提案", translation: "propuesta" },
        { word: "説明", translation: "explicación" },
        { word: "報告", translation: "reporte" },
        { word: "連絡", translation: "contacto" },
        { word: "相談", translation: "consulta" },
        { word: "議論", translation: "debate" },
        { word: "協力", translation: "cooperación" },
        { word: "競争", translation: "competencia" },
        { word: "成長", translation: "crecimiento" },
        { word: "発展", translation: "desarrollo" },
        { word: "変化", translation: "cambio" },
        { word: "改善", translation: "mejora" },
        { word: "解決", translation: "solución" },
        { word: "成功", translation: "éxito" },
        { word: "失敗", translation: "fracaso" }
    ],
    n2: [
        { word: "実施", translation: "implementación" },
        { word: "実行", translation: "ejecución" },
        { word: "運用", translation: "operación" },
        { word: "管理", translation: "gestión" },
        { word: "統制", translation: "control" },
        { word: "調整", translation: "ajuste" },
        { word: "対応", translation: "respuesta" },
        { word: "処置", translation: "tratamiento" },
        { word: "処分", translation: "disposición" },
        { word: "処罰", translation: "castigo" },
        { word: "救済", translation: "alivio" },
        { word: "補償", translation: "compensación" },
        { word: "保障", translation: "garantía" },
        { word: "保険", translation: "seguro" },
        { word: "契約", translation: "contrato" },
        { word: "取引", translation: "transacción" },
        { word: "商談", translation: "negociación comercial" },
        { word: "交渉", translation: "negociación" },
        { word: "協議", translation: "consulta" },
        { word: "会談", translation: "entrevista" }
    ],
    n1: [
        { word: "顕著", translation: "notable" },
        { word: "著明", translation: "distinguido" },
        { word: "卓越", translation: "excelencia" },
        { word: "秀逸", translation: "sobresaliente" },
        { word: "非凡", translation: "extraordinario" },
        { word: "特異", translation: "peculiar" },
        { word: "異例", translation: "inusual" },
        { word: "空前", translation: "sin precedentes" },
        { word: "画期", translation: "revolucionario" },
        { word: "革新的", translation: "innovador" },
        { word: "先駆的", translation: "pionero" },
        { word: "先進的", translation: "avanzado" },
        { word: "先端的", translation: "de vanguardia" },
        { word: "精緻", translation: "elaborado" },
        { word: "緻密", translation: "detallado" },
        { word: "精巧", translation: "intrincado" },
        { word: "繊細", translation: "delicado" },
        { word: "微妙", translation: "sutil" },
        { word: "微妙", translation: "delicado" },
        { word: "不可欠", translation: "indispensable" }
    ],
    kanji: [
        { word: "愛", translation: "amor" },
        { word: "夢", translation: "sueño" },
        { word: "希望", translation: "esperanza" },
        { word: "勇気", translation: "coraje" },
        { word: "幸せ", translation: "felicidad" },
        { word: "平和", translation: "paz" },
        { word: "自由", translation: "libertad" },
        { word: "正義", translation: "justicia" },
        { word: "真理", translation: "verdad" },
        { word: "知識", translation: "conocimiento" },
        { word: "智慧", translation: "sabiduría" },
        { word: "経験", translation: "experiencia" },
        { word: "記憶", translation: "memoria" },
        { word: "意識", translation: "conciencia" },
        { word: "感情", translation: "emoción" },
        { word: "感覚", translation: "sensación" },
        { word: "直感", translation: "intuición" },
        { word: "運命", translation: "destino" },
        { word: "偶然", translation: "coincidencia" },
        { word: "必然", translation: "necesidad" }
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
            console.log('Comenzando a escuchar...');
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            console.log('Palabra detectada:', transcript);
            console.log('Palabra objetivo:', currentPronunciationWord.toLowerCase());
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
            console.log('Dejó de escuchar');
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
    const nextBtn = document.getElementById('pronunciation-next');
    
    userTranscription.textContent = `Dijiste: "${transcript}"`;
    userTranscription.style.display = 'block';
    
    console.log('Comparando:', transcript, 'con', currentPronunciationWord.toLowerCase());
    
    // Comparar con la palabra objetivo (case insensitive y más flexible)
    const normalizedTranscript = transcript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const normalizedTarget = currentPronunciationWord.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    
    console.log('Normalizado - Dijiste:', normalizedTranscript, 'Objetivo:', normalizedTarget);
    
    if (normalizedTranscript === normalizedTarget) {
        pronunciationScore++;
        feedback.textContent = '¡Correcto! 🎉 Pronunciación perfecta';
        feedback.className = 'pronunciation-feedback correct';
        feedback.style.display = 'block';
        nextBtn.disabled = false;
        console.log('¡Respuesta correcta!');
    } else {
        feedback.textContent = `Incorrecto ❌ Dijiste "${transcript}" pero es "${currentPronunciationWord}"`;
        feedback.className = 'pronunciation-feedback incorrect';
        feedback.style.display = 'block';
        console.log('Respuesta incorrecta');
        
        // Permitir reintentar después de 2 segundos
        setTimeout(() => {
            if (!nextBtn.disabled) return; // Si ya se activó el botón siguiente, no hacer nada
            feedback.textContent = '¡Intenta de nuevo!';
            feedback.classList.remove('incorrect');
            userTranscription.textContent = '';
            userTranscription.style.display = 'none';
        }, 3000);
    }
    
    // Actualizar puntuación inmediatamente
    pronunciationTotalQuestions = Math.max(pronunciationTotalQuestions, pronunciationUsedWords.length);
    document.getElementById('pronunciation-score').textContent = `Puntuación: ${pronunciationScore}/${pronunciationTotalQuestions}`;
    
    console.log('Puntuación actual:', pronunciationScore, '/', pronunciationTotalQuestions);
}

// Alternar escucha
function toggleListening() {
    if (!recognition) {
        console.error('Reconocimiento de voz no disponible');
        return;
    }
    
    if (isListening) {
        recognition.stop();
        console.log('Deteniendo reconocimiento...');
    } else {
        try {
            // Resetear UI antes de empezar
            document.getElementById('user-transcription').textContent = '';
            document.getElementById('user-transcription').style.display = 'none';
            document.getElementById('pronunciation-feedback').textContent = '';
            document.getElementById('pronunciation-feedback').style.display = 'none';
            document.getElementById('listening-status').textContent = 'Escuchando...';
            
            recognition.start();
            console.log('Iniciando reconocimiento...');
        } catch (error) {
            console.error('Error al iniciar reconocimiento:', error);
            document.getElementById('listening-status').textContent = 'Error al iniciar micrófono';
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
        status.style.color = '#e94560';
    } else {
        button.classList.remove('listening');
        button.innerHTML = '<span class="microphone-icon">🎤</span><span>Haz clic y di la palabra</span>';
        status.textContent = 'Presiona el botón para hablar';
        status.style.color = '#b0b0b0';
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
    
    // Resetear UI
    document.getElementById('user-transcription').textContent = '';
    document.getElementById('user-transcription').style.display = 'none';
    document.getElementById('pronunciation-feedback').textContent = '';
    document.getElementById('pronunciation-feedback').style.display = 'none';
    document.getElementById('pronunciation-next').disabled = true;
    
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
    userTranscription.style.display = 'none';
    feedback.textContent = '';
    feedback.style.display = 'none';
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
    pronunciationTotalQuestions = pronunciationUsedWords.length;
    scoreElement.textContent = `Puntuación: ${pronunciationScore}/${pronunciationTotalQuestions}`;
    progress.style.width = `${(pronunciationUsedWords.length / pronunciationDeck.length) * 100}%`;
    
    console.log('Nueva palabra:', currentPronunciationWord);
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

// Volver a selección
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
