
// -get score, enter initials, save to LS

//variables
const SCORE_BOARD_KEY = "scoreBoard";
var score = 0;
var timer = 0;
var timerInterval;
var currentQuestionnaireIndex = 0;

var choiceOneEl = document.querySelector("#button1");
var choiceTwoEl = document.querySelector("#button2");
var choiceThreeEl = document.querySelector("#button3");
var submitScore = document.querySelector("#submitScore");
var rightOrWrongEl = document.querySelector("#right-or-wrong");
var timerEl = document.querySelector("#timer");
var startButton = document.querySelector(".start-button");
var header = document.querySelector("header");
var main = document.querySelector("main");
var questionBox = document.querySelector("#questions-container");
var choicesBox = document.querySelector("#choices-container");
var sectionEl = document.querySelector("section");
var questionnaires = [
    {
        question: "Which of the following would you use to for in-line comments?",
        answers: [
            { text: "//", correct: true },
            { text: "--", correct: false },
            { text: "[]", correct: false },
        ],
    },
    {
        question: "What is an index?",
        answers: [
            {
                text: "A special variable, which can hold more than one value at a time",
                correct: true,
            },
            {
                text: "A special character, which can hold one value",
                correct: false,
            },
            { text: "A symbol", correct: false },
        ],
    },
    {
        question: "What is a syntax?",
        answers: [
            {
                text: "A defines two types of values: Fixed values and variable values",
                correct: true,
            },
            { text: "A value", correct: false },
            { text: "A number type that define values", correct: false },
        ],
    },
    {
        question: "what are variables?",
        answers: [
            { text: "Containers for storing data values", correct: true },
            { text: "Containers for storing html values", correct: false },
            { text: "Containers for storing css values", correct: false },
        ],
    },
    {
        question: "What are strings?",
        answers: [
            {
                text: "Are used for storing and manipulating text",
                correct: true,
            },
            {
                text: "Are used for storing and manipulating numbers",
                correct: false,
            },
            {
                text: "Are used for storing and manipulating integers",
                correct: false,
            },
        ],
    },
];

//question loop
//attach this to the click handler for the start button
function startQuiz() {
    timer = 80;

    function myTimer() {
        timer--;
        timerEl.textContent = timer;
        if (timer <= 0) {
            endGame();
        }
    }
    timerInterval = setInterval(myTimer, 1000);
    displayQuestionnaire();
}

function displayQuestionnaire() {
    var questionnaire = questionnaires[currentQuestionnaireIndex];
    questionBox.innerHTML = questionnaire.question;
    var answers = questionnaire.answers;
    choicesBox.innerHTML = "";
    for (var answer of answers) {
        var buttonEl = document.createElement("button");
        buttonEl.classList.add("btn", "btn-secondary");
        buttonEl.innerText = answer.text;
        buttonEl.value = answer.correct;
        choicesBox.appendChild(buttonEl);
        buttonEl.addEventListener("click", function () {
            var correct = this.value;
            if (correct === "true") {
                rightOrWrongEl.innerText = "That's correct!";
                score++;
            } else {
                rightOrWrongEl.innerText = "That's WRONG!";
                timer -= 5;
            }
            currentQuestionnaireIndex++;
            if (currentQuestionnaireIndex < questionnaires.length) {
                displayQuestionnaire();
            } else {
                endGame();
            }
        });
    }
}

function endGame() {
    clearInterval(timerInterval);
    questionBox.style.display = "none";
    choicesBox.style.display = "none";
    rightOrWrongEl.style.display = "none";
    submitScore.style.display = "block";
    var scoreEl = submitScore.querySelector("#score");
    scoreEl.innerText = "Your Score is: " + score;
    var highestScore = submitScore.querySelector("#highestScore");
    var scoreButton = submitScore.querySelector("#scoreButton");
    var nameInput = submitScore.querySelector("#playerName");
    scoreButton.addEventListener("click", function () {
        var scoreBoardEntry = { userName: nameInput.value, score: score};
        var scoreBoardEntries = localStorage.getItem(SCORE_BOARD_KEY);
        if (scoreBoardEntries) {
            scoreBoardEntries = JSON.parse(scoreBoardEntries);
        } else {
            scoreBoardEntries = [];
        }
        scoreBoardEntries.push(scoreBoardEntry);
        scoreBoardEntries.sort((e1, e2) => e2.score - e1.score);

        localStorage.setItem(SCORE_BOARD_KEY, JSON.stringify(scoreBoardEntries));
        for (var highScoreEntry of scoreBoardEntries){
            var pTag  = document.createElement("p");
            pTag.innerText = "Player Entry: " + highScoreEntry.userName + " score: " + highScoreEntry.score;
            highestScore.appendChild(pTag);
        }
        
    });
}

var clearHighscoreBtn = submitScore.querySelector("#clearHighscoreBtn");
clearHighscoreBtn.addEventListener("click", function(){
    localStorage.removeItem(SCORE_BOARD_KEY);
    highestScore.innerHTML = "";
})

// when user clicks start quiz button, clear out existing text in the main and header tag.
startButton.addEventListener("click", function () {
    main.style.display = "none";
    header.style.display = "none";
    startQuiz();
});

