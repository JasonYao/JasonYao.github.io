---
title: "2021 Tech Stack Migration Guide (Part 1: Domains)"
slug: 2021-tech-stack-migration-guide-part-1-domains
date: 2021-09-28T18:06:15-04:00
#summary: REPLACEME (if left commented, it'll default to the first bit of the content itself)
publishdate: 2021-09-28T18:06:15-04:00
categories: ["guides"]
tags: ["domains", "migration"]
#thumbnail: "assets/posts/2021-09-28T22:06:15Z-2021-tech-stack-migration-guide/hero.jpg"
thumbnail: "global/default-hamilton.png"
thumbnail_alt_text: "If you're reading this you probably need a hobby- have you considered DnD?"
draft: true
---
# Migrating static site tech stack guide
The following is a more in-depth guide on why and how I swapped out
parts of my site's tech stack over time.

This first post in this small mini-series about tech stack migrations will
be about swapping out my domain name registrar, with the next post about
swapping my [CI provider from Travis to GitHub](#TODO)

## Customized domains: from Namecheap to Cloudflare
### Where we were in 2017
When I first looked around the domain registrar space back a couple years
ago, I found a lot of shady sites, anti-consumer pricing mechanisms ([I'm
looking at you GoDaddy](https://news.ycombinator.com/item?id=18655630)), and
just general wonkiness when trying to use their services to, for example, point
over to [Digital Ocean](https://www.digitalocean.com/), a cheap VPS host that
I used at the time.

Namecheap was like a breath of fresh air though- there wasn't any pricing
gimmicks, pointing nameservers at somewhere else didn't take 2-3 working days,
and their support team was top notch if anything ever did come up. Plus, they
were cheaper than the other registrars that were at least semi reputable.

In total, it costs **$9.06 USD per year for a .com domain** at Namecheap. For
reference, their margin per domain per year is about $1.03 USD, whereas other
domain registrars were egging each other on to breaking the $10.00 USD per year
mark.

> And then you had the other side of the spectrum, where some companies took
one look at what everybody else was pricing a commodity at, and thought to
themselves: "y'know what, I don't think people are paying enough, let's make
'em pay double the price, or even more!'"... not that I'd know who any of
those companies are, of course.

### Where we are now in 2021
Even though I worked on the Domains team at Squarespace for over 3.5 years,
I still have a lot of love in my heart for Namecheap as a registrar, since
they really did provide a ton of value to me when I was a student, for
[more than a fair price](https://www.namecheap.com/blog/launch-an-xyz-and-a-drone/).

However, to remain true to the spirit of our goals, when [Cloudflare shocked
the whole domain industry](https://blog.cloudflare.com/cloudflare-registrar/)
back in 2018 by announcing that they were going to charge *at wholesale prices*,
that was a real game changer. They were offering .com domains at $8.03. Their
margin per domain? An astounding **$0.00 USD**.

Now, before we continue, it's important that we keep the following in mind:

> **{{<colored text="Domain names are commodities, and domain registrars are fungible" bg-color="var(--background-color)" text-color="red">}}**

This fact may get lost due to some companies (cough cough Spacesquare)
attempting to imply a higher "quality of service" or "premium"-ness to their
domain offerings from their brand, but as far as you as an end user are
concerned, just because some providers charge a lot more, it doesn't mean
they're actually adding anything of value to you as an end cusomer.

At the end of the day, these offerings are all the same, and you _should_
bargain hunt for the lowest cost among reputable domain name registrars.

Here's what the breakdown looks like in table form (you'll find lots of love
of tables and sequence diagrams here on my site) when trying to register the
domain HelloThereGeneralKenobi.com:

|Price per .com domain per annum|Registrar|Does this make me happy|
|--|--|--|
|$9.06 USD|Namecheap|🙂|
|$8.03 USD|Cloudflare|😀|
|$12.95 USD|Wix|😕|
|$20.00 USD|Squarespace|😐|

For those of you that know me, you'll know one of my favorite phrases is

> But it's the principle of the matter

And so it was. That `$1.03 USD per year` in cost saving now meant something
to me, as stupid as it is to write it out. At the end of the day, domains
are essentially commodities past a certain level of expected service, which
meant that it didn't matter too much at the end of the day who was the domain
registrar for us, as long as they were reasonably reputable, and had the
lowest prices.

For the sake of the principle of the matter, I jumped ship from Namecheap for
my .com domains and migrated them all over to Cloudflare, pretty much on the
day that Cloudflare's registrar became GA. It helped that I was already
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

## So what's the verdict on Cloudflare Registrar?
- 100% worth it, though do keep in mind that sometimes it's cheaper at other
  registrars, since they'll perpetually keep a TLD's price low as a continual
  loss leader.
  - E.g. it's cheaper for me to keep .io domains at Namecheap than at Cloudflare,
    since even though Cloudflare is at the wholesale price, Namecheap just has
    a constant discount for .io domains by a few bucks that puts it down below
    the wholesale cost.
