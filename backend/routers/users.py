from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from uuid import uuid4
import os
from  aiogram import Bot, types

router = APIRouter()

TOKEN = "6760804703:AAFYfy6e9igSPFGNSdjsZZDwRYRxGfFiGs8"
bot = Bot(token=TOKEN)

confirmation_state = {}


@router.post("/send_message/{chat_id}")
async def send_message(chat_id: int):
    unique_id = str(uuid4())
    # Предполагаем, что ваш сервер доступен по этому адресу
    confirmation_url = f"http://95.139.92.29:8000/confirm/{unique_id}"
    keyboard = types.InlineKeyboardMarkup()
    button = types.InlineKeyboardButton("Подтвердить действие", url=confirmation_url)
    keyboard.add(button)
    message_text = "Пожалуйста, подтвердите ваше действие, нажав на кнопку ниже:"
    await bot.send_message(chat_id, text=message_text, reply_markup=keyboard)
    confirmation_state[unique_id] = False
    return {"message": "Message sent with confirmation link", "unique_id": unique_id}


@router.get("/confirm/{unique_id}", response_class=HTMLResponse)
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
