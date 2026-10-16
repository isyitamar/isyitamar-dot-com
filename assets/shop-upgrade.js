(() => {
 const divider=document.querySelector('.top-nav > .top-divider'),category=document.querySelector('.top-nav .category'),login=document.querySelector('.auth-top-link');
 function alignLogin(){
  if(!divider||!login)return;
  const r=divider.getBoundingClientRect(),style=category?getComputedStyle(category):null;
  document.documentElement.style.setProperty('--login-edge',r.left+'px');
  const row=category?.getBoundingClientRect();
  document.documentElement.style.setProperty('--login-line',(row?row.top:r.top)+'px');
  if(row){login.style.height=row.height+'px';document.documentElement.style.setProperty('--cart-row-height',row.height+'px');}
  if(style){login.style.boxSizing="border-box";login.style.paddingTop=style.paddingTop;login.style.paddingBottom=style.paddingBottom;login.style.lineHeight=style.lineHeight;login.style.fontWeight=style.fontWeight;login.style.letterSpacing=style.letterSpacing;login.style.fontFamily=style.fontFamily;login.style.fontSize=(parseFloat(style.fontSize)*1.03)+'px';}
 }
 alignLogin();window.addEventListener('resize',alignLogin,{passive:true});document.fonts?.ready.then(alignLogin);
 document.getElementById('homeStage')?.addEventListener('transitionend',alignLogin);
 if(divider)new ResizeObserver(alignLogin).observe(divider.parentElement);
 const prices=[...document.querySelectorAll('.bot-price')];
 const radios=[...document.querySelectorAll('.billing-switch input')];
 function selectBilling(value){const yearly=value==='year';document.body.dataset.billing=value;
  radios.forEach(r=>r.checked=r.value===value);
  prices.forEach(price=>{price.setAttribute('aria-label',yearly?'300 shekels per year':'30 shekels per month');price.querySelector('.monthly').setAttribute('aria-hidden',String(yearly));price.querySelector('.yearly').setAttribute('aria-hidden',String(!yearly));});
 }
 radios.forEach(r=>r.addEventListener('change',()=>{if(r.checked)selectBilling(r.value)}));
 if(prices.length)selectBilling('month');
})();
