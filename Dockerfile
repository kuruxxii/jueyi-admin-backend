FROM node:20-alpine

WORKDIR /admin_backend

COPY . .

RUN npm install

EXPOSE 4001

CMD ["npm", "run", "start"]