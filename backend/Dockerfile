FROM python:3.10-slim

# Отключаем запись .pyc и буферизацию вывода
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Установка системных зависимостей
RUN apt-get update && apt-get install -y gcc supervisor

# Создаём рабочую директорию
WORKDIR /app

# Копируем файл зависимостей и устанавливаем их
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Копируем весь проект в контейнер
COPY . .

# Копируем конфиг supervisord
COPY supervisord.conf /app/supervisord.conf

# Открываем порт (если Flask запускается на 5000)
EXPOSE 5000

# Запускаем supervisord для параллельного запуска app.py и bot.py
CMD [ "supervisord", "-c", "/app/supervisord.conf" ]
