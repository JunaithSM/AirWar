import {Game} from "./game.js"
import {Res} from "./res.js"
function log(txt){
  const h= document.getElementById("log")
  h.innerText = txt
}
const socket = io()
const Area = new Game(socket)
let p=0
Area.run_game()
let c = true,t=0,f=0
const animate = ()=>{
    Area.clear()
    Area.handle_characters()
    Area.moveBack()
    socket.emit("player_update",Area.Gamer.x/Res,Area.Gamer.y/Res,Area.Gamer.id,Area.Gamer.health)
    let e = new Date().getTime()
    f++
    if(e-t>=1000){
      let gr = ["Very Low","Low","Medium","High","Ultra","Ultra High","Super Ultimate"]
     log("Render: "+f+" fps\n"+"Graphics: "+((Res<6)?gr[Math.floor(Res)]:gr[6]))
      f=0
      c=true
      t = new Date().getTime()
    }
   requestAnimationFrame(animate)
}
window.addEventListener("load",animate)
socket.emit("gamer_info",Area.Gamer.x/Res,Area.Gamer.y/Res,Area.Gamer.health,Area.Gamer.name)
let idcond = true;
socket.on('gamer_info',(x,y,id,health,name)=>{
  if(idcond){
    Area.Gamer.id = id
    idcond=false
    log(id)
  }
})
let i = 0
socket.on("player_info",(x,y,id,health,name)=>{
  if (id == Area.Gamer.id){return}
  for(let i=0;i<Area.Player.length;i++){
    if(id == Area.Player[i].id ){
      return
    }
  }
  Area.create_player(x,y,id,health,name)
 // alert(i+" player joined "+id+" "+Area.Gamer.id)
})
socket.on("player_update",(x,y,id,health)=>{
  for(let i=0;i<Area.Player.length;i++){
    if(id == Area.Player[i].id && id != Area.Gamer.id){
      Area.Player[i].x=x*Res
      Area.Player[i].y=y*Res
      Area.Player[i].health=health
    }
  }
  p++
})
socket.on("enemy_add",(e)=>{
  Area.create_enemy(e[0],e[1],e[2],e[3],e[4])
})
socket.on("bullet_add",(id)=>{
  for(let i=0;i<Area.Player.length;i++){
    if(id == Area.Player[i].id){
      Area.Player[i].create_bullet()
    }
  }
});

socket.on("player_remove",(id)=>{
  for(let i=0;i<Area.Player.length;i++){
    if(id == Area.Player[i].id){
      Area.Player.splice(i,1)
      i--;
    }
  }
})