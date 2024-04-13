from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from models import User
from schemas.user import UserOutput, User
import os

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
session = SessionLocal()

# Функция для проверки подключения базы данных
class UserCrud:
    @staticmethod
    def add(user: object) -> UserOutput:
        user = session.query(User).filter(User.id == user.id).first()
        if user is not None:
            session.close()
            return False
        else:
            add_user = User(surname=user.surname, name=user.name, email=user.email, password=user.password,
                            phone=user.phone)
            session.add(add_user)
            session.commit()
            output = UserOutput(id=add_user.id, surname=add_user.surname, name=add_user.name, email=add_user.email,
                                phone=add_user.phone, email_verified=add_user.email_verified,
                                phone_verified=add_user.phone_verified)
            session.close()
            return output
