---
title: "Search"
description: "When you're looking for that post and realize you can also search by SHA hashes"
date: "2021-03-04T02:38:30+08:00"
---

<script type="text/javascript">
var idx, searchInput, searchResults = null
var documents = {}

function renderSearchResults(results){

    if (results.length > 0) {

        // show max 10 results
        if (results.length > 9){
            results = results.slice(0,10)
        }

        // reset search results
        searchResults.innerHTML = ''

        // append results
        results.forEach(result => {

            // create result item
            var article = document.createElement('article')
            article.innerHTML = `
            <a href="${result.ref}"><h3 class="title">${documents[result.ref].title}</h3></a>
            <p><a href="${result.ref}">${result.ref}</a></p>
            <br>
            `
            searchResults.appendChild(article)
        })

    // if results are empty
    } else {
        searchResults.innerHTML = '<p>No results found.</p>'
    }
}


function registerSearchHandler() {

    // register on input event
    searchInput.oninput = function(event) {

        // remove search results if the user empties the search input field
        if (searchInput.value == '') {

            searchResults.innerHTML = ''
        } else {

            // get input value
            var query = event.target.value

            // run fuzzy search
            var results = idx.search(query + '*')

            // render results
            renderSearchResults(results)
        }
    }

    // set focus on search input and remove loading placeholder
    searchInput.focus()
    searchInput.placeholder = ''
}

window.onload = function() {
    // get dom elements
    searchInput = document.getElementById('search-input')
    searchResults = document.getElementById('search-results')

    // request and index documents
    fetch('/posts/index.json', {
        method: 'get'
    })
    .then((response) => response.json())
    .then((response) => {
      // index document
      idx = lunr(function() {
        this.ref('permalink');
        this.field('title');
        this.field('categories');
        this.field('tags');
        this.field('content');

        ({ posts } = response);

        posts.forEach(function(doc) {
          this.add({
            'permalink': doc.metadata.permalink,
            'title': doc.metadata.title,
            'categories': doc.metadata.categories,
            'tags': doc.metadata.tags,
            'content': doc.data.content,
          });
          documents[doc.metadata.permalink] = {
            'title': doc.metadata.title,
            'categories': doc.metadata.categories,
            'tags': doc.metadata.tags,
            'content': doc.data.content,
          };
        }, this)
      })

      // data is loaded, next register handler
      registerSearchHandler()
    })
    .catch((err) => {
      searchResults.innerHTML = `<p>${err}</p>`
    });
}
</script>

<input id="search-input" type="text" placeholder="Loading..." name="search">

<section id="search-results" class="search"></section>
