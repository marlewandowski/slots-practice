import { Assets, Sprite, Texture } from "pixi.js";

const background = new URL ("../../assets/background_2.png", import.meta.url).href;
const border = new URL ("../../assets/border.png", import.meta.url).href;
const btnActiveUrl = new URL ("../../assets/btn-active.png", import.meta.url).href;
const btnInActiveUrl = new URL ("../../assets/btn-inactive.png", import.meta.url).href;
const car = new URL ("../../assets/car.png", import.meta.url).href;
const checkeredFlag = new URL ("../../assets/checkeredFlag.png", import.meta.url).href;
const laurel = new URL ("../../assets/laurel.png", import.meta.url).href;
const star = new URL ("../../assets/star.png", import.meta.url).href;
const trophy = new URL ("../../assets/trophy.png", import.meta.url).href;
const chevron = new URL ("../../assets/chevron.png", import.meta.url).href;

export async function loadAssets(){
  Assets.add("background", background);
  Assets.add("border",border);
  Assets.add("btnActive", btnActiveUrl);
  Assets.add("btnInActive", btnInActiveUrl);
  Assets.add("wildCard", star);
  Assets.add("car", car);
  Assets.add("checkeredFlag", checkeredFlag);
  Assets.add("laurel", laurel);
  Assets.add("trophy", trophy);
  Assets.add("chevron",chevron)

  const textures = await Assets.load<Texture>([
    "background",
    "border",
    "btnActive",
    "btnInActive",
    "wildCard",
    "car",
    "checkeredFlag",
    "laurel",
    "trophy",
    "chevron"
  ]);
  return textures;
}