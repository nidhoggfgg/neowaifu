export interface WaifuConfig {
  waifuPath: string;
  model: string, // models?: string[];
  corejs?: string;
  size?: { width: number; height: number } | 'full';
  renderRatio?: number;
  useCache?: boolean;
  debug?: boolean;
}
