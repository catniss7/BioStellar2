import json
import os
from typing import List, Dict, Any
from collections import Counter

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

def generate_mission_insights(mission_id: str) -> Dict[str, Any]:
    """
    Generate simple mission insights for a given mission_id.
    This is a prototype using fake data.
    """
    experiments = load_experiment_data()

    # Filter experiments for the mission (for prototype, just select all)
    mission_experiments = [exp for exp in experiments if exp.get("mission_id") == mission_id]

    # If none found, return all as fallback
    if not mission_experiments:
        mission_experiments = experiments

    # Count experiment types
    types = [exp.get("experiment_type", "Unknown") for exp in mission_experiments]
    type_counts = dict(Counter(types))

    # Count organisms
    organisms = [exp.get("organism", "Unknown") for exp in mission_experiments]
    organism_counts = dict(Counter(organisms))

    # Count environments
    environments = [exp.get("environment", "Unknown") for exp in mission_experiments]
    environment_counts = dict(Counter(environments))

    insights = {
        "mission_id": mission_id,
        "total_experiments": len(mission_experiments),
        "experiment_types_summary": type_counts,
        "organisms_summary": organism_counts,
        "environments_summary": environment_counts,
        "top_experiment": mission_experiments[0].get("title", "Unknown") if mission_experiments else None
    }

    return insights

# Example usage
if __name__ == "__main__":
    mission_id = "mission_001"
    insights = generate_mission_insights(mission_id)
    print(json.dumps(insights, indent=2))

