class Character{
  constructor(x,y,w,h,health){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.health=health;
    this.id = 0
    this.img=document.getElementById("Img");
  }
  draw(ctx){
    ctx.beginPath()
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
    ctx.closePath();
  }
}

class Gamer extends Character{
  constructor(x,y,w,h,health){
    super(x,y,w,h,health)
    this.touch={
      x:this.x,y:this.y
    }
    this.img= document.getElementById("jetImg")
  }
  movement(game){
    if(this.touch.x <0||this.touch.x >game.width-this.width){return}
    this.x = this.touch.x
    if(this.touch.y <0||this.touch.y >game.height-this.height){return}
    this.y=this.touch.y
  }
}
class Player extends Character{
  constructor(x,y,w,h,health,id){
    super(x,y,w,h,health)
    this.id=id
    this.img= document.getElementById("jetImg")
  }
}

export {Gamer,Player,Character};