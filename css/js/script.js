// =====================
// TAB SWITCHING - FIXED
// =====================
function showTab(id, btn) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  // Show the selected section
  document.getElementById(id).classList.add('active');
  
  // Add active class to the clicked button
  btn.classList.add('active');
}

// =====================
// QUIZ QUESTIONS
// To edit a question:
//   q       = the question text
//   opts    = the 4 answer choices [A, B, C, D]
//   ans     = index of correct answer (0=A, 1=B, 2=C, 3=D)
//   feedback = explanation shown after answering
// =====================
const questions = [
  {
    q: "How much water should you store per person per day in an emergency kit?",
    opts: ["Half a gallon", "1 gallon", "2 gallons", "3 gallons"],
    ans: 1,
    feedback: "FEMA recommends storing at least 1 gallon of water per person per day for at least 3 days."
  },
  {
    q: "What should you do FIRST when you feel an earthquake?",
    opts: ["Run outside immediately", "Stand in a doorway", "Drop, Cover, and Hold On", "Call 911"],
    ans: 2,
    feedback: "Drop to your hands and knees, take cover under a sturdy desk or table, and hold on until shaking stops."
  },
  {
    q: "During a tornado, where is the safest place to shelter?",
    opts: ["Near windows to watch the storm", "On the top floor of a building", "In an interior room on the lowest floor", "In your car"],
    ans: 2,
    feedback: "An interior room on the lowest floor (away from windows) provides the best protection during a tornado."
  },
  {
    q: "For how many days should your emergency food and water supply last at minimum?",
    opts: ["1 day", "2 days", "3 days", "7 days"],
    ans: 2,
    feedback: "FEMA recommends at least a 3-day supply of food and water for emergencies."
  },
  {
    q: "What is the recommended way to communicate during a major disaster when phone lines are overloaded?",
    opts: ["Make repeated phone calls", "Send text messages", "Use social media live video", "Honk your car horn"],
    ans: 1,
    feedback: "Text messages use less network bandwidth and are more likely to get through when voice calls fail."
  },
  {
    q: "What does 'shelter-in-place' mean during a hazardous materials (hazmat) incident?",
    opts: ["Evacuate as fast as possible", "Stay indoors and seal doors/windows", "Go to the nearest hospital", "Stand on your roof"],
    ans: 1,
    feedback: "Shelter-in-place means staying inside a building and sealing it to prevent contaminated air from entering."
  },
  {
    q: "Which of the following is the MOST important item to include in a first aid kit?",
    opts: ["Extra clothing", "Bandages and antiseptic", "A flashlight", "A map"],
    ans: 1,
    feedback: "Bandages and antiseptic are critical for treating wounds, which are common in disaster situations."
  },
  {
    q: "What should you do BEFORE entering your home after a disaster?",
    opts: ["Turn all lights on immediately", "Check for gas leaks and structural damage", "Call your insurance company first", "Clean up debris inside"],
    ans: 1,
    feedback: "Always check for gas leaks and structural damage before entering, as these pose serious safety risks."
  },
  {
    q: "Who should you designate as your emergency contact person?",
    opts: ["A neighbor next door", "Someone who lives out of town", "Your local fire station", "A coworker"],
    ans: 1,
    feedback: "An out-of-town contact is best because local phone lines may be overloaded, but long-distance calls often work."
  },
  {
    q: "How often should you practice your family emergency plan?",
    opts: ["Once, when you make it", "Every 6 months", "Only before hurricane season", "Every 5 years"],
    ans: 1,
    feedback: "Practicing every 6 months ensures all family members remember the plan and it stays updated."
  }
];

// =====================
// QUIZ STATE
// =====================
let current = 0;
let score = 0;
let answered = false;

// =====================
// RENDER QUESTION
// =====================
function renderQuestion() {
  const q = questions[current];
  const letters = ['A', 'B', 'C', 'D'];

  document.getElementById('quizCounter').textContent = `Question ${current + 1} of ${questions.length}`;
  document.getElementById('progressFill').style.width = `${((current + 1) / questions.length) * 100}%`;
  document.getElementById('nextBtn').classList.remove('show');
  answered = false;

  let html = `
    <div class="question-card">
      <div class="question-num">Question ${current + 1}</div>
      <div class="question-text">${q.q}</div>
      <div class="options">
        ${q.opts.map((o, i) => `
          <button class="option-btn" id="opt${i}" onclick="selectAnswer(${i})">
            <span class="option-letter">${letters[i]}</span>${o}
          </button>
        `).join('')}
      </div>
      <div class="feedback-box" id="feedbackBox"></div>
    </div>
  `;

  document.getElementById('questionArea').innerHTML = html;
}

// =====================
// SELECT ANSWER
// =====================
function selectAnswer(idx) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const feedback = document.getElementById('feedbackBox');

  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

  if (idx === q.ans) {
    score++;
    document.getElementById('opt' + idx).classList.add('correct');
    feedback.className = 'feedback-box show correct';
    feedback.innerHTML = `✅ Correct! ${q.feedback}`;
  } else {
    document.getElementById('opt' + idx).classList.add('wrong');
    document.getElementById('opt' + q.ans).classList.add('correct');
    feedback.className = 'feedback-box show wrong';
    feedback.innerHTML = `❌ Incorrect. ${q.feedback}`;
  }

  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.classList.add('show');
  nextBtn.textContent = current < questions.length - 1 ? 'Next Question →' : 'See Results →';
}

// =====================
// NEXT QUESTION
// =====================
function nextQuestion() {
  if (!answered) {
    alert("Please select an answer before proceeding!");
    return;
  }
  
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// =====================
// SHOW RESULT
// =====================
function showResult() {
  document.getElementById('questionArea').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('quizCounter').style.display = 'none';
  document.querySelector('.quiz-progress-bar').style.display = 'none';
  document.querySelector('.quiz-meta').style.display = 'none';

  const pct = Math.round((score / questions.length) * 100);
  document.getElementById('resultCard').classList.add('show');
  document.getElementById('resultScore').textContent = `${pct}%`;

  let msg = '';
  let color = '';

  if (pct >= 90) {
    msg   = "Outstanding! You are well-prepared and have excellent knowledge of disaster response.";
    color = 'var(--green)';
  } else if (pct >= 70) {
    msg   = "Good job! You have a solid understanding. Review the infographics to strengthen any weak areas.";
    color = 'var(--orange)';
  } else {
    msg   = "Keep learning! Review the videos and infographics, then retake the quiz to improve your score.";
    color = 'var(--red)';
  }

  document.getElementById('resultScore').style.color = color;
  document.getElementById('resultMsg').textContent = msg;
}

// =====================
// RESTART QUIZ
// =====================
function restartQuiz() {
  current  = 0;
  score    = 0;
  answered = false;

  document.getElementById('questionArea').style.display = 'block';
  document.getElementById('nextBtn').style.display = '';
  document.getElementById('quizCounter').style.display = '';
  document.querySelector('.quiz-progress-bar').style.display = '';
  document.querySelector('.quiz-meta').style.display = '';
  document.getElementById('resultCard').classList.remove('show');
  document.getElementById('scoreDisplay').textContent = 'Score: 0';

  renderQuestion();
}

// =====================
// INITIALISE QUIZ
// =====================
renderQuestion();
