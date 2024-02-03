import{a as b,S as _,i as p}from"./assets/vendor-b52d9f5e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const L="42114323-50c2b50fedad4076dc7ba42b5",P="https://pixabay.com",S=15,w=b.create({baseURL:P}),s={form:document.querySelector("#form"),input:document.querySelector(".input"),container:document.querySelector(".container"),loading:document.querySelector(".loading"),loadMore:document.querySelector("#load-more")},E=new _(".container a");let l=1,c="",d=[];s.form.addEventListener("submit",e=>{e.preventDefault(e);const t=I();t.trim()&&(Q(),g(),c=t,y(t,l))});s.loadMore.addEventListener("click",()=>{c.trim()&&(l=l+1,y(c,l))});async function y(e,t){f(!0),h(!1);let r=!0;try{r=await q(e,t)}catch{N()}f(!1),h(r),form.reset()}async function q(e,t){const{photos:r,total:i}=await A(e,t);if(d.push(...r),r.length===0)return g(),B(),!1;if(C(r),t!==1){const o=x();window.scrollBy({top:o*2,behavior:"smooth"})}return i===d.length?(t!==1&&M(),!1):(E.refresh(),!0)}async function A(e,t){const r=v(e,t),i=await w.get("api/",r);return{photos:i.data.hits,total:i.data.totalHits}}function v(e,t=1){return{params:{key:L,image_type:"photo",orientation:"horizontal",safesearch:!0,q:e,per_page:S,page:t}}}function N(){p.error({title:"Sorry, something went wrong."})}function M(){p.info({title:"We're sorry, but you've reached the end of search results."})}function B(){p.error({title:"Sorry, there are no images matching your search query. Please try again!"})}function C(e){const t=e.map($);s.container.append(...t)}function $({webformatURL:e,largeImageURL:t,tags:r,likes:i,views:o,comments:n,downloads:a}){const u=document.createElement("a");return u.href=t,u.innerHTML=`
    <div class="card">
        <img src="${e}" alt="${r}">
        <ul class="photo_details">
            <li>
                <span class="photo_details_paragraph">Likes</span><br>
                <span>${i}</span>
            </li>
            <li>
                <span class="photo_details_paragraph">Views</span><br>
                <span>${o}</span>
            </li>
            <li>
                <span class="photo_details_paragraph">Comments</span><br>
                <span>${n}</span>
            </li>
            <li>
                <span class="photo_details_paragraph">Downloads</span><br>
                <span>${a}</span>
            </li>
        </ul>
    </div>
    `,u}function f(e){m(s.loading,e)}function h(e){m(s.loadMore,e)}function m(e,t){if(t){e.style.display="block";return}e.style.display="none"}function x(){return document.querySelector(".card").getBoundingClientRect().height}function I(){return form.elements.query.value}function g(){s.container.innerHTML=""}function Q(){c="",l=1,d=[]}
//# sourceMappingURL=commonHelpers.js.map
