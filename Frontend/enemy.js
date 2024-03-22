import {Character} from "./player.js"

class Enemy extends Character{
  constructor(x,y,w,h,health){
    super(x,y,w,h,health)
    this.speed = 1
  }
  movement(){
    this.y+= this.speed
  }
  
}
export {Enemy};