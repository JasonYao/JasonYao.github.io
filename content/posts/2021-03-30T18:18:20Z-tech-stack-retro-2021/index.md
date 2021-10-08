---
title: "Tech Stack Retro (2021)"
slug: tech-stack-retro-2021
date: 2021-03-31T02:18:20+08:00
#summary: REPLACEME (if left commented, it'll default to the first bit of the content itself)
publishdate: 2021-03-31T02:18:20+08:00
categories: ["updates"]
tags: ["meta", "personal site"]
#thumbnail: "assets/posts/2021-03-30T18:18:20Z-hello-there-again/hero.jpg"
thumbnail: "images/annual-site-bill.png"
thumbnail_alt_text: "That's like 2 small orders of Wah Fung. Yes, Cha-siu roasted port is officially a unit of measurement. It's a measurement of happiness."
draft: false
---

# Also, hello (again)!
It's been almost 4 years since I last touched anything to do with my personal
site, with the good old excuse of laziness, work, other stuff to do, no stuff
to do, and trying to figure out how to be a (barely) functional adult in this
world.

Since that time, tech has marched on, and I thought I might do a bit of a
retrospective on how my chosen tech stack's held up in terms of achieving my
original goal of creating an online presence in the most ~~penny-pinching~~
cost-efficient manner.

## Goal recap (optimizing for laziness and my wallet)
As a reminder, the [original goal of mine 4 years ago]({{< ref "/posts/2017-05-22T00:00:00Z-a-canadian-existential-crisis-introduction" >}} "I'd say can you believe it's already been 4 years, but simultaneously those 4 years were some of the longest and shortest of my life")
was to ~~hustle~~ leverage as many existing free services as humanly possible due
to me being a ~~lazy cheapskate~~ efficient and frugal uni student.

1. Maintenance burden should be 0- if I do absolutely nothing to maintain
   this, everything should continue to Just Work™
1. Everything must be free, or as close to 0 as humanly possible
1. Optimizations and extensions should be simple, easy, and intuitive

## Constraints
1. I _do_ want the ability to have the site versioned, so if I ever
   need to, I can revert back to an older version of a site easily
