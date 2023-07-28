import { initWaifu } from "./main";

initWaifu({
    waifuPath: "https://fastly.jsdelivr.net/gh/nidhoggfgg/live2d-model@latest/",
    models: ["Cao"],
    corejs: 'https://fastly.jsdelivr.net/gh/nidhoggfgg/live2d-model@latest/live2dcubismcore.min.js',
    size: { width: 300, height: 400 },
    renderRatio: 1,
    useCache: true,
    debug: false,
});
