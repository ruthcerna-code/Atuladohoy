/* Lógica de la página: banner, filtros, resultados y favoritos. */
const st={q:'',tab:'all',types:new Set(),cats:new Set(),mods:new Set(),prices:new Set(),comunas:new Set(),pubs:new Set(),ver:false,sort:'rel'};
const openG=new Set(GROUPS.filter(g=>!g.closed).map(g=>g.k));
const favs=new Set();
const $=id=>document.getElementById(id);
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const money=n=>'$'+n.toLocaleString('es-CL');
const toResults=()=>$('results').scrollIntoView({behavior:'smooth',block:'start'});
$('proImg').src=IMG.pro_man;
$('comunaTop').innerHTML='<option value="">Santiago</option>'+COMUNAS.map(c=>`<option>${c}</option>`).join('');

/* ---------- Banner rotativo ---------- */
const SLIDES=[
 {tag:'Destacado · Publicidad',t:'Programa de mindfulness de 8 semanas',d:'Aprende a manejar el estrés desde tu casa, a tu ritmo.',cta:'Ver programa',img:'yoga2',bg:'bg-psi',fg:'text-psiI',go:()=>{clearAll(false);st.q='mindfulness';$('q').value='mindfulness'}},
 {tag:'Programas municipales',t:'Actividades gratuitas en tu comuna',d:'Talleres de respiración, yoga en el parque y encuentros para cuidadores.',cta:'Ver gratuitos',img:'yoga3',bg:'bg-com',fg:'text-comI',go:()=>{clearAll(false);st.tab='gratis'}},
 {tag:'Destacado · Publicidad',t:'Kinesiología a domicilio para personas mayores',d:'Profesionales con título verificado que van a tu casa.',cta:'Ver kinesiología',img:'kine_dom',bg:'bg-fis',fg:'text-fisI',go:()=>{clearAll(false);st.cats.add('Kinesiología')}},
 {tag:'Para profesionales',t:'Publica tus servicios y llega a más personas',d:'Psicólogos, facilitadores, pymes y fundaciones de Santiago.',cta:'Ofrece tus servicios',img:'pro_man',bg:'bg-comp',fg:'text-compI',go:null}];
let slide=0,timer=null;
$('track').innerHTML=SLIDES.map((s,i)=>`<div class="w-full shrink-0 ${s.bg}" role="group" aria-roledescription="diapositiva" aria-label="${i+1} de ${SLIDES.length}">
  <div class="max-w-6xl mx-auto px-4 md:px-16 pt-6 pb-20 md:pt-8 md:pb-20 grid grid-cols-[1fr_96px] sm:grid-cols-[1fr_200px] md:grid-cols-[1fr_380px] gap-4 md:gap-10 items-center">
    <div class="min-w-0">
      <span class="text-[11px] font-extrabold uppercase tracking-[.12em] ${s.fg}">${s.tag}</span>
      <h2 class="mt-2 font-serif text-2xl md:text-[2.4rem] md:leading-tight font-semibold text-navy">${s.t}</h2>
      <p class="mt-2 text-sm md:text-base text-ink max-w-md">${s.d}</p>
      <button data-slide="${i}" class="mt-4 inline-flex items-center gap-2 h-10 md:h-11 px-5 rounded-full bg-coral hover:bg-coralh text-oncoral text-sm font-bold">${s.cta}<i data-lucide="arrow-right" class="w-4 h-4"></i></button>
    </div>
    <img src="${IMG[s.img]}" alt="" class="w-full aspect-square md:aspect-[16/10] object-cover rounded-2xl md:rounded-[28px] self-start md:self-center">
  </div></div>`).join('');
$('dots').innerHTML=SLIDES.map((_,i)=>`<button data-dot="${i}" class="h-2 rounded-full transition-all" aria-label="Ir a la diapositiva ${i+1}"></button>`).join('');
function goTo(i){slide=(i+SLIDES.length)%SLIDES.length;$('track').style.transform=`translateX(-${slide*100}%)`;
  document.querySelectorAll('[data-dot]').forEach((d,j)=>{d.className=`h-2 rounded-full transition-all ${j===slide?'w-6 bg-navybg':'w-2 bg-ink opacity-30'}`;d.setAttribute('aria-current',j===slide)})}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const play=()=>{if(reduce)return;clearInterval(timer);timer=setInterval(()=>goTo(slide+1),6000)};
$('prev').onclick=()=>{goTo(slide-1);play()};$('next').onclick=()=>{goTo(slide+1);play()};
$('banner').addEventListener('mouseenter',()=>clearInterval(timer));$('banner').addEventListener('mouseleave',play);
let sx=null;$('banner').addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
$('banner').addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40){goTo(slide+(dx<0?1:-1));play()}sx=null});
goTo(0);play();

