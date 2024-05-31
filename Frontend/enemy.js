import {Character} from "./player.js"

class Enemy extends Character{
  constructor(x,y,w,h,img){
    super(x+window.innerWidth/2,y,w,h,100)
    this.allHealth=[100,200,300,400,500,600]
    this.health = this.allHealth[img]
    this.MaxHealth= this.health
    this.speed = 1*this.res
    this.allImg = ["jet1Img","jet3Img","jet2Img","jet4Img","jet5Img","jet6Img"]
    this.img=this.allImg[img]
    this.rotate=0
  }
  movement(){
    this.y+= this.speed
  }
  autoKillEnemy(){
     if(this.x < 0 || this.x > window.innerWidth){
      this.health = 0
    } 
  }
}
export {Enemy};