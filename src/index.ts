import { CubismFramework, LogLevel, Option } from "@cubism/live2dcubismframework.ts";
import { loadModel } from "./model-resource.ts";
import { WaifuConfig } from "./Iconfig.ts";

export function initWaifu(config: WaifuConfig) {
  const option = new Option();
  option.logFunction = (m: string) => console.log(`[waifu] ${m}`);
  option.loggingLevel = LogLevel.LogLevel_Verbose;
  CubismFramework.startUp(option);
  CubismFramework.initialize();
  loadModel(config.waifuPath, config.model).then((res) => {
    console.log(res);
  })
}