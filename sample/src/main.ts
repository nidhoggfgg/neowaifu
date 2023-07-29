import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { initWaifu } from './neowaifu/neowaifu'

function isMobile() {
  return ('ontouchstart' in document.documentElement);
}

if (isMobile()) {
  initWaifu({
    "waifuPath": "https://fastly.jsdelivr.net/gh/nidhoggfgg/live2d-model@latest/",
    "models": ["Cao"],
    "size": 'full',
    "renderRatio": 1.0,
    "useCache": true,
    "debug": true,
  });
} else {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>`
  setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

  initWaifu({
    "waifuPath": "https://fastly.jsdelivr.net/gh/nidhoggfgg/live2d-model@latest/",
    "models": ["Cao"],
    "size": { "width": 300, "height": 400 },
    "renderRatio": 1.0,
    "useCache": true,
    "debug": true,
  });
}
