(function(root){
 const catalog={'link-site':{name:'LINK SITE',price:9900},'discord-bot-month':{name:'Discord Bot',price:3000,term:'1 month'},'discord-bot-year':{name:'Discord Bot',price:30000,term:'1 year'},'thumbnail-design':{name:'Thumbnail Design',price:3000}};
 function clean(items){if(!Array.isArray(items))return [];return items.slice(0,40).filter(i=>i&&catalog[i.sku]).map(i=>({id:String(i.id||'').slice(0,80),sku:i.sku,qty:Math.max(1,Math.min(10,Math.floor(Number(i.qty)||1))),domain:typeof i.domain==='string'?i.domain.slice(0,63):'',quote:i.quote||null}));}
 function totals(items,coupon){let subtotal=0,domains=0;for(const i of clean(items)){subtotal+=catalog[i.sku].price*i.qty;if(i.sku==='link-site'&&Number.isInteger(i.quote?.cents)&&i.quote.cents>0)domains+=i.quote.cents;}const discount=String(coupon).trim().toLowerCase()==='isyy5'?Math.round((subtotal+domains)*.05):0;return {subtotal,domains,discount,total:subtotal+domains-discount};}
 function domainName(value){const s=String(value).trim().toLowerCase().replace(/\.com$/,'');if(!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(s))throw Error('Use 1–63 letters, numbers or hyphens. No spaces.');return s+'.com';}
 const api={catalog,clean,totals,domainName};if(typeof module!=='undefined')module.exports=api;else root.ISYCartCore=api;
})(globalThis);
