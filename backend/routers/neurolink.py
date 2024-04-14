import pandas as pd
from fuzzywuzzy import process, fuzz
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

router = APIRouter()

class Photo(BaseModel):
    title: str

def load_data(filepath):
    # Загружаем данные из Excel файла
    return pd.read_excel(filepath)

def find_similar_words(base_word, words, threshold=50):
    similar_words = process.extract(base_word, words, limit=10, scorer=fuzz.token_sort_ratio)
    return [word for word, score in similar_words if score >= threshold]

@router.post("/check_photo", tags=['Нейросеть'], response_model=dict)
async def check_photo(photo: Photo):
    df = load_data('data/price.xlsx')  # Укажите здесь путь к вашему Excel файлу
    product_names = df['Название'].tolist()  # Замените 'Название' на название соответствующей колонки в вашем файлеa

    similar_words = find_similar_words(photo.title, product_names)
    results = []
    
    for word in similar_words:
        matched_data = df[df['Название'] == word]  # Замените 'Название' на название соответствующей колонки в вашем файле
        for _, row in matched_data.iterrows():
            results.append({
                "Название": row['Название'],  # Название продукта
                "Цена": row['Цена'],  # Цена продукта
                "Категория": row['Категория']  # Категория продукта
            })
    
    return {"message": results}

print(load_data('./data/price.xlsx'))