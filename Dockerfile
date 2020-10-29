FROM node:12.18.4-alpine
WORKDIR /food-apps-fixtures
EXPOSE 3001
COPY index.js routes.json ./
RUN npm install -g json-server 
RUN npm install -D faker 
CMD ["json-server", "--port", "3001", "--host", "0.0.0.0", "index.js", "--routes", "routes.json"]