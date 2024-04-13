from pydantic import BaseModel



class AdminDatabase(BaseModel):
    id: int
    surname: str
    name: str
    email: str
    phone: str
    password: str
    id_telegram: int
    is_active: bool | None = True
    root: bool | None = False


class AdminTask(BaseModel):
    id: int
    id_user: int
    id_admin: int
    id_shop: int
    id_product: int


class AdminOutput(BaseModel):
    id: int
    surname: str
    name: str
    email: str
    phone: str
    id_telegram: int
    is_active: bool
    root: bool

      
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

