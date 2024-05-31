import {GAME} from "./onlinegame.js"
import express from "express"
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import reload from 'reload'
const PORT = process.env.PORT||3000
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use("/game",express.static(path.join('Frontend')));
app.use("/",express.static(path.join('home')));
app.use("/imgs",express.static(path.join('imgs')));
app.use(express.static('home'))
const Game = new GAME()
const NAMES = []
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
   // console.log('user disconnected');
    Game.removePlayerInfo(socket.id)
    io.emit("player_remove",socket.id)
  });
  socket.on("gamer_info",(x,y,health,name)=>{
    const id = socket.id
    io.emit("gamer_info",x,y,id,health,name)
    Game.getPlayerInfo(x,y,id,health,name)
    Game.emitPlayer(io)
  });
  socket.on("player_update",(x,y,id,health)=>{
    io.emit("player_update",x,y,id,health)
  //  console.log(Game.enemyLocation())
    if(Game.delay(500)){
      for(let i=0;i<7;i++){
      io.emit("enemy_add",Game.enemyLocation(i))
      }
    }
  });
  socket.on('bullet_add',(id)=>{
    io.emit("bullet_add",id)
  })
  socket.on("chat_msg",(name,profile,msg)=>{
    io.emit("chat_msg",name,profile,msg)
  })
});


reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README

  // Reload started, start web server
  server.listen(PORT, () => {
    console.log('server running at http://localhost:'+PORT);
  });
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})