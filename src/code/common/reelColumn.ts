import { ReelSprite } from './reelSprite';
import { BlurFilter, Container } from "pixi.js";

export interface ReelColumn {
    container: Container,
    symbols: ReelSprite[],
    position: number,
    previousPosition: number,
    blur: BlurFilter
}