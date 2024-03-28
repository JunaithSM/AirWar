class Shadow{
  constructor(img){
    this.img = img;
    this.canvas = document.createElement("CANVAS")
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d");
  }
  create_shadow(){
    console.log(this.img)
     for(let j=0;j<this.img.length;j++){
         const img = document.getElementById(this.img[j])
         let w = img.width,h=img.height
         this.canvas.width = w
         this.canvas.style.width=`${w}px`
         this.canvas.height = h
         this.canvas.style.height=`${h}px`
         console.log(w,h)
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
       this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
       let ImgData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)
       for(let i=0;i<ImgData.data.length;i+=4){
          if(ImgData.data[i + 3] > 10){
            ImgData.data[i] = 0;
            ImgData.data[i + 1] = 0;
            ImgData.data[i + 2] = 0;
            ImgData.data[i + 3] = 172;
          }
       }
       this.ctx.putImageData(ImgData,0,0);
       const IMG = document.createElement("IMG");
       IMG.src=this.canvas.toDataURL(`image/png`)
       console.log("Created!")
       IMG.id = `${this.img[j]}Shadow`
       document.body.appendChild(IMG)
     }
     document.body.removeChild(this.canvas)
  }
  
}

export {Shadow};