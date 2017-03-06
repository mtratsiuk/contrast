FROM node:alpine

ARG CONTRAST_SERVER_STATIC_PATH=/var/www/
ARG STATIC_TMP_PATH=/tmp/contrast/
ARG SERVER_PATH=/usr/src/app/


RUN mkdir -p $STATIC_TMP_PATH
WORKDIR $STATIC_TMP_PATH

COPY client/package.json $STATIC_TMP_PATH
RUN npm install
COPY client/. $STATIC_TMP_PATH
RUN npm run build && \
    cp -R build $CONTRAST_SERVER_STATIC_PATH


RUN mkdir -p $SERVER_PATH
WORKDIR $SERVER_PATH

COPY server/package.json $SERVER_PATH
RUN npm install

COPY server/. $SERVER_PATH

EXPOSE 8080
CMD ["node", "src/app.js"]
