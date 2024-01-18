FROM node:18

WORKDIR /root/radio

COPY . ./



RUN npm install -g pnpm
RUN pnpm install


EXPOSE 4455
EXPOSE 4450

CMD ["sh", "-c", "node index.js"]