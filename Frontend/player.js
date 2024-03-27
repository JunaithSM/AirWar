import {Bullet} from "./bullet.js"
import {Res} from "./res.js"
class Character{
  constructor(x,y,w,h,health){
    this.res = Res
    this.x = x*this.res;
    this.y = y*this.res;
    this.width = 75*this.res;
    this.height = 75*this.res;
    this.health=health;
    this.id = 0
    this.img="Img";
    this.bullet = []
    this.shoot = false;
    this.MaxHealth=health 
    this.rotate=0
    this.name=""
  }
  draw(ctx){
    if(document.getElementById(`${this.img}Shadow`)){
      this.shadow(ctx)
    }
    ctx.save()
    ctx.beginPath()
    ctx.translate(this.x+this.width/2,this.y+this.height/2)
    ctx.rotate(this.rotate*Math.PI/180)
    ctx.drawImage(document.getElementById(this.img),-this.width/2, -this.width/2, this.width, this.height)
    ctx.closePath();
    ctx.restore()
    this.healthBar(ctx)
  }
  shadow(ctx){
    let x = this.x-10,y=this.y-10,w=this.width*0.75,h=this.height*0.75;
    ctx.save()
    ctx.beginPath()
    ctx.translate(x+w/2,y+h/2)
    ctx.rotate(this.rotate*Math.PI/180)
    ctx.beginPath()
    ctx.drawImage(document.getElementById(`${this.img}Shadow`),-w/2, -h/2, w,h)
    ctx.closePath()
   ctx.restore()
  }
  healthBar(ctx){
    if(this.health!=this.MaxHealth){
    ctx.beginPath()
    ctx.fillStyle = "#11111177"
    ctx.fillRect(this.x,this.y,this.width,this.height*0.05)
    ctx.fillStyle = `hsl(${(this.health/this.MaxHealth)*250},100%,40%`
    ctx.fillRect(this.x,this.y,(this.health/this.MaxHealth)*this.width,this.height*0.05)
    
    ctx.fill()
      ctx.closePath()
    }
  }
  create_bullet(){
    this.bullet.push(new Bullet(this.x+this.width/2,this.y+this.height/2,25))
  }
 
  handle_bullet(obj){
    for(let i = 0;i<this.bullet.length;i++){
      this.bullet[i].draw(obj.ctx)
      this.bullet[i].movement()
      if(this.bullet[i].y <this.bullet[i].width){
        this.bullet.splice(i,1)
        i--;
        continue;
      }
      for(let j = 0;j<obj.Enemy.length;j++){
        if(obj.collusion(this.bullet[i],obj.Enemy[j])){
          obj.Enemy[j].health-=this.bullet[i].damage
          this.bullet.splice(i,1)
        i--;
        break;
        }
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