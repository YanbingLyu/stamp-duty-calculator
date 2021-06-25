#!/usr/bin/env bash

source ./ci/utils/setup-shell.sh
source ./ci/utils/setup-yarn.sh

environment=$1;

if [ "$BUILDKITE_BRANCH" = "master" ]; then
    tag="latest"
else
    tag=$BUILDKITE_BRANCH
fi

# error and show output if lsd fails
set +o errexit
baseurl=$(lsd url --environment $environment --project stamp-duty-calculator --tag $tag)
if [[ $? -ne  0 ]]; then
  echo $baseurl
  exit 1
fi
set -o errexit

# set env vars used by CRAP to build the app
export NODE_ENV=production
export ENVIRONMENT=$environment
export BASE_URL=$baseurl

# set env vars used by the app
export REACT_APP_ENVIRONMENT="$environment"

# tell CRA to build the app
yarn run build
