class GAME{
  constructor(){
    this.Player=[]
    this.time=0
  }
  getPlayerInfo(x,y,id){
    for( let i =0;i<this.Player.length;i++){
      const Player = this.Player[i]
    //  console.log(Player.id)
      if(Player.id == id){
        Player.x = x,Player.y = y
        return;
      }
    }
    this.Player.push({x:x,y:y,id:id})
  }
  removePlayerInfo(id){
    for( let i =0;i<this.Player.length;i++){
      const Player = this.Player[i]
      if(Player.id == id){
        this.Player.splice(i,1)
        i--;
        break;
      }
    }
  }
  emitPlayer(io,id=0){
    for( let i =0;i<this.Player.length;i++){
      const p = this.Player[i]
    //  console.log(id!=p.id)
      if(id != p.id){
      io.emit("player_info",p.x,p.y,p.id,p.health)
      }
    }
  }
  enemyLocation(){
    let y=-Math.floor(Math.random()*10),
    x=Math.floor(Math.random()*750)+80,
    w=Math.floor(Math.random()*25)+50;
    return [x,y,w,w]
  }
  delay(d){
    if(this.time>10000){this.time = 0}
    this.time++
    if(this.time%d==0){
      return true;
    }else{
      return false;
    }
  }
}
export {GAME};
