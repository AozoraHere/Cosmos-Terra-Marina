let indeksKartuSkrg = 0;
const totalKartu = 3;
let typingTimer;

const teksAsli = [
    "Welcome to my cosmic digital station! This website is an exploration journey to combine the beauty of astronomy with web technology. Glad to have you aboard, voyager.",
    "Don't get lost in the deep vacuum of space. Let's stay connected! Drop a message or follow my journey through the sub-space links below:",
    "Thank you for exploring this minimalist sanctuary. May your skies remain clear, and may your curiosity always pull you toward the unknown. Station shutting down..."
];

const targetID = [
    "text-profile",
    "text-comm",
    "text-end"
];

targetID.forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.innerHTML="";
});

function updateClock(){

    const now=new Date();

    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    const s = String(now.getSeconds()).padStart(2,"0");

    document.getElementById("realtimeClock").innerHTML =
    `${h}:${m}:${s} WIB`;
}

setInterval(updateClock,1000);
updateClock();

const audioBgm=document.getElementById("audioAbout");
const soundClick=document.getElementById("soundClick");
const soundHover=document.getElementById("soundHover");

function playClickSound(){

    if(!soundClick) return;

    soundClick.currentTime=0;
    soundClick.play().catch(()=>{});

}

function playHoverSound(){

    if(!soundHover) return;

    soundHover.currentTime=0;
    soundHover.play().catch(()=>{});

}

function toggleMuteAbout(){

    playClickSound();

    if(audioBgm.muted){

        audioBgm.muted=false;
        document.getElementById("btnMuteAbout").innerHTML="TRACKING";

    }else{

        audioBgm.muted=true;
        document.getElementById("btnMuteAbout").innerHTML="MUTED";

    }

}

function bukaGerbang(){

    playClickSound();

    document.getElementById("rocket").classList.add("rocket-launch");

    setTimeout(()=>{

        document.getElementById("gate-overlay").style.opacity="0";
        document.getElementById("gate-overlay").style.visibility="hidden";

        document.body.classList.add("gate-opened");

        audioBgm.muted=false;
        audioBgm.play().catch(()=>{});

        updateSliderPosition();

    },800);

}

function startTypingEffect(index){

    clearInterval(typingTimer);

    targetID.forEach((id,i)=>{

        const el=document.getElementById(id);

        if(i!==index) el.innerHTML="";

    });

    const target=document.getElementById(targetID[index]);

    let text=teksAsli[index];

    let i=0;

    target.innerHTML="";

    typingTimer=setInterval(()=>{

        target.innerHTML=text.substring(0,i);

        i++;

        if(i>text.length){

            clearInterval(typingTimer);

        }

    },25);

}

function geserKartu(arah){

    playClickSound();

    indeksKartuSkrg+=arah;

    if(indeksKartuSkrg<0){

        indeksKartuSkrg=totalKartu-1;

    }

    if(indeksKartuSkrg>=totalKartu){

        indeksKartuSkrg=0;

    }

    updateSliderPosition();

}
function copyDiscord() {
    navigator.clipboard.writeText("skyyynight"); 
    alert("Discord username copied!");
}

function updateSliderPosition() {

    const track = document.getElementById("sliderTrack");
    const cards = document.querySelectorAll(".profile-card");

    const cardWidth = document.querySelector(".slider-wrapper").offsetWidth;

    track.style.transform =
        `translateX(-${indeksKartuSkrg * cardWidth}px)`;

    cards.forEach((card,index)=>{

        card.classList.toggle("active",index===indeksKartuSkrg);

    });

    startTypingEffect(indeksKartuSkrg);

}

window.addEventListener("resize",()=>{

    updateSliderPosition();

});

window.addEventListener("load",()=>{

    updateSliderPosition();

});