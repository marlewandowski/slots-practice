import { Resource, Sprite, Texture } from "pixi.js";
import { symbolNames } from "../consts/symbolnames";

export class ReelSprite extends Sprite {
  spriteValue: number;
  constructor(textures: Record<string, Texture<Resource>>, spriteValue: number) {
    super(textures[symbolNames[spriteValue]]),
    this.spriteValue = spriteValue;
  }
}