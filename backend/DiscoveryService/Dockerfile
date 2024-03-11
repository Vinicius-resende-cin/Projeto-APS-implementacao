FROM node:20

WORKDIR /app
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install -g ts-node
RUN npm install

COPY . .
EXPOSE 3001

CMD npm test
