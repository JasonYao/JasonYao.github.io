---
title: "How I got customized personal emails, domain, and website for 8 dollars a year"
slug: how-i-got-customized-personal-emails-domain-and-website-for-8-dollars-a-year
date: 2021-03-31T02:18:20+08:00
#summary: REPLACEME (if left commented, it'll default to the first bit of the content itself)
publishdate: 2021-03-31T02:18:20+08:00
categories: ["updates"]
tags: ["meta", "personal site"]
#thumbnail: "assets/posts/2021-03-30T18:18:20Z-hello-there-again/hero.jpg"
thumbnail: "images/annual-site-bill.png"
thumbnail_alt_text: "That's like 2 small orders of Wah Fung. Yes, Cha-siu roasted port is officially a unit of measurement. It's a measurement of happiness."
draft: true
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

## Goal Recap (optimizing for laziness and my wallet)
As a reminder, the [original goal of mine 4 years ago]({{< ref "/posts/2017-05-22T00:00:00Z-a-canadian-existential-crisis-introduction" >}} "I'd say can you believe it's already been 4 years, but simultaneously those 4 years were some of the longest and shortest of my life")
was to ~~hustle~~ leverage as many existing free services as humanly possible due
to me being a ~~lazy cheapskate~~ efficient and frugal uni student.

0. Maintenance burden should be 0- if I do absolutely nothing to maintain
   this, everything should continue to Just Work™
1. Everything must be free, or as close to 0 as humanly possible
2. Optimizations and extensions should be simple, easy, and intuitive

## Constraints
1. I _do_ want the ability to have the site versioned, so if I ever
   need to, I can revert back to an older version of a site easily
