FROM node:18

WORKDIR /root/radio

COPY . ./



RUN npm install -g pnpm
RUN npm install -g serve
RUN pnpm install
RUN pnpm build


EXPOSE 4451
EXPOSE 4450

CMD ["sh", "-c", "serve -l 4550 -s dist & node server/index.js"]