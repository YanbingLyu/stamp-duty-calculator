#!/usr/bin/env bash


# Setup git to push back to the remote master

# See documentation on pushing back to repo here: https://confluence.atlassian.com/bitbucket/push-back-to-your-repository-962352710.html

# TODO: Switch to Acquire git user once set up
git config user.name lendi-platform-automations-buildkite
git config user.email platform@lendi.com.au
git remote set-url origin ${BUILDKITE_REPO}
# git config http.${BITBUCKET_GIT_HTTP_ORIGIN}.proxy http://localhost:29418/
# git remote set-url origin http://bitbucket.org/$BITBUCKET_REPO_FULL_NAME

# Get an oauth access token using the client credentials, parsing out the token with jq.
# TODO: Switch to Acquire credentials once set up
apt-get update && apt-get install -y curl jq pandoc

export access_token=$(curl -s -X POST -u "${PLAT_GIT_CLIENT_KEY}:${PLAT_GIT_CLIENT_SECRET}" https://bitbucket.org/site/oauth2/access_token -d grant_type=client_credentials -d scopes="repository"| jq --raw-output '.access_token')

# Configure git to use the oauth token.
git remote set-url origin "https://x-token-auth:${access_token}@bitbucket.org/${BITBUCKET_REPO_OWNER}/${BITBUCKET_REPO_SLUG}"

