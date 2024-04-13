from pydantic import BaseModel


class Admin(BaseModel):
    id: int
    root: bool | None = False
    surname: str
    name: str
    phone: str
    email: str
    password: str
    active: bool | None = True
    id_telegram: int