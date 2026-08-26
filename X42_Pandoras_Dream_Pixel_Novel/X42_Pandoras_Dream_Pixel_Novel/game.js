const canvas=document.getElementById("stage"),ctx=canvas.getContext("2d");
const sheet=new Image(); sheet.src="assets/pandora-paperdoll.png";
const state={scene:0,trust:0,glitches:0,inventory:["Gold glasses","Developer coat","TY bunny key","Pandora iMac access"],links:[],dream:false};
const logEl=document.getElementById("log"),storyEl=document.getElementById("story"),choicesEl=document.getElementById("choices"),statusEl=document.getElementById("status");

const scenes=[
 {speaker:"PANDORA",text:"The room boots before you do. Blue light leaks from the sleeping iMac, and Pandora is standing beside it as if she has been waiting between frames.",choices:[
  ["Open Pandora's iMac",()=>openComputer()],
  ["Look at the window",()=>say("Outside, the city is a perfect pixel loop. The same bird crosses the same moon every twelve seconds.")],
  ["Talk to Pandora",()=>say("PANDORA: If you can hear me, don't assume you're awake. That's the first rule.")]]},
 {speaker:"PANDORA",text:"The desktop wakes with a sound that is almost a heartbeat. One folder is named WORLDPEACE. Another is simply called DREAM.",choices:[
  ["Open WORLDPEACE",()=>openWorld()],
  ["Open DREAM.LOG",()=>dreamLog()],
  ["Reboot the system",()=>reboot()]]},
 {speaker:"PANDORA",text:"A red bunny icon appears on every screen. Pandora's blue eyes catch the glow. For one frame, her pupils become two red pixels.",choices:[
  ["Ask about the bunny",()=>say("PANDORA: TY isn't a mascot. It's a reminder that symbols can survive when names disappear.")],
  ["Inspect the developer coat",()=>inspectCoat()],
  ["Keep playing",()=>say("The cursor moves without your hand. It types: I KNOW YOU ARE READING THIS." )]]},
 {speaker:"PANDORA",text:"Reality lands hard—not as a monster, but as a missing frame. You suddenly remember that the room was built for a player.",choices:[
  ["Accept the contradiction",()=>say("PANDORA: Good. Now we can stop pretending the dream is only mine.")],
  ["Reboot again",()=>reboot(true)],
  ["Enter the WorldPeace canvas",()=>openWorld()] ]}
];

