# Personal Website | [JasonYao.com](https://www.jasonyao.com)
By [Jason Yao](https://github.com/JasonYao/).

![if it's broken, it's all up to jebus now](https://travis-ci.org/JasonYao/JasonYao.github.io.svg?branch=source)

This repo contains my personal site, which contains everything from
articles and guides on technical subjects, to pseudo-philosophical
ramblings on the mysteries of life, with a couple ~~bio-hazards~~
food recipes tossed in for variety.

## Tools Used
- [Hugo](https://gohugo.io/) (Site generator)
- [Netlify](https://www.netlify.com/) (Site hosting, CD, CMS backend)
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
bin/new-post.sh

# If you want to manually make a post, use this, but try
# to avoid since the helper script will generate posts with
# a timestamp prefix
hugo new posts/my-post-title.md
```

OR just use the admin CMS from netlify on `/admin/`

## Notes
### Commenting
To disable commenting on a specific post,
just add `comments: false` to the post's
front matter.

## License
This repo is released under the GNU GPL v3 license,
a copy of which may be found [here](LICENSE).
