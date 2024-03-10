FROM node:20

WORKDIR /app
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install -g ts-node
RUN npm install

COPY . .
EXPOSE 3100

CMD npm run test
