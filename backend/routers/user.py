from main import app
from fastapi import  HTTPException, status
from fastapi.responses import JSONResponse
from telebot import TeleBot, types
from uuid import uuid4

TOKEN = "6760804703:AAFYfy6e9igSPFGNSdjsZZDwRYRxGfFiGs8"
bot = TeleBot(TOKEN, parse_mode="HTML")

# In-memory dictionary to keep track of the confirmation state
confirmation_state = {}

@bot.callback_query_handler(func=lambda call: call.data.startswith("confirm"))
def button_callback_handler(call):
    unique_id = call.data.split(":")[1]
    confirmation_state[unique_id] = True
    bot.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text="Подтверждение получено!")
    bot.answer_callback_query(call.id)
    print(confirmation_state)

@app.get("/send_message/{chat_id}")
async def send_message(chat_id: int):
    try:
        unique_id = str(uuid4())
        keyboard = types.KeyboardMarkup()
        button = types.KeyboardButton(text="Подтвердить", callback_data=f'confirm:{unique_id}')
        keyboard.add(button)
        bot.send_message(chat_id, 'Нажмите кнопку для подтверждения', reply_markup=keyboard)
        confirmation_state[unique_id] = False
        return {"message": "Message sent, waiting for user confirmation", "unique_id": unique_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/change_status/{unique_id}')
async def change_status(unique_id: str):
    pass

@app.get("/check_confirmation/{unique_id}")
async def check_confirmation(unique_id: str):
    if confirmation_state.get(unique_id):
        return JSONResponse(status_code=status.HTTP_200_OK, content={"status": "Confirmed"})
    else:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"status": "Not confirmed"})


# Run the application using async
# if __name__ == '__main__':
#     application.run_polling()


@app.get('/user/login', tags=["User"])
async def user_login():
    return {"message": "Hello Usei"}