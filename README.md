# neowaifu

一个可以很容易在网页上放置 live2d 老婆的库。

## feature

1. 仅(完全)支持 moc3 格式的模型文件 (目前live2d cubism editor仅能导出 moc3)
2. 无需过多配置，一行代码可用
3. 可以自行配置并打包到自己的应用之中
4. 支持缩放，可以高清晰度显示下载来的模型
5. 无需后端支持，仅前端，可以将模型放在任何位置或者cdn
6. 支持缓存，一次加载模型之后再次访问无需重新拉取模型，极大地减少模型加载时间(尤其是高精度 live2d 模型)
7. 不单单是小组件，还设为全屏作为单一页面

## 使用

### 最懒的办法

最简单的办法，将以下代码加入到 `body` 底部即可自动加载老婆:
```html
<script src="https://fastly.jsdelivr.net/npm/neowaifu@latest/dist/neowaifu-lazy.min.js"></script>
```

### npm 项目

如果你希望在自己的 npm 项目，并使用如 vite，rollup，webpack 之类的打包工具将所有文件打包，那么使用 npm 包是合适的

首先添加依赖:
```
yarn add neowaifu
```
或者:
```
npm install neowaifu --save
```

接着只需要在你的 js 或者 ts 文件加入以下代码即可加载:
```js
import { initWaifu } from 'neowaifu';

initWaifu({
    "waifuPath": "https://fastly.jsdelivr.net/gh/nidhoggfgg/live2d-model@latest/",
    "models": ["Cao"],
    "size": { "width": 300, "height": 400 },
    "renderRatio": 1.0,
    "useCache": true,
    "debug": true,
});
```
**NOTE: 这仅仅只是一个示例，可以按照下面的参数描述自行修改**

## 参数描述

为了简单，不论是使用 js 加载还是整合到自己的项目，都仅仅暴露 `initWaifu` 函数，其接受的参数声明如下:
```ts
interface WaifuConfig {
  waifuPath?: string;
  models?: string[];
  corejs?: string;
  size?: { width: number; height: number } | 'full';
  renderRatio?: number;
  useCache?: boolean;
  debug?: boolean;
}
```

### waifuPath

无默认值，必须传入

模型存放地址，比如存放模型的目录如下:
```
l2d
├── Cao
│  ├── Cao.8192
│  │  └── texture_00.png
│  ├── Cao.cdi3.json
│  ├── Cao.moc3
│  ├── Cao.model3.json
│  ├── Cao.physics3.json
│  └── README.md
├── LICENSE
└── README.md
```
其中 `Cao/` 就是下载之后解压缩之后的模型目录  
那么 `waifuPath` 应当为: `xxx/l2d/`，末尾的 `/` 不是必须的  
`xxx` 取决于你模型所放置的位置  
值得注意的是 `waifuPath` 仅指明所有模型存放的位置，不要填入某个模型存放的位置！

**NOTE: 模型文件夹的名字和模型文件的前缀必须一致，如 `Cao/` 下仅能放置 `Cao.moc3` 而不能是 `cao.moc3`**

### models

无默认值，必须传入

数组，写入模型名即可。
如根据上面的目录结构，想要添加 `Cao` 模型，只需要: `['Cao']`，多个模型可以自己加即可，如: `['xxx1', 'xxx2']` 等等。  
值得注意的是填入的模型文件夹的名字，而不是 `moc3` 文件的名字

### corejs

默认值 `https://fastly.jsdelivr.net/gh/nidhoggfgg/live2d-model@latest/live2dcubismcore.min.js`

官方的 `live2dcubismcore.js` 的位置，无特殊需要无需修改，如果认为 cdn 不够快，可以自己下载，然后修改参数指向你下载的文件即可。

### size

默认值: `{ width: 300, height: 400 }`

控制老婆的大小，单位 px，如果希望是作为单独的一个页面可以传入 `'full'`。

### renderRatio

默认值: `1`

可以控制渲染倍率，高的渲染倍率可以一定程度上提高精细程度，但也会消耗更多性能和更长的加载时间。不建议太高，除非使用非常高精度的模型。

### useCache

默认值: `true`

拉取模型之后是否写入客户端缓存，这个缓存是持久化的，可以极大地加快模型加载速度和流畅性。(加载 moc3 文件后，如果加载其他 json 文件太慢则会导致 live2d 卡顿)
因此建议开启，即不需要修改。

### debug

默认值: `false`

在 console 输出调试信息，仅开发人员使用。正常情况下无需传入，无需修改。