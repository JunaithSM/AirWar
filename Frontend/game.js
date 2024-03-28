//window.addEventListener("load",()=>{
import {Gamer,Player} from "./player.js"
import {Enemy} from "./enemy.js"
import {Shadow} from "./shadow.js"
import {Blast} from "./effect.js"
import {Res} from "./res.js"
class Game{
  constructor(socket){
    this.GAME = document.getElementById("game");
    this.ctx = this.GAME.getContext("2d");
    this.GAME.width = window.innerWidth*Res;
    this.GAME.height = window.innerHeight*Res;
    this.Player = [];
    this.Enemy =[];
    this.Effect =[];
    this.socket = socket
    this.background()
    this.time=0
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
    this.Gamer.handle_bullet(this)
    this.Gamer.draw(this.ctx);
    this.Gamer.movement(this.GAME)
    this.Gamer.enemy_collision(this)
    if(this.Gamer.delay(5)&&this.Gamer.shoot){
        this.Gamer.create_bullet()
        this.create_gunfire(this.Gamer.x+this.Gamer.width/2,this.Gamer.y,100,100)
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
      this.Gamer.touch.x =( ev.touches[0].clientX*Res-this.Gamer.width/2)
      this.Gamer.touch.y = (ev.touches[0].clientY*Res-this.Gamer.height/2)
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
  create_enemy(x,y,w,h,img){
      this.Enemy.push(new Enemy(x,y,w,h,img))
  }
  create_effect(x,y,w,h){
    this.Effect.push(new Blast(x,y,w,h,"blastImg",4,2,3))
  }
  create_gunfire(x,y,w,h){
    this.Effect.push(new Blast(x,y,w,h,"gunfireImg",1,5,1))
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
    this.bg={
      x:0,y:0,i:0,j:0,d:10,s:false,t:0
    }
  }
 
 moveBack(ctx){
   
   this.bctx.clearRect(0,0,this.BACK.width,this.BACK.height)
   let bgs = ["sea","green","rock"]
   let j=this.bg.j
   
   if(this.bg.y>=this.BACK.height*2){
     this.bg.y=0
     this.time++ //(this.time > 10000)?0:this.time+1
     
     if(this.time%2==0){
      
      this.bg.j=Math.floor(Math.random()*3)
     }
     if(j==this.bg.j){
        this.bg.i=j
      }
   }
   let i= this.bg.i
    this.bctx.beginPath();
    j=i
    let i1 = `${bgs[i]}${bgs[j]}Img`
      let img = document.getElementById(i1)
    let h= this.BACK.height,
     w=Math.floor(img.width/this.BACK.height)*(this.BACK.width+10)
     if(img){
    this.bctx.drawImage(img,this.bg.x-10,this.bg.y,w,h)
    j=this.bg.j
     }
    let i2 = `${bgs[i]}${bgs[j]}Img`
    img = document.getElementById(i2)
     w=Math.floor(img.width/this.BACK.height)*(this.BACK.width+10)
     
    this.bctx.drawImage(img,this.bg.x-10,this.bg.y-this.BACK.height,w,h)
    i=j
      let i3 = `${bgs[i]}${bgs[j]}Img`
    img = document.getElementById(i3)
     w=Math.floor(img.width/this.BACK.height)*(this.BACK.width+10)
     
    this.bctx.drawImage(img,this.bg.x-10,this.bg.y-this.BACK.height*2,w,h)
    this.bctx.closePath();
    this.bg.y+=10
    if(this.Gamer.health_dec){
      this.bg.t=0
    }
    if(!this.Gamer.health_dec&&this.bg.t==0){
    this.bg.s=true
    }
    if(this.bg.s){
      if(this.Gamer.delay(2)){
      this.bg.x+=this.bg.d,this.bg.t++
      this.bg.d*=-1}
    if(this.bg.t>=10){
      this.bg.s=false
      this.bg.x=0
      this.bg.d=10
    }
    }
  }
  run_shadow(){
    const img = ["jetImg","jet1Img","jet2Img","jet3Img","jet4Img","jet5Img","jet6Img"]
    const shadow = new Shadow(img)
    shadow.create_shadow()
  }
  run_game(){
    this.run_gamer()
    this.run_shadow()
  }
}

export {Game};


