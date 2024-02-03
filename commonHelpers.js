import{S as c,i as l}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const i={form:document.querySelector("#form"),input:document.querySelector(".input"),container:document.querySelector(".container"),loading:document.querySelector(".loading")},u=new c(".container a",{});i.form.addEventListener("submit",t=>{t.preventDefault();const o=t.currentTarget,r=o.elements.query.value;r.trim()&&(i.loading.style.display="block",h(r).then(g).catch(m).finally(()=>{o.reset(),i.loading.style.display="none"}))});const p="42114323-50c2b50fedad4076dc7ba42b5",d="https://pixabay.com/api/";function f(t){return`${d}?key=${p}&image_type=photo&orientation=horizontal&safesearch=true&q=${t}`}function h(t){const o=f(t);return fetch(o).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()}).then(({hits:r})=>r)}function m(){l.error({title:"Sorry, something went wrong."})}function y(){l.error({title:"Sorry, there are no images matching your search query. Please try again!"})}function g(t){if(t.length===0)return i.container.innerHTML="",y();b(t),u.refresh()}function b(t){const o=t.map(r=>_(r)).join(" ");console.log(o),i.container.innerHTML=o}function _({webformatURL:t,largeImageURL:o,tags:r,likes:a,views:e,comments:n,downloads:s}){return`
    <a href="${o}">
    <div class="card">
    <img src="${t}" alt="${r}">
<ul class="photo_details">
<li>
<span class="photo_details_paragraph">Likes</span><br>
<span>${a}</span>
</li>
<li>
<span class="photo_details_paragraph">Views</span><br>
<span>${e}</span>
</li>
<li>
<span class="photo_details_paragraph">Comments</span><br>
<span>${n}</span>
</li>
<li>
<span class="photo_details_paragraph">Downloads</span><br>
<span>${s}</span>
</li>
</ul>
    </div>
    </a>
    `}
//# sourceMappingURL=commonHelpers.js.map
