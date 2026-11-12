import {spawn} from 'node:child_process';import {mkdtempSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import assert from 'node:assert/strict';
const dir=mkdtempSync(join(tmpdir(),'ynv-test-')),port=31000+Math.floor(Math.random()*1000),url=`http://127.0.0.1:${port}`;const proc=spawn(process.execPath,['--experimental-sqlite','server.mjs'],{cwd:new URL('.',import.meta.url),env:{...process.env,DATA_DIR:dir,PORT:String(port)},stdio:'pipe'});
let count=0;function ok(v,msg){assert.ok(v,msg);count++}async function api(path,body,token,expected=200){const r=await fetch(url+'/api/'+path,{method:body===undefined?'GET':'POST',headers:{'content-type':'application/json',...(token?{authorization:'Bearer '+token}:{})},body:body===undefined?undefined:JSON.stringify(body)});const data=await r.json();assert.equal(r.status,expected,`${path}: ${JSON.stringify(data)}`);count++;return data}
try{let ready=false;for(let i=0;i<60;i++){try{const r=await fetch(url+'/api/offers');if(r.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,80))}ok(ready,'Server avviato');
const offers=(await api('offers')).offers;ok(offers.length===4,'Quattro offerte');
const a=await api('register',{name:'Alice Demo',email:'alice@demo.test',password:'demo-password-123'});ok(!!a.token,'Alice registrata');
const invA=await api('invite',{},a.token);ok(!!invA.code,'Invito Alice');
const b=await api('register',{name:'Bruno Demo',email:'bruno@demo.test',password:'demo-password-456',invite:invA.code});ok(b.person.origin_person===a.person.id,'Origine Bruno = Alice');
const bizB=await api('business',{name:'Bruno Tour Demo'},b.token);ok(bizB.origin_person===a.person.id,'Origine azienda Bruno = Alice');
const invB=await api('invite',{},b.token);
const c=await api('register',{name:'Carla Demo',email:'carla@demo.test',password:'demo-password-789',invite:invB.code});ok(c.person.origin_person===b.person.id,'Origine Carla = Bruno');
const bizC=await api('business',{name:'Carla Hotel Demo'},c.token);ok(bizC.origin_person===b.person.id,'Origine azienda Carla = Bruno, NON Alice');ok(bizC.origin_person!==a.person.id,'No multilevel business origin');
const login=await api('login',{email:'bruno@demo.test',password:'demo-password-456'});ok(!!login.token,'Login');
await api('register',{name:'Bad',email:'bad@demo.test',password:'demo-password-123',invite:'INVALID'},null,400);
await api('me',undefined,null,401);
const offer=offers.find(o=>o.price_cents===20000);const day=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
const booking=await api('book',{offer_id:offer.id,date:day,credits_cents:0},b.token);ok(booking.cash_cents===20000,'Pagamento fittizio');ok(booking.commission_cents===4000,'Commissione 20%');ok(booking.cashback_cents===200,'Cashback 5% di commissione');ok(booking.referral_cents===400,'Referral 10% commissione');
await api('post-demo',{booking_id:booking.id},b.token,409);
await api('complete',{booking_id:booking.id},b.token);
await api('post-demo',{booking_id:booking.id},b.token);
await api('post-demo',{booking_id:booking.id},b.token,409);
const mb=await api('me',undefined,b.token);ok(mb.wallet_cents===200,'Bruno cashback');const ma=await api('me',undefined,a.token);ok(ma.wallet_cents===400,'Alice referral');
const second=await api('book',{offer_id:offer.id,date:day,credits_cents:150},b.token);ok(second.cash_cents===19850,'Crediti utilizzati');ok(second.cashback_cents===199,'Cashback quota cash');
const afterSpend=await api('me',undefined,b.token);ok(afterSpend.wallet_cents===50,'Wallet scalato');
await api('cancel',{booking_id:second.id},b.token);const afterCancel=await api('me',undefined,b.token);ok(afterCancel.wallet_cents===200,'Crediti ripristinati');await api('cancel',{booking_id:second.id},b.token,409);
await api('book',{offer_id:offer.id,date:day,credits_cents:999999},b.token,400);
console.log(`PASS: ${count} assertions / HTTP status checks; invite chain, origin inheritance, booking, cashback, referral, replay and cancel`)
}catch(e){console.error('FAIL after',count,'checks:',e);process.exitCode=1}finally{proc.kill();rmSync(dir,{recursive:true,force:true})}
