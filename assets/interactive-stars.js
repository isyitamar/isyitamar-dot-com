(() => {
 const bg=document.getElementById('ambientBackdrop');if(!bg)return;
 const sky=document.createElement('div');sky.className='falling-star-sky';sky.setAttribute('aria-hidden','true');bg.append(sky);
 const glow=document.createElement('div');glow.className='pointer-starlight';glow.setAttribute('aria-hidden','true');document.body.append(glow);
 let width=innerWidth,height=innerHeight,last=0,frame=0,clock=0;
 let aim=0,wind=0,impulse=0,previousX=null;
 const stars=[];const random=(min,max)=>min+Math.random()*(max-min);
 function seed(star,initial){
  star.x=random(0,width);star.y=initial?random(-40,height+30):random(-65,-20);
  star.speed=random(27,85);star.depth=random(.25,1);star.phase=random(0,Math.PI*2);
  star.frequency=random(.22,.75);star.sway=random(3,14);star.drift=random(-2.6,2.6);star.offset=0;
  star.alpha=random(.28,.7);const size=random(1.4,3.7);
  star.el.style.setProperty('--size',size+'px');star.el.style.setProperty('--tail',random(7,22)+'px');
  star.trail.style.display=Math.random()<.26?'block':'none';
 }
 function count(){return width<=600?36:64;}
 function populate(){
  while(stars.length>count())stars.pop().el.remove();
  while(stars.length<count()){
   const el=document.createElement('i');el.className='falling-star';
   const trail=document.createElement('span');trail.className='star-trail';el.append(trail);sky.append(el);
   const star={el,trail};seed(star,true);stars.push(star);
  }
 }
 function draw(time){
  const dt=last?Math.min((time-last)/1000,.05):1/60;last=time;clock+=dt;
  impulse*=Math.exp(-4*dt);wind+=(aim*13+impulse-wind)*(1-Math.exp(-3*dt));
  for(const star of stars){
   star.y+=star.speed*dt;star.x+=star.drift*dt;
   if(star.y>height+35)seed(star,false);
   if(star.x<-25)star.x=width+20;else if(star.x>width+25)star.x=-20;
   star.offset+=(wind*star.depth-star.offset)*(1-Math.exp(-(1.5+star.depth*2)*dt));
   const x=star.x+Math.sin(clock*star.frequency+star.phase)*star.sway+star.offset;
   const fade=Math.max(0,Math.min(1,(star.y+20)/55,(height+20-star.y)/65));
   star.el.style.transform='translate3d('+x.toFixed(2)+'px,'+star.y.toFixed(2)+'px,0)';
   star.el.style.opacity=(star.alpha*fade).toFixed(3);
  }
  frame=requestAnimationFrame(draw);
 }
 window.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  aim=Math.max(-1,Math.min(1,event.clientX/width*2-1));
  if(previousX!==null)impulse=Math.max(-12,Math.min(12,impulse+(event.clientX-previousX)*.1));
  previousX=event.clientX;
  glow.style.transform='translate3d('+(event.clientX-60)+'px,'+(event.clientY-60)+'px,0)';glow.classList.add('is-visible');
 },{passive:true});
 function leave(){aim=0;impulse=0;previousX=null;glow.classList.remove('is-visible');}
 document.documentElement.addEventListener('pointerleave',leave);window.addEventListener('blur',leave);
 window.addEventListener('resize',()=>{const old=width;width=innerWidth;height=innerHeight;for(const star of stars)star.x=star.x/old*width;populate();},{passive:true});
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0;leave();}
  else if(!frame)frame=requestAnimationFrame(draw);
 });
 populate();if(!document.hidden)frame=requestAnimationFrame(draw);
})();
