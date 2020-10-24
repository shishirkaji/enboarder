FROM node:alpine
WORKDIR /var/lib/client
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 35729
CMD ["npm", "start"]
