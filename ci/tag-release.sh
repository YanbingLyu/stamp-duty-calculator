#!/usr/bin/env bash


source ./ci/utils/setup-shell.sh

source ./ci/utils/setup-git.sh


# If deploying to production

# Set git tag to buildkite build number

git tag $BUILDKITE_BUILD_NUMBER

git push origin $BUILDKITE_BUILD_NUMBER

latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)

echo "Latest git tag: $latestTag"