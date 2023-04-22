import { Application, Sprite } from "pixi.js";
export declare class Spinner {
    ticker: any;
    cards: Sprite[];
    app: Application;
    addAngle: number;
    speedMultiplier: number;
    constructor(app: Application, cards: Sprite[]);
    addCards(): void;
    speedUp(): void;
    slowDown(): void;
}
