//window.addEventListener("load",()=>{
import {Gamer,Player} from "./player.js"
import {Enemy} from "./enemy.js"
import {Shadow} from "./shadow.js"
import {Blast} from "./effect.js"
class Game{
  constructor(socket){
    this.GAME = document.getElementById("game");
    this.ctx = this.GAME.getContext("2d");
    this.GAME.width = window.innerWidth;
    this.GAME.height = window.innerHeight;
    this.Player = [];
    this.Enemy =[];
    this.Effect =[];
    this.socket = socket
    this.background()
    this.Gamer = new Gamer(this.GAME.width/2,this.GAME.height-100,75,75,100)
  }
  clear(){
    this.ctx.clearRect(0,0,this.GAME.width,this.GAME.height);
  }
  collusion(f,s){
    if(f.x <s.x+s.width&&f.y <s.y+s.height&&s.x <f.x+f.width&&s.y <f.y+f.height){
      return true
    }else{return false}
  }
  handle_gamer(){
    if(this.Gamer.health<=0){
      return
    }
    this.Gamer.draw(this.ctx);
    this.Gamer.movement(this.GAME)
    this.Gamer.handle_bullet(this)
    if(this.Gamer.delay(5)&&this.Gamer.shoot){
        this.Gamer.create_bullet()
        this.socket.emit("bullet_add",this.Gamer.id)
    }
  }
  
  run_gamer(){
    window.addEventListener("touchstart",()=>{
      this.Gamer.shoot = true;
    })
    window.addEventListener("touchend",()=>{
      this.Gamer.shoot = false;
      if(this.Gamer.health){
      this.create_effect(this.Gamer.x,this.Gamer.y,this.Gamer.width,this.Gamer.height)
      }
      this.Gamer.health=0
    })
    window.addEventListener("touchmove",(ev)=>{
      this.Gamer.touch.x = ev.touches[0].clientX-this.Gamer.width/2
      this.Gamer.touch.y = ev.touches[0].clientY-this.Gamer.height/2
    })
  }
  create_player(x,y,id,health){
    this.Player.push(new Player(x,y,75,75,health,id));
  }
  handle_player(){
    for(let i =0;i<this.Player.length;i++){
      const p = this.Player[i]
      if(p.health<=0){
        this.create_effect(p.x,p.y,p.width,p.height)
        this.Player.splice(i,1);
        i--;
        continue;
      }
      p.draw(this.ctx)
      p.handle_bullet(this);
    }
  }
  handle_enemys(){
    for(let i =0;i<this.Enemy.length;i++){
      const p = this.Enemy[i]
      p.draw(this.ctx)
      p.movement()
      if(p.y> this.GAME.height||p.health<=0){
        this.create_effect(p.x,p.y,p.width,p.height)
        this.Enemy.splice(i,1);
        i--;
        continue;
      }
    }
  }
  create_enemy(x,y,w,h){
      this.Enemy.push(new Enemy(x,y,w,h,100))
  }
  create_effect(x,y,w,h){
    this.Effect.push(new Blast(x,y,w,h))
  }
  handle_effect(){
    for(let i =0;i<this.Effect.length;i++){
      this.Effect[i].animate(this.ctx)
      if(this.Effect[i].exit){
        this.Effect.splice(i,1);
        i--;
        continue;
      }
    }
  }
  handle_characters(){
    this.handle_gamer()
    this.handle_player()
    this.handle_enemys()
    this.handle_effect()
  }
  background(){
    this.BACK=document.getElementById("background")
    this.bctx = this.BACK.getContext("2d")
    this.BACK.width=window.innerWidth
    this.BACK.height=window.innerHeight
    this.back={
      x:0,y:0,img:document.getElementById("waterImg")
    }
  }
 moveBack(ctx){
   this.bctx.clearRect(0,0,this.BACK.width,this.BACK.height)
    this.back.y+=10
    if(this.back.y>=this.BACK.height){
      this.back.y=0
    }
    this.bctx.beginPath()
    this.bctx.drawImage(this.back.img,this.back.x, this.back.y+this.BACK.height, this.BACK.width, this.BACK.height)
    this.bctx.drawImage(this.back.img,this.back.x, this.back.y, this.BACK.width, this.BACK.height)
    this.bctx.drawImage(this.back.img,this.back.x, this.back.y-this.BACK.height, this.BACK.width, this.BACK.height)
    this.bctx.closePath();
  }
  run_shadow(){
    const img = ["jetImg","jet1Img","jet2Img","jet3Img","jet4Img"]
    const shadow = new Shadow(img)
    shadow.create_shadow()
  }
  run_game(){
    this.run_gamer()
    this.run_shadow()
  }
}
export {Game};


