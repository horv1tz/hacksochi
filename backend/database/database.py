from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from sqlalchemy.orm import backref

DATABASE_URL = "postgresql+asyncpg://postgres:example@localhost:5432/internetshop"

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

Base = declarative_base()

# Модели
class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey('categories.id'), nullable=True)
    name = Column(String, unique=True, nullable=False)
    children = relationship("Category", backref=backref('parent', remote_side=[id]), lazy="dynamic")
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    name = Column(String, index=True)
    description = Column(JSON, nullable=True)
    price = Column(Float, nullable=False)
    category = relationship("Category", back_populates="products")

# Функции для управления базой данных
async def create_category(session: AsyncSession, name: str, parent_id: int = None):
    new_category = Category(name=name, parent_id=parent_id)
    session.add(new_category)
    await session.commit()
    return new_category

async def get_categories(session: AsyncSession):
    async with session() as session:
        result = await session.execute(select(Category))
        categories = result.scalars().all()
        return categories

async def create_product(session: AsyncSession, name: str, category_id: int, description: dict, price: float):
    new_product = Product(name=name, category_id=category_id, description=description, price=price)
    session.add(new_product)
    await session.commit()
    return new_product

async def get_product(session: AsyncSession, product_id: int):
    async with session() as session:
        result = await session.execute(select(Product).where(Product.id == product_id))
        product = result.scalars().first()
        return product

async def update_product(session: AsyncSession, product_id: int, **kwargs):
    async with session() as session:
        result = await session.execute(select(Product).where(Product.id == product_id))
        product = result.scalars().first()
        if product:
            for key, value in kwargs.items():
                setattr(product, key, value)
            await session.commit()
            return product
        return None

async def delete_product(session: AsyncSession, product_id: int):
    async with session() as session:
        result = await session.execute(select(Product).where(Product.id == product_id))
        product = result.scalars().first()
        if product:
            await session.delete(product)
            await session.commit()
            return True
        return False

# Функция для проверки подключения
async def test_connection_to_db():
    async with SessionLocal() as session:
        try:
            # Пробуем выполнить простой запрос
            await session.execute(select(1))
            return "Подключение к базе данных успешно установлено."
        except SQLAlchemyError as e:
            return f"Ошибка подключения к базе данных: {e}"
