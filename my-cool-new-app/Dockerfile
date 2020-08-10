FROM node:12.18.3-alpine

WORKDIR /
COPY . . 
RUN npm i
RUN npm run build
EXPOSE 4000
CMD ["npm","run","prod"]