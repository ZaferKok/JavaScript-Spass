"use strict";

const QUESTIONS = [
    {
        question: 'How many months have 28 days?',
        a: '2',
        b: '1',
        c: 'All of them',
        d: 'Depends if there is a leap year or not',
        correct: 'c'
    },
    {
        question: 'A farmer has 17 sheep, all of them but 8 die. How many sheep are still standing?',
        a: '8',
        b: '9',
        c: '25',
        d: '35',
        correct: 'a'
    },
    {
        question: 'Divide 30 by half and add ten.',
        a: '40.5',
        b: '50',
        c: '70',
        d: 'I know this is a trick question, so NONE. Ha!',
        correct: 'c'
    },
    {
        question: 'The answer is really big.',
        a: 'THE ANSWER',
        b: 'Really big.',
        c: 'An elephant',
        d: 'The data given is insufficient',
        correct: 'a'
    },
    {
        question: 'There are two clocks of different colors: The red clock is broken and does not run at all, but the blue clock loses one second every 24 hours. Which clock is more accurate?',
        a: 'The red clock.',
        b: 'The blue clock.',
        c: 'Neither.',
        d: 'Both.',
        correct: 'a'
    }
]

const QUESTION = document.querySelector("#question");
const A = document.getElementById("a_choice");
const B = document.getElementById("b_choice");
const C = document.getElementById("c_choice");
const D = document.getElementById("d_choice");
const NEXT = document.querySelector("#submit");
let choices = document.querySelectorAll(".answer");
const exam = document.getElementById("exam");

let point = 0;
let currentQuestion = 0;

function startTest() {

    cancelSelectedAnswer();

    QUESTION.innerText = QUESTIONS[currentQuestion].question;

    A.innerText = QUESTIONS[currentQuestion].a;
    B.innerText = QUESTIONS[currentQuestion].b;
    C.innerText = QUESTIONS[currentQuestion].c;
    D.innerText = QUESTIONS[currentQuestion].d;

}

function checkResult() {
    let userAnswer = undefined;
    choices.forEach((answer) => {
        if (answer.checked) {
            userAnswer = answer.id;
        }
    });
    return userAnswer;
}

function cancelSelectedAnswer(){
    choices.forEach((answer) => {
        answer.checked = false;
    });
}

startTest();

NEXT.addEventListener("click", function () {
    const USERANSWER = checkResult();

    if (QUESTIONS[currentQuestion].correct === USERANSWER) {
        point += 10;
        console.log("Total Point : " + point);
    } else{
        console.log("Still Total Point : " + point);
    }

    if (USERANSWER) {
        currentQuestion++;
        if (currentQuestion < QUESTIONS.length) {
            startTest();
        } else {

            document.querySelector("#list").innerHTML = "";
            document.querySelector("#submit").style.display = "none";
            document.querySelector("#question").innerHTML = "Finished! You have " + (point/10) + "/5 questions correctly answered. Your score is: " + point;

        }
    }
});