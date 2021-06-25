#!/usr/bin/env bash

source ./ci/utils/setup-shell.sh

# Find latest git tag
latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)

echo "Latest git tag: $latestTag"

# Checkout latest tag
git checkout $latestTag