/* ---------- Accesos rápidos (tarjetas) ---------- */
const SHORT=[
 {t:'Gratuitos esta semana',d:'Programas municipales y de fundaciones',ic:'gift',T:'com',n:()=>S.filter(s=>s.price===0).length,go:()=>{st.tab='gratis'}},
 {t:'Desde tu casa',d:'Sesiones y programas online',ic:'laptop',T:'fis',n:()=>S.filter(s=>s.mod.includes('Online')).length,go:()=>{st.tab='Online'}},
 {t:'Para personas mayores',d:'Kinesiología, talleres y compañía',ic:'sun',T:'comp',n:()=>S.filter(s=>s.pub.includes('Personas mayores')).length,go:()=>{st.pubs.add('Personas mayores')}},
 {t:'Hablar con alguien',d:'Psicólogos con título verificado',ic:'message-circle',T:'psi',n:()=>S.filter(s=>s.type==='psi').length,go:()=>{st.types.add('psi')}}];
$('shortcuts').innerHTML=SHORT.map((s,i)=>`<button data-short="${i}" class="w-60 md:w-auto shrink-0 text-left bg-surface border border-line rounded-2xl p-4 shadow-[0_6px_20px_rgba(16,40,60,.08)] hover:-translate-y-0.5 transition flex gap-3 items-start">
  <span class="w-11 h-11 rounded-full ${TYPES[s.T].bg} ${TYPES[s.T].fg} grid place-items-center shrink-0"><i data-lucide="${s.ic}" class="w-5 h-5"></i></span>
  <span class="min-w-0"><span class="block font-bold">${s.t}</span><span class="block text-xs text-muted">${s.d}</span>
  <span class="mt-2 inline-flex items-center gap-1 text-sm font-bold text-link tnum">${s.n()} opciones <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span></span></button>`).join('');

/* ---------- Opciones rápidas del encabezado ---------- */
const QUICK=[['gratis','Gratuitos','gift'],['Online','Online','laptop'],['Presencial','Presencial','map-pin'],['A domicilio','A domicilio','home']];
function drawQuick(){
  const pill=on=>`h-8 px-3 rounded-full text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap border ${on?'bg-navybg text-onnavy border-transparent':'bg-surface border-line hover:border-navy'}`;
  const nf=GROUPS.reduce((a,g)=>a+st[g.k].size,0)+(st.ver?1:0);
  $('quick').innerHTML=`<button id="openFilters" class="lg:hidden ${pill(false)}"><i data-lucide="sliders-horizontal" class="w-4 h-4"></i>Filtros${nf?` <span class="tnum">(${nf})</span>`:''}</button>`+
   QUICK.map(([k,l,ic])=>`<button data-tab="${k}" aria-pressed="${st.tab===k}" class="${pill(st.tab===k)}"><i data-lucide="${ic}" class="w-4 h-4"></i>${l}</button>`).join('')+
   `<button data-ver="1" aria-pressed="${st.ver}" class="${pill(st.ver)}"><i data-lucide="badge-check" class="w-4 h-4"></i>Título verificado</button>`+
   `<span class="w-px h-5 bg-line shrink-0"></span>`+
   CATS.map(([n,ic])=>`<button data-cat="${n}" aria-pressed="${st.cats.has(n)}" class="${pill(st.cats.has(n))}"><i data-lucide="${ic}" class="w-4 h-4"></i>${n}</button>`).join('');
}

$('catRow').innerHTML=CATS.map(([n,ic,t])=>`<button data-cat="${n}" class="cat aspect-square sm:aspect-[5/4] rounded-2xl ${TYPES[t].bg} ${TYPES[t].fg} flex flex-col items-center justify-center gap-2 border-2 border-transparent transition hover:-translate-y-0.5">
  <i data-lucide="${ic}" class="w-8 h-8 sm:w-9 sm:h-9" stroke-width="1.5"></i><span class="text-xs sm:text-sm font-semibold text-ink">${n}</span></button>`).join('');

