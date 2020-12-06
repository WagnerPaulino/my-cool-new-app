FROM node:12.18.3-alpine

WORKDIR /
COPY package.json . 
RUN npm i
COPY . . 
EXPOSE 3000
CMD ["npm","start"]