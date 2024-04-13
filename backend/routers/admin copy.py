from main import app


@app.get('/user/login', tags=["User"])
async def admin():
    return {"message": "Hello Admin"}