/* ---------- Filtros y resultados ---------- */
const priceOk=(p,k)=>k==='gratis'?p===0:k==='h15'?p>0&&p<=15000:k==='h30'?p>15000&&p<=30000:p>30000;
const test={types:(s,v)=>s.type===v,cats:(s,v)=>s.cat===v,mods:(s,v)=>s.mod.includes(v),prices:(s,v)=>priceOk(s.price,v),comunas:(s,v)=>s.comuna===v,pubs:(s,v)=>s.pub.includes(v)};
function match(s,skip){
  if(st.q&&!norm([s.t,s.p,s.cat,TYPES[s.type].l,...s.pub].join(' ')).includes(norm(st.q)))return false;
  if(st.tab==='gratis'&&s.price!==0)return false;
  if(st.tab!=='all'&&st.tab!=='gratis'&&!s.mod.includes(st.tab))return false;
  if(st.ver&&s.ver!=='Título verificado')return false;
  for(const g of GROUPS){if(g.k===skip)continue;const set=st[g.k];if(set.size&&![...set].some(v=>test[g.k](s,v)))return false}
  return true;
}
function drawGroups(){
  $('fGroups').innerHTML=GROUPS.map(g=>{
    const base=S.filter(s=>match(s,g.k));
    return `<details class="border-b border-line py-4" data-group="${g.k}" ${openG.has(g.k)?'open':''}>
    <summary class="flex items-center justify-between text-sm font-bold">${g.l}${st[g.k].size?` <span class="ml-1 text-xs font-bold px-1.5 rounded-full bg-navybg text-onnavy tnum">${st[g.k].size}</span>`:''}<i data-lucide="chevron-down" class="chev ml-auto w-4 h-4 transition"></i></summary>
    <div class="mt-3 space-y-2.5">${g.opts.map(([v,l,T])=>{const n=base.filter(s=>test[g.k](s,v)).length,on=st[g.k].has(v);
      return `<label class="flex items-center gap-2.5 text-sm cursor-pointer ${!n&&!on?'opacity-45':''}"><input type="checkbox" data-g="${g.k}" value="${v}" ${on?'checked':''}>${T?`<span class="w-2.5 h-2.5 rounded-full ${T.bg} ring-2 ring-inset ring-current ${T.fg}"></span>`:''}<span class="flex-1">${l}</span><span class="text-xs text-muted tnum">${n}</span></label>`}).join('')}</div></details>`}).join('');
}
function media(s){const T=TYPES[s.type];
  return s.img?`<img src="${IMG[s.img]}" alt="" class="w-full h-full object-cover">`
   :`<div class="w-full h-full ${T.bg} ${T.fg} grid place-items-center"><i data-lucide="${CAT_ICON[s.cat]}" class="w-12 h-12" stroke-width="1.25"></i></div>`}
