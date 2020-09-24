FROM node:12.18.4-alpine
WORKDIR /food-apps-fixtures
EXPOSE 3001
COPY db.json ./
RUN npm install -g json-server 
CMD ["json-server", "--port", "3001", "--host", "0.0.0.0", "db.json"]