function log(t){const d=document.createElement("div");d.textContent="> "+t;logEl.appendChild(d);logEl.scrollTop=logEl.scrollHeight}
function say(t){storyEl.textContent=t; log(t)}
function renderScene(i=state.scene){const s=scenes[i];document.getElementById("speaker").textContent=s.speaker;storyEl.textContent=s.text;choicesEl.innerHTML="";s.choices.forEach(([label,fn])=>{const b=document.createElement("button");b.className="choice";b.textContent=label;b.onclick=fn;choicesEl.appendChild(b)})}
function nextScene(){state.scene=Math.min(state.scene+1,scenes.length-1);renderScene()}
function addItem(x){if(!state.inventory.includes(x)){state.inventory.push(x);renderInv();log("ACQUIRED: "+x)}}
function renderInv(){document.getElementById("inventory").innerHTML=state.inventory.map(x=>`<div class="item"><b>${x}</b><span>usable in the room</span></div>`).join("")}
function drawRoom(){
 ctx.clearRect(0,0,960,600);
 const g=ctx.createLinearGradient(0,0,960,600);g.addColorStop(0,"#17132f");g.addColorStop(.55,"#080a17");g.addColorStop(1,"#150a20");ctx.fillStyle=g;ctx.fillRect(0,0,960,600);
 ctx.strokeStyle="#263a66";ctx.lineWidth=2;for(let x=0;x<960;x+=48){ctx.beginPath();ctx.moveTo(x,360);ctx.lineTo(x-100,600);ctx.stroke()}for(let y=360;y<600;y+=35){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(960,y);ctx.stroke()}
 // window
 ctx.fillStyle="#050714";ctx.fillRect(55,65,250,220);ctx.strokeStyle="#57dfff";ctx.strokeRect(55,65,250,220);
 for(let i=0;i<24;i++){ctx.fillStyle=i%3?"#5ef5ff":"#ff4fb7";ctx.fillRect(70+(i*37)%220,80+(i*47)%190,3,3)}
 // desk
 ctx.fillStyle="#24172c";ctx.fillRect(450,335,430,35);ctx.fillRect(485,370,24,160);ctx.fillRect(820,370,24,160);
 // iMac
 ctx.fillStyle="#bcc8da";ctx.fillRect(570,220,230,120);ctx.fillStyle="#06101d";ctx.fillRect(583,232,204,96);ctx.fillStyle="#59efff";ctx.fillRect(590,240,190,3);ctx.fillStyle="#ff4fb7";ctx.fillRect(590,250,120,2);ctx.fillStyle="#79ff99";ctx.fillRect(590,260,160,2);ctx.fillStyle="#111";ctx.fillRect(670,340,25,25);
 // bed
 ctx.fillStyle="#261b3a";ctx.fillRect(60,430,350,80);ctx.fillStyle="#5d4c7d";ctx.fillRect(75,395,320,80);ctx.fillStyle="#2b315d";ctx.fillRect(90,410,100,50);
 // bunny terminal
 ctx.fillStyle="#111827";ctx.fillRect(420,470,100,70);ctx.fillStyle="#ff304d";ctx.font="28px monospace";ctx.fillText("◉",455,515);
 // plant / portal
 ctx.strokeStyle="#62ffae";ctx.beginPath();ctx.arc(900,150,70,0,Math.PI*2);ctx.stroke();ctx.fillStyle="#ff365e";ctx.font="20px monospace";ctx.fillText("TY",885,158);
 // character from the transparent composite sheet: central developer crop
 if(sheet.complete) ctx.drawImage(sheet,180,20,395,945,300,55,220,525);
 ctx.fillStyle="#f5e7ff";ctx.font="12px monospace";ctx.fillText("PANDORA'S ROOM // X42",30,30);
}
function openComputer(){document.getElementById("computerModal").classList.remove("hidden");document.getElementById("clock").textContent=new Date().toLocaleTimeString();log("Pandora's iMac opened.");state.trust++;addItem("WORLDPEACE access")}
function closeModal(id){document.getElementById(id).classList.add("hidden")}
document.querySelectorAll(".close").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
document.querySelectorAll(".app-icon").forEach(b=>b.onclick=()=>{if(b.dataset.app==="worldpeace")openWorld();if(b.dataset.app==="terminal")say("TERMINAL: /dream/pandora > reality --status\nSTATUS: recursive");if(b.dataset.app==="dreamlog")dreamLog()});
function dreamLog(){closeModal("computerModal");state.glitches++;say("DREAM.LOG: 03:42 — The player opened this file before Pandora existed. 03:43 — The file noticed.");log("Dream log read. Reality index unstable.");}
function inspectCoat(){addItem("Red TY developer coat");say("The coat is lined with tiny gold symbols. The inside pocket contains a key labelled PANDORA.");}
function reboot(hard=false){
 closeModal("computerModal");const m=document.getElementById("rebootModal"),bar=document.getElementById("progressBar"),txt=document.getElementById("rebootText"),glyph=document.getElementById("rebootGlyph");
 m.classList.remove("hidden");bar.style.width="0";state.glitches++;
 const lines=hard?["reality check failed","player signature detected","dream is watching","DO NOT WAKE PANDORA"] : ["saving room state","reloading memory","checking dream boundary","reality buffer online"];
 let n=0;const timer=setInterval(()=>{n++;bar.style.width=(n*10)+"%";glyph.textContent=lines[n%lines.length]+" ░".repeat((n%5)+1);if(n===10){clearInterval(timer);setTimeout(()=>{m.classList.add("hidden");document.body.classList.add("glitching");setTimeout(()=>document.body.classList.remove("glitching"),1800);say(hard?"The reboot finishes. The room is unchanged—but Pandora is now looking directly at the player.":"The reboot finishes. Something small has moved. You cannot prove what.");statusEl.textContent=hard?"DREAM STATE: PLAYER DETECTED":"DREAM STATE: UNSTABLE";nextScene()},350)}} ,120);
}
function normalizeGithub(u){try{const x=new URL(u);if(x.hostname==="github.com" && x.pathname.includes("/blob/")){const p=x.pathname.split("/");const bi=p.indexOf("blob");return "https://raw.githubusercontent.com/"+p[1]+"/"+p[2]+"/"+p.slice(bi+1).join("/")}return u}catch{return u}}
function displayName(u){try{let p=new URL(u).pathname.split("/").filter(Boolean).pop()||"worldpeace";return p.replace(/\.html?$/i,"")}catch{return "worldpeace"}}
async function loadWorldLinks(){
 const raw=document.getElementById("links").value.split(/\n+/).map(x=>x.trim()).filter(Boolean);
 state.links=raw.map(u=>({url:normalizeGithub(u),name:displayName(u)}));
 document.getElementById("linkNames").innerHTML=state.links.length?state.links.map(x=>`<div>✓ ${x.name}</div>`).join(""):"No links loaded.";
 if(state.links.length)openWorld(0);
}
document.getElementById("loadLinks").onclick=loadWorldLinks;
function openWorld(i=0){
 if(!state.links.length){
   const fallback=[{url:"https://github.com/",name:"worldpeacebtn"}];
   state.links=fallback;
 }
 const wm=document.getElementById("worldModal");wm.classList.remove("hidden");
 const tabs=document.getElementById("worldTabs");tabs.innerHTML="";
 state.links.forEach((x,idx)=>{const b=document.createElement("button");b.className="tab"+(idx===i?" active":"");b.textContent=x.name;b.onclick=()=>showWorld(idx);tabs.appendChild(b)});
 showWorld(i);
}
function showWorld(i){
 const x=state.links[i];document.getElementById("worldTitle").textContent=x.name.toUpperCase();
 const f=document.getElementById("worldFrame"),fb=document.getElementById("worldFallback");fb.classList.add("hidden");f.classList.remove("hidden");f.src=x.url;
 f.onerror=()=>{f.classList.add("hidden");fb.classList.remove("hidden");fb.textContent="The remote HTML could not be framed. This can happen because GitHub or the page blocks embedding. Direct link:\\n"+x.url};
}
document.getElementById("loginBtn").onclick=()=>{
 const u=document.getElementById("username").value.trim(),p=document.getElementById("password").value;
 if(u==="X"&&p==="42"){document.getElementById("boot").classList.add("hidden");document.getElementById("game").classList.remove("hidden");renderInv();renderScene();drawRoom();log("LOGIN ACCEPTED: X / 42");log("Pandora has loaded the player into the room.");}
 else document.getElementById("loginMsg").textContent="ACCESS DENIED — TRY X / 42";
};
document.getElementById("stage").addEventListener("click",e=>{
 const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;
 if(x>540&&x<830&&y>190&&y<370)openComputer();
 else if(x<320&&y<310)say("The window reflects a different room. In the reflection, the player is already logged in.");
 else if(x>400&&x<550&&y>450){state.glitches++;say("The red bunny terminal prints: TY // YOU WERE HERE BEFORE.");}
 else if(x>820&&y<250){say("The neon symbol pulses once. A door appears in the wall for one frame.");}
});
window.addEventListener("keydown",e=>{if(e.key==="r"&&document.getElementById("game").classList.contains("hidden")===false)reboot();if(e.key==="n")nextScene()});
sheet.onload=drawRoom;
