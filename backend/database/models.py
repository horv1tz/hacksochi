from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from sqlalchemy.ext.declarative import declarative_base

# Класс базовой модели
Base = declarative_base()

# Модель для таблицы с продуктами
class Product(Base):
    __tablename__ = 'product'
    id_product = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    cost = Column(Integer, nullable=False)
    measure = Column(String(50), nullable=False)

# Модель для таблицы с админами
class Admin(Base):
    __tablename__ = 'admins'
    id_admin = Column(Integer, primary_key=True)
    surname = Column(String(50), nullable=False)
    name = Column(String(50), nullable=False)
    root = Column(Boolean, nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)

# Модель для таблицы с задачами для админов
class AdminTask(Base):
    __tablename__ = 'adminstasks'
    id_task = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    confirm = Column(Boolean, nullable=False)
    id_shop = Column(Integer, ForeignKey('shops.id_shop'), nullable=False)
    id_admin = Column(Integer, ForeignKey('admins.id_admin'), nullable=False)
    id_product = Column(Integer, ForeignKey('product.id_product'), nullable=False)
    shop = relationship("Shop", back_populates="tasks")
    admin = relationship("Admin")
    product = relationship("Product")


# Модель для таблицы с магазинами
class Shop(Base):
    __tablename__ = 'shops'
    id_shop = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    address = Column(String(50), nullable=False)
    tasks = relationship("AdminTask", back_populates="shop")

# Модель для таблицы с обычными пользователями
class User(Base):
    __tablename__ = 'users'
    id_users = Column(Integer, primary_key=True)
    surname = Column(String(50), nullable=False)
    name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
