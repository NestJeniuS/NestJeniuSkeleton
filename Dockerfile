FROM node:18.16.0

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm install -g pm2 
RUN npm install 

COPY . .

RUN npm run build
EXPOSE 3000

CMD ["pm2-runtime", "node", "start", "dist/main.js"]
