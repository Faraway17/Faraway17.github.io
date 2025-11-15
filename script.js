// Mazos de vocabulario
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
let usedWords = [];
let score = 0;
let totalQuestions = 0;
let currentCorrectAnswer = "";

// Elementos del DOM
const screens = {
    decks: document.getElementById('screen-decks'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results')
};

// Cambiar pantalla
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Seleccionar mazo
function selectDeck(deckName) {
    currentDeck = decks[deckName];
    usedWords = [];
    score = 0;
    totalQuestions = 0;
    showScreen('game');
    nextQuestion();
}

// Siguiente pregunta
function nextQuestion() {
    const japaneseWord = document.getElementById('japanese-word');
    const options = document.getElementById('options');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const scoreElement = document.getElementById('score');
    const progress = document.getElementById('progress');

    // Resetear
    feedback.textContent = '';
    feedback.className = 'feedback';
    nextBtn.disabled = true;

    // Verificar si terminó
    if (usedWords.length >= currentDeck.length) {
        showResults();
        return;
    }

    // Obtener palabra aleatoria
    let randomWord;
    do {
        randomWord = currentDeck[Math.floor(Math.random() * currentDeck.length)];
    } while (usedWords.includes(randomWord.japanese));

    usedWords.push(randomWord.japanese);
    currentCorrectAnswer = randomWord.spanish;

    // Mostrar palabra japonesa
    japaneseWord.textContent = randomWord.japanese;

    // Generar opciones
    const allOptions = [randomWord.spanish];
    while (allOptions.length < 4) {
        const randomOption = currentDeck[Math.floor(Math.random() * currentDeck.length)].spanish;
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

// Volver a mazos
function backToDecks() {
    showScreen('decks');
}

// Iniciar en pantalla de mazos
showScreen('decks');
