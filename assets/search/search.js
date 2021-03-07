var idx, searchInput, searchResults = null
var documents = {}

function createSearchResult(resultData) {
  // create result item
  var article = document.createElement('article')
  article.classList.add('search-result');
  article.innerHTML = `
  <a href="${resultData.permalink}"><h3 class="search-title">${resultData.title}</h3></a>
  <img width="150" src="${resultData.thumbnail}" />
  <p class="search-summary">${resultData.summary}</p>
  <br>
  `
  return article;
}

function renderSearchResults(results) {
    if (results.length > 0) {
        // show max 10 results
        if (results.length > 9){
            results = results.slice(0,10)
        }

        // reset search results
        searchResults.innerHTML = ''

        // append results
        results.forEach(result => {
          const resultData = documents[result.ref];
          const renderedSearchResult = createSearchResult(resultData);
          searchResults.appendChild(renderedSearchResult)
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

     // TODO: Add in date, reading time, and other metadata


      // index document
      idx = lunr(function() {
        this.ref('permalink');
        this.field('title');
        this.field('categories');
        this.field('tags');
        this.field('content');
        this.field('summary');

        ({ posts } = response);

        posts.forEach(function(doc) {
          this.add({
            'permalink': doc.metadata.permalink,
            'title': doc.metadata.title,
            'categories': doc.metadata.categories,
            'tags': doc.metadata.tags,
            'content': doc.data.content,
            'thumbnail': doc.metadata.thumbnail,
            'summary': doc.metadata.summary,
          });
          documents[doc.metadata.permalink] = {
            'permalink': doc.metadata.permalink,
            'title': doc.metadata.title,
            'categories': doc.metadata.categories,
            'tags': doc.metadata.tags,
            'content': doc.data.content,
            'thumbnail': doc.metadata.thumbnail,
            'summary': doc.metadata.summary,
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