function card(s){
  const T=TYPES[s.type],fav=favs.has(s.id);
  return `<article class="bg-surface border border-line rounded-2xl p-2 flex flex-col hover:shadow-[0_8px_24px_rgba(27,74,107,.10)] transition">
  <div class="relative aspect-[4/3] rounded-xl overflow-hidden">${media(s)}
    <span class="absolute left-2 bottom-2 text-[11px] font-bold px-2 py-1 rounded-full bg-surface ${T.fg}">${T.l}</span>
    ${s.price===0?'<span class="absolute left-2 top-2 text-[11px] font-bold px-2 py-1 rounded-full bg-navybg text-onnavy">Gratuito</span>':''}
  </div>
  <div class="px-2 pt-3 pb-1 flex flex-col gap-1.5 flex-1">
    <h3 class="font-bold text-[15px] leading-snug">${s.t}</h3>
    <p class="text-xs text-muted flex items-center gap-1"><i data-lucide="badge-check" class="w-3.5 h-3.5 shrink-0 text-ok"></i>${s.p} · ${s.ver}</p>
    <p class="text-xs text-muted flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 shrink-0"></i>${s.comuna==='Online'?'Todo Chile':s.comuna} · ${s.mod.join(' / ')}</p>
    ${s.note?`<p class="text-xs text-muted flex gap-1"><i data-lucide="info" class="w-3.5 h-3.5 shrink-0 mt-px text-compI"></i>${s.note}</p>`:''}
    <div class="mt-auto pt-3 flex items-center gap-2">
      <p class="flex-1 font-bold text-sm tnum">${s.price===0?'Gratis':money(s.price)+`<span class="block text-xs font-normal text-muted">por ${s.u}</span>`}</p>
      <button data-fav="${s.id}" aria-label="Guardar" aria-pressed="${fav}" class="w-9 h-9 rounded-full border border-line grid place-items-center ${fav?'text-coral':'text-muted'} hover:text-coral"><i data-lucide="heart" class="w-4 h-4 ${fav?'fill-current':''}"></i></button>
      <button class="h-9 px-4 rounded-full bg-coral hover:bg-coralh text-oncoral text-sm font-bold">Ver servicio</button>
    </div>
  </div></article>`;
}
let chipFns=[];
const TABL={gratis:'Gratuitos',Online:'Online',Presencial:'Presencial','A domicilio':'A domicilio'};
function render(){
  drawQuick();drawGroups();
  document.querySelectorAll('.cat').forEach(b=>{const on=st.cats.has(b.dataset.cat);b.classList.toggle('border-navy',on);b.classList.toggle('border-transparent',!on);b.setAttribute('aria-pressed',on)});
  $('fVer').checked=st.ver;
  let r=S.filter(s=>match(s));
  if(st.sort==='price')r.sort((a,b)=>a.price-b.price);
  if(st.sort==='free')r.sort((a,b)=>(a.price>0)-(b.price>0)||a.id-b.id);
  $('count').textContent=`(${r.length})`;
  $('grid').innerHTML=r.map(card).join('');
  $('empty').hidden=r.length>0;
  $('favN').hidden=!favs.size;$('favN').textContent=favs.size;
  const c=[];
  if(st.q)c.push([`“${st.q}”`,()=>{st.q='';$('q').value=''}]);
  if(st.tab!=='all')c.push([TABL[st.tab],()=>{st.tab='all'}]);
  GROUPS.forEach(g=>st[g.k].forEach(v=>c.push([g.opts.find(o=>o[0]===v)[1],()=>st[g.k].delete(v)])));
  if(st.ver)c.push(['Título verificado',()=>{st.ver=false}]);
  chipFns=c.map(x=>x[1]);
  $('chips').innerHTML=c.map((x,i)=>`<button data-chip="${i}" class="h-7 pl-3 pr-2 rounded-full bg-soft text-xs font-semibold flex items-center gap-1 hover:bg-line">${x[0]}<i data-lucide="x" class="w-3 h-3"></i></button>`).join('')+(c.length>1?'<button id="chipsClear" class="text-xs font-semibold text-link hover:underline">Quitar todo</button>':'');
  lucide.createIcons();
}
function clearAll(draw=true){st.q='';$('q').value='';st.tab='all';GROUPS.forEach(g=>st[g.k].clear());st.ver=false;$('comunaTop').value='';if(draw)render()}
const aside=$('filters'),drawer=['fixed','inset-0','z-50','overflow-y-auto','p-5','!max-h-none'];
const openF=()=>{aside.classList.remove('hidden');aside.classList.add(...drawer)};
const closeF=()=>{aside.classList.add('hidden');aside.classList.remove(...drawer)};
document.addEventListener('click',e=>{
  const q=s=>e.target.closest(s);
  if(q('#openFilters')){openF();return}
  if(q('#chipsClear')){clearAll();return}
  const ch=q('[data-chip]');if(ch){chipFns[+ch.dataset.chip]();render();return}
  const tb=q('[data-tab]');if(tb){st.tab=st.tab===tb.dataset.tab?'all':tb.dataset.tab;render();return}
  if(q('[data-ver]')){st.ver=!st.ver;render();return}
  const ct=q('[data-cat]');if(ct){const v=ct.dataset.cat;st.cats.has(v)?st.cats.delete(v):st.cats.add(v);render();if(ct.classList.contains('cat'))toResults();return}
  const sl=q('[data-slide]');if(sl){const s=SLIDES[+sl.dataset.slide];if(s.go){s.go();render();toResults()}return}
  const dt=q('[data-dot]');if(dt){goTo(+dt.dataset.dot);play();return}
  const sh=q('[data-short]');if(sh){clearAll(false);SHORT[+sh.dataset.short].go();render();toResults();return}
  const f=q('[data-fav]');if(f){const id=+f.dataset.fav;favs.has(id)?favs.delete(id):favs.add(id);render()}
});
document.addEventListener('toggle',e=>{const d=e.target;if(d.dataset&&d.dataset.group){d.open?openG.add(d.dataset.group):openG.delete(d.dataset.group)}},true);
document.addEventListener('change',e=>{const g=e.target.dataset.g;if(g){e.target.checked?st[g].add(e.target.value):st[g].delete(e.target.value);render()}});
$('fVer').onchange=e=>{st.ver=e.target.checked;render()};
$('sort').onchange=e=>{st.sort=e.target.value;render()};
$('q').oninput=e=>{st.q=e.target.value.trim();render()};
$('searchForm').onsubmit=e=>{e.preventDefault();st.comunas.clear();if($('comunaTop').value)st.comunas.add($('comunaTop').value);render();toResults()};
$('favBtn').onclick=()=>toResults();
$('clearAll').onclick=()=>clearAll();$('emptyClear').onclick=()=>clearAll();
$('closeFilters').onclick=closeF;$('applyMobile').onclick=closeF;
render();
