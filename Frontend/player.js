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
    this.MaxHealth=health 
    this.time=0
  }
  draw(ctx){
    if(document.getElementById(`${this.img}Shadow`)){
      this.shadow(ctx)
    }
    ctx.beginPath()
    ctx.drawImage(document.getElementById(this.img),this.x, this.y, this.width, this.height)
    ctx.closePath();
    this.healthBar(ctx)
  }
  shadow(ctx){
    ctx.beginPath()
    ctx.drawImage(document.getElementById(`${this.img}Shadow`),this.x-10, this.y-10, this.width*0.75, this.height*0.75)
    ctx.closePath()
   
  }
  healthBar(ctx){
    if(this.health!=this.MaxHealth){
    ctx.beginPath()
    ctx.fillStyle = "#11111177"
    ctx.fillRect(this.x,this.y,this.width,10)
    ctx.fillStyle = `hsl(${(this.health/this.MaxHealth)*100},100%,40%`
    ctx.fillRect(this.x,this.y,(this.health/this.MaxHealth)*this.width,10)
    
    ctx.fill()
      ctx.closePath()
    }
  }
  collusion(f,s){
    if(f.x <s.x+s.width&&f.y >s.y+s.height&&s.x <f.x+f.width&&s.y >f.y+f.height){
      return true
    }else{return false}
  }
  create_bullet(){
    this.bullet.push(new Bullet(this.x+this.width/2,this.y+this.height/2,10))
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