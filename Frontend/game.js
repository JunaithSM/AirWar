//window.addEventListener("load",()=>{
import {Gamer,Player} from "./player.js"
import {Enemy} from "./enemy.js"
class Game{
  constructor(){
    this.GAME = document.getElementById("game");
    this.ctx = this.GAME.getContext("2d");
    this.GAME.width = window.innerWidth;
    this.GAME.height = window.innerHeight;
    this.Player = [];
    this.Enemy =[];
    this.background()
    this.Gamer = new Gamer(this.GAME.width/2,this.GAME.height-100,100,100,100)
  }
  clear(){
    this.ctx.clearRect(0,0,this.GAME.width,this.GAME.height);
  }
  
  handle_gamer(){
    this.Gamer.draw(this.ctx);
    this.Gamer.movement(this.GAME)
  }
  run_gamer(){
    window.addEventListener("touchmove",(ev)=>{
      
      this.Gamer.touch.x = ev.touches[0].clientX-this.Gamer.width/2
      this.Gamer.touch.y = ev.touches[0].clientY-this.Gamer.height/2
    })
  }
  create_player(x,y,id,health){
    this.Player.push(new Player(x,y,100,100,health,id));
  }
  handle_player(){
    for(let i =0;i<this.Player.length;i++){
      const p = this.Player[i]
      p.draw(this.ctx)
    }
  }
  handle_enemys(){
    for(let i =0;i<this.Enemy.length;i++){
      const p = this.Enemy[i]
      p.draw(this.ctx)
      p.movement()
      if(this.Enemy[i].y> this.GAME.height){
        this.Enemy.splice(i,1)
        i--
      }
    }
  }
  create_enemy(x,y,w,h){
      this.Enemy.push(new Enemy(x,y,w,h,1))
  }
  handle_characters(){
    this.handle_gamer()
    this.handle_player()
    this.handle_enemys()
    
    //this.moveBack(this.bctx)
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
    this.back.y+=20
    if(this.back.y>=this.BACK.height){
      this.back.y=0
    }
    this.bctx.beginPath()
    this.bctx.drawImage(this.back.img,this.back.x, this.back.y+this.BACK.height, this.BACK.width, this.BACK.height)
    this.bctx.drawImage(this.back.img,this.back.x, this.back.y, this.BACK.width, this.BACK.height)
    this.bctx.drawImage(this.back.img,this.back.x, this.back.y-this.BACK.height, this.BACK.width, this.BACK.height)
    this.bctx.closePath();
    
  }
  run_game(){
    this.run_gamer()
    
  }
}
export {Game};


