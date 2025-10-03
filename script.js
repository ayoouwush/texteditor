const editor = document.getElementById('editor');
const statusbar = document.getElementById('statusbar');

// --- File Actions ---
function newFile() {
  editor.innerHTML = "";
  updateStatus();
}

function openFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    editor.innerText = e.target.result;
    updateStatus();
  };
  reader.readAsText(file);
}

function saveFile() {
  localStorage.setItem("textEditorContent", editor.innerText);
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
  editor.style.fontSize = size + "px";
}

function changeTextColor(color) {
  editor.style.color = color;
}

// --- Theme ---
function toggleTheme() {
  document.body.classList.toggle("dark");
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
