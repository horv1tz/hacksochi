# Используем официальный базовый образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /code

# Устанавливаем переменные окружения для Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Устанавливаем системные зависимости
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && apt-get clean

# Обновляем pip
RUN pip install --upgrade pip

# Копируем файлы зависимостей
COPY ./requirements.txt /code/requirements.txt

# Устанавливаем зависимости Python
RUN pip install -r requirements.txt

# Копируем все файлы проекта в рабочую директорию
COPY . /code/

# Открываем порт 8000 для внешнего мира
EXPOSE 8000

# Команда для запуска приложения
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
