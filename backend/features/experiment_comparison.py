# experiment_comparison.py

import json
from collections import Counter

# -------------------------
# Step 1: Fake experiment data
# -------------------------
experiments = [
    {
        "title": "Plant growth in microgravity",
        "organism": "Plant",
        "experiment_type": "Growth",
        "environment": "ISS"
    },
    {
        "title": "Bacteria survival in radiation",
        "organism": "Bacteria",
        "experiment_type": "Radiation",
        "environment": "ISS"
    },
    {
        "title": "Fungi behavior in space",
        "organism": "Fungi",
        "experiment_type": "Behavior",
        "environment": "Moon analog"
    },
    {
        "title": "Human cells exposed to microgravity",
        "organism": "Human",
        "experiment_type": "Cellular",
        "environment": "ISS"
    },
    {
        "title": "Algae growth under Mars-like light",
        "organism": "Algae",
        "experiment_type": "Growth",
        "environment": "Mars analog"
    }
]

# -------------------------
# Step 2: Count experiments per organism
# -------------------------
organisms = [e['organism'] for e in experiments]
organism_counts = Counter(organisms)

print("Experiment counts per organism:")
for organism, count in organism_counts.items():
    print(f"{organism}: {count}")

# -------------------------
# Step 3: Count experiments per type
# -------------------------
types = [e['experiment_type'] for e in experiments]
type_counts = Counter(types)

print("\nExperiment counts per type:")
for exp_type, count in type_counts.items():
    print(f"{exp_type}: {count}")

# -------------------------
# Step 4: Save fake data to JSON for frontend
# -------------------------
with open("fake_experiments.json", "w") as f:
    json.dump(experiments, f, indent=4)

print("\nFake experiment data saved to 'fake_experiments.json'. Frontend can now use this file.")