1. I _do_ want my content to be automatically optimized, so it can be
   [shared correctly on Facebook](#TODO) and show up as a [rich snippet](#TODO)
   on Google
1. I _do_ want solving for scale to be trivial, ideally in a way where it's simple to add
   in the ability to deal with theoretical spikes in traffic
1. I _do_ want custom domain emails, so I can send and receive emails from
   foobar@JasonYao.com in Gmail without having to think about it

As everybody knows, your solution to a problem is informed just as equally by
what you're _not_ solving for, as much as it is the problem itself.

1. I _don't_ need full CMS capabilities, or the ability to have dynamic
   backend functionality for my online presence (though if I do in the future
   I'd like for it to be easy to add in)
1. I _don't_ need commerce or shopping capabilities
1. I _don't_ want to have to muck about and style my site from the ground up-
   using and customizing a pre-built theme is a hard requirement, but CSS
   hurts my very smooth brain

## What the old stack looked like
Here's the tech stack
|Service|Company|Cost Per Annum|
|--|--|--|
|Custom domain|[Namecheap](#TODO)|$9.06 USD|
|Custom domain email|[Mailgun](#TODO)|$0.00 USD|
|Website hosting & Continuous Deployment (CD)|[Github Pages](#TODO)|$0.00 USD|
|Continuous Integration (CI)|[TravisCI](#TODO)|$0.00 USD|
|Static site generator|[Jekyll](#TODO)|$0.00 USD|
|Content Delivery Network (CDN)|[Cloudflare](#TODO)|$0.00 USD|

**Total cost per year: $9.06 USD**

**Current Time Spent on Maintenance: 0 hours**

Here's what the network request looks like from a user
{{< figure src="images/general-web-request-overview.svg" title="Your standard CDN-fronted, static site solution" >}}

The thing to note here is that there's nothing backing the webhost here-
there's no database or microservice backing it up, since the entire website
is statically created at build time, and simply uses [Github Pages](#TODO)
to serve its content.

To actually update the content, the developer user flow looks like this
(note that everything in this diagram is automated):
{{< figure src="images/general-developer-content-update-overview-old.svg" title="(Ab)using Github by using source control for full site deployments (and rollbacks if necessary)" >}}

This setup comes with some nice benefits:
1. There's no server or services that I need to manage
1. Scaling horizontally is as simple as fronting the static content with
   1 or more CDN or any other edge server
1. Things are _fast_ since everything is pre-computed, and the only
   bottleneck to painting content for users is literally just the network.
1. Development cycle for new content is trivial, since it's just "fire and forget"
   (or in this case "push and forget").
For the record, this was my setup for the past couple years for the most
part, before I decided it was time for an overhaul of this site.

## What the current stack looks like
With the new relaunch of this website, I took the time to redo some portions
of the tech stack to simplify and consolidate some stuff.

The general network request looks exactly the same as before, it's just the
backing technology providers have changed a bit.

Here's the new tech stack:

|Service|Company|Cost Per Annum|
|--|--|--|
|Custom domain|[Cloudflare Registrar](#TODO)|$8.03 USD|
|Custom domain email|[Mailgun](#TODO)|$0.00 USD|
|Website hosting & Continuous Deployment (CD)|[Github Pages](#TODO)|$0.00 USD|
|Continuous Integration (CI)|[Github Actions](#TODO)|$0.00 USD|
|Static site generator|[Hugo](#TODO)|$0.00 USD|
|Content Delivery Network (CDN)|[Cloudflare](#TODO)|$0.00 USD|

**Total cost per year: $8.03 USD**

**Current Time Spent on Maintenance: 0 hours**

**Number of hours spent figuring out how to style tables in Hugo: too many**

{{< figure src="images/annual-site-bill.png" title="The domain itself is pretty much my only ongoing cost... Now if only I can find a reputable place to get a free domain, and then _really_ make this blog post clickbait" >}}

And because of that consolidation in technology providers, our new developer
content update sequence diagram now looks like this!

{{< figure src="images/general-developer-content-update-overview-new.svg" title="The fact that all of this is free still kinda blows my mind a bit, and the fact that it's all automated feels great" >}}

### Swapping from Namecheap to Cloudflare Registrar
Even though I currently work on the Domains team at Squarespace, I still
have a lot of love in my heart for Namecheap as a registrar, since they really
did provide a ton of value to me when I was a student, for [more than a fair price](https://www.namecheap.com/blog/launch-an-xyz-and-a-drone/).

Now, when I first looked around the domain registrar space back a couple years
ago, I found a lot of shady sites, anti-consumer pricing mechanisms ([I'm
looking at you GoDaddy](https://news.ycombinator.com/item?id=18655630)), and
just general wonkiness when trying to use their services to, for example, point
over to [Digital Ocean](https://www.digitalocean.com/), a cheap VPS host that
I used at the time.

Namecheap was like a breath of fresh air though- there wasn't any pricing
gimmicks, pointing nameservers at somewhere else didn't take 2-3 working days,
and their support team was top notch if anything ever did come up. Plus, they
were cheaper than the other registrars that were at least semi reputable.

In total, it costs $9.06 USD per year for a .com domain at Namecheap. For
reference, their margin per domain per year is about $1.03 USD, whereas other
domain registrars were egging each other on to breaking the $10.00 USD per year
mark.

> And then you had the other side of the spectrum, where some companies took
one look at what everybody else was pricing a commodity at, and thought to
themselves: "y'know what, I don't think people are paying enough, let's make
'em pay double the price, or even more!'"... not that I'd know who any of
those companies are, of course.

However, to remain true to the spirit of our goals, when [Cloudflare shocked
the whole domain industry](https://blog.cloudflare.com/cloudflare-registrar/)
back in 2018 by announcing that they were going to charge *at wholesale prices*,
that was a real game changer. They were offering .com domains at $8.03. Their
margin per domain? An astounding **$0.00 USD**.

Here's what the breakdown looks like in table form because I like tables:

|Price per .com domain per annum|Registrar|Does this make me happy|
|--|--|--|
|$9.06 USD|Namecheap|😕|
|$8.03 USD|Cloudflare|😀|
|$20.00 USD|S**********|😐|

For those of you that know me, you'll know one of my favorite phrases is

> But it's the principle of the matter

And so it was. That $1.03 USD per year in cost saving now meant something to me,
as stupid as it is to write it out. At the end of the day, domains are
essentially commodities past a certain level of expected service, which meant
that it didn't matter too much at the end of the day who was the domain
registrar for us, as long as they were reasonably reputable, and had the
lowest prices.

For the sake of the principle of the matter, I jumped ship from Namecheap for
my .com domains and migrated them all over to Cloudflare, pretty much on the
day that Cloudflare's registrar became GA. It kinda helped that I was already
using Cloudflare anyways for their CDN and DNS offerings, so I knew that they
had a high bar for quality and wouldn't be likely to have any issues.

The only fear I have is that I haven't ever had to call into Cloudflare's
customer support before, so I have no idea if that experience would be a
positive one like at Namecheap, or if I'd be bounced around in an AI chatbot
for 30 minutes before getting to talk to an overworked human.

That uncertainty is definitely now a [known unknown](https://en.wikipedia.org/wiki/There_are_known_knowns), all for the known known benefit of having $1.03 USD
more each year to spend on dubiously clean ethnic food. That's like 1/4 of
a [cha-siu roasted pork meal at Wah Fung](https://goo.gl/maps/bMN2wKHR2GNCYVc96),
or 1/5 of a [halal meal](https://en.wikipedia.org/wiki/Halal_cart) if you swing that way.

#### An example of known knowns
||What I know|What I don't know|
|--|--|--|
|What everybody else knows|Wah Fung is the most cost effective and delicious solution to solving the food insecurity issue in America|Where the last 4 years went|
|What everybody else doesn't know|Montreal bagels are better than New York bagels|Whether it's possible to arbitrage fluctuating Wah Fung/Halal cart exchange rates|

#### So what's the verdict on Cloudflare Registrar?
- 100% worth it, though do keep in mind that sometimes it's cheaper at other
  registrars, since they'll perpetually keep a TLD's price low as a continual
  loss leader.
  - E.g. it's cheaper for me to keep .io domains at Namecheap than at Cloudflare,
    since even though Cloudflare is at the wholesale price, Namecheap just has
    a constant discount for .io domains by a few bucks that puts it down below
    the wholesale cost.

### Swapping from TravisCI to Github Actions
Originally, I spent a lot of years using [Travis-CI](#TODO)'s CI platform,
since it was free and pretty well supported by Github and the community on
StackOverflow. Generally speaking, their stuff worked, documentation was good,
and I didn't have any real issues with Travis.

**However**, back in 2019, Travis-CI was actually [acquired by a vulture
private equity firm called Idera](https://blog.travis-ci.com/2019-01-23-travis-ci-joins-idera-inc),
who then proceeded to immediately [strip the company of all the people that made Travis good](https://www.reddit.com/r/programming/comments/atjltu/layoffs_at_travis_ci_their_team_was_being/).

Given that the writing was the wall for Travis's long term stability, and
because I don't want to help support a company that burned its own people
that made it great, I took a look around this time around for alternative
CI solutions.

#### The CI contenders
Now, there's a bunch of options here, but some I didn't fill in the table
due to writing them off already due to operational concerns (it's just Jenkins.
It's always just Jenkins).

|CI offering|Financial cost|Non-financial costs|Benefits|
|--|--|--|--|
|[Github Actions](#TODO)|$0|Would need to read docs|Begins process of migrating off of TravisCI, and enables me to consolidate portions of techstack to Github|
|[Jenkins](#TODO)|?|Heard too many stories of people having to actively manage Jenkins- remember, we're looking for "fire and forget" when it comes to our CI provider|N/A|
|[CircleCI](#TODO)|$0|Would need to read docs, allows only a single job, and only about 2500 compute minutes|Gets us off TravisCI|
|[DroneCI](#TODO)|?|Would need to read docs. Looks like they got acquired by some random company I never heard of that claims to already be in the CI/CD space. I've never heard of them so I'm already suspicious, even if I've used the open source drone CI at work|Gets us off TravisCI|

#### Final CI selection
- I chose to use Github Actions here, since it was already established these
  past few years, had a lot of community workflows in their marketplace, and
  it enabled me to bring one more piece of the tech stack back to Github to
  help consolidate the services that I end up using.
- After migrating, I can say that it was a pleasent experience, and I was
  pleasantly surprised at how strong the community support was (there's even
  an automated [lighthouse](https://github.com/marketplace/actions/lighthouse-ci-action)
  action to enable automated audits of my statically generated website!)

### Swapping from Jekyll to Hugo
This was a simple one- I heard about the performance characteristics for [Hugo](#TODO),
and wanted to see if it lived up to the hype.

After the past week playing with it and getting this site up and ready, I can
say that the answer to that question is a definitive, resounding **yes**.

The developer experience using Hugo is actually _enjoyable_, in contrast to
Jekyll which made me want to cry some times [from the workarounds that I had
to put in place](https://github.com/jekyll/jekyll/pull/6400). Whodathunkit.
Hugo as a platform comes with so much composability, and things just Make
Sense™, where generally I may have an idea on how to do something, and if my
first stab at it doesn't work, it's generally in the right direction and just
a matter of wrangling the syntax.

## Final notes
Some folks will note that my highest (and really, only) cost is the annual
cost for having a domain, and that I could in theory lower that amount to
about $1.00 USD by hunting around and making use of seasonal deals like
this one:

{{< figure src="images/ionos-1-dollar-com-domain.png" title="You are a bold one, General Kenobi." link="https://www.ionos.com/domaincheckresult" >}}

However, do keep in mind Goal 0 and this consistent truth:

> I am a lazy fuck

With that in mind, the current system enables me to do _literally_ nothing
and pay only about 8 bucks for everything, which is worth much more to me
than having to bounce around from registrar to registrar chasing $1 domain
seasonal deals.


## TODO
- See if there's other representations like graphs or tables that could be used
- Look into creating an `<aside>` shortcode, since we're currently using quotes
  right now, but I'd like for it to be separate and distinct.
- Create a `<figure>` shortcode that deals with srcset images (can a shortcode call a shortcode?)
- Clarify for the user up front what we're going to talk about specifically
- Consider breaking this longer thing out into different post sizes, since it's currently at a 13 minute read
- link to 1 &1  and ionos for their 99 cent domain offerings, but how i'd have to buy, then transfer out, and then go hunting for renewal bargains, which don't exist.
- hero image idea: take a picture of 2 small orders of wah fung, or 1 large one and some egg tarts
- Go into detail on the SMTP approach when it comes to gmail

## Title ideas
- How I pay for a website and custom email address with cha siu and egg tarts
- How I spend 8 dollars a year on all site and email expenses
- How 8 dollars pays for a website and free custom Gmail


## The goals



Let's dive in.

## Isolating for the cheapest custom .com domain

## Free custom domain email
Whenever I tell people my email address is Hello@my-domain.com, I get occasional
double takes. When I tell them that I get it for free, and that I can send and
receive emails from that email address without paying for ~~Google Apps~~
~~G-Suite~~ [Google Workspaces](https://workspace.google.com/pricing.html),
that's normally when people get interested, since email has become something
that's expected to be free in their minds.

For the record, the _specific_ approach that I outline below won't really be
helpful to other folks interested in this, but the general approach is sound
if you're able to find another developer-friendly email provider similar to
Mailgun in its early days.

### The good old days
Now, previously, Mailgun offered up to 10,000 free emails a month per domain,
which for casual use was an insanely good deal, since I'm pretty sure my
current throughput is a couple dozen emails max per month.

Back in January 2020 though, they announced plans to disallow new people from
that plan, and forced everybody onto their new billing plan.

There's a couple things to note here though:
1. They won't charge my card unless my bill goes above $0.50 USD
1. Each email is about $0.0008 USD
1. At _most_ in a given month, lets say I send and receive 200 emails
1. That's about 16 cents worth of emails, and since it resets at the end of
   each month, as long as I'm underneath that $0.50 USD limit, I don't pay
   anything.
1. While I can't create _new_ routes, my old ones still work- and since I setup
   a wildcard route plus the normal route, my emails flow undisturbed.

{{< figure src="images/mailgun-no-longer-allowing-new-hustlers.png" title="In all honesty, it was probably a smart move for them, since I've been using their services for something like 6 years and haven't paid a cent yet." >}}

For those looking to setup free custom domain emails, see [here](#TODO) for a
walkthrough.

### So what's the verdict on Mailgun?
- I'm at a point where I'm not going to change my dev mail provider, but for
  new folks trying to snag their own custom email at their own custom domain,
  check out the guide above.

## Free website hosting and continuous deployment
Back around 2016, there wasn't all that many free static site hosts that we
could use- the biggest one was Github pages, which had its own quirks
and idiosyncrasies.

> For the longest time, you couldn't actually have TLS on your custom domain,
so you had to rely on a CDN like Cloudflare to terminate TLS for you, and call
out to your origin with unsecured HTTP.

When taking a look around during the planning stages of the rebuild for this
personal site, there were a lot more options, and some offerings containing
many more features than what I currently have.

### The free webhosting contenders
|Webhost & CD offering|Financial cost|Non-financial costs|Benefits|
|--|--|--|--|
|[Github Pages](#TODO)|$0.00 USD|Opportunity cost of not having new features like 1-click rollbacks, multiple contributers, and a pretty CMS enabling on-the-move content writing|I literally don't have to change anything since it's all setup and pointing at Github anyways|
|[Netlify](#TODO)|$0.00 USD|Having to rip out all Github Pages and point those repos to netlify instead|Gain everything listed above in the costs section|
|[Cloudflare Pages](#TODO)|$0.00 USD|Same as Netlify, with the added pain of it being fresh out of beta|Same as Netlify, though a bit better since my tech stack would be more consolidated to just Cloudflare and Github|

### Taking an honest assessment of YAGNI
Here's the hard truth though when it comes to all those shiny new toys:
**they aren't necessary**. Sure, 1-click rollbacks, the ability to have a nice
CMS, the ability to have multiple non technical contributors all sounds nice.

But would I actually, seriously, use any of those features?

> For 1-click deploys

If I need to rollback right now, I just push or revert on my `publish` branch.
That's essentially 1 command, and would take seconds to complete.

> For having a nice CMS

If I had a nice CMS, would I actually be writing more, and writing more
consistently? Probably not, and I'd probably use any saved time on trying
to figure out the next place in Chinatown for me to get food poisoning at.

> For multiple contributors

As for multiple contributors? Sure, that sounds really useful for small
team cases, but this is my personal site, and it's not as if I'm going
to have guest writers on here.

As I went through each of the arguments, I saw that at least in **my personal case**,
Netlify and Cloudflare Pages didn't really have that much value add,
especially compared to the yak-shaving I'd need to do to help support pointing
my domain somewhere else besides Github.

### So the final choice?
- Sticking with Github Pages enabled me to leverage the platform that I was
  already on, and meant that there wouldn't be any new gotchas that I haven't
  already run into these past years of using Github Pages.

## Getting free continuous integration

## Free static site generators

## Free CDN
This is a simple one again- Just use Cloudflare. They're free, they have a bunch
of good tech at their edge, and they're constantly optimizing and adding in
new features for free.

## Wrapping up
Let's review our goals:
> 1. Everything must be free, or as close to 0 as humanly possible

With our current stack, we've managed to minimize the cost of everything
down to just our domain, and even for that we're not paying any amount on
some company's margins.

> 1. If I do absolutely nothing to maintain this, everything will Just Work™

The past 4 years has shown that if I **literally** do nothing for this site,
it will still be up, the pipelines will work, and I won't have to lift a finger.

> 1. Optimizations and extensions should be simple, easy, and intuitive

The fact that I was able to [add in metadata json](#TODO) per deploy
for this site, on top of per post in a couple lines of code just goes
to show how easy and intuitive using the Hugo framework is.

All in all, I think we've hit something like 2.8/3 out of our original 3 goals,
which is not too shabby all things considered. Hopefully this post helps out
any people interested in getting a website and email setup on a shoestring
budget, by pointing them to some of the freely available tech that's out there!
