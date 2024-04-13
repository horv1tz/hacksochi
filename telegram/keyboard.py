from aiogram.types import (InlineKeyboardMarkup, InlineKeyboardButton)

start_inline = [
    [InlineKeyboardButton(text="Подтвердить действие", callback_data="confirmation")]]
inventory_kb = InlineKeyboardMarkup(inline_keyboard=start_inline)