1. I _do_ want my content to be automatically optimized, so it can be
   [shared correctly on Facebook](#TODO) and show up as a [rich snippet](#TODO)
   on Google
1. I _do_ want solving for scale to be trivial, ideally in a way where it's
   simple to add in the ability to deal with theoretical spikes in traffic
1. I _do_ want custom domain emails, so I can send and receive emails from
   foobar@JasonYao.com in Gmail without having to think about it

As everybody knows, your solution to a problem is informed just as equally by
what you're _not_ solving for, as much as it is by the problem itself.

1. I _don't_ need full CMS capabilities, or the ability to have dynamic
   backend functionality for my online presence (though if I do in the future
   I'd like for it to be easy to add in)
1. I _don't_ need commerce or shopping capabilities
1. I _don't_ want to have to muck about and style my site from scratch-
   using and customizing a pre-built theme is fine, but CSS without
   guide rails hurts my very smooth brain

## Tech Stack Architecture
Here's what the network request looks like from a user
{{<figure src="images/general-web-request-overview.svg" title="Your standard CDN-fronted, static site solution">}}

The thing to note here is that there's **nothing** backing the webhost here-
there's no database or microservice backing it up, since the entire website
is statically created at build time, and simply uses Github Pages
to serve its content.

To actually update the content, the developer user flow used to look like
this (note that everything in this diagram is automated):
{{<figure src="images/general-developer-content-update-overview-2017.svg" title="(Ab)using Github by using source control for full site deployments (and rollbacks if necessary)">}}

Now in 2021, it's been consolidated a bit but the general approach is still the same
{{<figure src="images/general-developer-content-update-overview-2021.svg" title="Basically the same as in 2017 just with different service providers. The fact that all of this is free still kinda blows my mind a bit, and the fact that it's all automated feels great">}}

## Tech Stack Comparison
|Service|Service Provider (2017)|Service Provider (2021)|Cost Per Annum (2017)|Cost Per Annum (2021)|
|--|--|--|--|--|
|Custom domain|~~[{{<colored text="Namecheap" bg-color="red" text-color="white">}}](https://www.namecheap.com/)~~|[{{<colored text="Cloudflare Registrar" bg-color="green" text-color="white">}}](https://www.cloudflare.com/products/registrar/)|$9.06 USD|{{<colored text="$8.03 USD" bg-color="green" text-color="white">}}|
|Custom domain email|[Mailgun](https://www.mailgun.com/)|-|$0.00 USD|$0.00 USD|
|Website hosting & Continuous Deployment (CD)|[Github Pages](https://pages.github.com/)|-|$0.00 USD|$0.00 USD|
|Continuous Integration (CI)|~~[{{<colored text="TravisCI" bg-color="red" text-color="white">}}](https://www.travis-ci.com/)~~|[{{< colored text="Github Actions" bg-color="green" text-color="white">}}](https://github.com/features/actions)|$0.00 USD|$0.00 USD|
|Static site generator|~~[{{<colored text="Jekyll" bg-color="red" text-color="white">}}](https://jekyllrb.com/)~~|[{{< colored text="Hugo" bg-color="green" text-color="white" >}}](https://gohugo.io/)|$0.00 USD|$0.00 USD|
|Content Delivery Network (CDN)|[Cloudflare](https://www.cloudflare.com/)|-|$0.00 USD|$0.00 USD|

|Tech Stack|Total Cost Per Annum|
|--|--|
|2017 Tech Stack|$9.06 USD|
|2021 Tech Stack|$8.03 USD|

* In both the 2017 and the new 2021 system, the general format is still the
  same, wherein we generate a static site and use GitHub Pages for deployment
* In both systems, we gain a lot of benefits from this architecture:
    1. There's no server or services that I need to manage
    1. Scaling horizontally is as simple as fronting the static content with
       1 or more CDN or any other edge server
    1. Things are _fast_ since everything is pre-computed, and the only
       bottleneck to painting content for users is literally just the network.
    1. Development cycle for new content is trivial, since it's just "fire and forget"
       (or in this case "push and forget").
* Therefore, in our new 2021 system, we still retain all of our benefits from
  the previous 2017 system, with three major benefits:
  * **Modernizing the tech stack**: By using Hugo to template our site, and
    gain a huge speed boost in both developer productivity _and_ in site
    generation times (previous times were around 30s, I'm now generating
    this site in **~150ms**)
  * **Lowering ongoing costs**: By using Cloudflare Registrar, we can avoid
    having to pay any additional costs every year to the domain name registrar,
    since Cloudflare has gotten rid of adding in a margin for their DNR system.
{{<figure src="images/cloudflare-domain-registrar-wholesale-pricing.png" title="Stuff like this is why I love Cloudflare">}}
  * **Keeping to our principles**: I used to love TravisCI, before they were
    [acquired by a private equity firm](https://blog.travis-ci.com/2019-01-23-travis-ci-joins-idera-inc).
    Ever since they [drove out all of their best talent](https://www.reddit.com/r/programming/comments/atjltu/layoffs_at_travis_ci_their_team_was_being/),
    I knew the writing was on the wall for them. With their recent [large-scale security breach](https://thehackernews.com/2021/09/travis-ci-flaw-exposes-secrets-of.html)
    in which Travis has followed none of the proper disclosures for, I took
    this tech stack overhaul as an opportunity to migrate from TravisCI over
    to GitHub Actions, which has the additional benefit of also modernizing
    the tech stack a bit.

At the end of the day, thanks to our tech stack selection and architecture,
we have a publicly-accessible website that is functionally free, except for
the annual domain cost.

{{<figure src="images/annual-site-bill.png" title="The domain itself is pretty much my only ongoing cost... Now if only I can find a reputable place to get a free domain, and then _really_ make this blog post clickbait">}}

## Going more in depth on swapping out tech stacks
If anybody reading this would like more details on what the process of
migrating my tech stack over looked like, I go into more depth over
in my [2021 tech stack migration guide]({{<ref "/posts/2021-09-28T22:06:15Z-2021-tech-stack-migration-guide-part-1">}} "TODO example link alt text").

## Conclusion
* With this setup, I'm now primed for being able to write a lot more frequently
  than before. Or fall into the trap of never writing a blog post again until
  I feel guilty enough 4 years down the line, only time will tell.
