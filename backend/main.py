from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers.neurolink import router as neurilink_router
from routers.uploadimg import router as image_router

app = FastAPI()

# app.include_router(users_router)
app.include_router(neurilink_router)
app.include_router(image_router)
app.mount("/img", StaticFiles(directory="static"), name="static")
