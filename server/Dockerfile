FROM node:alpine
WORKDIR /var/lib/server
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start"]