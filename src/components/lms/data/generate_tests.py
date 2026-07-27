import json
import random
import os

with open('/home/hridesh/Documents/coding_linux/webdev/phtechconsultants/src/components/lms/data/questions_clean.json', 'r') as f:
    question_bank = json.load(f)

# Normalize keys for easier matching
normalized_bank = {k.lower().strip(): k for k in question_bank.keys()}

tests = [
    {
        "id": "employability",
        "title": "Employability Assessment",
        "targetUsers": "College Students, Fresh Graduates",
        "sections": {
            "Personal Goal Settings": {"Easy": 4, "Medium": 2, "Hard": 1},
            "Self Awareness": {"Easy": 4, "Medium": 2, "Hard": 1},
            "Listening Skills": {"Easy": 4, "Medium": 2, "Hard": 1},
            "Barriers to Communication": {"Easy": 4, "Medium": 2, "Hard": 1},
            "Facing Interview": {"Easy": 5, "Medium": 3, "Hard": 0},
            "Online Interview": {"Easy": 3, "Medium": 2, "Hard": 1}
        }
    },
    {
        "id": "communication_excellence",
        "title": "Communication Excellence Assessment",
        "targetUsers": "Professionals, Teachers, Customer Support",
        "sections": {
            "What is Communication": {"Easy": 5, "Medium": 3, "Hard": 0},
            "Types of Communication": {"Easy": 5, "Medium": 3, "Hard": 0},
            "Non-Verbal Communication": {"Easy": 5, "Medium": 2, "Hard": 0},
            "Listening Skills": {"Easy": 5, "Medium": 3, "Hard": 2},
            "Barriers to Communication": {"Easy": 5, "Medium": 3, "Hard": 1}
        }
    },
    {
        "id": "interview_readiness",
        "title": "Interview Readiness Assessment",
        "targetUsers": "Job Seekers",
        "sections": {
            "Facing Interview": {"Easy": 8, "Medium": 5, "Hard": 0},
            "Online Interview": {"Easy": 6, "Medium": 4, "Hard": 1},
            "Nervousness and Discomfort": {"Easy": 8, "Medium": 0, "Hard": 0},
            "Non-Verbal Communication": {"Easy": 4, "Medium": 2, "Hard": 0},
            "Listening Skills": {"Easy": 4, "Medium": 2, "Hard": 1}
        }
    },
    {
        "id": "personal_development",
        "title": "Personal Development Assessment",
        "targetUsers": "Students, Working Professionals",
        "sections": {
            "Self Awareness": {"Easy": 6, "Medium": 4, "Hard": 1},
            "Personal Goal Settings": {"Easy": 5, "Medium": 3, "Hard": 1},
            "Power of Positive Attitude": {"Easy": 6, "Medium": 4, "Hard": 0},
            "Ways to Motivate Oneself": {"Easy": 6, "Medium": 4, "Hard": 1}
        }
    },
    {
        "id": "motivation_success",
        "title": "Motivation & Success Assessment",
        "targetUsers": "Students",
        "sections": {
            "Motivational Trainings Contents": {"Easy": 8, "Medium": 5, "Hard": 0},
            "Power of Positive Attitude": {"Easy": 7, "Medium": 5, "Hard": 0},
            "Ways to Motivate Oneself": {"Easy": 8, "Medium": 4, "Hard": 1},
            "Personal Goal Settings": {"Easy": 5, "Medium": 3, "Hard": 1}
        }
    },
    {
        "id": "leadership_workplace",
        "title": "Leadership & Workplace Skills Assessment",
        "targetUsers": "Team Leads, Managers",
        "sections": {
            "Self Awareness": {"Easy": 5, "Medium": 4, "Hard": 1},
            "Listening Skills": {"Easy": 5, "Medium": 3, "Hard": 2},
            "Types of Behavior": {"Easy": 6, "Medium": 5, "Hard": 0},
            "Communication Barriers": {"Easy": 4, "Medium": 3, "Hard": 1},
            "Positive Attitude": {"Easy": 5, "Medium": 3, "Hard": 0}
        }
    },
    {
        "id": "entrepreneurship",
        "title": "Entrepreneurship Assessment",
        "targetUsers": "Aspiring Entrepreneurs",
        "sections": {
            "Concept of Entrepreneurship": {"Easy": 6, "Medium": 3, "Hard": 0},
            "Qualities of Good Entrepreneur": {"Easy": 6, "Medium": 2, "Hard": 0},
            "SWOT and Risk Analysis": {"Easy": 6, "Medium": 2, "Hard": 0},
            "Marketing Mix": {"Easy": 5, "Medium": 2, "Hard": 0},
            "Methods of Marketing": {"Easy": 5, "Medium": 2, "Hard": 0},
            "Funding Options for Entrepreneurship": {"Easy": 6, "Medium": 3, "Hard": 0},
            "Process of Setting up a Business": {"Easy": 5, "Medium": 2, "Hard": 0}
        }
    },
    {
        "id": "marketing_fundamentals",
        "title": "Marketing Fundamentals Assessment",
        "targetUsers": "Business Students",
        "sections": {
            "What is a Market": {"Easy": 6, "Medium": 2, "Hard": 0},
            "Marketing Mix": {"Easy": 6, "Medium": 2, "Hard": 0},
            "Methods of Marketing": {"Easy": 5, "Medium": 2, "Hard": 0},
            "Publicity & Advertisement": {"Easy": 5, "Medium": 3, "Hard": 0},
            "Productivity Benefits": {"Easy": 8, "Medium": 6, "Hard": 2}
        }
    },
    {
        "id": "workplace_communication",
        "title": "Workplace Communication Assessment",
        "targetUsers": "Corporate Employees",
        "sections": {
            "What is Communication": {"Easy": 5, "Medium": 3, "Hard": 0},
            "Types of Communication": {"Easy": 5, "Medium": 4, "Hard": 0},
            "Listening Skills": {"Easy": 5, "Medium": 3, "Hard": 2},
            "Barriers to Communication": {"Easy": 5, "Medium": 3, "Hard": 1},
            "Types of Behavior": {"Easy": 5, "Medium": 4, "Hard": 0}
        }
    },
    {
        "id": "career_readiness",
        "title": "Complete Career Readiness Certification",
        "targetUsers": "Final-Year Students, Placement Preparation",
        "sections": {
            "Personal Goal Settings": {"Easy": 5, "Medium": 3, "Hard": 1},
            "Self Awareness": {"Easy": 5, "Medium": 3, "Hard": 1},
            "Positive Attitude": {"Easy": 5, "Medium": 4, "Hard": 0},
            "Ways to Motivate Oneself": {"Easy": 5, "Medium": 3, "Hard": 1},
            "Listening Skills": {"Easy": 5, "Medium": 3, "Hard": 2},
            "Barriers to Communication": {"Easy": 5, "Medium": 3, "Hard": 1},
            "Facing Interview": {"Easy": 8, "Medium": 5, "Hard": 0},
            "Online Interview": {"Easy": 6, "Medium": 4, "Hard": 1},
            "Types of Communication": {"Easy": 5, "Medium": 3, "Hard": 0},
            "What is Communication": {"Easy": 5, "Medium": 3, "Hard": 0}
        }
    }
]

