#!/usr/bin/env bash

set -ueo pipefail

source ./ci/utils/setup-shell.sh

# Run separate build pipeline when deploying latest prod release to staging
if [ "$BUILDKITE_SOURCE" = "schedule" ]; then
    buildkite-agent pipeline upload .buildkite/pipeline.scheduled.yml
    echo "Source: $BUILDKITE_SOURCE - uploading pipeline.scheduled.yml"
else
    buildkite-agent pipeline upload .buildkite/pipeline.main.yml
    echo "Source: $BUILDKITE_SOURCE - uploading pipeline.main.yml"
fi