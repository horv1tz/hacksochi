from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .database import SessionLocal, engine
from .models import Base  # Предполагается, что Base - это declarative base из файла models.py


async def create_tables():
    async with engine.begin() as conn:
        # Создание всех таблиц, определенных в Base.metadata
        await conn.run_sync(Base.metadata.create_all)


async def check_and_create_tables():
    # Создание сессии
    async with SessionLocal() as session:
        # Проверка наличия таблиц, выполняя запрос к базе данных
        # Здесь предполагается, что у вас есть таблица для проверки, например, users
        result = await session.execute(select(1).select_from(Base.metadata.tables['users']))
        if not result.scalars().first():
            # Если таблицы не существуют, создаем их
            await create_tables()

# Вызов функции проверки и создания таблиц
# await check_and_create_tables()
