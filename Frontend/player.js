import {Bullet} from "./bullet.js"
class Character{
  constructor(x,y,w,h,health){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.health=health;
    this.id = 0
    this.img="Img";
    this.bullet = []
    this.shoot = false;
  }
  draw(ctx){
    ctx.beginPath()
    ctx.drawImage(document.getElementById(this.img),this.x, this.y, this.width, this.height)
    ctx.closePath();
  }
  create_bullet(){
    
    this.bullet.push(new Bullet(this.x+this.width/2,this.y+this.height/2,10))
  }
  handle_bullet(ctx){
    for(let i = 0;i<this.bullet.length;i++){
      this.bullet[i].draw(ctx)
      this.bullet[i].movement()
      if(this.bullet.y <this.bullet.width){
        this.bullet.splice(i,1)
        i--
      }
    }
  }
}

class Gamer extends Character{
  constructor(x,y,w,h,health){
    super(x,y,w,h,health)
    this.touch={
      x:this.x,y:this.y
    }
    this.img= "jetImg"
    this.time=0
  }
  movement(game){
    if(this.touch.x <0||this.touch.x >game.width-this.width){return}
    this.x = this.touch.x
    if(this.touch.y <0||this.touch.y >game.height-this.height){return}
    this.y=this.touch.y
  }
  delay(d){
    this.time = (this.time > 10000)?0:this.time+1
    if(this.time%d==0){
      return true;
    }else{
      return false;
    }
  }
}
class Player extends Character{
  constructor(x,y,w,h,health,id){
    super(x,y,w,h,health)
    this.id=id
    this.img= "jetImg"
  }
}

export {Gamer,Player,Character};