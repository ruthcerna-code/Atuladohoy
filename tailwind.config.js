/** @type {import('tailwindcss').Config} */
module.exports=Object.assign({theme:{extend:{
  colors:{bg:'var(--bg)',surface:'var(--surface)',soft:'var(--soft)',ink:'var(--ink)',muted:'var(--muted)',line:'var(--line)',
    navy:'var(--navy)',navybg:'var(--navybg)',onnavy:'var(--onnavy)',coral:'var(--coral)',coralh:'var(--coralh)',oncoral:'var(--oncoral)',link:'var(--link)',
    psi:'var(--psi)',psiI:'var(--psiI)',fis:'var(--fis)',fisI:'var(--fisI)',comp:'var(--comp)',compI:'var(--compI)',com:'var(--com)',comI:'var(--comI)',
    ok:'var(--ok)',warnbg:'var(--warnbg)',warn:'var(--warn)'},
  fontFamily:{serif:['"Source Serif 4"','Georgia','serif'],sans:['"Nunito Sans"','system-ui','sans-serif']}}}},{content:['./index.html','./js/**/*.js']});
