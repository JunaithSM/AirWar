//profile pic
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
setTimeout(()=>{
  LOADING.innerText = "Please Wait..."
},5000)
setTimeout(()=>{
  LOADING.innerText = "Something went wrong \n:(\nPlease check connection.\nTry reloading page."
  LOADING.className = ""
},10000)
window.addEventListener("load",()=>{
  LOADING.innerText = "Loaded..."
  setTimeout(()=>{
    LOADING.innerText = "Tap to continue.."
    LOADING.className = ""
  },500)
window.addEventListener("click",()=>{
  document.getElementById("body1").style.display = "block"
  LOADING.style.display = "none";
  bgMusic.volume = 0.1
  bgMusic.play()
  bgMusic.loop = true
})


})
window.onload = function() {
  document.getElementById("backgroundmusic").play();
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

for (var i = 0; i < btn_sound.length; i++) {
  btn_sound[i].addEventListener("click",()=>{
    document.getElementById("click").duration = 0
    document.getElementById("click").play()
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
  SETPAGE:document.getElementsByClassName("setpage")
}

const BTN ={
  SETTING:document.getElementsByClassName("setting"),
  BACK:document.getElementsByClassName("back"),
  CHAT:document.getElementsByClassName("chats"),
  ROOM:document.getElementsByClassName("groups"),
  PROFILE:document.getElementsByClassName("profile"),
  SETBTN:document.getElementsByClassName("setbtn"),
}

//set pg btn

const set_page_btn = (btn,page)=>{
  for (let i = 0; i < btn.length; i++) {
    const btns = btn[i];
    btns.addEventListener("click",()=>{
      Open_Page(page)
      let str = page.id
      document.querySelector(`#${str} div button`).className += " clicked"
    });
  }
}
//colse and open page
set_page_btn(BTN.SETTING,PAGE.SETTING)
set_page_btn(BTN.CHAT,PAGE.CHAT)
set_page_btn(BTN.ROOM,PAGE.ROOM)
set_page_btn(BTN.PROFILE,PAGE.PROFILE)
for (let i = 0; i < BTN.BACK.length; i++) {
  const btn = BTN.BACK[i];
  btn.addEventListener("click",()=>{
    if(PAGE.CHAT.style.display == "block"){
      const dots = document.getElementsByClassName('chtbtn')[0]
    const str =  dots.className.replace(" dot","")
    dots.className = str
    }
    Open_Page()

  });
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
//window resize control
window.addEventListener("resize",()=>{window.location.reload()})