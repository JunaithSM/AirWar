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
    this.time = 0
    this.Gamer = new Gamer(this.GAME.width/2,this.GAME.height-100,50,50,100)
  }
  clear(){
    this.ctx.clearRect(0,0,this.GAME.width,this.GAME.height);
  }
  
  handle_gamer(){
    this.Gamer.draw(this.ctx);
    this.Gamer.movement()
  }
  run_gamer(){
    window.addEventListener("touchmove",(ev)=>{
      this.Gamer.touch.x = ev.touches[0].clientX
      this.Gamer.touch.y = ev.touches[0].clientY
    })
  }
  create_player(x,y,id,health){
    this.Player.push(new Player(x,y,50,50,health,id));
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
  delay(d){
    if(this.time>10000){this.time = 0}
    this.time++
    if(this.time%d==0){
      return true;
    }else{
      return false;
    }
  }
  create_enemy(){
    let y=-Math.floor(Math.random()*10),
    x=Math.floor(Math.random()*this.GAME.width-80)+80,
    w=Math.floor(Math.random()*25)+50
    if(this.delay(500)){
      this.Enemy.push(new Enemy(x,y,w,w,100))
    }
  }
  handle_characters(){
    this.handle_gamer()
    this.handle_player()
    this.handle_enemys()
    for(let i = 0;i<5;i++){
    this.create_enemy()
    }
  }
  run_game(){
    this.run_gamer()
  }
}
export {Game};


