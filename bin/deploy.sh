#!/bin/bash

cd "${0%/*}"

cd ..
npm test
npm --no-git-tag-version version patch
cd client && npm --no-git-tag-version version patch && cd ..
cd server && npm --no-git-tag-version version patch && cd ..

git push do
