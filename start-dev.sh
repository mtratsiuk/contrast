#!/bin/bash

couch=contrast-dev/couchdb

if [[ !(-e node_modules) ]]; then
  echo "Intalling app dependencies..."
  npm install
  cd client && npm install && cd ..
  cd server && npm install && cd ..
fi

ln -nsrf shared client/src/shared
ln -nsrf shared server/src/shared

if [[ "$(docker ps | grep $couch)" =~ ^$ ]]; then
  docker build -t $couch ./couch
  docker run -d -p 5984:5984 --env-file ./.env $couch
fi

export $(cat .env | xargs)
export CONTRAST_COUCH_HOST=localhost

node --debug server/src/app.js & \
     ./client/node_modules/.bin/webpack-dev-server --config ./client/webpack.config.dev.js --hot --inline && \
     fg
