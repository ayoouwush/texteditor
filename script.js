const editor = document.getElementById('editor');
const statusbar = document.getElementById('statusbar');

// EXEC COMMAND helper
function execCommand(command) {
  editor.focus();
  document.execCommand(command);
}

// PASTE using clipboard
function pasteText() {
  navigator.clipboard.readText().then(text => {
    document.execCommand('insertText', false, text);
  });
}

// NEW FILE
function newFile() {
  editor.innerHTML = "";
  updateStatus();
}

// OPEN FILE
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

// SAVE to localStorage
function saveFile() {
  localStorage.setItem("textEditorContent", editor.innerText);
  alert("Saved to local storage!");
}

// DOWNLOAD as TXT
function downloadFile() {
  const blob = new Blob([editor.innerText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "textfile.txt";
  a.click();
}

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
  const text = editor.innerText;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  statusbar.textContent = `Words: ${words} | Characters: ${chars}`;
}

// Auto-update status
editor.addEventListener("input", updateStatus);

// Load saved content
window.addEventListener("load", () => {
  const saved = localStorage.getItem("textEditorContent");
  if (saved) editor.innerText = saved;
  updateStatus();
});
