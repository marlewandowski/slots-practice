import { Resource, Sprite, Texture } from 'pixi.js';

export function createSprites(textures:Record<string, Texture<Resource>>): Sprite[] {
  let sprites: Sprite[] = [];
  const border = new Sprite(textures.border);
  const background = new Sprite(textures.background);
  const background_main = new Sprite(textures.background_main);
  sprites.push(background);
  sprites.push(border);
  sprites.push(background_main);
  return sprites;
}