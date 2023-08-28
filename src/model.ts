import * as PIXI from 'pixi.js';

export class Live2dModel extends PIXI.Sprite {
    constructor() {
        super();
        PIXI.Ticker.shared.add(this.update, this)
    }

    private update = () => {

    }
}