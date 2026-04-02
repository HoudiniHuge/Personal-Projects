const questions = [
  {
    question: "Who is the king of the gods in Greek mythology?",
    answers: ["Zeus", "Poseidon", "Hades", "Apollo"],
    correct: 0,
  },
  {
    question: "The United States bought Alaska from which country?",
    answers: ["Russia", "Canada", "Mexico", "Japan"],
    correct: 0,
  },
  {
    question: "In what year and in which city were the first modern Olympic Games held?",
    answers: ["1896, Athens", "1900, Paris", "1904, St. Louis", "1908, London"],
    correct: 0,
  },
  {
    question: "What is the scientific term for the “little brain” at the base of the brain that coordinates movement and balance?",
    answers: ["Cerebellum", "Cerebrum", "Hypothalamus", "Thalamus"],
    correct: 0,
  },
  {
    question: "Which company created the first smartphone? ",
    answers: ["IBM", "Apple", "Nokia", "Motorola"],
    correct: 0,
  },
];

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
let questionAnswered = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswerIndex = null;
  questionAnswered = false;
  nextBtn.disabled = true;
  feedback.textContent = "";
  scoreDisplay.textContent = `Score: ${score} / ${questions.length}`;
  showQuestion();
}

function showQuestion() {
  const current = questions[currentQuestionIndex];
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = current.question;
  answersContainer.innerHTML = "";
  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.type = "button";
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(index) {
  if (questionAnswered) return;
  selectedAnswerIndex = index;
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((button, buttonIndex) => {
    button.classList.toggle("selected", buttonIndex === index);
  });
  nextBtn.disabled = false;
}

function showResult() {
  questionAnswered = true;
  const current = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((button, index) => {
    if (index === current.correct) {
      button.classList.add("correct");
    }
    if (index === selectedAnswerIndex && index !== current.correct) {
      button.classList.add("wrong");
    }
  });

  if (selectedAnswerIndex === current.correct) {
    score += 1;
    feedback.textContent = "Nice work! That answer is correct.";
  } else {
    feedback.textContent = `Oops! The correct answer was: ${current.answers[current.correct]}.`;
  }
  scoreDisplay.textContent = `Score: ${score} / ${questions.length}`;
  nextBtn.textContent = currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results";
}

function handleNext() {
  if (!questionAnswered) {
    if (selectedAnswerIndex === null) return;
    showResult();
    return;
  }

  currentQuestionIndex += 1;
  if (currentQuestionIndex < questions.length) {
    questionAnswered = false;
    selectedAnswerIndex = null;
    feedback.textContent = "";
    nextBtn.disabled = true;
    showQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  questionNumber.textContent = "Quiz Complete";
  questionText.textContent = `You finished the quiz with ${score} out of ${questions.length} correct.`;
  answersContainer.innerHTML = "";
  feedback.textContent = "Thanks for playing!";
  nextBtn.disabled = true;
  nextBtn.textContent = "Quiz Finished";
}

nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", startQuiz);

startQuiz();
