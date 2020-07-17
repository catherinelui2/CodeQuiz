//variables
var score = "scores";
var count = 0;
var body = document.querySelector("body");
var startButton = document.querySelector(".start-button");
var header = document.querySelector("header");
var main = document.querySelector("main");
var questionBox = document.querySelector("#question-container");
var choicesBox = document.querySelector("#choices-container");
//questions arrays:
var questions = [
    "Which of the following would you use to for in-line comments?",
    "What is an index?",
    "What is a syntax?",
    "what are variables?",
    "What are strings?"
];

var choices = {
"choicesOne": [
"//",
"\\",
"[]"
],
"choicesTwo": [
"A special variable, which can hold more than one value at a time",
"A special character, which can hold one value",
"A symbol"
],

"choicesThree": [
"A defines two types of values: Fixed values and variable values",
"A value",
"A number type that define values"
],

"choicesFour": [
"Containers for storing data values",
"Containers for storing html values",
"Containers for storing css values"
],

"choicesFive": [
"Are used for storing and manipulating text",
"Are used for storing and manipulating numbers",
"Are used for storing and manipulating integers"
]

}




//loops 
//question loop
function fireQuestions (){
    for (var i = 0; 0<questions.length; i++) {
        body.appendChild(buttonEl);
        buttonEl.textContent = questions[i];
    }
}


// when user clicks start quiz button, clear out existing text in the main and header tag. 
startButton.addEventListener("click", function() {
    main.style.display = "none";
    header.style.display = "none";

});


// the array of questions with mutliple choices pops up

// timer is also set to start 60seconds and counting


//need if then statements to prompt correct/wrong messages when user answers it wrong
//Also need the statement to start collecting scores 




