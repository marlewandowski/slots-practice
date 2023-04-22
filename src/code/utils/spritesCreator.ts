import { Resource, Sprite, Texture } from 'pixi.js';

export function createSprites(textures:Record<string, Texture<Resource>>): Sprite[] {
  let sprites: Sprite[] = [];
  const border = new Sprite(textures.border);
  const background = new Sprite(textures.background);
  sprites.push(background);
  sprites.push(border);
  return sprites;
}