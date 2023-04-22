import { Application, Container, Resource, Sprite, Texture } from "pixi.js";
import { spin } from "../utils/spin";

export function createMenu(
  app: Application, 
  reels: any, 
  textures: Record<string, Texture<Resource>>) {
  
  const menuContainer = new Container();
  menuContainer.y = 900;
  menuContainer.x = 100
  app.stage.addChild(menuContainer);

  const buttonContainer = new Container();
  const buttonActive = new Sprite(textures["btnActive"]);
  const buttonInActive = new Sprite(textures["btnInActive"]);
  buttonInActive.visible = false;
  buttonContainer.addChild(buttonInActive, buttonActive);
  buttonListener(buttonContainer, buttonActive, buttonInActive, app, reels, textures);
  menuContainer.addChild(buttonContainer);

}

function buttonListener(
  buttonContainer: Container, 
  buttonActive: Sprite, 
  buttonInActive: Sprite,
  app:Application,
  reels:any,
  textures: Record<string, Texture<Resource>>) {
  buttonContainer.eventMode = "static";
  buttonContainer.cursor = "pointer";
  buttonContainer.on("click", () => {
    buttonContainer.eventMode = "none";
    spin(app,reels,textures);
    setButtonState(buttonActive, buttonInActive);
    setTimeout(()=>{
      setButtonState(buttonActive, buttonInActive);
      buttonContainer.eventMode = "static";
    },5500);
  })
}

function setButtonState(buttonActive: Sprite, buttonInActive: Sprite) {
  buttonActive.visible = !buttonActive.visible;
  buttonInActive.visible = !buttonInActive.visible;
}