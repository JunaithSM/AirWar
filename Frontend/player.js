class Character{
  constructor(x,y,w,h,health){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.health=health;
    this.id = 0
  }
  draw(ctx){
    ctx.beginPath()
    ctx.fillStyle="blue"
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fill()
    ctx.closePath();
  }
}

class Gamer extends Character{
  constructor(x,y,w,h,health){
    super(x,y,w,h,health)
    this.touch={
      x:0,y:0
    }
  }
  movement(){
    this.x = this.touch.x,this.y=this.touch.y
  }
}
class Player extends Character{
  constructor(x,y,w,h,health,id){
    super(x,y,w,h,health)
    this.id=id
  }
}

export {Gamer,Player,Character};