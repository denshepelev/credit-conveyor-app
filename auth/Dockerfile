FROM node

WORKDIR /auth

COPY . .

RUN npm install

EXPOSE 3005

CMD [ "node", "./dist/server.js" ]