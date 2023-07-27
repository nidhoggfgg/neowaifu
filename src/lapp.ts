/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

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
  width: ${width};
  height: ${height};
	position: relative;
}`;
}

export function initWaifu(config: {
  waifuPath: string,
  models: string[],
  size: { width: number; height: number } | 'full',
  renderRatio: number,
  useCache: boolean,
  debug: boolean,
}): void {
  // init definition
  LAppDefine.initDef(config);

  // create dom
  const waifu = document.createElement("div");
  waifu.id = "waifu";
  const canvas = document.createElement("canvas");
  canvas.id = "live2d";
  waifu.appendChild(canvas);
  document.body.appendChild(waifu);

  // inject css & ratio
  let css;
  if (config.size !== 'full') {
    const { width, height } = config.size;
    const r = config.renderRatio;
    css = genCss(width * r, height *r);
    canvas.width = width;
    canvas.height = height;
  } else {
    css = genCss(window.innerWidth, window.innerHeight);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  styleInject(css);

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
  })
}

function styleInject(css: string) {
  if (!css || typeof document === 'undefined') { return; }
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}