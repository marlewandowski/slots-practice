import { Application, Container, Resource, Sprite, Texture } from "pixi.js";
import { Spin } from "../utils/spin";
import { State } from "../common/state";
import { MenuItems } from "./menuItems";

export function createMenu(
  app: Application, 
  textures: Record<string, Texture<Resource>>,
  spin: Spin): Container {
  
  const state = new State();
  const menuContainer = new Container();
  menuContainer.y = 900;
  menuContainer.x = 100
  app.stage.addChild(menuContainer);

  const menuButtons = new MenuItems();
  menuButtons.createMenuButtons(menuContainer,textures,spin,state);
  return menuContainer;
}
