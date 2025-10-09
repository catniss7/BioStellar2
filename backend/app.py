from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
# from features.experiment_comparison import compare_experiments, load_experiment_data
# from features.mission_insight import generate_mission_insights
# from features.student_section import add_student, assign_mission, get_student_data

app = FastAPI(title="Biostellar API", description="🚀 Biostellar API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response validation
class CompareRequest(BaseModel):
    exp1_path: str
    exp2_path: str
    metrics: List[str] = []

class StudentCreate(BaseModel):
    name: str
    email: str

class MissionAssign(BaseModel):
    mission: str

# 🧪 Experiment Comparison
@app.post("/api/compare")
async def api_compare(data: CompareRequest):
    try:
        exp1 = load_experiment_data(data.exp1_path)
        exp2 = load_experiment_data(data.exp2_path)
        comparison = compare_experiments(exp1, exp2, data.metrics)
        return comparison
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🚀 Mission Insights
@app.get("/api/mission_insight/{mission_id}")
async def api_mission_insight(mission_id: str):
    try:
        insights = generate_mission_insights(mission_id)
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 👩‍🎓 Student Section
@app.post("/api/student")
async def api_add_student(data: StudentCreate):
    student = add_student(data.name, data.email)
    return student

@app.post("/api/student/{student_id}/assign")
async def api_assign_mission(student_id: int, data: MissionAssign):
    updated = assign_mission(student_id, data.mission)
    if updated:
        return updated
    raise HTTPException(status_code=404, detail="Student not found")

@app.get("/api/student/{student_id}")
async def api_get_student(student_id: int):
    student = get_student_data(student_id)
    if student:
        return student
    raise HTTPException(status_code=404, detail="Student not found")

@app.get("/")
async def index():
    return {"message": "🚀 Biostellar API is running!"}


from my_library import app as library_app
from ai_main import app as ai_app
app.mount("/library", library_app)
app.mount("/chat", ai_app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)