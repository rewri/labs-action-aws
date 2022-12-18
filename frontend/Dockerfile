FROM node:16.3.0-alpine as builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install --loglevel=error && npm cache clean --force --loglevel=error

COPY . .

RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
