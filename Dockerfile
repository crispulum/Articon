FROM node:18
WORKDIR /
COPY . .
RUN npm install
CMD ["node", "server/server.js"]
EXPOSE 3000