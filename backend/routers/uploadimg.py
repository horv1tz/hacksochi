from fastapi import APIRouter, File, UploadFile
import shutil

router = APIRouter()

@router.post("/upload-image/", tags=['Нейросеть'])
async def upload_image(file: UploadFile = File(...)):
    with open(f'static/{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename}
