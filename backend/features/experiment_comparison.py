import json
import os
from typing import List, Dict, Any

# Path to the fake experiments JSON
FAKE_EXPERIMENTS_FILE = os.path.join(
    os.path.dirname(__file__), "..", "data", "fake_experiments.json"
)

def load_experiment_data() -> List[Dict[str, Any]]:
    """
    Load all fake experiments from the JSON file.
    Returns a list of experiments.
    """
    with open(FAKE_EXPERIMENTS_FILE, "r", encoding="utf-8") as f:
        experiments = json.load(f)
    return experiments

def compare_experiments(exp_id_1: int, exp_id_2: int, metrics: List[str] = []) -> Dict[str, Any]:
    """
    Compare two experiments by their index (exp_id_1, exp_id_2).
    Metrics can include: "year", "organism", "experiment_type", etc.
    Returns a dictionary with comparison results.
    """
    experiments = load_experiment_data()

    try:
        exp1 = experiments[exp_id_1]
        exp2 = experiments[exp_id_2]
    except IndexError:
        return {"error": "Experiment ID out of range."}

    comparison = {}
    for metric in metrics:
        comparison[metric] = {
            "exp1": exp1.get(metric, "Unknown"),
            "exp2": exp2.get(metric, "Unknown"),
            "match": exp1.get(metric) == exp2.get(metric)
        }

    return {
        "exp1_title": exp1.get("title", "Unknown"),
        "exp2_title": exp2.get("title", "Unknown"),
        "comparison": comparison
    }

# Example usage:
if __name__ == "__main__":
    # Compare the first two experiments for year and organism
    result = compare_experiments(0, 1, metrics=["year", "organism", "experiment_type"])
    print(json.dumps(result, indent=2))
