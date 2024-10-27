# 使用 Node.js 构建阶段
FROM node:11.15.0-alpine as builder
WORKDIR '/build'
COPY myaccount ./myaccount
COPY resources ./resources
COPY third_party ./third_party

WORKDIR '/build/myaccount'

RUN npm install
RUN npm rebuild node-sass
RUN npm run build

# 使用 Nginx 提供静态文件
FROM nginx
EXPOSE 9000
COPY --from=builder /build/myaccount/dist /usr/share/nginx/html
COPY nginx_myaccount.conf /etc/nginx/conf.d/default.conf


