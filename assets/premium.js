(()=>{

const bg=document.getElementById('ambientBackdrop');
if(bg){
 bg.removeAttribute('style');
 bg.innerHTML='<div class="cinema-city"></div><div class="cinema-fog"></div><div class="cinema-river"></div>';
}

const routes={home:'home',about:'aboutme',shop:'shop',steam:'steam',discord:'discord','link-site':'link-site',contact:'contact',login:'login',register:'register'};
document.querySelectorAll('.page-heading .avatar-frame, .brand .avatar-frame').forEach(avatar=>{avatar.setAttribute('role','button');avatar.tabIndex=0;avatar.setAttribute('aria-label','Copy current page link');const label=document.createElement('span');label.className='copy-link-label';label.textContent='Copy Link';label.setAttribute('aria-live','polite');avatar.append(label);let timer;const copy=async()=>{const url=location.origin+location.pathname;try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(url);else{const t=document.createElement('textarea');t.value=url;t.setAttribute('data-copy-link','true');t.style.cssText='position:fixed;opacity:0';document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();if(!ok)throw Error('copy')}label.textContent='Copied!';avatar.classList.add('copy-confirmed');}catch(e){label.textContent='Try again';}clearTimeout(timer);timer=setTimeout(()=>{label.textContent='Copy Link';avatar.classList.remove('copy-confirmed')},2200)};avatar.addEventListener('click',copy);avatar.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();copy()}})});
document.querySelectorAll('.shop-card .product-art').forEach((art,index)=>{
  art.querySelectorAll('.product-form,.link-product-viewport').forEach(el=>el.remove());
  const model=document.createElement('div');model.className='premium-model';model.setAttribute('aria-hidden','true');
  const searchIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>';
  const chromeIcon='<svg class="google-mark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 38.02 46.98 31.85 46.98 24.55Z"/><path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.7 23.7 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/></svg>';
  const cursor='<svg class="browser-cursor" viewBox="0 0 20 25" fill="#e6eaf0" stroke="#181b20" stroke-width="1"><path d="M2 1v20l5-5 4 8 4-2-4-8h7Z"/></svg>';
  const avatar=document.querySelector('.page-heading .avatar-frame img');
  const profile='<div class="mini-profile">'+(avatar?'<img src="'+avatar.getAttribute('src')+'" alt=""/>':'')+'<h4>YOUR NAME</h4><p>YOUR WORLD. ONE LINK.</p><a>About me <span>↗</span></a><a>My community <span>↗</span></a><a>Let’s connect <span>↗</span></a></div>';
  const studio='<div class="mini-website"><div class="mini-nav"><strong>ISY / STUDIO</strong><span>WORK · ABOUT</span></div><div class="mini-hero"><div class="mini-hero-copy"><h4>Ideas.<br/>Made digital.</h4><p>A little imagination.<br/>An entirely new experience.</p><span class="mini-cta">EXPLORE ↗</span></div><div class="mini-sculpture"></div></div></div>';
  const search='<div class="mini-search"><h4>Google</h4><div class="mini-search-field">'+searchIcon+'<span>your next great idea</span></div><div class="mini-search-results"><i></i><i></i><i></i></div></div>';
  const ui=index===2?profile:index===1?search:studio;
  const address=index===2?'YourName.com':index===1?'google.com':'your-next-idea.com';
  model.innerHTML='<div class="premium-layer back"></div><div class="premium-layer"></div><div class="premium-screen"><div class="premium-bar"><i></i><i></i><i></i><span class="premium-address">'+address+'</span></div>'+ui+'</div><div class="browser-chip browser-chip-search">'+chromeIcon+'<span>'+(index===2?'Your own corner<br/>of the internet.':index===1?'Search. Discover.<br/>Create something.':'Designed to<br/>feel different.')+'</span></div><div class="browser-chip browser-chip-status"><b></b><span>'+(index===2?'Made for you':'In the making')+'<small>'+(index===2?'PERSONAL WEBSITE':'SOMETHING NEW')+'</small></span></div>'+cursor+'<div class="premium-orbit"></div>';
  if(index===2){
    model.classList.add('link-site-preview');
    const domain=document.createElement('div');domain.className='preview-domain';
    domain.innerHTML='<span>YourName.com</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 17 17 7M7 7h10v10"/></svg>';
    model.append(domain);
  }
  art.append(model);
});
if(document.body.dataset.page==='shop'){const shell=document.querySelector('.home-stage > .site-shell');if(shell){const cue=document.createElement('button');cue.className='shop-scroll-cue';cue.type='button';cue.setAttribute('aria-label','Scroll to the next section');cue.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4v15m-6-6 6 6 6-6"/></svg>';document.querySelector('.home-stage').append(cue);const update=()=>{const show=shell.scrollHeight-shell.clientHeight-shell.scrollTop>8;cue.classList.toggle('visible',show);cue.tabIndex=show?0:-1;cue.setAttribute('aria-hidden',String(!show))};shell.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(shell);new ResizeObserver(update).observe(shell.firstElementChild);window.addEventListener('resize',update);cue.addEventListener('click',()=>shell.scrollBy({top:shell.clientHeight*.75,behavior:'smooth'}));update()}}
})();

(() => {
  const shell = document.querySelector('.home-stage > .site-shell');
  if (!shell) return;
  
  let target = shell.scrollTop, frame = 0, last = 0, expected = target;
  const clamp = value => Math.max(0, Math.min(value, Math.max(0, shell.scrollHeight - shell.clientHeight)));
  function stop() { cancelAnimationFrame(frame);frame = 0;last = 0;target = shell.scrollTop;expected = target; }
  function draw(time) {
    const dt = last ? Math.min((time-last)/1000, .05) : 1/60;last = time;
    target = clamp(target);
    const before = shell.scrollTop;
    const next = before + (target-before) * (1-Math.exp(-13*dt));
    expected = Math.abs(target-shell.scrollTop)<2 ? target : next;
    shell.scrollTop = expected;
    if (shell.scrollTop===before && Math.abs(target-before)>.5) shell.scrollTop = before + Math.sign(target-before);
    expected = shell.scrollTop;
    if (Math.abs(target-expected)>.5) frame = requestAnimationFrame(draw);
    else { frame = 0;last = 0; }
  }
  shell.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented || !event.cancelable || Math.abs(event.deltaX)>Math.abs(event.deltaY)) return;
    if (event.target.closest?.('input,textarea,select,[contenteditable="true"]')) return;
    let node = event.target instanceof Element ? event.target : event.target.parentElement;
    while (node && node!==shell) {
      if (node.scrollHeight>node.clientHeight+1 && /auto|scroll/.test(getComputedStyle(node).overflowY)) return;
      node = node.parentElement;
    }
    const unit = event.deltaMode===1 ? 18 : event.deltaMode===2 ? shell.clientHeight*.85 : 1;
    const delta = event.deltaY*unit;
    if (!delta || shell.scrollHeight<=shell.clientHeight+1) return;
    if (!frame) target = shell.scrollTop;
    const next = clamp(target+delta);
    if (next===target && !frame) return;
    event.preventDefault();target = next;
    if (!frame) frame = requestAnimationFrame(draw);
  },{passive:false});
  // Scrollbar dragging, touch and keyboard retain their native behavior.
  shell.addEventListener('pointerdown',stop,{passive:true});
  shell.addEventListener('scroll',()=>{if(frame && Math.abs(shell.scrollTop-expected)>2) stop();},{passive:true});
  window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) stop();});
  window.addEventListener('blur',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden) stop();});

})();


document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('animation-paused',document.hidden));
