// Shared helper for all example pages:
// 1. shows the source of the <script class="example"> block on the page
// 2. runs the example when the "Run" button is clicked
// 3. mirrors console.log into the output box

// Remove the indentation the code has inside the HTML file.
function dedent(text) {
  const lines = text.replace(/^\n+|\s+$/g, "").split("\n");
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(indent)).join("\n");
}

const codeBlock = document.getElementById("code");
codeBlock.textContent = dedent(document.querySelector("script.example").textContent);
if (window.hljs) {
  hljs.highlightElement(codeBlock); // syntax highlighting (only if the CDN could be loaded)
}

const output = document.getElementById("output");
const originalLog = console.log;
console.log = (...args) => {
  originalLog(...args);
  const text = args.map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg))).join(" ");
  output.textContent += text + "\n";
};

const runButton = document.getElementById("run");
runButton.addEventListener("click", () => {
  output.textContent = "";
  window[runButton.dataset.example]();
});
