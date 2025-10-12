import json
import os
from typing import List, Dict

# Path to the JSON file with summaries (or fake experiments)
DATA_FILE = os.path.join(
    os.path.dirname(__file__), "..", "data", "fake_experiments.json"
)

def load_experiments() -> List[Dict]:
    """Load experiment/publication data from JSON file."""
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def get_student_friendly_data() -> List[Dict]:
    """
    Return a simplified version of the experiments for students.
    For example: only title, summary (shortened), year, and experiment type.
    """
    experiments = load_experiments()
    simplified = []
    for exp in experiments:
        simplified.append({
            "title": exp.get("title", "Unknown"),
            "summary": exp.get("summary", "")[:200] + "...",  # first 200 chars
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

# Example usage
if __name__ == "__main__":
    all_data = get_student_friendly_data()
    print("Student-friendly data:", all_data[:3])  # show first 3
    filtered = filter_by_experiment_type("space biology")
    print("Filtered experiments:", filtered)
    searched = search_by_keyword("phosphoprotein")
    print("Search results:", searched)

