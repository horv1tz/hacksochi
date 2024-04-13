from aiogram import Router
from aiogram import F
import keyboards as kb
from aiogram.types import Message, CallbackQuery

router = Router()


@router.message(F.text == "/start")
async def start(message: Message):
    message_text = "Пожалуйста, подтвердите ваше действие, нажав на кнопку ниже:"
    await message.answer(message_text, reply_markup=kb.start_inline)


@router.callback_query(F.callback == "/start")
async def answer(callback: CallbackQuery):
    await callback.message.answer(callback.data)