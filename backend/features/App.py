from flask import Flask, jsonify, request
from flask_cors import CORS
from features.experiment_comparison import compare_experiments, load_experiment_data
from features.mission_insight import generate_mission_insights
from features.student_section import add_student, assign_mission, get_student_data

app = Flask(__name__)
CORS(app)

# 🧪 Experiment Comparison
@app.route("/api/compare", methods=["POST"])
def api_compare():
    data = request.get_json()
    exp1_path = data.get("exp1_path")
    exp2_path = data.get("exp2_path")
    metrics = data.get("metrics", [])
    try:
        exp1 = load_experiment_data(exp1_path)
        exp2 = load_experiment_data(exp2_path)
        comparison = compare_experiments(exp1, exp2, metrics)
        return jsonify(comparison)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🚀 Mission Insights
@app.route("/api/mission_insight/<mission_id>", methods=["GET"])
def api_mission_insight(mission_id):
    try:
        insights = generate_mission_insights(mission_id)
        return jsonify(insights)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 👩‍🎓 Student Section
@app.route("/api/student", methods=["POST"])
def api_add_student():
    data = request.get_json()
    student = add_student(data["name"], data["email"])
    return jsonify(student)

@app.route("/api/student/<int:student_id>/assign", methods=["POST"])
def api_assign_mission(student_id):
    data = request.get_json()
    mission_name = data["mission"]
    updated = assign_mission(student_id, mission_name)
    if updated:
        return jsonify(updated)
    return jsonify({"error": "Student not found"}), 404

@app.route("/api/student/<int:student_id>", methods=["GET"])
def api_get_student(student_id):
    student = get_student_data(student_id)
    if student:
        return jsonify(student)
    return jsonify({"error": "Student not found"}), 404

@app.route("/")
def index():
    return jsonify({"message": "🚀 Biostellar API is running!"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
