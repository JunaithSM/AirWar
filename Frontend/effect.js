class Effect{
  constructor(x,y,w,h){
    this.img="Img"
    this.x=x
    this.y = y 
    this.width = w 
    this.height = h
     this.time=0
    this.sx=0;
    this.sy=0;
    this.delay=1
    this.sw = 0
    this.sh=0
    this.exit=false
  }
  
}

class Blast extends Effect{
  constructor(x,y,w,h){
    super(x,y,w,h)
    this.img="blastImg"
   this.sw=92.8;this.sh=100
  }
  animate(ctx){
    this.time=(this.time>5000)?0:this.time+1
    if(this.time%this.delay==0){
      this.sx+=this.sw;
      if(this.sx>835){
        this.sx=0
        this.sy+=this.sh
        if(this.sy > 900){
          this.sy=0
          this.exit=true
          return;
        }
      }
    }
    ctx.beginPath()
    ctx.drawImage(document.getElementById(this.img),this.sx, this.sy, this.sw, this.sh,this.x,this.y,this.width,this.height)
    ctx.closePath();
  }
}
export {Blast};