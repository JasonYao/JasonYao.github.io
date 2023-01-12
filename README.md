# Personal Website | [JasonYao.com](https://www.jasonyao.com)
By [Jason Yao](https://github.com/JasonYao/).

![if it's broken, it's all up to jebus now](https://github.com/JasonYao/JasonYao.github.io/actions/workflows/main.yml/badge.svg?branch=source)

This repo contains my personal site, which contains everything from
articles and guides on technical subjects, to pseudo-philosophical
ramblings on the mysteries of life, with a couple ~~bio-hazards~~
food recipes tossed in for variety.

## Tools Used
- [Hugo](https://gohugo.io/) (Site generator)
- [Github Pages](https://pages.github.com/) (Site hosting, CD)
- [Github Actions](https://github.com/features/actions) (CI)
- [Google Lighthouse](#https://developers.google.com/web/tools/lighthouse/) (Website validator)
- [Google Analytics](https://analytics.google.com/) (Traffic analytics)
- [Disqus](https://disqus.com/) (3rd party commenting platform)

### TODO things to consider adding in later
- Full OpenGraph support
- Google AMP

## Dependency Installation
```sh
brew install hugo
```

## Usage
### Local dev
Run dev site
```sh
# Runs on http://localhost:1313/.
hugo server -D
```

### Create a new post
```sh
bin/new-post

# If you want to manually make a post, use this, but try
# to avoid since the helper script will generate posts with
# a timestamp prefix
hugo new posts/my-post-title.md
```

### Viewing metadata
To view the metadata of the deployment (e.g. what's the current version of the site)

```sh
# In prod
curl https://www.jasonyao.com/metadata/deployment/index.json | jq '.'

# On local
curl localhost:1313/metadata/deployment/index.json | jq '.'
```

To view the metadata for all posts:

```sh
# In prod
curl https://www.jasonyao.com/posts/index.json | jq '.'

# On local
curl localhost:1313/posts/index.json | jq '.'
```

To view the metadata for a single post:
```sh
# Just add in a /index.json to the end of the post url, e.g. for prod
curl https://www.jasonyao.com/posts/2021/09/28/2021-tech-stack-migration-guide-domains/index.json | jq '.'

# On local
curl localhost:1313/posts/2021/09/28/2021-tech-stack-migration-guide-domains/index.json | jq '.'
```

## Notes
### Commenting
To disable commenting on a specific post,
just add `comments: false` to the post's
front matter.

## License
This repo is released under the GNU GPL v3 license,
a copy of which may be found [here](LICENSE).
