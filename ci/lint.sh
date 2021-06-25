#!/usr/bin/env bash

source ./ci/utils/setup-shell.sh
source ./ci/utils/setup-yarn.sh

yarn run lint
