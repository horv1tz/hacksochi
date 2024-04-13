from pydantic import BaseModel


class User(BaseModel):
    id: int
    id_telegram: int | None = None
    surname: str
    name: str
    phone: str
    email_verified: bool | None = False
    phone_verified: bool | None = False
    email: str
    password: str


class UserOutput(BaseModel):
    id: int
    id_telegram: int | None = None
    surname: str
    name: str
    phone: str
    email_verified: bool
    phone_verified: bool
    email: str
