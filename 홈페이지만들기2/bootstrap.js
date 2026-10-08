'use strict';
window.SITE_CONTENT={};window.SITE_SETTINGS={};
(async()=>{
 let published={};try{const response=await fetch('data/content.json',{cache:'no-cache'});if(response.ok)published=await response.json();}catch{}
 let saved=null;try{saved=await new Promise((resolve,reject)=>{const r=indexedDB.open('busan-hanil-photos',1);r.onupgradeneeded=()=>r.result.createObjectStore('album');r.onerror=()=>reject(r.error);r.onsuccess=()=>{const d=r.result,tx=d.transaction('album'),q=tx.objectStore('album').get('site-content');q.onsuccess=()=>resolve(q.result??null);q.onerror=()=>reject(q.error);tx.oncomplete=()=>d.close();};});}catch{}
 const content=saved??published;window.SITE_CONTENT=content&&typeof content==='object'?content:{};
 window.SITE_SETTINGS={name:'부산한일라이온스',intro:'우리의 이야기와 봉사의 기록, 함께 살아가는 지역의 정보를 한곳에서.',editor:'',newsTitle:'오늘의 주요뉴스 · 복지와 건강',newsQuery:'사회복지 심리 AI 노인건강',newsMode:'auto',weatherStart:'2026-10-01',weatherEnd:'2026-10-08',weatherCity:'busan',visibility:{},...(window.SITE_CONTENT.settings||{})};
 for(const [key,value] of Object.entries(window.SITE_CONTENT.clubData||{})){if(Array.isArray(value))window.CLUB_DATA[key]=value;}
 const settings=window.SITE_SETTINGS;const logo=document.getElementById('site-logo');if(typeof settings.logo==='string'&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(settings.logo)){logo.src=settings.logo;logo.hidden=false;}document.title=settings.name+' · 나눔을 잇는 부산';const brand=document.querySelector('header .brand>span');if(brand){const small=brand.querySelector('small');brand.replaceChildren(document.createTextNode(settings.name),small);}document.querySelector('.hero-content p').textContent=settings.intro;
 document.getElementById('news-heading').textContent=settings.newsTitle;document.getElementById('weather-start').value=settings.weatherStart;document.getElementById('weather-end').value=settings.weatherEnd;
 for(const [id,visible] of Object.entries(settings.visibility||{})){const section=document.getElementById(id);if(section)section.hidden=visible===false;}
 if(settings.editor){const note=document.createElement('p');note.textContent='편집 담당: '+settings.editor;document.querySelector('footer .wrap').append(note);}
 for(const src of ['dashboard.js','admin.js'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=reject;document.head.append(script);});
})().catch(()=>{document.getElementById('login-status').textContent='화면 파일을 불러오지 못했습니다. bootstrap.js, dashboard.js, admin.js 업로드를 확인하세요.';});
