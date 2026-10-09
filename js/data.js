/* Datos de ejemplo (ficticios). Reemplazar por datos reales o por una API. */
const IMG={
  kine_dep:'assets/img/kine_dep.jpg',
  kine_dom:'assets/img/kine_dom.jpg',
  masaje:'assets/img/masaje.jpg',
  masaje3:'assets/img/masaje3.jpg',
  pro_man:'assets/img/pro_man.jpg',
  psi2:'assets/img/psi2.jpg',
  psi3:'assets/img/psi3.jpg',
  psi_adultos:'assets/img/psi_adultos.jpg',
  psi_online:'assets/img/psi_online.jpg',
  yoga:'assets/img/yoga.jpg',
  yoga2:'assets/img/yoga2.jpg',
  yoga3:'assets/img/yoga3.jpg'
};

const COMUNAS=['Santiago Centro','Providencia','Ñuñoa','Las Condes','La Florida','Maipú','Puente Alto','Online'];
const PUBS=['Adultos','Jóvenes','Personas mayores','Familias','Cuidadores','Trabajadores'];
const MODS=['Presencial','Online','A domicilio'];
const TYPES={psi:{l:'Atención psicológica',bg:'bg-psi',fg:'text-psiI'},fis:{l:'Bienestar físico',bg:'bg-fis',fg:'text-fisI'},comp:{l:'Práctica complementaria',bg:'bg-comp',fg:'text-compI'},com:{l:'Comunitario y municipal',bg:'bg-com',fg:'text-comI'}};
const CATS=[['Psicología','brain','psi'],['Kinesiología','person-standing','fis'],['Masajes','hand','comp'],['Yoga','flower-2','com'],['Mindfulness','wind','psi'],['Arteterapia','palette','fis'],['Duelo','heart-handshake','comp'],['Talleres','users','com']];
const CAT_ICON=Object.fromEntries(CATS.map(c=>[c[0],c[1]]));
const PRICES=[['gratis','Gratis'],['h15','Hasta $15.000'],['h30','$15.001 a $30.000'],['m30','Más de $30.000']];
const S=[
 {t:'Terapia psicológica para adultos',p:'Ps. Valentina Soto',type:'psi',cat:'Psicología',comuna:'Providencia',mod:['Presencial','Online'],price:30000,u:'sesión',pub:['Adultos'],ver:'Título verificado',img:'psi_adultos'},
 {t:'Orientación psicológica online para jóvenes',p:'Centro Brotes',type:'psi',cat:'Psicología',comuna:'Online',mod:['Online'],price:18000,u:'sesión',pub:['Jóvenes'],ver:'Título verificado',img:'psi_online'},
 {t:'Acompañamiento psicológico en duelo',p:'Ps. Andrés Fuentes',type:'psi',cat:'Duelo',comuna:'Ñuñoa',mod:['Presencial','Online'],price:28000,u:'sesión',pub:['Adultos','Familias'],ver:'Título verificado',img:'psi3'},
 {t:'Kinesiología y rehabilitación funcional',p:'Kine Movimiento',type:'fis',cat:'Kinesiología',comuna:'Las Condes',mod:['Presencial'],price:25000,u:'sesión',pub:['Adultos','Personas mayores'],ver:'Título verificado',img:'kine_dep'},
 {t:'Kinesiología a domicilio',p:'Kine en Casa',type:'fis',cat:'Kinesiología',comuna:'Maipú',mod:['A domicilio'],price:32000,u:'sesión',pub:['Personas mayores'],ver:'Título verificado',img:'kine_dom'},
 {t:'Masaje descontracturante',p:'Manos Serenas',type:'fis',cat:'Masajes',comuna:'Santiago Centro',mod:['Presencial'],price:22000,u:'sesión',pub:['Adultos','Trabajadores'],ver:'Identidad verificada',img:'masaje'},
 {t:'Yoga integral para todos los niveles',p:'Estudio Prana Sur',type:'fis',cat:'Yoga',comuna:'La Florida',mod:['Presencial','Online'],price:8000,u:'clase',pub:['Adultos','Jóvenes'],ver:'Identidad verificada',img:'yoga'},
 {t:'Programa de mindfulness de 8 semanas',p:'Espacio Atento',type:'comp',cat:'Mindfulness',comuna:'Online',mod:['Online'],price:60000,u:'programa',pub:['Adultos','Trabajadores'],ver:'Identidad verificada',img:'yoga2',note:'Programa educativo. No reemplaza un tratamiento psicológico.'},
 {t:'Arteterapia grupal',p:'Taller Trazos',type:'comp',cat:'Arteterapia',comuna:'Ñuñoa',mod:['Presencial'],price:12000,u:'sesión',pub:['Adultos'],ver:'Identidad verificada',note:'Práctica complementaria con evidencia en desarrollo.'},
 {t:'Reflexología podal',p:'Raíz Holística',type:'comp',cat:'Masajes',comuna:'Providencia',mod:['Presencial'],price:18000,u:'sesión',pub:['Adultos'],ver:'Identidad verificada',img:'masaje3',note:'Evidencia científica limitada. No reemplaza atención médica.'},
 {t:'Taller de respiración para personas mayores',p:'Programa comunal (ejemplo)',type:'com',cat:'Mindfulness',comuna:'Puente Alto',mod:['Presencial'],price:0,u:'',pub:['Personas mayores'],ver:'Programa público'},
 {t:'Círculo de apoyo en duelo',p:'Fundación Huellas',type:'com',cat:'Duelo',comuna:'Santiago Centro',mod:['Presencial','Online'],price:0,u:'',pub:['Adultos','Familias'],ver:'Organización verificada',img:'psi2'},
 {t:'Encuentro de cuidadores y cuidadoras',p:'Red Cuidar',type:'com',cat:'Talleres',comuna:'Online',mod:['Online'],price:0,u:'',pub:['Cuidadores'],ver:'Organización verificada'},
 {t:'Yoga al aire libre en el parque',p:'Programa comunal (ejemplo)',type:'com',cat:'Yoga',comuna:'Maipú',mod:['Presencial'],price:0,u:'',pub:['Familias','Adultos'],ver:'Programa público',img:'yoga3'}
].map((s,i)=>({...s,id:i}));

const GROUPS=[
 {k:'types',l:'Tipo de servicio',opts:Object.entries(TYPES).map(([k,v])=>[k,v.l,v])},
 {k:'cats',l:'Categoría',opts:CATS.map(c=>[c[0],c[0]])},
 {k:'mods',l:'Modalidad',opts:MODS.map(m=>[m,m])},
 {k:'prices',l:'Precio',opts:PRICES},
 {k:'comunas',l:'Comuna',opts:COMUNAS.map(c=>[c,c==='Online'?'Online (todo Chile)':c]),closed:true},
 {k:'pubs',l:'Para quién',opts:PUBS.map(p=>[p,p]),closed:true}];
