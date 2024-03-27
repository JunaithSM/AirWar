import {Res} from "./res.js"
class Bullet{
  constructor(x,y,damage){
    this.res = Res
    this.damage=damage;
    this.width=10*this.res
    this.height=10*this.res
    this.x = x-this.width/2;
    this.y=y-this.height/2
    this.speed = 30*this.res
    this.img = document.getElementById("Img");
  }
  draw(ctx){
    ctx.beginPath();
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    ctx.closePath();
  }
  movement(){
    this.y-= this.speed
  }
}

export {Bullet}; 