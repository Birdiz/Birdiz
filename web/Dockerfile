FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY app ./app

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
