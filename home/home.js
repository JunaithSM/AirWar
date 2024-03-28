const btn = document.getElementsByTagName("BUTTON")
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click",()=>{
    document.getElementById("click").play()
    document.getElementById("log").style.display="block"
    setTimeout(()=>{document.getElementById("log").style.display="none"},1000)
  })
}
