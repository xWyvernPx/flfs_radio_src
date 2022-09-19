FROM node:16.15.1 
WORKDIR /flfs_radio/server
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn","dev"]