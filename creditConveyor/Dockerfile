FROM node

WORKDIR /credit-conveyor

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "node", "./dist/server.js" ]