#!/usr/bin/env bash

# add yarn binaries to the path
# https://github.com/yarnpkg/yarn/issues/5945
# export PATH="$PATH:$(yarn bin)"
export PATH="${PWD}/node_modules/.bin:$PATH"

# setup .npmrc in the root directory so we can use NPM_TOKEN from env var to install all the dependencies

if [ "$LENDI_NPM_PROXY" = "true" ]; then
  echo "registry=https://npm-proxy.lendi-paas-mgmt.net" > ~/.npmrc
  echo "_auth=${LENDI_NPM_TOKEN}" >> ~/.npmrc

  yarn config set registry https://npm-proxy.lendi-paas-mgmt.net

  # Ugly but necessary...
  sed -i -e "s#https://registry.yarnpkg.com/#https://npm-proxy.lendi-paas-mgmt.net/#g" yarn.lock  
else
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
fi
# test if npm is logged in. stderr will still print if something comes up
npm whoami > /dev/null

# install all the dependencies for packages
yarn
