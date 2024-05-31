//profile pic
const error = (msg)=>{
  const Error =  document.getElementById("Error");
  Error.style.display = "block"
  Error.innerText = msg
}
const PROFILE_PIC = ["man_profile.jpeg","man1_profile.jpeg","man2_profile.jpeg","girl_profile.jpeg","girl1_profile.jpeg","girl2_profile.jpeg","robot_profile.jpeg","robot2_profile.jpeg"]
const createProfiles = (pic)=>{
    let profile = document.getElementById("chooseprofile");
    let img = document.createElement("IMG")
    img.src = pic
    img.alt = pic
    img.className = "profileimgs btnso"
    profile.appendChild(img)
}
for (let i = 0; i < PROFILE_PIC.length; i++) {
  const pic = PROFILE_PIC[i];
  createProfiles(pic)
}


//bg music

const bgMusic = document.getElementById("backgroundmusic")

//load
const LOADING  = document.getElementById("loading")
var imgs = document.getElementsByTagName('IMG')
function imgLoaded(i){
  LOADING.innerText = (Math.floor((i/imgs.length)*100))+"% LOADING..."
}

for (let i = 0; i < imgs.length; i++) {
  const img = imgs[i];
  if (img.complete) {
    imgLoaded(i)
  } else {
    img.addEventListener('load', ()=>{ imgLoaded(i) });
    img.addEventListener('error', (e)=> {
      error(e.type)
      LOADING.innerText = "Failed to Load Image.\n Try reloading the page."
    })
  }
}

window.onerror = function(e) {
  error(e.type)
  LOADING.innerText = "Something went wrong \n:(\nPlease check connection.\nTry reloading page."
  LOADING.className = ""
};
//show error

try {
  window.addEventListener("load",()=>{
    Notification.requestPermission().then(perm=>{
      if (perm =="granted") {
        let notify = new Notification("Welcome Pilot!",{
          body:`Welcome back to Air Attack Force ${localStorage.getItem("UserName")}.`,
          icon:USERPROFILE.src,
        })
      }else{
        alert("Please enable Notification.To get the latest Updates.")
      }
    })
    LOADING.innerText = "100% LOADING..."
    setTimeout(()=>{
      LOADING.innerText = "Tap to continue"
    LOADING.className = ""
    },1000)
    
    window.addEventListener("click",()=>{
      try {
        document.getElementById("body1").style.display = "block"
        bgMusic.volume = 0.1
        bgMusic.play()
        bgMusic.loop = true
        LOADING.style.display = "none";
      }catch(err){
        error(err)
        LOADING.innerText = "Failed try again";
      }
    })
  })
  
} 
catch (err){
  LOADING.innerText = "Something went wrong \n:(\nPlease check connection.\nTry reloading page."
  LOADING.className = ""
  error(err)
}

async function backMusic(){
const music = await document.getElementById("backgroundmusic")
music.play()
}

//profile

const USERPROFILE = document.getElementById("profileImg")
const change_profile_img = (pic)=>{
  localStorage.setItem("UserProfile",pic)
  USERPROFILE.src = pic
  let profile = document.getElementById("chooseprofile");
 profile.style.display = "none"
}
USERPROFILE.addEventListener("click",()=>{
  let profile = document.getElementById("chooseprofile");
  profile.style.display = "flex"
})

//img btn

const IMG_BTN = document.getElementsByClassName("profileimgs")
for (let i = 0; i < IMG_BTN.length; i++) {
  IMG_BTN[i].addEventListener("click",(e)=>{
    change_profile_img(e.currentTarget.src)
  })
  
}
const btn = document.getElementsByTagName("BUTTON")
for (let i = 0; i < btn.length; i++) {
  const b = btn[i];
  b.className+= " btnso"
  b.addEventListener("click",(e)=>{
    for (let j = 0; j < btn.length; j++) {
      const bt = btn[j];
      if(!bt.className.includes("graphicbtn"))
        bt.className = bt.className.replace(" clicked","")
    }
    let str = e.currentTarget.className
    if(!str.includes("clicked"))
      e.currentTarget.className += " clicked"
  })
}

//sound btn
const btn_sound = document.getElementsByClassName("btnso")
const playClickSound = ()=>{
  document.getElementById("click").duration = 0
  document.getElementById("click").play()
}
for (var i = 0; i < btn_sound.length; i++) {
  btn_sound[i].addEventListener("click",()=>{
   playClickSound();
   // document.getElementById("log").style.display="block"
    setTimeout(()=>{document.getElementById("log").style.display="none"},1000)
  })
}

//openpage


const Open_Page = (page = false)=>{
  
  const Pages = document.getElementsByClassName("pages")
  for(let  i =0; i < Pages.length;i++){
    const pg = Pages[i].style
    pg.display = "none"
  }
  if(!page){
    return;
  }
  document.title = `Air Attack Force|Home`
  page.style.display = "block"
}

