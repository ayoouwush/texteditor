const editor = document.getElementById('editor');
const statusbar = document.getElementById('statusbar');

// --- File Actions ---
function newFile() {
  editor.innerHTML = "";
  updateStatus();
}

function openFile(event) {
  const file = event.target.files[0];
  const fileNameSpan = document.getElementById('fileName');
  if (!file) {
    fileNameSpan.textContent = "No file chosen";
    return;
  }
  fileNameSpan.textContent = file.name;

  const reader = new FileReader();
  reader.onload = e => {
    editor.innerText = e.target.result;
    updateStatus();
  };
  reader.readAsText(file);
}


function saveFile() {
  const editor = document.getElementById("editor");
  const fontSize = window.getComputedStyle(editor).fontSize;
  const isDarkTheme = document.body.classList.contains("minimal-dark");

  localStorage.setItem("textEditorContent", editor.innerText);
  localStorage.setItem("textEditorFontSize", fontSize);
  localStorage.setItem("textEditorTheme", isDarkTheme ? "dark" : "light");

  alert("Saved to local storage!");
}


function downloadFile() {
  const blob = new Blob([editor.innerText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "textfile.txt";
  a.click();
}

// --- Clipboard / Editing ---
function cutText() {
  editor.focus();
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const text = selection.toString();
  navigator.clipboard.writeText(text).then(() => {
    document.execCommand('delete');
  });
}

function copyText() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const text = selection.toString();
  navigator.clipboard.writeText(text);
}

function pasteText() {
  editor.focus();
  navigator.clipboard.readText().then(text => {
    document.execCommand('insertText', false, text);
  });
}

function undo() {
  editor.focus();
  document.execCommand('undo');
}

function redo() {
  editor.focus();
  document.execCommand('redo');
}

// --- Formatting ---
function changeFontSize(size) {
  const editor = document.getElementById("editor");
  editor.style.fontSize = size + "px";
}


function changeTextColor(color) {
  editor.style.color = color;
}

// --- Theme ---
function toggleTheme() {
  document.body.classList.toggle("minimal-dark");
}


// --- Status bar ---
function updateStatus() {
  const text = editor.innerText;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  statusbar.textContent = `Words: ${words} | Characters: ${chars}`;
}

editor.addEventListener("input", updateStatus);

// --- Load saved content ---
window.addEventListener("load", () => {
  const saved = localStorage.getItem("textEditorContent");
  if (saved) editor.innerText = saved;
  updateStatus();
});
/* === Glowing Background Lights === */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Light {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
  }
  update() {
    if (mouse.x && mouse.y) {
      this.x += (mouse.x - this.x) * 0.02;
      this.y += (mouse.y - this.y) * 0.02;
    }
    this.draw();
  }
}

const lights = [];
for (let i = 0; i < 5; i++) {
  lights.push(
    new Light(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      20,
      'rgba(74,144,226,0.4)'
    )
  );
}
/* === Ambient Floating Lights === */
class AmbientLight {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 40;
    ctx.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // bounce gently off screen edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    this.draw();
  }
}

const ambientLights = [];
for (let i = 0; i < 3; i++) {
  ambientLights.push(
    new AmbientLight(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      80,
      'rgba(74, 144, 226, 0.08)', // very faint blue
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2
    )
  );
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw faint ambient lights first
  ambientLights.forEach(light => light.update());
  // then the cursor-following bright lights
  lights.forEach(light => light.update());

  requestAnimationFrame(animate);
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lights.forEach(light => light.update());
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("load", () => {
  const savedText = localStorage.getItem("textEditorContent");
  const savedFontSize = localStorage.getItem("textEditorFontSize");
  const savedTheme = localStorage.getItem("textEditorTheme");
  const editor = document.getElementById("editor");

  if (savedText) editor.innerText = savedText;
  if (savedFontSize) editor.style.fontSize = savedFontSize;
  if (savedTheme === "dark") document.body.classList.add("minimal-dark");
});







