import {Character} from "./player.js"

class Enemy extends Character{
  constructor(x,y,w,h,health){
    super(x,y,w,h,health)
    this.speed = 1
    this.allImg = ["jet1Img","jet3Img","jet2Img","jet4Img"]
    this.img=this.allImg[Math.floor(Math.random()*4)]
  }
  movement(){
    this.y+= this.speed
  }
  
}
export {Enemy};