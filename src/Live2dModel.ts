import { CubismDefaultParameterId } from "@cubism/cubismdefaultparameterid.ts";
import { CubismModelSettingJson } from "@cubism/cubismmodelsettingjson.ts";
import { ICubismModelSetting } from "@cubism/icubismmodelsetting.ts";
import { CubismIdHandle } from "@cubism/id/cubismid.ts";
import { CubismFramework } from "@cubism/live2dcubismframework.ts";
import { CubismUserModel } from "@cubism/model/cubismusermodel.ts";
import { ACubismMotion } from "@cubism/motion/acubismmotion.ts";
import { csmMap } from "@cubism/type/csmmap.ts";

async function fetchOrCache(path: string, file: string): Promise<ArrayBuffer> {
  // TODO: cache
  const f = await fetch(`${path}/${file}`);
  return f.arrayBuffer();
}

export class Live2dModel extends CubismUserModel {
  private setupMOdel(path: string, model: string) {
  }

  constructor() {
    super()
    this._path = null;
    this._modelName = null;
    this._modelSetting = null;
    this._motions = new csmMap<string, ACubismMotion>();
    this._expressions = new csmMap<string, ACubismMotion>();
    this._idParamAngleX = CubismFramework.getIdManager().getId(
      CubismDefaultParameterId.ParamAngleX
    );
    this._idParamAngleY = CubismFramework.getIdManager().getId(
      CubismDefaultParameterId.ParamAngleY
    );
    this._idParamAngleZ = CubismFramework.getIdManager().getId(
      CubismDefaultParameterId.ParamAngleZ
    );
    this._idParamEyeBallX = CubismFramework.getIdManager().getId(
      CubismDefaultParameterId.ParamEyeBallX
    );
    this._idParamEyeBallY = CubismFramework.getIdManager().getId(
      CubismDefaultParameterId.ParamEyeBallY
    );
    this._idParamBodyAngleX = CubismFramework.getIdManager().getId(
      CubismDefaultParameterId.ParamBodyAngleX
    );
  }

  _path: string | null;
  _modelName: string | null;
  _modelSetting: ICubismModelSetting | null;
  _motions: csmMap<string, ACubismMotion>;
  _expressions: csmMap<string, ACubismMotion>;
  _idParamAngleX: CubismIdHandle;
  _idParamAngleY: CubismIdHandle;
  _idParamAngleZ: CubismIdHandle;
  _idParamEyeBallX: CubismIdHandle;
  _idParamEyeBallY: CubismIdHandle;
  _idParamBodyAngleX: CubismIdHandle;
}