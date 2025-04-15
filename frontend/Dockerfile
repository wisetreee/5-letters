# Этап сборки (builder)
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build
# Этап запуска (production)
FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf
# Копируем собранные файлы из builder в Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Копируем конфиг Nginx (если нужен)
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]  