from pydantic import BaseModel


# measure = {"штука" = 0, "кг" = 1, "грамм" = 2}
class Product(BaseModel):
    id: int
    name: str
    price: float
    measure: int
