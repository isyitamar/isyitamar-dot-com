(() => {
  const form=document.getElementById('contactForm');
  if(!form)return;
  const button=form.querySelector('[type="submit"]');
  const label=button.querySelector('span');
  const status=document.getElementById('contactStatus');
  let pending=false;
  function feedback(message,state){status.textContent=message;status.dataset.state=state;}
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(pending)return;
    for(const name of ['name','email','subject','discord']){
      const field=form.elements.namedItem(name);field.value=field.value.trim();
    }
    if(!form.reportValidity())return;
    if(form.elements.namedItem('_gotcha').value)return;
    const data=new FormData(form);
    pending=true;button.disabled=true;label.textContent='Sending…';form.setAttribute('aria-busy','true');
    feedback('Sending your message…','sending');
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),25000);
    try{
      const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});
      const result=await response.json().catch(()=>null);
      if(!response.ok){
        if(response.status===429)throw new Error('Too many attempts. Please wait a moment and try again.');
        const errors=Array.isArray(result?.errors)?result.errors.map(e=>e.message).filter(x=>typeof x==='string'):[];
        throw new Error(errors.length?errors.join(' '):'Your message could not be sent. Please try again shortly.');
      }
      if(result?.ok!==true)throw new Error('The service did not confirm delivery. Your details are still here; please try again shortly.');
      form.reset();feedback('Message sent! I’ll get back to you soon.','success');
    }catch(error){
      const message=error.name==='AbortError'?'Delivery could not be confirmed. Please wait before trying again.':error instanceof TypeError?'Could not connect. Check your connection and try again.':error.message;
      feedback(message||'Something went wrong. Please try again.','error');
    }finally{
      clearTimeout(timeout);pending=false;button.disabled=false;label.textContent='Send';form.removeAttribute('aria-busy');
    }
  });
})();
