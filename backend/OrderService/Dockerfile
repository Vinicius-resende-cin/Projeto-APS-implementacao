FROM node:20

WORKDIR /app
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .
EXPOSE 3101

CMD npm test