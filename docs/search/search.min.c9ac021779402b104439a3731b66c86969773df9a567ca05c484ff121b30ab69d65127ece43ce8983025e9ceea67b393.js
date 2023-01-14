var idx,searchInput,searchResults=null,documents={};function parseISOString(e){var t=e.split(/\D+/);return new Date(Date.UTC(t[0],--t[1],t[2],t[3],t[4],t[5],t[6]))}function kebab(e){const t=e.replace(/\s+/g,"-").toLowerCase();return t}function createSearchResult(e){const t=document.createElement("article");t.classList.add("search-result"),t.classList.add("post");const n={weekday:"short",year:"numeric",month:"short",day:"numeric"},s=parseISOString(e.publish_date),o=s.toLocaleDateString("en-US",n);t.innerHTML=`
  <div class="post-content">
      <div class="post-thumbnail">
          <a href="${e.permalink}">
              <img width="150" src="${e.thumbnail}" alt="${e.thumbnail_alt_text}" loading="lazy">
          </a>
      </div>

      <div class="post-title">
          <a href="${e.permalink}">
              <h3>${e.title}</h3>
          </a>
      </div>

      <div class="post-content">
          <div class="p_part"><p>${e.summary}</p></div>
      </div>
  </div>

  <div class="post-footer">
      <div>
          <div class="info">
              <!-- Displays the publish date instead of date when post was started -->
              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-calendar"></use>
              </svg>

              <time datetime="${e.publish_date}">
              ${o}
              </time>

              <svg style="font-size: 1em;" class="svg-icon">
                <use xlink:href="#icon-stopwatch"></use>
              </svg>
              <span class="reading-time">${e.reading_time}</span>

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
  </div>`;const i=e.categories,a=t.getElementsByClassName("category-wrapper")[0];i.forEach(e=>{const n=kebab(e),t=document.createElement("a"),s=document.createTextNode(e);t.appendChild(s),t.classList.add("category"),t.href=`/categories/${n}/`,a.appendChild(t)});const r=e.tags,c=t.getElementsByClassName("tag-wrapper")[0];return r.forEach(e=>{const n=kebab(e),t=document.createElement("a"),s=document.createTextNode(e);t.appendChild(s),t.classList.add("tag"),t.href=`/tags/${n}/`,c.appendChild(t)}),t}function renderSearchResults(e){e.length>0?(e.length>9&&(e=e.slice(0,10)),searchResults.innerHTML="",e.forEach(e=>{const t=documents[e.ref],n=createSearchResult(t);searchResults.appendChild(n)})):searchResults.innerHTML="<p>No results found.</p>"}function registerSearchHandler(){searchInput.oninput=function(e){if(searchInput.value=="")searchResults.innerHTML="";else{var t=e.target.value,n=idx.search(t+"*");renderSearchResults(n)}},searchInput.focus(),searchInput.placeholder=""}window.onload=function(){searchInput=document.getElementById("search-input"),searchResults=document.getElementById("search-results"),fetch("/posts/index.json",{method:"get"}).then(e=>e.json()).then(e=>{idx=lunr(function(){this.ref("permalink"),this.field("title"),this.field("categories"),this.field("tags"),this.field("content"),this.field("summary"),{posts}=e,posts.forEach(function(e){const t=e.metadata.thumbnail.startsWith("global/")?e.metadata.thumbnail:e.metadata.permalink+e.metadata.thumbnail;this.add({permalink:e.metadata.permalink,title:e.metadata.title,categories:e.metadata.categories,tags:e.metadata.tags,content:e.data.content,thumbnail:t,summary:e.metadata.summary}),documents[e.metadata.permalink]={permalink:e.metadata.permalink,title:e.metadata.title,categories:e.metadata.categories,tags:e.metadata.tags,content:e.data.content,thumbnail:t,thumbnail_alt_text:e.metadata.thumbnail_alt_text,summary:e.metadata.summary,publish_date:e.metadata.published_on,reading_time:e.metadata.reading_time}},this)}),registerSearchHandler()}).catch(e=>{searchResults.innerHTML=`<p>${e}</p>`})}