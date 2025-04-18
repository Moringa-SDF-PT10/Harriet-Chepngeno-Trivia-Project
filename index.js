document.addEventListener("DOMContentLoaded", function () {
    // Selecting elements
    const startBtn = document.getElementById("start-btn");
    const startScreen = document.getElementById("start-screen");
    const questionSection = document.getElementById("question-section");
    const questionText = document.getElementById("question-text");
    const answerForm = document.getElementById("answers-form");
    const feedback = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");
    const endScreen = document.getElementById("end-screen");
    const scoreDisplay = document.getElementById("score-display");
    const restartBtn = document.getElementById("restart-btn");
    const exitBtn = document.getElementById("exit-btn");
    const reviewSection = document.getElementById("review-section");
    const footer = document.getElementById("footer");

    //Validate DOM elements
    if (!startBtn || !startScreen || !questionSection || !questionText || !answerForm || !feedback || !nextBtn || !endScreen || !scoreDisplay || !restartBtn || !exitBtn || !reviewSection || !footer) {
        console.error("One or more required DOM elements are missing:", {
            startBtn, startScreen, questionSection, questionText, answerForm, feedback, nextBtn, endScreen, scoreDisplay, restartBtn, exitBtn, reviewSection,footer
        });
        return;
    }

    // accessibility 
    feedback.setAttribute("aria-live","assertive");
    questionSection.setAttribute("aria-live", "polite");

    // keyboard navigation

    answerForm.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !nextBtn.disabled){
            e.preventDefault(); // prevent form submission
            nextBtn.click();
        }
    })

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;
    let questions = [];
    let incorrectAnswers = []

     // Start quiz when Start button is clicked
    startBtn.addEventListener("click", () => {
        startScreen.classList.add("hide"); // hide the start screen
        footer.classList.add("hide"); // Hide the footer
        fetchQuestions(); // load qsns from API
    });

    // function for fetching qsn from the Trivia API
    function fetchQuestions() {
        questionText.textContent = "Loading questions...";
        questionSection.classList.remove("hide")
        questionSection.classList.add("loading");
        nextBtn.disabled = true; // disabled next button during loading time.
        //questionSection.classList.remove("loading")

        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
            .then(response => response.json())
            .then(data => {
                if (!data.results || data.results.length === 0) {
                    console.error("No questions returned from API.");
                    questionText.textContent = "No questions available. Please try again.";
                    questionSection.classList.remove("loading");
                    questionSection.classList.remove("hide");
                    return;
                }
                // initialize quiz data
                questions = data.results;
                currentQuestionIndex = 0;
                score = 0;
                answered = false;
                incorrectAnswers = []; // Reset incorrect answers for new quiz
                showQuestion(); // display the first qsn
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
                questionText.textContent = "Failed to load questions. Please try again.";
                questionSection.classList.remove("loading");
                questionSection.classList.remove("hide");
            });
    }

    // display a qsn and its answers
    function showQuestion() {
        if (!questionText || !answerForm || !feedback || !nextBtn) {
            console.error("Required DOM elements missing in showQuestion:", { questionText, answerForm, feedback, nextBtn });
            return;
        }
        if (!questions || !questions[currentQuestionIndex]) {
            console.error("No valid question available at index:", currentQuestionIndex);
            questionText.textContent = "No questions available.";
            questionSection.classList.remove("loading");
            questionSection.classList.remove("hide");
            return;
        }

        // reset answer form and UI
        answered = false;
        const currentQuestion = questions[currentQuestionIndex];

        questionSection.classList.remove("hide");
        questionSection.classList.remove("loading"); // remove loading spinner.
        nextBtn.classList.remove("hide");
        nextBtn.textContent = "Submit Answer";
        nextBtn.disabled = true;
        feedback.classList.remove("correct", "wrong"); // added this to reset feedback classes
        feedback.textContent = "";
        footer.classList.add("hide"); // Ensure footer is hidden during questions

        questionText.textContent = decodeHtml(currentQuestion.question);
        answerForm.innerHTML = "";

        // combine correct and incorrect answers and shuffle
        const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffleAnswers = allAnswers.sort(() => Math.random() - 0.5);

        // render each answer as a radio button with a label

        shuffleAnswers.forEach((answer, index) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.value = answer;
            input.id = `answer-${index}`;
            input.classList.add("answer-option");

            // handle answer selection
            input.addEventListener("change", () => {
                const allLabels = answerForm.querySelectorAll("label");
                allLabels.forEach(label => label.classList.remove("selected"));
                label.classList.add("selected");
                nextBtn.disabled = false;
            });

            label.setAttribute("for", `answer-${index}`);
            label.appendChild(input);
            label.appendChild(document.createTextNode(decodeHtml(answer)));
            answerForm.appendChild(label);
        });

        //  progress bar

        let progressBar = questionSection.querySelector(".progress-bar");
        if (!progressBar) {
            progressBar = document.createElement("div");
            progressBar.classList.add("progress-bar");
            const barFill = document.createElement("div");
            barFill.classList.add("progress-fill");
            progressBar.appendChild(barFill);
            questionSection.prepend(progressBar);
        }
        const progressPercentage =( (currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.querySelector(".progress-fill").style.width = `${progressPercentage}%`;
        progressBar.title =  `Question ${currentQuestionIndex + 1} of ${questions.length}`;

        // show qsn progress
        let progress = questionSection.querySelector(".progress")
        if (!progress){
            progress =document.createElement("p");
            progress.classList.add("progress");
            questionSection.prepend(progress);
        }
        progress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    }

    //decode html entities from the API

    function decodeHtml(html) {
        const text = document.createElement("textarea");
        text.innerHTML = html;
        return text.value;
    }

    // handle answer submission and qsn progression
    nextBtn.addEventListener("click", () => {

        const selectedOption = document.querySelector('input[name="answer"]:checked');

        if (!answered) {
            // ensure user selects an answer
            if (!selectedOption) {
                alert("Please select an answer!");
                return;
            }

            const answer = selectedOption.value;
            const correctAnswer = questions[currentQuestionIndex].correct_answer;

            // provide visual feeback on answers

            const allOptions = document.querySelectorAll('input[name="answer"]');
            allOptions.forEach(option => {
                if (option.value === correctAnswer) {
                    option.parentElement.classList.add("correct");
                } else if (option.checked && option.value !== correctAnswer) {
                    option.parentElement.classList.add("wrong");
                }
                option.disabled = true; // disable options after submission
            });

            // show feedback text

            if (answer === correctAnswer) {
                feedback.textContent = "✅ Correct!"
                feedback.classList.remove("wrong") // remove wrong class if present
                feedback.classList.add("correct") // add correct class
                score++; //increment scores if correct 
            }else {
                feedback.textContent = `❌ Oops! The correct answer was: ${decodeHtml(correctAnswer)}`;
                feedback.classList.remove("correct") // remove class if present
                feedback.classList.add("wrong")// add wrong class
             // Store incorrect answer for review
                incorrectAnswers.push({
                question: questions[currentQuestionIndex].question,
                selected: answer,
                correct: correctAnswer
               });
               }

               // adding delay before updating button and allowing nxt qsn

               setTimeout(() => {
                nextBtn.textContent = "Next Question"; // update button to next
                answered = true;
                
               }, 1000); // a second delay

        } else {
            // move to the next qsn or show final scores
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }
    });

    // display final score
    function showScore() {
        questionSection.classList.add("hide");
        endScreen.classList.remove("hide");
        footer.classList.remove("hide"); // Show footer on end screen
        scoreDisplay.textContent = `${score} out of ${questions.length}`;

        // Show review of incorrect answers

        if (!reviewSection) {
             console.error("Review section element is missing.");
             return;
            }

        reviewSection.innerHTML = "";
        if (incorrectAnswers.length > 0) {
            const reviewTitle = document.createElement("h3");
            reviewTitle.textContent = "Review Incorrect Answers";
            reviewSection.appendChild(reviewTitle);
            incorrectAnswers.forEach((item, index) => {
                const reviewItem = document.createElement("div");
                reviewItem.classList.add("review-item");
                reviewItem.innerHTML = `
                    <p><strong>Question ${index + 1}:</strong> ${decodeHtml(item.question)}</p>
                    <p><strong>Your Answer:</strong> ${decodeHtml(item.selected)} (Incorrect)</p>
                    <p><strong>Correct Answer:</strong> ${decodeHtml(item.correct)}</p>
                `;
                reviewSection.appendChild(reviewItem);
            });
        } else {
            const noReview = document.createElement("p");
            noReview.textContent = "Perfect! No incorrect answers.";
            reviewSection.appendChild(noReview);
        }

}

    // restart the quiz
    restartBtn.addEventListener("click", () => {
        score = 0;
        currentQuestionIndex = 0;
        answered = false;
        feedback.textContent = "";
        endScreen.classList.add("hide");
        footer.classList.add("hide"); // Hide footer when restarting
        fetchQuestions();
    });

    // exit to the start screen
    exitBtn.addEventListener("click", () => {
        questionSection.classList.add("hide");
        endScreen.classList.add("hide");
        startScreen.classList.remove("hide");
        footer.classList.remove("hide"); // Show footer on start screen
    });
});