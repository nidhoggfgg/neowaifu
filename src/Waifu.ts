import { Sprite } from "@pixi/sprite";
import { Ticker } from "@pixi/ticker";

export class Waifu extends Sprite {
  constructor() {
    super();
    Ticker.shared.add(this.update, this)
  }

  private update = () => {

  }
}