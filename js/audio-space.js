const daftarLagu = [
    "audio/space-1.mp3", 
    "audio/space-2.mp3", 
    "audio/space-3.mp3", 
    "audio/space-4.mp3"
];
let indeksLagu = 0;
let sedangMuter = false;

let audio, tombolMusik, statusMusik;

document.addEventListener("DOMContentLoaded", function() {
    audio = document.getElementById("audioGalaksi");
    tombolMusik = document.getElementById("tombolMusik");
    statusMusik = document.getElementById("statusMusik");

    if (audio) {
        audio.src = daftarLagu[indeksLagu];
       
        audio.addEventListener("ended", function() {
            gantiLagu();
        });
    }
});

function kontrolMusik() {
    if (!audio || !tombolMusik || !statusMusik) return;

    if (!sedangMuter) {
        audio.play();
        sedangMuter = true;
        tombolMusik.innerHTML = "⏸️ Pause Music";
        tombolMusik.style.background = "#ff4d4d"; 
        
        statusMusik.style.display = "block";
        statusMusik.style.background = "transparent";
        statusMusik.innerHTML = "🎵 Now Playing: Space Vibes " + (indeksLagu + 1) + " ...";
    } else {
        audio.pause();
        sedangMuter = false;
        tombolMusik.innerHTML = "▶️ Play Audio " + (indeksLagu + 1);
        tombolMusik.style.background = "#4ea8de"; 
        
        statusMusik.innerHTML = "⏸️ Music Pause";
    }
}

function gantiLagu() {
    if (!audio || !tombolMusik || !statusMusik) return;
    indeksLagu = (indeksLagu + 1) % daftarLagu.length;
    
    audio.src = daftarLagu[indeksLagu];
    
    if (sedangMuter) {
        audio.play().catch(err => console.log(err));
        tombolMusik.innerHTML = "⏸️ Pause Music";
        
        statusMusik.style.display = "block";
        statusMusik.innerHTML = "🎵 Now Playing: Space Vibes " + (indeksLagu + 1) + " ...";
    } else {
        
        tombolMusik.innerHTML = "▶️ Play Audio " + (indeksLagu + 1);
        statusMusik.style.display = "none"; 
        statusMusik.innerHTML = "";
    }
}