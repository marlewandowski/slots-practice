import { Container, Sprite } from "pixi.js";
import { Spinner } from "./spinner";
export declare class GameButton {
    buttonInActive: Sprite;
    buttonContainer: any;
    spinner: Spinner;
    buttonActive: Sprite;
    constructor(buttonContainer: Container, buttonActive: Sprite, buttonInActive: Sprite, spinner: Spinner);
    buttonListener(): void;
    setButtonState(buttonActive: Sprite, buttonInActive: Sprite): void;
}