//username storage
const USERNAME = document.getElementsByClassName('NAME')
const userprofileto = ()=>{
  if(localStorage.getItem("UserProfile")){
   USERPROFILE.src = localStorage.getItem("UserProfile")
    return;
  }
}
const usernameto = ()=>{
  if(localStorage.getItem("UserName")){
    for (let i = 0; i < USERNAME.length; i++) {
      USERNAME[i].innerText = localStorage.getItem("UserName")
    }
    return;
  }
  localStorage.setItem("UserName",`User${Math.floor(Math.random()*100000000)}`)
}
usernameto()
userprofileto()
const PAGE = {
  SETTING:document.getElementById("settingPage"),
  CHAT:document.getElementById("chatPage"),
  ROOM:document.getElementById("roomPage"),
  PROFILE:document.getElementById("accountPage"),
  SETPAGE:document.getElementsByClassName("setpage"),
  GARAGE:document.getElementById("garagePage")
}

const BTN ={
  SETTING:document.getElementsByClassName("setting"),
  BACK:document.getElementsByClassName("back"),
  CHAT:document.getElementsByClassName("chats"),
  ROOM:document.getElementsByClassName("groups"),
  PROFILE:document.getElementsByClassName("profile"),
  SETBTN:document.getElementsByClassName("setbtn"),
  GARAGE:document.getElementsByClassName("garage")
}

//set pg btn

const set_page_btn = (btn,page,minipage="",defaultPage = "")=>{

  for (let i = 0; i < btn.length; i++) {
    const btns = btn[i];
    btns.addEventListener("click",(e)=>{
      let minipages = document.getElementsByClassName(minipage)
      if(minipage && defaultPage){
      for (let i = 0; i < minipages.length; i++) {
        minipages[i].style.display = "none"
        
      }
      document.getElementById(defaultPage).style.display = ""}
      if(!e.currentTarget.className.includes("clicked"))
        e.currentTarget.className += " clicked"
      Open_Page(page)
      let str = page.id
      document.querySelector(`#${str} div button`).className += " clicked"
      let pageName = str.slice(0,-4)
      document.title = `Air Attack Force|${pageName[0].toUpperCase()+pageName.slice(1)}`
      window.history.pushState({},"",pageName)

    });
  }
}
//colse and open page
set_page_btn(BTN.SETTING,PAGE.SETTING,"setpage","graphicpage")
set_page_btn(BTN.CHAT,PAGE.CHAT)
set_page_btn(BTN.ROOM,PAGE.ROOM,"roompage","joinRoom")
set_page_btn(BTN.GARAGE,PAGE.GARAGE)
set_page_btn(BTN.PROFILE,PAGE.PROFILE,"accpage","accprofile")
for (let i = 0; i < BTN.BACK.length; i++) {
  const btn = BTN.BACK[i];
  btn.addEventListener("click",()=>{
    
    if(PAGE.CHAT.style.display == "block"){
      const dots = document.getElementsByClassName('chtbtn')[0]
    const str =  dots.className.replace(" dot","")
    dots.className = str
    }
    Open_Page()
    window.history.back()
  });
}
window.onpopstate = ()=>{
  Open_Page();
  playClickSound();
  document.title = `Air Attack Force|Home`
}

//notify to chat using dot 
for (let i = 0; i < BTN.CHAT.length; i++) {
  const btn = BTN.CHAT[i];
  btn.addEventListener("click",()=>{
    const dots = document.getElementsByClassName('chtbtn')[0]
    const str =  dots.className.replace(" dot","")
    dots.className = str
  });
}
//button click on profile
function buttonclick(opt){
  switch (opt){
    case "info":
      document.getElementById("accprofile").style.display = "flex";
      break;
    case "connect":
      document.getElementById("accprofile").style.display = "none";
      break;
    case "friend":
      document.getElementById("accprofile").style.display = "none"
  }
}

//graphic ocntroll
function graphicsControl(inp){
  const graphbtn = document.getElementsByClassName("graphicbtn");
  for (let i = 0; i < graphbtn.length; i++) {
    const g = graphbtn[i];
    let str = g.className;
    g.className = str.replace(' clicked',"")
    if(g.innerText == inp){
      g.className+=' clicked'
      localStorage.setItem("Graphic", inp)       
    }
  }
}

if(localStorage.getItem("Graphic")){
  graphicsControl(localStorage.getItem("Graphic"))
}else{
  graphicsControl("STANDARD")
}
//setting page controll
const setting_page_open = (page)=>{
  for (let j = 0; j < PAGE.SETPAGE.length; j++) {
    const p = PAGE.SETPAGE[j];
    p.style.display = "none"
    if(p.className.includes(`s${page}`)){
      p.style.display = "block"
    }
  }
}
for (let i = 0; i < BTN.SETBTN.length; i++) {
  const b = BTN.SETBTN[i];
  b.addEventListener("click",(e)=>{
    setting_page_open(e.currentTarget.innerText)
  })
}

//roompage

function roomclick(opt){
  switch(opt){
    case "join":
      document.getElementById("joinRoom").style.display = "block"
      document.getElementById("hostRoom").style.display = "none"
      break;
    case "host":
      document.getElementById("joinRoom").style.display = "none"
      document.getElementById("hostRoom").style.display = "block"
      break;
  }
}

//changeThemecolor
const r = document.querySelector(':root')
if(localStorage.getItem("themeColor")){
  r.style.setProperty('--theme_color', localStorage.getItem("themeColor"))
}
function themeColors(color){
  r.style.setProperty('--theme_color', color)
  localStorage.setItem("themeColor",color)

}

