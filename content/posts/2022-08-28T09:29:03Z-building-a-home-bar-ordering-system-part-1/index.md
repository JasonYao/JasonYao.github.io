---
title: "Building a Home Bar Ordering System Part 1"
slug: building-a-home-bar-ordering-system-part-1
date: 2022-08-28T05:29:04-04:00
#summary: REPLACEME (if left commented, it'll default to the first bit of the content itself)
publishdate: 2022-08-28T05:29:04-04:00
categories: ["home bar", "portfolio"]
tags: ["reactive programming", "vue", "spring boot reactor", "digital ocean app platform"]
#thumbnail: "assets/posts/2022-08-28T09:29:03Z-building-a-home-bar-ordering-system-part-1/hero.jpg"
thumbnail: "images/v1-site-2022-aug.png"
thumbnail_alt_text: "It turns out building an ordering system end to end is pretty complex- who'd a thunk it?"
draft: true
---

# tl;dr
If you're ever invited to my home and I'm in a mood to host and make drinks,
go to **[bar.jasonyao.com](https://bar.jasonyao.com)** (or scan the QR code below)
to look through everything and place your orders.

TODO REPLACEME: With QR code to bar

The rest of this post (or posts in a series) will be talking about the site
features, the reasoning behind certain things (like order batching), and
a deeper dive into some thoughts on Reactive Programming™, which was a new
paradigm for me.

As of `2022-08-28`, the v1 of the site is up, and people can do the following:
- Login/logout
- Add/Remove "products" to their cart (products are fake right now)
- Place an order
- See the status of their order
- See their order history
- Update their profile picture (defaults to a cute totoro)

The functionality for the bar owner (me) includes:
- Ability to see orders stream in as they are submitted (this is really where
  reactive programming shined)
- Ability to have the FE client automatically batch drinks for me
- Ability to mark drinks as in progress/completed/cancelled/pending

# Motivation
Instead of actually getting better at making drinks, I decided a side
adventure into trying to over-engineer my life was warranted. Additionally,
as a primarily backend engineer, I know my design and FE skills are weaker
than my BE skills, so this personal project is a great way for me to get more
experience and exercise some engineering muscles I don't normally get a chance
to stretch.

Finally, this was a chance for me to learn some new frameworks and programming
paradigms, including:
- [Reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) (programming paradigm)
- [Vue.js](https://vuejs.org/) (FE javascript framework)
- [Spring's Project Reactor](https://spring.io/reactive) (BE java reactive programming framework)

# Goals
- Build a site to support people ordering food/drinks when I'm hosting
- Make this stupidly simple from an infra management perspective
- Enable the site to be auto updated with CI/CD
- Learn Reactive Programming

# Non-goals
- Manage my own VMs/container orchestrator or other infra like databases

# What it looks like


# Gotchas
- reactor and r2dbc are very new, and it shows
- ability to have one-to-many or many-to-one DB
- relationships isn't even implemented https://github.com/spring-projects/spring-data-r2dbc/issues/356
  - frustratingly, this will compile, and it will only throw an error when you try to save an entity like the following:

nested querying is also not supported https://stackoverflow.com/questions/61211628/spring-data-r2dbc-how-to-query-hierarchical-data

---------------

2022-08-30 07:14:40.836 ERROR 39455 --- [ctor-http-nio-3] a.w.r.e.AbstractErrorWebExceptionHandler : [a6121d13-2]  500 Server Error for HTTP POST "/api/public/killafter/products"

java.lang.IllegalArgumentException: Unsupported array type: com.yao.jason.homebarservice.components.orders.OrderItemEntity
at org.springframework.data.r2dbc.dialect.PostgresDialect$R2dbcArrayColumns.getArrayType(PostgresDialect.java:164) ~[spring-data-r2dbc-1.5.2.jar:1.5.2]
Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException:
Error has been observed at the following site(s):
*__checkpoint ⇢ Handler com.yao.jason.homebarservice.components.products.ProductKillafterController#addProduct(Mono) [DispatcherHandler]
*__checkpoint ⇢ org.springframework.web.filter.reactive.ServerWebExchangeContextFilter [DefaultWebFilterChain]
*__checkpoint ⇢ com.yao.jason.homebarservice.components.identity.jwt.OneTimeJwtProtectedRoutesFilter [DefaultWebFilterChain]
*__checkpoint ⇢ com.yao.jason.homebarservice.components.api.APIKeyRequestFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.web.server.authorization.AuthorizationWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.web.server.authorization.ExceptionTranslationWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.web.server.savedrequest.ServerRequestCacheWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.web.server.context.SecurityContextServerWebExchangeWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.web.server.context.ReactorContextWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.web.cors.reactive.CorsWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.web.server.header.HttpHeaderWriterWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.config.web.server.ServerHttpSecurity$ServerWebExchangeReactorContextWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.security.web.server.WebFilterChainProxy [DefaultWebFilterChain]
*__checkpoint ⇢ org.springframework.boot.actuate.metrics.web.reactive.server.MetricsWebFilter [DefaultWebFilterChain]
*__checkpoint ⇢ HTTP POST "/api/public/killafter/products" [ExceptionHandlingWebHandler]
Original Stack Trace:
at org.springframework.data.r2dbc.dialect.PostgresDialect$R2dbcArrayColumns.getArrayType(PostgresDialect.java:164) ~[spring-data-r2dbc-1.5.2.jar:1.5.2]
at org.springframework.data.r2dbc.core.DefaultReactiveDataAccessStrategy.getArrayValue(DefaultReactiveDataAccessStrategy.java:263) ~[spring-data-r2dbc-1.5.2.jar:1.5.2]
at org.springframework.data.r2dbc.core.DefaultReactiveDataAccessStrategy.getOutboundRow(DefaultReactiveDataAccessStrategy.java:209) ~[spring-data-r2dbc-1.5.2.jar:1.5.2]
at org.springframework.data.r2dbc.core.R2dbcEntityTemplate.lambda$doInsert$7(R2dbcEntityTemplate.java:585) ~[spring-data-r2dbc-1.5.2.jar:1.5.2]
at reactor.core.publisher.FluxFlatMap.trySubscribeScalarMap(FluxFlatMap.java:152) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.MonoFlatMap.subscribeOrReturn(MonoFlatMap.java:53) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.InternalMonoOperator.subscribe(InternalMonoOperator.java:57) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.MonoUsingWhen.subscribe(MonoUsingWhen.java:87) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.InternalMonoOperator.subscribe(InternalMonoOperator.java:64) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.MonoFlatMap$FlatMapMain.onNext(MonoFlatMap.java:157) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxMap$MapSubscriber.onNext(FluxMap.java:122) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxPeek$PeekSubscriber.onNext(FluxPeek.java:200) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxSwitchIfEmpty$SwitchIfEmptySubscriber.onNext(FluxSwitchIfEmpty.java:74) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxOnErrorResume$ResumeSubscriber.onNext(FluxOnErrorResume.java:79) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.Operators$MonoSubscriber.complete(Operators.java:1816) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.MonoFlatMap$FlatMapMain.onNext(MonoFlatMap.java:151) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxContextWrite$ContextWriteSubscriber.onNext(FluxContextWrite.java:107) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxMapFuseable$MapFuseableConditionalSubscriber.onNext(FluxMapFuseable.java:299) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxFilterFuseable$FilterFuseableConditionalSubscriber.onNext(FluxFilterFuseable.java:337) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.Operators$MonoSubscriber.complete(Operators.java:1816) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.MonoCollect$CollectSubscriber.onComplete(MonoCollect.java:160) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxMap$MapSubscriber.onComplete(FluxMap.java:144) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxPeek$PeekSubscriber.onComplete(FluxPeek.java:260) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxMap$MapSubscriber.onComplete(FluxMap.java:144) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.netty.channel.FluxReceive.terminateReceiver(FluxReceive.java:468) ~[reactor-netty-core-1.0.21.jar:1.0.21]
at reactor.netty.channel.FluxReceive.drainReceiver(FluxReceive.java:260) ~[reactor-netty-core-1.0.21.jar:1.0.21]
at reactor.netty.channel.FluxReceive.request(FluxReceive.java:129) ~[reactor-netty-core-1.0.21.jar:1.0.21]
at reactor.core.publisher.FluxMap$MapSubscriber.request(FluxMap.java:164) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxPeek$PeekSubscriber.request(FluxPeek.java:138) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxMap$MapSubscriber.request(FluxMap.java:164) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.MonoCollect$CollectSubscriber.onSubscribe(MonoCollect.java:104) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxMap$MapSubscriber.onSubscribe(FluxMap.java:92) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxPeek$PeekSubscriber.onSubscribe(FluxPeek.java:171) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.core.publisher.FluxMap$MapSubscriber.onSubscribe(FluxMap.java:92) ~[reactor-core-3.4.21.jar:3.4.21]
at reactor.netty.channel.FluxReceive.startReceiver(FluxReceive.java:167) ~[reactor-netty-core-1.0.21.jar:1.0.21]
at reactor.netty.channel.FluxReceive.lambda$subscribe$2(FluxReceive.java:146) ~[reactor-netty-core-1.0.21.jar:1.0.21]
at io.netty.util.concurrent.AbstractEventExecutor.runTask$$$capture(AbstractEventExecutor.java:174) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at io.netty.util.concurrent.AbstractEventExecutor.runTask(AbstractEventExecutor.java) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at io.netty.util.concurrent.AbstractEventExecutor.safeExecute$$$capture(AbstractEventExecutor.java:167) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at io.netty.util.concurrent.AbstractEventExecutor.safeExecute(AbstractEventExecutor.java) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at io.netty.util.concurrent.SingleThreadEventExecutor.runAllTasks(SingleThreadEventExecutor.java:470) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at io.netty.channel.nio.NioEventLoop.run(NioEventLoop.java:503) ~[netty-transport-4.1.79.Final.jar:4.1.79.Final]
at io.netty.util.concurrent.SingleThreadEventExecutor$4.run(SingleThreadEventExecutor.java:997) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at io.netty.util.internal.ThreadExecutorMap$2.run(ThreadExecutorMap.java:74) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30) ~[netty-common-4.1.79.Final.jar:4.1.79.Final]
at java.base/java.lang.Thread.run(Thread.java:833) ~[na:na]
----------------


- transactionality is unknown in fluxes and mono
- caching requires weird workarounds

learnings:
records and projections are the future

# the infra

https://www.digitalocean.com/products/app-platform

# 
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
