import {Res} from "./res.js"
class Bullet{
  constructor(x,y,damage){
    this.res = Res
    this.img = document.getElementById("bulletImg");
    this.damage=damage;
    this.width=3*this.res
    this.height=(this.img.height/this.img.width)*3*this.res
    this.x = x-this.width/2;
    this.y=y-this.height/2
    this.speed = 30*this.res
    
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