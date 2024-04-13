from fastapi import status
from fastapi.responses import JSONResponse
from telebot import TeleBot, types
from uuid import uuid4
import httpx

TOKEN = "6760804703:AAFYfy6e9igSPFGNSdjsZZDwRYRxGfFiGs8"
bot = TeleBot(TOKEN, parse_mode="HTML")

# In-memory dictionary to keep track of the confirmation state
confirmation_state = {}

@bot.callback_query_handler(func=lambda call: call.data.startswith("confirm"))
def button_callback_handler(call):
    unique_id = call.data.split(":")[1]
    # Сделать асинхронный запрос на API для изменения статуса
    bot.answer_callback_query(call.id)
    bot.send_message(call.message.chat.id, 'Обработка подтверждения...')
    confirmation_state[unique_id] = True
    bot.create_task(send_confirmation_to_ip(unique_id, call.message.chat.id, call.message.message_id))

async def send_confirmation_to_ip(unique_id, chat_id, message_id):
    async with httpx.AsyncClient() as client:
        response = await client.get(f'http://95.139.92.29:8000/send_confirmation/{unique_id}')
        if response.status_code == 200:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text="Подтверждение получено!")
        else:
            bot.edit_message_text(chat_id=chat_id, message_id=message_id, text="Ошибка подтверждения!")

@app.post("/send_message/{chat_id}")
async def send_message(chat_id: int):
    unique_id = str(uuid4())
    keyboard = types.InlineKeyboardMarkup()
    button = types.InlineKeyboardButton(text="Подтвердить", callback_data=f'confirm:{unique_id}')
    keyboard.add(button)
    bot.send_message(chat_id, 'Нажмите кнопку для подтверждения', reply_markup=keyboard)
    confirmation_state[unique_id] = False
    return {"message": "Message sent, waiting for user confirmation", "unique_id": unique_id}

@app.get("/send_confirmation/{unique_id}")
async def send_confirmation(unique_id: str):
    if unique_id in confirmation_state and confirmation_state[unique_id]:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"status": "Confirmed"})
    else:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"status": "Not confirmed"})

@app.get("/check_confirmation/{unique_id}")
async def check_confirmation(unique_id: str):
    if confirmation_state.get(unique_id):
        return JSONResponse(status_code=status.HTTP_200_OK, content={"status": "Confirmed"})
    else:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"status": "Not confirmed"})
