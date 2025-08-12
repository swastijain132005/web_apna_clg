let gameseq=[];
let userseq=[];

let btns=["blue","red","green","yellow"];

let started=false;
let level=0;

let h3=document.querySelector("h3");
let highestscore=0;

let h2=document.querySelector("h2");

document.addEventListener(
    "keypress",function(){
        if(started===false){
            started=true;
            levelup();
        }
    }
)

function levelup(){
    level++;
    h3.innerText=`level ${level}`;
    let randindx=Math.floor(Math.random()*4);

    let randcolor=btns[randindx];
    let randbtn=document.querySelector(`#${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    btnFlash(randbtn);
}

function btnFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
}, 250);}


function userflash(btn){
btn.classList.add("userflash");
setTimeout(function(){
    btn.classList.remove("userflash");
}, 250);}

function checkAns(idx){
   
    if(userseq[idx]===gameseq[idx]){
        console.log("correct");
        if(userseq.length===gameseq.length){
            userseq=[];
            setTimeout(function(){
                levelup();
            }, 1000);
        }
    } else {
        if(level>highestscore){
            highestscore=level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>  
                        <br>Highest Score: <b>${highestscore}</b>  `
                        
        
        console.log("wrong");
        h3.innerHTML=`Game Over,your score was <b>${level}</b><br> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150

        );
        started=false;
        gameseq=[];
        userseq=[];
        level=0;
    }

}



function btnPress(){
    console.log(this);
    let btn=this;
    btnFlash(btn);

    userColor=btn.getAttribute("id");
    userseq.push(userColor);
    console.log(userseq);
    checkAns(userseq.length-1);

}

let allbtns=document.querySelectorAll(".color-box");
for(let btn of allbtns){

    btn.addEventListener("click",btnPress);
}
