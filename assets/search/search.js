var idx, searchInput, searchResults = null
var documents = {}

// From https://stackoverflow.com/a/27013409
//   God I hate JS. the fact that there's no Date.from(s) or DateTime.from(s)
//   in the stdlib is crazy stupid.
function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function kebab(str) {
  const kebabString = str.replace(/\s+/g, '-').toLowerCase();
  return kebabString;
}

function createSearchResult(resultData) {
  // create result item
  const article = document.createElement('article')
  article.classList.add('search-result');
  article.classList.add('post');

  const dateFormatConfig = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const publishedDate = parseISOString(resultData.publish_date);
  const formattedDate = publishedDate.toLocaleDateString("en-US", dateFormatConfig);

  article.innerHTML = `
  <div class="post-content">
      <div class="post-thumbnail">
          <a href="${resultData.permalink}">
              <img width="150" src="/${resultData.thumbnail}" alt="${resultData.thumbnail_alt_text}" loading="lazy">
          </a>
      </div>

      <div class="post-title">
          <a href="${resultData.permalink}">
              <h3>${resultData.title}</h3>
          </a>
      </div>

      <div class="post-content">
          <div class="p_part"><p>${resultData.summary}</p></div>
      </div>
  </div>

  <div class="post-footer">
      <div>
          <div class="info">
              <!-- Displays the publish date instead of date when post was started -->
              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-calendar"></use>
              </svg>

              <time datetime="${resultData.publish_date}">
              ${formattedDate}
              </time>

              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-stopwatch"></use>
              </svg>
              <span class="reading-time">${resultData.reading_time}</span>

              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-list"></use>
              </svg>
              <span class="separator category-wrapper"></span>

              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-tag"></use>
              </svg>
              <span class="separator tag-wrapper"></span>
          </div>
      </div>
  </div>`

  const categories = resultData.categories;
  const categoryWrapper = article.getElementsByClassName('category-wrapper')[0];
  categories.forEach((category) => {
    const kebabCategory = kebab(category);
    const categoryElement = document.createElement('a')
    const categoryLinkText = document.createTextNode(category);
    categoryElement.appendChild(categoryLinkText);

    categoryElement.classList.add('category');
    categoryElement.href = `/categories/${kebabCategory}/`;
    categoryWrapper.appendChild(categoryElement);
  });

  const tags = resultData.tags;
  const tagWrapper = article.getElementsByClassName('tag-wrapper')[0];
  tags.forEach((tag) => {
    const kebabTag = kebab(tag);
    const tagElement = document.createElement('a')
    const tagLinkText = document.createTextNode(tag);
    tagElement.appendChild(tagLinkText);

    tagElement.classList.add('tag');
    tagElement.href = `/tags/${kebabTag}/`;
    tagWrapper.appendChild(tagElement);
  });

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
            'thumbnail_alt_text': doc.metadata.thumbnail_alt_text,
            'summary': doc.metadata.summary,
            'publish_date': doc.metadata.published_on,
            'reading_time': doc.metadata.reading_time
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
