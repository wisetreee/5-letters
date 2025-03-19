FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальные файлы
COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["/wait-for-postgres.sh", "db", "gunicorn", "-b", "0.0.0.0:5000", "app:app"]