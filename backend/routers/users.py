from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import HTMLResponse
from uuid import uuid4
import os
from aiogram import Bot, types
from datetime import datetime, timedelta
from schemas.user import UserRegistration
from tokenization.default import Token, hash_password, redis_client, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user
from schemas.user import User

router = APIRouter()
TOKEN = "6760804703:AAFYfy6e9igSPFGNSdjsZZDwRYRxGfFiGs8"
bot = Bot(token=TOKEN)

confirmation_state = {}


@router.post("/send_message/{chat_id}", tags=["Confirmation"])
async def send_message(chat_id: int):
    unique_id = str(uuid4())
    # Предполагаем, что ваш сервер доступен по этому адресу
    confirmation_url = f"http://95.139.92.29:8000/confirm/{unique_id}"
    confirmation_state[unique_id] = False
    return {"message": "Message sent with confirmation link", "unique_id": unique_id}


@router.get("/confirm/{unique_id}", tags=["Confirmation"], response_class=HTMLResponse)
async def confirm(unique_id: str):
    if unique_id in confirmation_state and confirmation_state[unique_id] is False:
        confirmation_state[unique_id] = True
        html_content = """
        <html>
            <head>
                <title>Confirmation</title>
            </head>
            <body>
                <script>
                    window.close();
                </script>
            </body>
        </html>
        """
        return HTMLResponse(content=html_content)
    else:
        raise HTTPException(status_code=404, detail="Invalid or expired unique ID")


@router.get("/status/{unique_id}")
async def check_status(unique_id: str):
    if unique_id in confirmation_state:
        status = "Confirmed" if confirmation_state[unique_id] else "Not confirmed"
        return {"status": status}
    else:
        raise HTTPException(status_code=404, detail="Invalid or expired unique ID")


@router.post("/register", response_model=Token, tags=["User"])
async def register_user(user_data: UserRegistration):
    # В вашем приложении здесь будет логика создания пользователя в базе данных

    # Хешируем пароль перед сохранением в базу данных
    hashed_password = hash_password(user_data.password)

    # Формируем данные пользователя для сохранения в Redis
    user_info = {
        "email": user_data.email,
        "surname": user_data.surname,
        "name": user_data.name,
        "phone": user_data.phone,
        "hashed_password": hashed_password  # Сохраняем хешированный пароль
    }

    # В реальном приложении здесь будет код для сохранения пользователя в базе данных
    # В данном примере мы сохраняем данные пользователя в Redis
    redis_client.set(user_data.email, user_info)

    # Создаем JWT токен для пользователя и возвращаем его клиенту
    access_token = create_access_token(data={"sub": user_data.email},
                                       expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me", response_model=User)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user