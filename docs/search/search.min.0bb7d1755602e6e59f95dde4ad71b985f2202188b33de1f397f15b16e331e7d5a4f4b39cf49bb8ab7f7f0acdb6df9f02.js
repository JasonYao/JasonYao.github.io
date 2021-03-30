var idx,searchInput,searchResults=null,documents={};function parseISOString(b){var a=b.split(/\D+/);return new Date(Date.UTC(a[0],--a[1],a[2],a[3],a[4],a[5],a[6]))}function kebab(a){const b=a.replace(/\s+/g,'-').toLowerCase();return b}function createSearchResult(a){const b=document.createElement('article');b.classList.add('search-result'),b.classList.add('post');const c={weekday:'short',year:'numeric',month:'short',day:'numeric'},d=parseISOString(a.publish_date),e=d.toLocaleDateString("en-US",c);b.innerHTML=`
  <div class="post-content">
      <div class="post-thumbnail">
          <a href="${a.permalink}">
              <img width="150" src="/${a.thumbnail}" alt="${a.thumbnail_alt_text}" loading="lazy">
          </a>
      </div>

      <div class="post-title">
          <a href="${a.permalink}">
              <h3>${a.title}</h3>
          </a>
      </div>

      <div class="post-content">
          <div class="p_part"><p>${a.summary}</p></div>
      </div>
  </div>

  <div class="post-footer">
      <div>
          <div class="info">
              <!-- Displays the publish date instead of date when post was started -->
              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-calendar"></use>
              </svg>

              <time datetime="${a.publish_date}">
              ${e}
              </time>

              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-stopwatch"></use>
              </svg>
              <span class="reading-time">${a.reading_time}</span>

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
  </div>`;const f=a.categories,g=b.getElementsByClassName('category-wrapper')[0];f.forEach(b=>{const c=kebab(b),a=document.createElement('a'),d=document.createTextNode(b);a.appendChild(d),a.classList.add('category'),a.href=`/categories/${c}/`,g.appendChild(a)});const h=a.tags,i=b.getElementsByClassName('tag-wrapper')[0];return h.forEach(b=>{const c=kebab(b),a=document.createElement('a'),d=document.createTextNode(b);a.appendChild(d),a.classList.add('tag'),a.href=`/tags/${c}/`,i.appendChild(a)}),b}function renderSearchResults(a){a.length>0?(a.length>9&&(a=a.slice(0,10)),searchResults.innerHTML='',a.forEach(a=>{const b=documents[a.ref],c=createSearchResult(b);searchResults.appendChild(c)})):searchResults.innerHTML='<p>No results found.</p>'}function registerSearchHandler(){searchInput.oninput=function(c){var a,b;searchInput.value==''?searchResults.innerHTML='':(a=c.target.value,b=idx.search(a+'*'),renderSearchResults(b))},searchInput.focus(),searchInput.placeholder=''}window.onload=function(){searchInput=document.getElementById('search-input'),searchResults=document.getElementById('search-results'),fetch('/posts/index.json',{method:'get'}).then(a=>a.json()).then(a=>{idx=lunr(function(){this.ref('permalink'),this.field('title'),this.field('categories'),this.field('tags'),this.field('content'),this.field('summary'),{posts}=a,posts.forEach(function(a){this.add({permalink:a.metadata.permalink,title:a.metadata.title,categories:a.metadata.categories,tags:a.metadata.tags,content:a.data.content,thumbnail:a.metadata.thumbnail,summary:a.metadata.summary}),documents[a.metadata.permalink]={permalink:a.metadata.permalink,title:a.metadata.title,categories:a.metadata.categories,tags:a.metadata.tags,content:a.data.content,thumbnail:a.metadata.thumbnail,thumbnail_alt_text:a.metadata.thumbnail_alt_text,summary:a.metadata.summary,publish_date:a.metadata.published_on,reading_time:a.metadata.reading_time}},this)}),registerSearchHandler()}).catch(a=>{searchResults.innerHTML=`<p>${a}</p>`})}