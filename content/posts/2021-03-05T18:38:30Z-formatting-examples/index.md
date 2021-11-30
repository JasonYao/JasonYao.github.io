---
title: "Draft Post With Formatting Examples"
slug: 2021-03-05T18:38:30Z-hello-world
date: 2021-03-04T02:38:30+08:00
summary: An example post for metadata purposes to see how things render
publishdate: 2021-03-05T02:38:30+08:00
categories: ["development practices", "tutorial", "tips & tricks", "portfolio"]
tags: ["replaceme", "todo"]
#thumbnail: "assets/posts/2021-03-05T18:38:30Z-hello-world/hero.jpg"
thumbnail: "global/default-hamilton.png"
thumbnail_alt_text: "If you're reading this you probably need a hobby- have you considered DnD?"
draft: true
---

## Testing out syntax highlighting in this new platform
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
{{< img src="images/watermelon-hat.jpg" alt="For the days when you just want a watermelon hat" >}}

## Linking example
- Here's an example where we link to
[another article]({{< ref "/posts/2017-05-22T00:00:00Z-a-canadian-existential-crisis-introduction" >}} "example link alt text")

## Text emphasis with color
- Here we have normal text with a {{< strong text="subsection in color" >}} in the middle

## Adding in a figure (image with some text underneath it)
{{<figure src="images/watermelon-hat.jpg" title="For the days when you just want a watermelon hat">}}

## Formatting a table
- Remember that markdown tables require 3 hyphens in each column between the header and data rows

| Option | Description |
|---|---|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

## Coloring example
* blah blah {{<colored text="foo" bg-color="green" text-color="white">}} something

## Adding in a basic small image (useful for set-sized emojis/gifs)
{{<basic-image src="images/watermelon-hat.jpg" height="50px" width="50px">}}
