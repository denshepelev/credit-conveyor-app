FROM node

WORKDIR /gateway

COPY . .

RUN npm install

EXPOSE 3006

CMD [ "node", "./dist/server.js" ]