from fastapi import FastAPI
# from routers.users import router as users_router
from routers.neurolink import router as neurilink_router

app = FastAPI()

# app.include_router(users_router)
app.include_router(neurilink_router)
