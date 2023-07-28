import { initWaifu as initIt } from "./lapp";
import { WaifuConfig } from "./lappdefine";

export function initWaifu(config: WaifuConfig) {
    const defaultConfig: WaifuConfig = {
        size: {
            width: 300,
            height: 400,
        },
        renderRatio: 1,
        useCache: true,
        debug: false,
    };
    Object.assign(defaultConfig, config); // will change the properties in defaultConfig
    initIt(defaultConfig);
}