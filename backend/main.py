from fastapi import FastAPI
from database import test_connection_to_db

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/testdb")
async def testdb():
    return {"message": await test_connection_to_db()}
