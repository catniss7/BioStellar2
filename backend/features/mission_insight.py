
# mission_insight.py
import json
from collections import defaultdict

# -------------------------
# Step 1: Load fake experiment data
# -------------------------
with open("data/fake_experiments.json", "r") as f:
    experiments = json.load(f)

# -------------------------
# Step 2: Group experiments by environment/mission
# -------------------------
mission_dict = defaultdict(list)
for exp in experiments:
    mission_dict[exp["environment"]].append(exp)

# -------------------------
# Step 3: Generate mission insights
# -------------------------
mission_insights = []

for mission, exps in mission_dict.items():
    insight = {
        "mission": mission,
        "num_experiments": len(exps),
        "organisms_studied": list({e["organism"] for e in exps}),
        "experiment_types": list({e["experiment_type"] for e in exps}),
        "knowledge_gaps": "TBD"  # placeholder for prototype
    }
    mission_insights.append(insight)

# -------------------------
# Step 4: Save insights to JSON
# -------------------------
with open("data/mission_insights.json", "w") as f:
    json.dump(mission_insights, f, indent=4)

print("Mission insights generated and saved to 'data/mission_insights.json'.")
print("\nSample output:")
for insight in mission_insights:
    print(insight)
