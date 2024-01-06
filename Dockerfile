FROM node:18.16.0

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./dist ./dist

RUN npm config set fetch-retries 10
RUN npm config set fetch-retry-mintimeout 60000

RUN npm install -g pm2 

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "node", "start", "dist/main.js"]
