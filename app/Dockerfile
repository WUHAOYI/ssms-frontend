FROM node:11.15.0-alpine as builder
WORKDIR '/build'
COPY app ./app
COPY resources ./resources
COPY third_party ./third_party

WORKDIR '/build/app'

RUN npm install
RUN npm rebuild node-sass
RUN npm run build

RUN ls /build/app/dist

FROM nginx
EXPOSE 9001
COPY --from=builder /build/app/dist /usr/share/nginx/html
COPY nginx_app.conf /etc/nginx/conf.d/default.conf
