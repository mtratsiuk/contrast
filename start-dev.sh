#!/bin/bash

couch=contrast-dev/couchdb

if [[ "$(docker ps | grep $couch)" =~ ^$ ]]; then
  docker build -t $couch ./couch
  docker run -d -p 5984:5984 --env-file ./.env $couch
fi

export $(cat .env | xargs)
export CONTRAST_COUCH_HOST=localhost

node --debug server/src/app.js
