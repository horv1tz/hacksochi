from pydantic import BaseModel


class Neurolink(BaseModel):
    name: str
    cost: float
