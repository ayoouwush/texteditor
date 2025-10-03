const editor = document.getElementById('editor');
const statusbar = document.getElementById('statusbar');
const fontSizeSelect = document.getElementById('fontSize');

// NEW file
function newFile() {
  editor.value = "";
  updateStatus();
}

// OPEN file
function openFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    editor.value = e.target.result;
    updateStatus();
  };
  reader.readAsText(file);
}

// SAVE to localStorage
function saveFile() {
  localStorage.setItem("textEditorContent", editor.value);
  alert("Saved to local storage!");
}

// DOWNLOAD as txt
function downloadFile() {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "textfile.txt";
  a.click();
}

// UNDO / REDO
function undo() { document.execCommand("undo"); }
function redo() { document.execCommand("redo"); }

// FONT SIZE
function changeFontSize(size) {
  editor.style.fontSize = size + "px";
}

// TEXT COLOR
function changeTextColor(color) {
  editor.style.color = color;
}

// THEME TOGGLE
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// STATUS BAR
function updateStatus() {
  const text = editor.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  statusbar.textContent = `Words: ${words} | Characters: ${chars}`;
}

// Auto-update status while typing
editor.addEventListener("input", updateStatus);

// Load saved content if available
window.addEventListener("load", () => {
  const saved = localStorage.getItem("textEditorContent");
  if (saved) editor.value = saved;
  updateStatus();
});
