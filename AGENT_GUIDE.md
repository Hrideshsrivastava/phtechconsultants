# PH Tech Consultants - Project Context & Agent Guide

## 1. Project Overview
This repository hosts the web platform for **PH Tech Consultants**, focusing on their Learning Management System (LMS) and employability/technical assessments. The platform allows B.Tech students and engineering aspirants to take comprehensive tests simulating industry placement exams.

### Tech Stack
* **Frontend**: React (with Vite), Tailwind CSS for styling.
* **Backend/Database**: Firebase (Firestore) for storing user results and authentication.
* **Routing**: React Router (`react-router-dom`).

---

## 2. LMS Architecture & Data Flow
The core of the LMS is driven dynamically by a local JSON database. There is no backend database for the test *questions* themselves, which ensures extremely fast loading and offline-capable initial renders.

### Key Files & Components:
* **`src/components/lms/data/all_tests.json`**: This is the master database for all tests. Every test is an object in a JSON array. 
    * **Schema**: Every test has `id`, `title`, `targetUsers`, `totalQuestions`, `totalTimeSeconds`, `category`, and `questions` (an array of objects containing `question`, `options`, `answer`, `difficulty`, `section`, and `time_seconds`).
* **`src/components/lms/TestsDashboard.jsx`**: The main entry point for students. 
    * **Navigation**: It filters tests based on the `category` URL search parameter. 
    * **Sub-Menus**: We recently implemented a nested menu logic. If `category === "Technical & Engineering Assessments"`, the dashboard renders a `branchesList` (CSE, ECE, ME) instead of tests. Clicking a branch updates the category parameter to that specific branch (e.g., `Computer Science & Engineering (CSE)`).
* **`src/components/lms/GenericQuiz.jsx`**: The universal engine that renders the tests.
    * **Proctoring**: It enforces strict full-screen mode. If a user changes tabs or exits full-screen (`visibilitychange`, `blur`, `fullscreenchange`), it logs a violation. At 3 violations, the test auto-submits.
    * **Submission**: Calculates a weighted score (Easy=1, Medium=2, Hard=3) and saves the results to Firebase Firestore (`testResults` collection) mapped to the user's UID.
    * **Navigation**: On completion, the "Return to Dashboard" button dynamically routes the user back to the specific branch category they came from.

---

## 3. Recently Added Features (As of August 2026)
We significantly expanded the **Technical & Engineering Assessments** section to include Branch-Specific tests:

1. **Computer Science & Engineering (CSE)**
    * 5 Topics (DSA, DBMS, OS, Computer Networks, Full-Stack).
    * Total Questions: 100.
2. **Electronics & Communication (ECE)**
    * 7 Topics (Digital Electronics, MOSFET, Flip-Flops, Verilog, Microcontrollers, Comm Protocols, Semiconductor Fab).
    * Total Questions: 140.
3. **Mechanical Engineering (ME)**
    * 7 Topics (Solid Mechanics, Thermal/Fluid, Manufacturing, CAD/FEA, Safety, Quality, Operations Research).
    * Total Questions: 140 (Strictly conceptual, no calculations).

**For every branch**, the data is split into:
* 1 **Comprehensive Assessment** (All questions shuffled together).
* Multiple **Individual Subject Tests** (Targeted 20-question practice runs).

---

## 4. Guidelines for AI Agents & Subagents
If you are an AI agent tasked with modifying this project, adhere strictly to these rules:

1. **Adding New Tests**: 
   * Do NOT hardcode new React components for quizzes. 
   * Always write a Python script (using `json` and `random`) to generate and append the new test data into `src/components/lms/data/all_tests.json`.
   * Ensure new questions have a rigorous mix of difficulties (`Easy`, `Medium`, `Hard`) and realistic, unambiguous distractors.
2. **Adding New Branches**:
   * If adding a new branch (e.g., Civil Engineering), you must add its UI tile to the `branchesList` array inside `src/components/lms/TestsDashboard.jsx`.
   * The `category` string in the JSON data must perfectly match the `name` property in the `branchesList`.
3. **Styling Modifications**:
   * Use Tailwind CSS utility classes exclusively. Avoid writing custom CSS in `index.css` unless it involves keyframe animations or custom scrollbars.
4. **Tool Usage**:
   * Use specific tools like `replace_file_content` or `multi_replace_file_content` for surgical React edits.
   * Avoid generic bash commands like `sed` or `cat`.
