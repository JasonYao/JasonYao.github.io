---
title: "{{ .File.TranslationBaseName | replaceRE "^.{1,21}" "" | replaceRE "-" " " | title }}"
slug: {{ .File.TranslationBaseName | replaceRE "^.{1,21}" "" }}
date: {{ .Date }}
#summary: REPLACEME (if left commented, it'll default to the first bit of the content itself)
publishdate: {{ .Date }}
categories: ["development practices", "tutorial", "tips & tricks", "portfolio"]
tags: ["replaceme", "todo"]
#thumbnail: "assets/posts/{{ .Name }}/hero.jpg"
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

### Using a shortcode to display a list of cards
{ {< global/CardList >} }
{ {< global/CardListItem title="B" description="some description B" img="http://localhost:1313/about/images/recruiter-flowchart.drawio.png" >} }
{ {< global/CardListItem title="C" description="some description C" img="http://localhost:1313/about/images/recruiter-flowchart.drawio.png" >} }
{ {< global/CardListItem title="D" description="some description D" img="http://localhost:1313/about/images/recruiter-flowchart.drawio.png" >} }
{ {< /global/CardList >}}
