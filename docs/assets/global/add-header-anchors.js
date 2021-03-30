/* Enables direct deep linking to titles in a post, originally from https://discourse.gohugo.io/t/adding-anchor-next-to-headers/1726/10 */
function addAnchor(element) {
    element.insertAdjacentHTML('beforeend', `<a href="#${element.id}" class="hanchor" ariaLabel="Anchor">🔗&#xFE0E;</a>` )
}

document.addEventListener('DOMContentLoaded', function () {
    // Add anchor links to all headings
    var headers = document.querySelectorAll('article h1[id], article h2[id], article h3[id], article h4[id]')
    if (headers) {
        headers.forEach(addAnchor)
    }
});
