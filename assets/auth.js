(async()=>{
 const form=document.getElementById('authForm'),status=document.getElementById('authStatus');
 const controls=[...document.querySelectorAll('[data-auth-action]')];
 const say=(text,error=false)=>{if(status){status.textContent=text;status.dataset.error=String(error)}};
 const setBusy=value=>{controls.forEach(b=>b.disabled=value);form?.setAttribute('aria-busy',String(value));};
 let busy=false,auth,api;
 const messages={
 'auth/invalid-credential':'The email or password is incorrect.', 'auth/wrong-password':'The email or password is incorrect.', 'auth/user-not-found':'The email or password is incorrect.',
 'auth/email-already-in-use':'This email is already registered. Sign in or reset your password.',
 'auth/weak-password':'Choose a stronger password (at least 6 characters).', 'auth/password-does-not-meet-requirements':'Your password does not meet this site’s password requirements.',
 'auth/invalid-email':'Enter a valid email address.', 'auth/too-many-requests':'Too many attempts. Please wait and try again.',
 'auth/network-request-failed':'Could not connect. Check your connection and try again.',
 'auth/popup-blocked':'Allow pop-ups for this site, then try Google sign-in again.',
 'auth/popup-closed-by-user':'Google sign-in was cancelled. You can try again.',
 'auth/cancelled-popup-request':'A sign-in window is already open.',
 'auth/unauthorized-domain':'Sign-in is not yet available on this domain. Please contact the site owner.',
 'auth/operation-not-allowed':'This sign-in method is not enabled yet. Please contact the site owner.',
 'auth/user-disabled':'This account has been disabled.',
 'auth/account-exists-with-different-credential':'This email uses another sign-in method. Sign in using that method first.'};
 const fail=error=>say(messages[error?.code]||'Sign-in could not be completed. Please try again.',true);
 function render(user){
  const label=document.getElementById('accountLabel');if(label)label.textContent=user?(user.displayName||'My account'):'Login';
  const icon=document.querySelector('.auth-user-icon');if(icon){icon.replaceChildren();if(user?.photoURL){try{const u=new URL(user.photoURL);if(u.protocol==='https:'){const im=document.createElement('img');im.src=u.href;im.alt='';im.referrerPolicy='no-referrer';im.onerror=()=>{icon.textContent='○'};icon.append(im);}else icon.textContent='○';}catch{icon.textContent='○'}}else icon.textContent='○';}
  if(!form)return;
  document.getElementById('authEntry').hidden=!!user;document.getElementById('authAccount').hidden=!user;
  document.getElementById('accountName').textContent=user?.displayName||'';document.getElementById('accountEmail').textContent=user?.email||'';
 }
 document.getElementById('togglePassword')?.addEventListener('click',event=>{const field=document.getElementById('authPassword');const show=field.type==='password';field.type=show?'text':'password';event.currentTarget.textContent=show?'Hide':'Show';event.currentTarget.setAttribute('aria-label',show?'Hide password':'Show password');event.currentTarget.setAttribute('aria-pressed',String(show));});
 form?.addEventListener('submit',async event=>{
  event.preventDefault();if(busy||!auth||!form.reportValidity())return;
  const email=form.elements.email.value.trim(),password=form.elements.password.value;
  const signup=form.dataset.mode==='register';const name=signup?form.elements.displayName.value.trim():'';
  if(signup&&!name){say('Enter your name or nickname.',true);return;}
  if(signup&&password!==form.elements.confirm.value){say('The passwords do not match.',true);return;}
  busy=true;setBusy(true);say(signup?'Creating your account…':'Signing in…');
  try{
   if(signup){const result=await api.createUserWithEmailAndPassword(auth,email,password);try{await api.updateProfile(result.user,{displayName:name});}catch{say('Your account was created, but your name could not be saved.');render(result.user);return;}}
   else await api.signInWithEmailAndPassword(auth,email,password);
   form.reset();render(auth.currentUser);say(signup?'Your account is ready.':'You’re signed in.');
  }catch(error){fail(error);}finally{busy=false;setBusy(false);}
 });
 document.getElementById('googleLogin')?.addEventListener('click',()=>{
  if(busy||!auth)return;busy=true;setBusy(true);say('Opening Google…');
  const provider=new api.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});
  api.signInWithPopup(auth,provider).then(()=>{form?.reset();render(auth.currentUser);say('You’re signed in.');}).catch(fail).finally(()=>{busy=false;setBusy(false)});
 });
 document.getElementById('resetPassword')?.addEventListener('click',async()=>{
  if(busy||!auth)return;const field=form.elements.email;field.value=field.value.trim();if(!field.reportValidity())return;
  busy=true;setBusy(true);say('Sending reset instructions…');
  try{await api.sendPasswordResetEmail(auth,field.value);say('If an account exists for this email, you’ll receive password reset instructions.');}catch(error){if(error.code==='auth/user-not-found')say('If an account exists for this email, you’ll receive password reset instructions.');else fail(error);}finally{busy=false;setBusy(false)}
 });
 document.getElementById('signOut')?.addEventListener('click',async()=>{
  if(busy||!auth)return;busy=true;setBusy(true);
  try{await api.signOut(auth);render(null);say('You’re signed out.');}catch(error){fail(error);}finally{busy=false;setBusy(false)}
 });
 if(location.protocol==='file:'){say('Open the uploaded website to sign in. Sign-in is unavailable from a local HTML file.',true);return;}
 try{
  const [appModule,authModule]=await Promise.all([import('https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js')]);
  api=authModule;
  const config={apiKey:'AIzaSyAe_a0yeIPliLctwuXw_V8xScgjpdfxILQ',authDomain:'isy-itamar-web.firebaseapp.com',projectId:'isy-itamar-web',storageBucket:'isy-itamar-web.firebasestorage.app',messagingSenderId:'331817249731',appId:'1:331817249731:web:a121e9b0646c5a3171eb76'};
  auth=api.getAuth(appModule.initializeApp(config));
  await api.setPersistence(auth,api.browserLocalPersistence);
  api.onAuthStateChanged(auth,user=>{render(user);if(!busy)say('');},fail);
  setBusy(false);
 }catch(error){say('Unable to load secure sign-in. Check your connection, allow browser storage, and reload this page.',true);}
})();
