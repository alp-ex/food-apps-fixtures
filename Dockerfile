FROM node:14.15.0-alpine
WORKDIR /food-apps-fixtures
EXPOSE 3001
COPY index.js routes.json ./
RUN npm install -g json-server 
RUN npm install -D faker 
CMD ["json-server", "--port", "3001", "--routes", "routes.json", "--host", "0.0.0.0", "index.js"]