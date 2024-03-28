class Effect{
  constructor(x,y,w,h){
    this.img="Img"
    this.x=x-w/2
    this.y = y-h/2 
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
  constructor(x,y,w,h,img,sw,sh,d){
    super(x,y,w,h)
    this.img=img
    this.imgD = document.getElementById(this.img)
   this.sw=this.imgD.width/sw;this.sh=this.imgD.height/sh
   this.delay=d
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