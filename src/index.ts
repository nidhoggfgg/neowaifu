import { loadModel } from "./model-resource.ts";
import { WaifuConfig } from "./waifu-config.ts";

export function initWaifu(config: WaifuConfig) {
    loadModel(config.waifuPath, config.model).then((res) => {
        console.log(res);
    })
}