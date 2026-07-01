const daftarLagu = [
    "audio/home-1.mp3",
    "audio/home-2.mp3"
];

let indeksLagu = 0;
const audio = document.getElementById("audioGalaksi");
const tombol = document.getElementById("tombolMusik");
const statusMusik = document.getElementById("statusMusik");

// Fungsi nge-set lagu yang lagi aktif
function setLagu(indeks) {
    audio.src = daftarLagu[indeks];
    localStorage.setItem("laguTerakhir", indeks);
}

function kontrolMusik() {
    if (audio.paused) {
        audio.play().then(() => {
            tampilkanStatus();
            tombol.innerText = "⏸️ Pause Music";
        }).catch(err => console.log("Gagal muter:", err));
    } else {
        audio.pause();
        tombol.innerText = "▶️ Play Audio";
        statusMusik.style.display = "none";
    }
}


function gantiLagu() {
    indeksLagu = (indeksLagu + 1) % daftarLagu.length;
    setLagu(indeksLagu);
    audio.play().then(() => {
        tampilkanStatus();
        tombol.innerText = "⏸️ Pause Music";
    });
}

function tampilkanStatus() {
    statusMusik.style.display = "block";
    statusMusik.style.background = "rgba(5, 7, 15, 0.95)";
    statusMusik.innerHTML = `🎵 Now Playing on HOME: Cosmic Track ${indeksLagu + 1} ...`;
}

audio.addEventListener("ended", function() {
    gantiLagu();
});

window.addEventListener("load", function() {
    const simpananLagu = localStorage.getItem("laguTerakhir");
    if (simpananLagu !== null) {
        indeksLagu = parseInt(simpananLagu);
    }
    setLagu(indeksLagu);
});