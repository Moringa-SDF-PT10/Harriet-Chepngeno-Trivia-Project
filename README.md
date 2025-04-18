# 🧠 Trivia Time!

## 📝 Description
**Trivia Time!** is a single-page application (SPA) built with HTML, CSS, and JavaScript for Moringa School SDF-PT10's Phase 1 Project. It integrates the Open Trivia DB API to deliver an interactive general knowledge quiz. Users can start the quiz, answer five multiple-choice questions, receive immediate feedback, view their score, review incorrect answers, and restart or exit the quiz. The app features a responsive design, animations, a loading spinner, a progress bar, keyboard navigation, and rate limit handling for a robust user experience.

## 📑 Table of Contents
- [🧠 Trivia Time!](#-trivia-time)
  - [📝 Description](#-description)
  - [📑 Table of Contents](#-table-of-contents)
  - [🌐 Live Demo](#-live-demo)
  - [✨ Features](#-features)
  - [⚙️ Installation](#️-installation)
  - [🚀 Usage](#-usage)
  - [💡 Technologies](#-technologies)
  - [📸 Screenshots](#-screenshots)
    - [🟢 Start Screen](#-start-screen)
    - [🔄 Quiz in Progress](#-quiz-in-progress)
    - [🏁 Final Score \& Review](#-final-score--review)
  - [🤝 Contributing](#-contributing)
  - [👥 Credits](#-credits)
  - [📄 License](#-license)


## 🌐 Live Demo
[Play Trivia Time!](https://moringa-sdf-pt10.github.io/Harriet-Chepngeno-Trivia-Project/)

## ✨ Features
- **Start Screen**: Engaging welcome screen with quiz icon and settings form.
- **Customizable Quiz Settings**: Choose number of questions, category (e.g., History, Science), difficulty (Easy, Medium, Hard), and question type (Multiple Choice or True/False).
- **Question Navigation**:
  - One question displayed at a time.
  - **Next Question** button to move forward after submitting an answer.
- **Timers**:
  - **Per-Question Timer**: Countdown clock for each question.
  - **Total Time Tracker**: Displays the total time taken to complete the quiz.
- **Multiple-Choice Questions**: Pulled from the Open Trivia DB API (default to General Knowledge).
- **Immediate Feedback**: Green check (✅) for correct and red cross (❌) for incorrect answers, shown after a 1-second delay.
- **Progress Visualization**:
  - Progress bar shows quiz completion status (e.g., "2 of 5").
- **End Screen**:
  - Final score display (e.g., "4 out of 5").
  - Review of incorrect answers with correct ones.
  - Restart or exit options.
- **Keyboard Navigation**: Use Enter to submit answers and navigate.
- **Rate Limit Handling**: Automatically retries API requests (up to 3 attempts, 5-second delay).
- **Loading Spinner**: Appears while fetching questions.
- **Responsive Design**: Optimized for all screen sizes.
- **Visual Enhancements**: Background image, fade animations, and semi-transparent answer highlights.
- **Accessibility**: ARIA roles (`aria-live`) for screen readers.
- **Footer Toggle**: Automatically hides during quiz for better focus.
  

## ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:Moringa-SDF-PT10/Harriet-Chepngeno-Trivia-Project.git
   ```

2. Navigate to the project directory
   
   ```bash
   cd harriet-chepngeno-trivia-project
   ```

3. Open **index.html** in a browser or deploy via GitHub Pages.

## 🚀 Usage

- Open the app in a browser.
- On the **Start Screen**, customize your quiz by:
  - Selecting the number of questions (e.g., 5, 10).
  - Choosing a category (e.g., General Knowledge, History, etc.).
  - Picking difficulty level (Easy, Medium, Hard).
  - Selecting question type (Multiple Choice or True/False).
- Click **Start Quiz** to begin.
- For each question:
  - A **countdown timer** starts. Answer before time runs out!
  - Select your answer using radio buttons.
  - Click **Submit Answer** to lock in your response.
  - Get immediate feedback (✅ correct / ❌ incorrect).
  - After a 1-second delay, click **Next Question** to continue.
- Throughout the quiz:
  - A **progress bar** shows how far you've gone.
  - A **total timer** tracks how long the full quiz takes.
- At the end:
  - See your final score (e.g., "3 out of 5").
  - See the total time taken to complete the quiz
  - Review a summary of incorrect answers with correct ones.
- Click **Restart Quiz** to play again with new questions or **Exit** to return to the Start Screen.
  
## 💡 Technologies
- HTML
- CSS
- JavaScript
- Open Trivia DB API

## 📸 Screenshots

### 🟢 Start Screen
![Start Screen](/assets/Start-Screen.png)

### 🔄 Quiz in Progress
![Quiz](/assets/Quiz.png)

### 🏁 Final Score & Review
![Score](/assets/End-Screen.png)

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## 👥 Credits
- Developer: Harriet Chepngeno
- Institution: Moringa School SDF-PT10
- API: Open Trivia DB
- Guidance: Moringa School instructors

## 📄 License
This project is licensed under the MIT License.
