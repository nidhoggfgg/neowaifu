import { CubismModelSettingJson } from '@cubism/cubismmodelsettingjson.js';
import { ICubismModelSetting as ModelSetting } from 'cubism/framework/src/icubismmodelsetting.js'
import * as PIXI from 'pixi.js';

type Dict = { [key: string]: ArrayBuffer };

interface ModelResources {
    setting: ModelSetting
    moc: ArrayBuffer
    textures?: PIXI.Texture[]
    physics?: ArrayBuffer
    expressions?: Dict
}

export async function loadModel(path: string, model: string): Promise<ModelResources> {
    const buffer = await fetchOrCache(path, model);
    const s = new CubismModelSettingJson(buffer, buffer.byteLength);
    return Promise.all([loadMoc(path, s), loadTextures(path, s), loadPhysics(path, s), loadExpressions(path, s)]).then(
        (values) => {
            return {
                setting: s,
                moc: values[0],
                // textures: values[1],
                physics: values[2],
                expressions: values[3]
            };
        }
    )
}

async function loadMoc(path: string, setting: ModelSetting): Promise<ArrayBuffer> {
    const file = setting.getModelFileName();
    return fetchOrCache(path, file);
}

// TODO
async function loadTextures(path: string, setting: ModelSetting): Promise<ArrayBuffer | undefined> {
    return;
}

async function loadPhysics(path: string, setting: ModelSetting): Promise<ArrayBuffer> {
    const file = setting.getPhysicsFileName();
    return fetchOrCache(path, file);
}

// TODO: Promise
async function loadExpressions(path: string, setting: ModelSetting): Promise<Dict> {
    if (setting.getExpressionCount() === 0) {
        return {}
    }

    const expressions: Dict = {};
    const count = setting.getExpressionCount();
    for (let i = 0; i < count; i++) {
        const name = setting.getExpressionName(i);
        const file = setting.getExpressionFileName(i);
        const content = await fetchOrCache(path, file);
        expressions[name] = content;
    }

    return expressions;
}

async function fetchOrCache(path: string, file: string): Promise<ArrayBuffer> {
    // TODO: cache
    const f = await fetch(`${path}/${file}`);
    return f.arrayBuffer();
}