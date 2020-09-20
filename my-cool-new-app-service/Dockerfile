FROM node:12.18.3-alpine

WORKDIR /
COPY package.json . 
RUN npm i
COPY . . 
RUN npm i
EXPOSE 3000
CMD ["npm","start"]