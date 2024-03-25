import {Game} from "./game.js"
function log(txt){
  const h= document.getElementById("log")
  h.innerText = txt
}
const socket = io()
const Area = new Game(socket)
window.addEventListener("load",()=>{

Area.run_game()
const animate = ()=>{
    Area.clear()
    Area.handle_characters()
    Area.moveBack()
    socket.emit("player_update",Area.Gamer.x,Area.Gamer.y,Area.Gamer.id,Area.Gamer.health)
    //Area.emit_gamer(socket)
    requestAnimationFrame(animate);
}
animate()
})
socket.emit("gamer_info",Area.Gamer.x,Area.Gamer.y,Area.Gamer.health)
let idcond = true;
socket.on('gamer_info',(x,y,id,health)=>{
  if(idcond){
    Area.Gamer.id = id
    idcond=false
    log(id)
  }
})
let i = 0
socket.on("player_info",(x,y,id,health)=>{
  if (id == Area.Gamer.id){return}
  for(let i=0;i<Area.Player.length;i++){
    if(id == Area.Player[i].id ){
      return
    }
  }
  Area.create_player(x,y,id,health)
  alert(i+" player joined "+id+" "+Area.Gamer.id)
})
socket.on("player_update",(x,y,id,health)=>{
  for(let i=0;i<Area.Player.length;i++){
    if(id == Area.Player[i].id && id != Area.Gamer.id){
      Area.Player[i].x=x
      Area.Player[i].y=y
      Area.Player[i].health=health
    }
  }
})
socket.on("enemy_add",(e)=>{
  Area.create_enemy(e[0],e[1],e[2],e[3])
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