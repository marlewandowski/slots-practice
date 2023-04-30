import { Application, Container, Resource, Sprite, Texture } from "pixi.js";
import { Spin, spin } from "../utils/spin";
import { State } from "../common/state";
import { emitter } from "../utils/spin";

export function createMenu(
  app: Application, 
  reels: any, 
  textures: Record<string, Texture<Resource>>,
  spin: Spin) {
  
  const state = new State();
  const menuContainer = new Container();
  menuContainer.y = 900;
  menuContainer.x = 100
  app.stage.addChild(menuContainer);

  const buttonContainer = new Container();
  const buttonActive = new Sprite(textures["btnActive"]);
  const buttonInActive = new Sprite(textures["btnInActive"]);
  buttonInActive.visible = false;
  buttonContainer.addChild(buttonInActive, buttonActive);
  buttonListener(buttonContainer, 
    buttonActive, 
    buttonInActive, 
    app,
    reels, 
    textures,
    state,
    spin);
  
  menuContainer.addChild(buttonContainer);
}

function buttonListener(
  buttonContainer: Container, 
  buttonActive: Sprite, 
  buttonInActive: Sprite,
  app:Application,
  reels:any,
  textures: Record<string, Texture<Resource>>,
  state: State,
  spin: Spin) {
  buttonContainer.eventMode = "static";
  buttonContainer.cursor = "pointer";
  buttonContainer.on("click", () => {
    buttonContainer.eventMode = "none";
    spin.start();
    setButtonState(buttonActive, buttonInActive);
    emitter.once('stopSpin', () => {
      setButtonState(buttonActive, buttonInActive);
      buttonContainer.eventMode = "static";
    });
  })
}

function setButtonState(buttonActive: Sprite, buttonInActive: Sprite) {
  buttonActive.visible = !buttonActive.visible;
  buttonInActive.visible = !buttonInActive.visible;
}