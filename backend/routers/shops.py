import pandas as pd
from fuzzywuzzy import process, fuzz
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()

class StoreQuery(BaseModel):
    city_or_district_name: str

def load_data(filepath):
    # Загружаем данные из Excel файла, пропускаем первые две строки и переименовываем столбцы
    df = pd.read_excel(filepath, skiprows=2, header=None)
    df.columns = ['№п/п', 'Наименование города/района', 'Фактический адрес торговых объектов', 'Другие данные']
    return df

def extract_first_address(full_address):
    # Разбиваем строку по запятым и возвращаем первый элемент списка, обрезая лишние пробелы
    return full_address.split(',')[0].strip()

def find_similar_words(base_word, words, threshold=50):
    similar_words = process.extract(base_word, words, limit=10, scorer=fuzz.token_sort_ratio)
    return [word for word, score in similar_words if score >= threshold]

@app.post("/search_stores", response_model=dict)
async def search_stores(query: StoreQuery):
    df = load_data('data/magaz.xlsx')  # Путь к вашему Excel файлу
    district_names = df['Наименование города/района'].tolist()

    similar_districts = find_similar_words(query.city_or_district_name, district_names)
    results = []
    
    for district in similar_districts:
        matched_data = df[df['Наименование города/района'] == district]
        for _, row in matched_data.iterrows():
            results.append({
                "№п/п": row['№п/п'],
                "Наименование города/района": row['Наименование города/района'],
                "Фактический адрес торговых объектов": extract_first_address(row['Фактический адрес торговых объектов'])
            })
    
    return {"message": results}

# Пример вызова функции для проверки, что всё работает
@app.get("/test_load_data")
async def test_load_data():
    data = load_data('./data/magaz.xlsx')
    return JSONResponse(content={"data": data.head().to_dict(orient='records')})