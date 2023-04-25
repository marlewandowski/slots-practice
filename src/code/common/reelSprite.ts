import { Resource, Sprite, Texture } from "pixi.js";
import { symbolNames } from "../consts/symbolnames";

export class ReelSprite {
  public sprite: Sprite;
  spriteValue: number;
  constructor(textures: Record<string, Texture<Resource>>, spriteValue: number) {
    this.sprite = new Sprite(textures[symbolNames[spriteValue]])
    this.spriteValue = spriteValue;
  }
}