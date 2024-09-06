import{a as m,i as l,S as p}from"./assets/vendor-u8rapaCG.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const b="45704413-78352b289562c0261d4e7c072";m.defaults.baseURL="https://pixabay.com/api/";const w=15;async function $(e,r=1){try{const s=await m.get("",{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:w}});return console.log("Response data:",s.data),s.data}catch(s){throw console.error("Error fetching gallery data:",s),iziToast.error({title:"Error",message:`Ошибка: ${s.message}`,position:"topRight"}),s}}function f(e){e.insertAdjacentHTML("afterbegin",'<span class="loader">Loading...</span>')}h();function h(){try{const e=document.querySelector(".loader");e&&e.remove()}catch(e){console.error("Ошибка при удалении загрузчика:",e),iziToast.error({title:"Error",message:`Ошибка: ${e.message}`,position:"topRight"})}}function v(e){return e.hits.map(({webformatURL:r,largeImageURL:s,tags:n,likes:t,views:o,comments:i,downloads:L})=>`
        <li class="gallery-item hvr-grow">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${n}"
              loading="lazy"
            />
          </a>
          <ul class="img-content-wrapper">
            <li class="img-content-descr">Likes<span>${t}</span></li>
            <li class="img-content-descr">Views<span>${o}</span></li>
            <li class="img-content-descr">Comments<span>${i}</span></li>
            <li class="img-content-descr">Downloads<span>${L}</span></li>
          </ul>
        </li>
      `).join("")}const E=document.querySelector(".search-form"),c=document.querySelector(".gallery"),d=document.querySelector(".load-more");let a="",u="",g=1;E.addEventListener("submit",S);d.addEventListener("click",q);function S(e){e.preventDefault();const r=new FormData(e.target),{searchQuery:s}=Object.fromEntries(r.entries());if(u=s.trim(),!u){l.error({title:"Error",message:"The search query is empty.",position:"topRight"});return}c.innerHTML="",g=1,f(c),d.classList.add("is-hidden"),a&&a instanceof p&&(a.destroy(),a=null),y()}async function y(){try{const e=await $(u,g);if(e.hits.length===0){l.info({position:"topRight",title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}const r=v(e);c.insertAdjacentHTML("beforeend",r),a?a.refresh():a=new p(".gallery a",{captionsData:"alt",captionDelay:250}),e.hits.length===15?d.classList.remove("is-hidden"):(l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),d.classList.add("is-hidden"))}catch(e){l.error({title:"Error",message:`Error: ${e.message}`,position:"topRight"})}finally{h()}}function q(){g+=1,f(c),y().then(()=>{const e=document.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*3,behavior:"smooth"})}})}
//# sourceMappingURL=index.js.map
