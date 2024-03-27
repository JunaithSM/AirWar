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
    this.imgD = document.getElementById("blastImg")
   this.sw=this.imgD.width/4;this.sh=this.imgD.height/2
   this.delay=3
  }
  animate(ctx){
    this.time=(this.time>5000)?0:this.time+1
    if(this.time%this.delay==0){
      this.sx+=this.sw;
      if(this.sx>this.imgD.width){
        this.sx=0
        this.sy+=this.sh
        if(this.sy > this.imgD.height){
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