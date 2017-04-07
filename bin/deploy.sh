#!/bin/bash

cd "${0%/*}/.."

npm test
version=$(npm --no-git-tag-version version patch)
cd client && npm --no-git-tag-version version patch && cd ..
cd server && npm --no-git-tag-version version patch && cd ..

git add {**/,}package.json && git commit -m "Version $version"

git push
git push do