random.seed(42)

generated_tests = []
for test in tests:
    test_questions = []
    total_time_seconds = 0
    total_questions = 0
    
    for section, difficulties in test["sections"].items():
        norm_section = section.lower().strip()
        actual_section = normalized_bank.get(norm_section)
        
        # Handle fuzzy matching manually if needed
        if not actual_section:
            if norm_section == "positive attitude":
                actual_section = normalized_bank.get("power of positive attitude")
            elif norm_section == "communication barriers":
                actual_section = normalized_bank.get("barriers to communication")
        
        if not actual_section:
            print(f"WARNING: Section '{section}' not found!")
            continue
            
        for difficulty, count in difficulties.items():
            if count > 0:
                available = question_bank.get(actual_section, {}).get(difficulty, [])
                if len(available) < count:
                    print(f"WARNING: Not enough {difficulty} questions for {actual_section}. Wanted {count}, found {len(available)}")
                    selected = available
                else:
                    selected = random.sample(available, count)
                
                for q in selected:
                    q_copy = q.copy()
                    q_copy["difficulty"] = difficulty
                    q_copy["section"] = actual_section
                    
                    if difficulty == "Easy":
                        time_allowed = 30
                    elif difficulty == "Medium":
                        time_allowed = 40
                    elif difficulty == "Hard":
                        time_allowed = 60
                        
                    q_copy["time_seconds"] = time_allowed
                    total_time_seconds += time_allowed
                    
                    test_questions.append(q_copy)
                    total_questions += 1

    random.shuffle(test_questions)

    generated_tests.append({
        "id": test["id"],
        "title": test["title"],
        "targetUsers": test["targetUsers"],
        "totalQuestions": total_questions,
        "totalTimeSeconds": total_time_seconds,
        "questions": test_questions
    })

with open('/home/hridesh/Documents/coding_linux/webdev/phtechconsultants/src/components/lms/data/all_tests.json', 'w') as f:
    json.dump(generated_tests, f, indent=4)
print("Success!")
