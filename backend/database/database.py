from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
import os 

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

# Функция для проверки подключения базы данных
async def test_connection_to_db():
    async with SessionLocal() as session:
        try:
            # Пробуем выполнить простой запрос
            await session.execute(select(1))
            return "Подключение к базе данных успешно установлено."
        except SQLAlchemyError as e:
            return f"Ошибка подключения к базе данных: {e}"