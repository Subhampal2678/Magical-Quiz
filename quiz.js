// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
//const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "1.What does HTML stand for?",
        //imgSrc : "html.png",
        choiceA : "Hyper text markup language",
        choiceB : "Hyper text and markup language",
        choiceC : "Hyper tool markup language",
        correct : "A"
    },{
        question : "2.What does CSS stand for?",
        //imgSrc : "css.png",
        choiceA : "Computer style sheet",
        choiceB : "Casecading style sheet",
        choiceC : "Colorful style sheet",
        correct : "B"
    },{
        question : "3.What does JS stand for?",
        //imgSrc : "js.png",
        choiceA : "Java Searching",
        choiceB : "Java Security",
        choiceC : "Java script",
        correct : "C"
      },
      {
      question : "4. Who was the first Indian woman in Space?",
      choiceA:"Kalpana Chawla",
      choiceB:"Sunita Williams",
      choiceC:"Koneru Humpy",
      correct: "A" ,
},
{
    question : "5 What is the full name of RAM",
      choiceA:"READ ONLY MEMORY",
      choiceB:"READ ONE MEMORY",
      choiceC:"READ ALL MANAGEMENT",
      correct: "A" ,
  },
  {
    question : "6. Who built the Jama Masjid?",
      choiceA:"Jahangir",
      choiceB:"Akbar",
      choiceC:"Shah Jahan",
      correct: "C" ,
  },
  {
    question : "7.Who wrote the Indian National Athem?",
      choiceA:"Bakim Chandra Chatterji",
      choiceB:"Rabindranath Tagore",
      choiceC:"Swami Vivekanand",
      correct: "B" ,
  },
  {
    question : "8. Who was the first Indian Scientist to win a Nobel Prize?",
      choiceA:"Hargobind Khorana",
      choiceB:"Amartya Sen",
      choiceC:"CV Raman",
      correct: "C",
  },
  {
    question : "9.Who is the best batsman in the world ?",
      choiceA:"Virat kohli",
      choiceB:"Steve smith",
      choiceC:"Andrew russel",
      correct: "A" ,
  },
  {
    question : "10. how many international goals of lionel messi in football?",
      choiceA:"90",
      choiceB:"68",
      choiceC:"75",
      correct: "B" ,
  }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    //qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "5.png" :
              (scorePerCent >= 60) ? "4.png" :
              (scorePerCent >= 40) ? "3.png" :
              (scorePerCent >= 20) ? "2.png" :
              "1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















