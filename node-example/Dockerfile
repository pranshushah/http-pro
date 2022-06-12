FROM node:18-alpine
WORKDIR /app
COPY ["package.json" ,"yarn.lock" ,"./"]
RUN yarn
COPY . .
CMD ["node","index.js"]