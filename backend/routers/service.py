from main import app
# from database import test_connection_to_db

@app.get("/testdb", tags=['!!!SERVICE!!! НЕ ТРОГАЙ ОНО ТЕБЯ СОЖРЁТ'])
async def testdb():
    # return {"message": await test_connection_to_db()}
    return {"message": 'Test'}