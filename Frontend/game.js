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
    this.time=0
    this.Gamer = new Gamer(this.GAME.width/2,this.GAME.height-100,75,75,100,localStorage.getItem("UserName"))
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
        this.create_gunfire(this.Gamer.x+this.Gamer.width/2,this.Gamer.y,50*Res,50*Res,2)
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
  create_player(x,y,id,health,name){
    this.Player.push(new Player(x,y,75,75,health,id,name));
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
  create_gunfire(x,y,w,h,d =1){
    this.Effect.push(new Blast(x,y,w,h,"gunfireImg",1,5,d))
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
  loadAllImage(){
    var imgs = document.getElementsByTagName('img')
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i]
      if (img.complete) {
        console.log('loaded',img.src)
      } else {
        img.addEventListener('load', loaded)
        img.addEventListener('error', function() {
            alert('error')
        })
      }
    }
  }
  background(){
    this.BACK=document.getElementById("background")
    this.bctx = this.BACK.getContext("2d")
    this.BACK.width=window.innerWidth
    this.BACK.height=window.innerHeight
    this.bg={
      shake: 10,x:0,y:0,i:0,j:0,d:10,s:false,t:0,
    }
    this.bg.x = -this.bg.shake;
    this.bg.d = this.bg.shake;
    this.bgImg=[["seaseaImg","seagreenImg","searockImg"],["greenseaImg","greengreenImg","greenrockImg"],["rockseaImg","rockgreenImg","rockrockImg"]]
    for(let i = 0;i<this.bgImg.length;i++){
      for (let j = 0; j < this.bgImg[i].length; j++) {
        console.log(document.getElementById(this.bgImg[i][j]));
        
      }
     
    }
  }
 
 moveBack(){
   
   this.bctx.clearRect(0,0,this.BACK.width,this.BACK.height)
   let j=this.bg.j
   
   if(this.bg.y>=this.BACK.height*2){
     this.bg.y=0
     this.time=(this.time > 10000)?0:this.time+1
     
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
    let i1 = this.bgImg[i][j]
    let img = document.getElementById(i1.toString())
    let h= this.BACK.height,
     w=this.BACK.width+this.bg.shake
    
    this.bctx.drawImage(img,this.bg.x,this.bg.y,w,h)
    j=this.bg.j
   
    let i2 = this.bgImg[i][j]
    img = document.getElementById(i2.toString())
     
    this.bctx.drawImage(img,this.bg.x,this.bg.y-this.BACK.height,w,h)
    i=j
      let i3 = this.bgImg[i][j]
    img = document.getElementById(i3.toString())
    this.bctx.drawImage(img,this.bg.x,this.bg.y-this.BACK.height*2,w,h)
    this.bctx.closePath();
    this.bg.y+=5
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
    if(this.bg.t>=this.bg.shake){
      this.bg.s=false
      this.bg.x=-this.bg.shake
      this.bg.d=this.bg.shake
    }
    }
  }
  run_shadow(){
    const img = ["jetImg","jet1Img","jet2Img","jet3Img","jet4Img","jet5Img","jet6Img"]
    const shadow = new Shadow(img)
    shadow.create_shadow()
  }
  run_game(){
    this.loadAllImage()
    this.run_gamer()
    this.run_shadow()
    this.background()
  }
}

export {Game};


