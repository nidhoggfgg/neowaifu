import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

export function initWaifu(config: LAppDefine.WaifuConfig): void {
  LAppDefine.initDef(config);
  injectLive2d(config);
  injectJs(config.corejs).then(() => {
    startWaifu();
  }).catch(err => {
    console.log(err);
  });
}

function injectJs(url: string) {
  return new Promise((resolve, _reject) => {
    if (typeof document === 'undefined') { return; }
    const body = document.body || document.getElementsByTagName('body')[0];
    const js = document.createElement('script');
    js.onload = () => resolve("success");
    js.src = url;
    body.appendChild(js);
  });
}

function injectLive2d(config: LAppDefine.WaifuConfig) {
  // create dom
  const waifu = document.createElement("div");
  waifu.id = "waifu";
  const canvas = document.createElement("canvas");
  canvas.id = "live2d";
  waifu.appendChild(canvas);

  // inject css & ratio
  let css;
  if (config.size !== 'full') {
    const { width, height } = config.size!;
    const r = config.renderRatio!;
    css = genCss(width, height);
    canvas.width = width * r;
    canvas.height = height * r;
  } else {
    css = genCss(window.innerWidth, window.innerHeight);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  if (!css || typeof document === 'undefined') { return; }
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
  document.body.appendChild(waifu);
}

function startWaifu() {
  // init
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }

  // listener for resize and unload
  LAppDelegate.getInstance().run();
  window.addEventListener("resize", () => {
    if (LAppDefine.CanvasSize === 'full') {
      if (LAppDelegate.getInstance().isInited()) {
        LAppDelegate.getInstance().onResize();
      }
    }
  });

  window.addEventListener("beforeunload", () => {
    LAppDelegate.releaseInstance();
  });
}

function genCss(width: number, height: number): string {
  return `
#waifu {
	bottom: 0px;
  background:rgba(0, 0, 0, 0);
	left: 0;
	line-height: 0;
	margin-bottom: -10px;
	position: fixed;
	transform: translateY(3px);
	transition: transform .3s ease-in-out, bottom 3s ease-in-out;
	z-index: 1;
}

#waifu:hover {
	transform: translateY(0);
}

#live2d {
  width: ${width}px;
  height: ${height}px;
	position: relative;
}`;
}
