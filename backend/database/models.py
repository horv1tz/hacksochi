from sqlalchemy import Column, Integer, String, Boolean, Date, Numeric, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id_users = Column(Integer, primary_key=True, autoincrement=True)
    surname = Column(String(50), nullable=False)
    name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(50), nullable=False)
    emailVerified = Column(Boolean, nullable=True)
    phoneVerified = Column(Boolean, nullable=True)
    password = Column(String(50), nullable=False)
    id_telegram = Column(Integer, nullable=True)


class Shop(Base):
    __tablename__ = 'shops'
    id_shop = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    adress = Column(String(50), nullable=False)
    longitude = Column(Numeric, nullable=False)
    latitude = Column(Numeric, nullable=False)
    admintasks = relationship("Admintasks", back_populates="shop")


class Product(Base):
    __tablename__ = 'products'
    id_product = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    cost = Column(Integer, nullable=False)
    measure = Column(Integer, nullable=False)


class Admin(Base):
    __tablename__ = 'admins'
    id_admin = Column(Integer, primary_key=True, autoincrement=True)
    surname = Column(String(50), nullable=False)
    name = Column(String(50), nullable=False)
    root = Column(Boolean, nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    is_active = Column(Boolean, nullable=False)
    id_telegram = Column(Integer, nullable=False)


class AdminsTask(Base):
    __tablename__ = 'adminstasks'
    id_task = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, nullable=False)
    confirm = Column(Boolean, nullable=False)
    pathto1 = Column(String(50), nullable=False)
    pathto2 = Column(String(50), nullable=False)
    id_shop = Column(Integer, ForeignKey('shops.id_shop'), nullable=False)
    id_admin = Column(Integer, ForeignKey('admins.id_admin'), nullable=False)
    id_product = Column(Integer, ForeignKey('product.id_product'), nullable=False)
    id_users = Column(Integer, ForeignKey('users.id_users'), nullable=False)
    orders = relationship("Shops", back_populates="admintasks")
