const socket = io()

const chat = {
    input:document.getElementById("chatin"),
    btn:document.getElementById("sendmsg"),
    box:document.getElementById("globalMsg")
}

function createMsg(name = localStorage.getItem("UserName"),profile = localStorage.getItem("UserProfile"),inp = chat.input.value){
    if(profile == null){
        profile = "man_profile.jpeg"
    }
    if(inp.trim().length <= 0){
        return;
    }
    if(inp == chat.input.value){
        chat.input.value = ""
    }
    const div =  document.createElement("DIV")
    div.className = "messge"
    chat.box.appendChild(div)
    const img =  document.createElement("IMG")
    img.src= profile
    img.alt = profile
    img.className = "chatImg"
    div.appendChild(img)
    const div1 =  document.createElement("DIV")
    div1.className="namemsg"
    div1.innerText = name
    div.appendChild(div1)
    const div2 =  document.createElement("DIV")
    div2.className = "textmsg"
    div2.innerText = inp
    div.appendChild(div2)
}

chat.btn.addEventListener("click",()=>{
    socket.emit("chat_msg",localStorage.getItem("UserName"),localStorage.getItem("UserProfile"),chat.input.value)
    createMsg();
})

socket.on("chat_msg",(name,profile,msg)=>{   
    console.log("work!!!");
    if(name != localStorage.getItem("UserName")){
        const dots = document.getElementsByClassName('chtbtn')[0]
        if(!dots.className.includes("dot")){
            dots.className+=" dot"
        }
        createMsg(name,profile,msg)
        console.log(name,profile,msg);
    }
})