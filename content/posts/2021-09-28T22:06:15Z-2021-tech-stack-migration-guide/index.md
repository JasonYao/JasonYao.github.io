---
title: "2021 Tech Stack Migration Guide"
slug: 2021-tech-stack-migration-guide
date: 2021-09-28T18:06:15-04:00
#summary: REPLACEME (if left commented, it'll default to the first bit of the content itself)
publishdate: 2021-09-28T18:06:15-04:00
categories: ["development practices", "tutorial", "tips & tricks", "portfolio"]
tags: ["replaceme", "todo"]
#thumbnail: "assets/posts/2021-09-28T22:06:15Z-2021-tech-stack-migration-guide/hero.jpg"
thumbnail: "global/default-hamilton.png"
thumbnail_alt_text: "If you're reading this you probably need a hobby- have you considered DnD?"
draft: true
---
# My first post
Hello world!

Testing out syntax highlighting in this new platform
```java
public class TestSolution {

    /**
     * This is a multiline
     *   comment
     */
    private final Blah blah;

    // This is a single line comment
    private final Foo foo;

    @Inject
    TestSolution(Blah blah, Foo foo) {
        this.blah = blah;
        this.foo = foo;
    }

    void doAction() {

    }

}
```

# Optat in genetrix maius ut quid vimque

## Seu illic damnare ita vocis teneros

Lorem markdownum verae gerebat regere. Quae
[nihil](http://www.innoxiaeripiunt.org/etpatuit)? Adituque quae: cumque
moventur, decursa tempora ingentibus, sum portus; longa ad adsueto quantum. Esto
gramina fertur aera etiam vertebar dederit.

## Cursibus voce

Piscis carmina. Esse [ubi ursa](http://utmagica.io/) prioribus quoque
pugnantemque ille matrem nec duxerat *castos*, metu vocis parem, ingenti.
Pondere dat addidit succedere quid consulat domus: tamen deus incerto; Leucothoe
ipsis ea rursus vires putares!

```python3
from lorem.text import TextLorem

# separate words by '-'
# sentence length should be between 2 and 3
# choose words from A, B, C and D
lorem = TextLorem(wsep='-', srange=(2,3), words="A B C D".split())

s1 = lorem.sentence()  # 'C-B.'
s2 = lorem.sentence()  # 'C-A-C.'
```

## Soceri Diana iniquae iuvet criminis

Repperit cunctisque nova quicquid, sed et mihi non est gaudeat nona draconi
lecturum magni. Facit confundimur vulnera sacrilegi aduncis, pro essent natura.
Tibi [regna](http://quem.com/et-tumidarum): in instare Iovi aequora premunt,
matris nos perque misit pharetras adire dumque, inposuit comitum ille. Populi
rursusque moenia.

1. Maneant Est saxa non mea quo
2. Neque fulminis inquam
3. Matrisque tamen
4. Numen efficiet quam bracchia
5. Notavit a dotem tristis infuso hominis et

## Admonuisse glaebam testataque Nox insignis harundine

Domino primordia apris senectae inane umeris Themis. Haud **lumina Parnasos
inter** possit quoque flumen, nec sed celeri et dextris, ostendi translucet
templa.

**Illic die** volui cruorem me habuit; quos ferali sed ulla Arcadiae. Dumque
dextra tibi exempla hoc et adest iter postulat tale. Summum Alcinoi colla
accedere terrarum tuens est *protinus donare*. Ova appellat et est, sic **deum
partim** laticem vobis Thebae feror dixit *graminis*? Aliae rarescit
[fletus](http://www.loca.io/perfusamsuos.html).

## Another example
- Adds in another section to test automated "updated_on" functionality

## Image example

### Using a shortcode from the global assets directory (direct .Resources via /assets)
- NOTE: This image is rooted in the `/assets` directory, NOT `/static/assets`
- Useful for globally useful images like profile pic/default hero image
{{< global/img src="global/default-hamilton.png" alt="global image example" >}}

### Using a shortcode referencing from the local page's resource
{ {< img src="images/watermelon-hat.jpg" alt="For the days when you just want a watermelon hat" >} }











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
