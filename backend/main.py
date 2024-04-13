from fastapi import FastAPI
from database import test_connection_to_db
from database.function import add_user   
app = FastAPI()

@app.get("/registration", tags=['User'])
async def registration_user():
    await add_user(
        'иванов', 
        'иван', 
        'hello@world.ru',
        '79953990480',
        'pizda'
        )
    return {"message": "Hello World"}

@app.get("/testdb", tags=['НЕ ТРОГАЙ ОНО ТЕБЯ СОЖРЁТ'])
async def testdb():
    return {"message": await test_connection_to_db()}

