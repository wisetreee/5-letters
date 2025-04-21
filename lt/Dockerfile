# Используем Node.js как базовый образ
FROM node:18-alpine

# Устанавливаем localtunnel
RUN npm install -g localtunnel

# Копируем скрипт запуска
COPY entrypoint.sh /entrypoint.sh

# Даем права на выполнение скрипта
RUN chmod +x /entrypoint.sh

# Запускаем скрипт при старте контейнера
CMD ["sh", "/entrypoint.sh"]