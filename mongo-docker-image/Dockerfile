from mongo:bionic
ENV MONGO_INITDB_ROOT_USERNAME=myuser
ENV MONGO_INITDB_ROOT_PASSWORD=myuser
ENV MONGO_INITDB_DATABASE=mydb
COPY initial.js /docker-entrypoint-initdb.d/
EXPOSE 27017
