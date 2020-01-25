FROM node:alpine

WORKDIR /
COPY . . 
RUN npm i && npm run build
EXPOSE 4000
CMD ["npm","run","prod"]