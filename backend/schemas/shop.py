from pydantic import BaseModel


class Shop(BaseModel):
    id: int
    name: str
    address: str
    longitude: float
    latitude: float