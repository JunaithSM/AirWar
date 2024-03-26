import {GAME} from "./onlinegame.js"
import express from "express"
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
const PORT = process.env.PORT||3000
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join('Frontend')));
const Game = new GAME()

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    //console.log('user disconnected');
    Game.removePlayerInfo(socket.id)
    io.emit("player_remove",socket.id)
  });
  socket.on("gamer_info",(x,y,health)=>{
    const id = socket.id
    io.emit("gamer_info",x,y,id,health)
    Game.getPlayerInfo(x,y,id)
    Game.emitPlayer(io)
  });
  socket.on("player_update",(x,y,id,health)=>{
    io.emit("player_update",x,y,id,health)
  //  console.log(Game.enemyLocation())
    if(Game.delay(100)){
      for(let i=0;i<2;i++){
      io.emit("enemy_add",Game.enemyLocation())
      }
    }
  });
  socket.on('bullet_add',(id)=>{
    io.emit("bullet_add",id)
  })
  
});

server.listen(PORT, () => {
  console.log('server running at http://localhost:'+PORT);
});
