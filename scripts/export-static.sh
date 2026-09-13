#!/usr/bin/env bash
# Build a static copy of the site into ./out for deploying on Wirl itself.
# The waitlist API route cannot be part of a static export, so it is set
# aside for the build and put back afterwards.
set -euo pipefail
cd "$(dirname "$0")/.."
hold="$(mktemp -d)/api"
mv src/app/api "$hold"
trap 'mv "$hold" src/app/api' EXIT
rm -rf .next out
NEXT_OUTPUT=export npx next build
echo
echo "Static site is in ./out. Deploy it with:"
echo "  wirl deploy out --org oimo --app wirl-site"
