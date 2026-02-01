
/* ===== INTRO PAGE ===== */
function nextIntro() {
introStep++;

const text = document.getElementById("introText");

if (introStep < introTexts.length) {
text.textContent = introTexts[introStep];
} else {
window.location.href = "next.html";
}
}

/* main page */
let dialogueIndex = 0;
let musicStarted = false;

const dialogueFlow = [
    { text: "This is the first placeholder dialogue.", image: "Picture1-Photoroom.png" },
    { text: "I know you were probably wondering, what the heck i've been doin this past days.", image: "Picture2-Photoroom.png" },
    { text: "Well...this is just something I made just for you.", image: "Picture3-Photoroom.png" },
    { text: "It might not be much, but know that this was made with love.", image: "Picture5-Photoroom.png" }
];

function nextDialogue() {
    const music = document.getElementById("bgMusic");
    const textEl = document.getElementById("dialogueText");
    const imgEl = document.getElementById("characterImg");
    const btn = document.getElementById("dialogueBtn");

    // ▶️ Start music ON FIRST CLICK ONLY
    if (!musicStarted && music) {
        music.volume = 0.4;
        music.play().catch(() => {});
        musicStarted = true;
    }

    // 📝 Update dialogue
    if (dialogueIndex < dialogueFlow.length) {
        textEl.textContent = dialogueFlow[dialogueIndex].text;
        imgEl.src = dialogueFlow[dialogueIndex].image;
        dialogueIndex++;
    } else {
        // Optional: go to next page
        // window.location.href = "next.html";
        btn.disabled = true;
        btn.textContent = "❤";
    }
}
// ====== ELEMENTS ======
const dialogueText = document.getElementById("dialogueText");
const dialogueBtn = document.getElementById("dialogueBtn");
const characterImg = document.getElementById("characterImg");
const music = document.getElementById("bgMusic");

// ====== MAIN FUNCTION ======
function nextDialogue() {

    // 🎵 Start music once (mobile-safe)
    if (!musicStarted && music) {
        music.volume = 0.4;
        music.play().catch(() => {});
        musicStarted = true;
    }

    dialogueIndex++;

    // 🗨 Continue dialogue
    if (dialogueIndex < dialogueFlow.length) {
        dialogueText.textContent = dialogueFlow[dialogueIndex].text;
        characterImg.src = dialogueFlow[dialogueIndex].image;

        // Change button on last dialogue
        if (dialogueIndex === dialogueFlow.length - 1) {
            dialogueBtn.textContent = "Continue";
        }
    } 
    // ➡ Go to next page
    else {
        window.location.href = "next.html";
    }
}

function goToContent() {
    document.getElementById("introPage").classList.remove("active");
    document.getElementById("contentPage").classList.add("active");
}

/* ===== NEXT PAGE TEXT ===== */
function continueText() {
document.getElementById("charText2").classList.remove("hidden");
document.getElementById("charBtn").style.display = "none";
}


/* ===== LETTER ===== */
function openLetter() {
const letter = document.getElementById("letter");
const heart = document.getElementById("heartBtn");


letter.classList.remove("closed");
letter.classList.add("open");
heart.style.display = "none";
}


/* ===== PHOTOS ===== */
let currentImage = null;


function triggerUpload() {
document.getElementById("photoInput").click();
}


const photoInput = document.getElementById("photoInput");
if (photoInput) {
photoInput.onchange = () => {
const file = photoInput.files[0];
if (!file) return;


const reader = new FileReader();
reader.onload = () => {
createPhoto(reader.result);
savePhotos();
};
reader.readAsDataURL(file);
};
}


function createPhoto(src) {
const grid = document.getElementById("photoGrid");


const frame = document.createElement("div");
frame.className = "photo-frame";


const img = document.createElement("img");
img.src = src;


frame.appendChild(img);
frame.onclick = () => openViewer(img);


grid.insertBefore(frame, grid.lastElementChild);
}


/* ===== VIEWER ===== */
function openViewer(img) {
currentImage = img;
document.getElementById("viewerImg").src = img.src;
document.getElementById("viewer").classList.remove("hidden");
}


function closeViewer() {
document.getElementById("viewer").classList.add("hidden");
}


function deleteCurrent() {
if (!currentImage) return;
currentImage.parentElement.remove();
savePhotos();
closeViewer();
}


/* ===== STORAGE ===== */
function savePhotos() {
const imgs = [...document.querySelectorAll('.photo-frame img')].map(i => i.src);
localStorage.setItem('photos', JSON.stringify(imgs));
}


function loadPhotos() {
const saved = JSON.parse(localStorage.getItem('photos') || '[]');
saved.forEach(src => createPhoto(src));
}


window.onload = loadPhotos;

