#!/usr/bin/env bash

source ./ci/utils/setup-shell.sh

environment=$1;

if [ "$BUILDKITE_BRANCH" = "master" ]; then
    tag="latest"
else
    tag=$BUILDKITE_BRANCH
fi

lsd deploy --environment $environment --project stamp-duty-calculator --tag $tag --directory ./build
