//window.addEventListener("load",()=>{
import {Gamer,Player} from "./player.js"
class Game{
  constructor(){
    this.GAME = document.getElementById("game");
    this.ctx = this.GAME.getContext("2d");
    this.GAME.width = window.innerWidth;
    this.GAME.height = window.innerHeight;
    this.Player = [];
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
  handle_characters(){
    this.handle_gamer()
    this.handle_player()
  }
  run_game(){
    this.run_gamer()
  }
}
export {Game};


