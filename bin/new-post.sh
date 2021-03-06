#!/bin/bash

##
# Generates a new post, with a proper timestamp prefix.
#
# Original script from https://docspring.com/blog/posts/adding-a-timestamp-to-hugo-post-filenames/
#
# Usage:
#   - From the repo root, run bin/new-post.sh <title-name>
#     - DON'T suffix with .md!
#   - E.g. `bin/new-post.sh hello-world`
##

set -e

POST_SLUG="$1"
if [ -z "$POST_SLUG" ]; then
  read -p "Post Name (e.g. your-new-post): " POST_SLUG
fi

TIMESTAMP=`date -u +"%Y-%m-%dT%H:%M:%SZ"`
POST_FILENAME="${TIMESTAMP}-${POST_SLUG}.md"
SLUG_PREFIX=`date -u +"%Y/%m"`

hugo new "posts/${POST_FILENAME}"
(
  sleep 0.2 &&
  echo "Opening localhost:1313/posts/${SLUG_PREFIX}/${POST_SLUG}/" &&
  open "http://localhost:1313/posts/${SLUG_PREFIX}/${POST_SLUG}/"
) &
(
  sleep 0.5 &&
  echo "Opening blog/content/posts/${SLUG_PREFIX}/${POST_FILENAME}" &&
  open "content/posts/${POST_FILENAME}" &
) &
pgrep -x hugo > /dev/null && echo "Hugo is already running!" || hugo server -D
sleep 1
