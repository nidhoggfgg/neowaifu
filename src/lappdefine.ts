/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '../lapp/framework/live2dcubismframework';

export interface WaifuConfig {
  waifuPath?: string;
  models?: string[];
  size?: { width: number; height: number } | 'full';
  renderRatio?: number;
  useCache?: boolean;
  debug?: boolean;
}

export function initDef(config: WaifuConfig) {
  let { waifuPath, models, size, renderRatio, useCache, debug } = config;
  if (!waifuPath.endsWith("/")) {
    waifuPath += '/';
  }
  ResourcesPath = waifuPath;
  ModelDir = models;
  ModelDirSize = models.length;
  UseCache = useCache;
  DebugLogEnable = debug;
  RenderRatio = renderRatio;
  if (size === 'full') {
    CanvasSize = 'full';
  } else {
    CanvasSize = {
      width: size.width * renderRatio,
      height: size.height * renderRatio,
    }
  }
}

// Canvas width and height pixel values, or dynamic screen size ('auto').
export var CanvasSize: { width: number; height: number } | 'full';
export var RenderRatio: number;

// 画面
export const ViewScale = 1.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

export var ResourcesPath: string;
export var UseCache: boolean;

// モデル定義---------------------------------------------
// モデルを配置したディレクトリ名の配列
// ディレクトリ名とmodel3.jsonの名前を一致させておくこと
export var ModelDir: string[];
export var ModelDirSize: number;

// 外部定義ファイル（json）と合わせる
export const MotionGroupIdle = 'Idle'; // アイドリング
export const MotionGroupTapBody = 'TapBody'; // 体をタップしたとき

// 外部定義ファイル（json）と合わせる
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// モーションの優先度定数
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// MOC3の一貫性検証オプション
export const MOCConsistencyValidationEnable = true;

// デバッグ用ログの表示オプション
export var DebugLogEnable: boolean;
export const DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;
