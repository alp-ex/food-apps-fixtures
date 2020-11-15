FROM node:14.15.0-alpine
WORKDIR /food-apps-fixtures
EXPOSE 3001

COPY package*.json server.js db.js ./

RUN npm install

CMD ["npm", "run", "start"]