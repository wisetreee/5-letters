import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from dotenv import load_dotenv
from os import getenv


load_dotenv()

API_TOKEN = getenv('TOKEN')
WEB_APP_URL = 'https://t.me/wordlik_bot/wordlik'

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

logging.basicConfig(level=logging.INFO)

@dp.message(commands=['start'])
async def send_welcome(message: types.Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text="Open Mini-App 🚀",
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ])
    
    await message.answer(
        "Welcome! Click the button below to open the Mini-App:",
        reply_markup=keyboard
    )

if __name__ == '__main__':
    logging.info("Bot started")
    dp.run_polling(bot)