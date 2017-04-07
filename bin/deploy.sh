#!/bin/bash

cd "${0%/*}/.."

npm test
version=$(npm --no-git-tag-version version patch)
cd client && npm --no-git-tag-version version patch && cd ..
cd server && npm --no-git-tag-version version patch && cd ..

last_commit_msg=$(git log -1 --pretty=%B)
git add {**/,}package.json && git commit --amend -m "$last_commit_msg"

git push
git push do
