import json
import os
from typing import List, Dict

# === Paths ===
BASE_DIR = os.path.dirname(__file__)
DATA_FILE = os.path.join(BASE_DIR, "..", "data", "fake_experiments.json")
STUDENT_FILE = os.path.join(BASE_DIR, "..", "data", "students.json")
MISSIONS_FILE = os.path.join(BASE_DIR, "..", "data", "missions.json")


# === Data Loading Utilities ===

def load_json(file_path: str) -> List[Dict]:
    """Load data safely from a JSON file."""
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []


def save_json(file_path: str, data: List[Dict]) -> None:
    """Save data safely to a JSON file."""
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


# === Student Section Utilities ===

def load_experiments() -> List[Dict]:
    """Load experiment/publication data from JSON file."""
    return load_json(DATA_FILE)


def get_student_friendly_data() -> List[Dict]:
    """
    Return a simplified version of experiments for students.
    Includes: title, summary (shortened), year, and experiment type.
    """
    experiments = load_experiments()
    simplified = []
    for exp in experiments:
        simplified.append({
            "title": exp.get("title", "Unknown"),
            "summary": exp.get("summary", "")[:200] + "...",
            "year": exp.get("year", "Unknown"),
            "experiment_type": exp.get("experiment_type", "Unknown"),
            "pdf_link": exp.get("pdf_link", "")
        })
    return simplified


def filter_by_experiment_type(exp_type: str) -> List[Dict]:
    """Return only experiments of a given type."""
    experiments = get_student_friendly_data()
    return [exp for exp in experiments if exp["experiment_type"].lower() == exp_type.lower()]


def search_by_keyword(keyword: str) -> List[Dict]:
    """Search experiments by keyword in title or summary."""
    experiments = get_student_friendly_data()
    keyword_lower = keyword.lower()
    return [
        exp for exp in experiments
        if keyword_lower in exp["title"].lower() or keyword_lower in exp["summary"].lower()
    ]


# === NEW: Student & Mission Features ===

def add_student(student_name: str, email: str) -> Dict:
    """
    Register a new student in the system.
    Returns the created student entry.
    """
    students = load_json(STUDENT_FILE)
    student = {
        "id": len(students) + 1,
        "name": student_name,
        "email": email,
        "missions": [],
        "joined_year": 2025
    }
    students.append(student)
    save_json(STUDENT_FILE, students)
    return student


def assign_mission(student_id: int, mission_title: str, description: str) -> Dict:
    """
    Assign a mission or research challenge to a student.
    Returns the mission record.
    """
    students = load_json(STUDENT_FILE)
    missions = load_json(MISSIONS_FILE)

    mission = {
        "id": len(missions) + 1,
        "student_id": student_id,
        "title": mission_title,
        "description": description,
        "status": "assigned"
    }

    # Append to mission log
    missions.append(mission)
    save_json(MISSIONS_FILE, missions)

    # Add mission to student's profile
    for student in students:
        if student["id"] == student_id:
            student["missions"].append(mission)
            break
    save_json(STUDENT_FILE, students)

    return mission


def get_student_data(student_id: int) -> Dict:
    """
    Retrieve a specific student's data (including missions).
    """
    students = load_json(STUDENT_FILE)
    for student in students:
        if student["id"] == student_id:
            return student
    return {"error": "Student not found"}


# === Example Usage (only runs when file is executed directly) ===
if __name__ == "__main__":
    # Sample student section interactions
    print("== Student Section Test ==")
    s = add_student("Amira El-Fahim", "amira@cosmoslab.edu")
    print("Added student:", s)

    m = assign_mission(s["id"], "Microgravity Plant Growth", "Study seed germination in microgravity conditions.")
    print("Assigned mission:", m)

    data = get_student_data(s["id"])
    print("Student profile:", data)


