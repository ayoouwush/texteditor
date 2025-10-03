:root {
  --primary: #4a90e2;
  --bg: #f5f7fa;
  --card-bg: #ffffff;
  --toolbar-bg: #f1f3f6;
  --text-color: #333;
  --status-bg: #f0f0f0;
}
body.dark {
  --bg: #1e1e1e;
  --card-bg: #2a2a2a;
  --toolbar-bg: #333;
  --text-color: #eaeaea;
  --status-bg: #222;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: var(--bg);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
}
header {
  background: var(--primary);
  color: #fff;
  padding: 15px 20px;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
header button {
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}
header button:hover { background: rgba(255,255,255,0.35); }
.editor-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.editor-card {
  width: 90%;
  max-width: 1000px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.toolbar {
  background: var(--toolbar-bg);
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border-bottom: 1px solid #ccc;
  justify-content: center;
}
.toolbar button, 
.toolbar select, 
.toolbar input[type="color"] {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #fff;
  color: #333;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}
body.dark .toolbar button,
body.dark .toolbar select,
body.dark .toolbar input[type="color"] {
  background: #444;
  color: #eee;
}
.toolbar button:hover,
.toolbar select:hover,
.toolbar input[type="color"]:hover {
  background: var(--primary);
  color: #fff;
}
textarea {
  flex: 1;
  padding: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  resize: none;
  background: var(--card-bg);
  line-height: 1.6;
  color: var(--text-color);
}
.statusbar {
  background: var(--status-bg);
  padding: 8px 15px;
  font-size: 14px;
  text-align: right;
  border-top: 1px solid #ccc;
}
