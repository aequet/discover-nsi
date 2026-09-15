'use strict';
const themes = [
  {id:'flat',name:'Flat Design',short:'Flat',glyph:'◒',description:'Couleurs franches. Zéro détour.'},
  {id:'material',name:'Material Design',short:'Material',glyph:'▰',description:'Des surfaces, une hiérarchie.'},
  {id:'skeuo',name:'Skeuomorphisme',short:'Skeuo',glyph:'▣',description:'Le numérique prend matière.'},
  {id:'neuo',name:'Neumorphisme',short:'Neumorph',glyph:'◉',description:'Un relief doux, presque tactile.'},
  {id:'glass',name:'Glassmorphisme',short:'Glass',glyph:'◇',description:'Lumière, flou et transparence.'},
  {id:'brutal',name:'Brutalisme',short:'Brutal',glyph:'✳',description:'Brut, direct et sans détour.'},
  {id:'minimal',name:'Minimalisme',short:'Minimal',glyph:'−',description:'L’essentiel a toute sa place.'},
  {id:'maximal',name:'Maximalisme',short:'Maximal',glyph:'✺',description:'Plus de couleurs. Plus d’audace.'},
  {id:'typo',name:'Typographique',short:'Typo',glyph:'Aa',description:'La lettre devient l’image.'}
];
let active = 'flat';
const dialog = document.querySelector('.style-dialog');
const dock = document.querySelector('.dock-options');
const picker = document.querySelector('.picker-options');
themes.forEach((theme,index)=>{
  const button = document.createElement('button');
  button.className = 'dock-choice'; button.dataset.themeChoice = theme.id;
  button.setAttribute('aria-label',theme.name); button.setAttribute('aria-pressed',String(theme.id===active));
  button.innerHTML = `<span class="theme-glyph" aria-hidden="true">${theme.glyph}</span><span>${theme.short}</span>`;
  button.addEventListener('click',()=>setTheme(theme.id)); dock.append(button);
  const option = document.createElement('button');
  option.className = `picker-choice picker-${theme.id}`; option.dataset.themeChoice = theme.id;
  option.setAttribute('aria-pressed',String(theme.id===active));
  option.innerHTML = `<span class="swatch" aria-hidden="true">${theme.glyph}</span><strong>${theme.name}</strong><small>${theme.description}</small>`;
  option.addEventListener('click',()=>{setTheme(theme.id);dialog.close();}); picker.append(option);
});
function setTheme(id){
  const theme=themes.find(t=>t.id===id); if(!theme)return;
  // Keep the same passage in view when the new layout changes page height.
  const anchor = window.scrollY > 100 ? [...document.querySelectorAll('main h2, main h3, main p, .pathway')].find(element=>element.getBoundingClientRect().bottom>40) : null;
  const anchorTop = anchor ? anchor.getBoundingClientRect().top : 0;
  active=id; document.documentElement.dataset.theme=id;
  if(anchor) window.scrollBy({top:anchor.getBoundingClientRect().top-anchorTop,behavior:'instant'});
  document.querySelectorAll('[data-theme-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===id)));
  document.querySelectorAll('.current-style').forEach(label=>label.textContent=theme.name);
  document.querySelector('#theme-announcement').textContent=`Style ${theme.name} activé. ${theme.description}`;
  document.querySelector('meta[name="theme-color"]').content=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  try{localStorage.setItem('nsi-design',id);}catch{}
}
document.querySelectorAll('[data-open-picker]').forEach(button=>button.addEventListener('click',()=>{dialog.showModal();dialog.scrollTop=0;}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
document.querySelector('.next-style').addEventListener('click',()=>setTheme(themes[(themes.findIndex(t=>t.id===active)+1)%themes.length].id));
try{const saved=localStorage.getItem('nsi-design');if(themes.some(theme=>theme.id===saved))setTheme(saved);}catch{}
