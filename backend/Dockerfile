FROM node:17.3.0

WORKDIR /app

COPY ./app/package*.json ./
RUN npm install
COPY ./app ./

RUN npm run build
CMD ["npm", "run", "dev"]