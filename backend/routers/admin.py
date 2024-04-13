from main import app

@app.get('/admin/login', tags=["admin"])
async def admin():
    return {"message": "Hello Admin"}