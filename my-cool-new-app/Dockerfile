FROM node:12.18.3-alpine

WORKDIR /
COPY package.json . 
RUN npm i
COPY . . 
RUN npm run build
EXPOSE 4000
CMD ["npm","run","prod"]