FROM node:18

WORKDIR /root/radio

COPY package*.json ./

RUN yarn install

COPY server/ .

EXPOSE 5000

CMD ["node", "index.js"]