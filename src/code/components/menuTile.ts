import { TextStyle, Text, Graphics, Container } from "pixi.js";

const titleStyle = new TextStyle({
    align: "center",
    dropShadowAngle: 90,
    dropShadowColor: "#b1573e",
    dropShadowDistance: 4,
    fill: "#ffffff",
    fillGradientType: 1,
    fontFamily: "Helvetica",
    fontSize: 16,
    letterSpacing: 4,
    lineJoin: "round",
    miterLimit: 8,
    padding: 12,
    stroke: "#ffffff",
    textBaseline: "bottom",
    wordWrap: true,
    wordWrapWidth: 600
});
const valueStyle = new TextStyle({
    align: "center",
    dropShadowAngle: 90,
    dropShadowColor: "#b1573e",
    dropShadowDistance: 4,
    fill: "#ffffff",
    fillGradientType: 1,
    fontFamily: "Helvetica",
    fontSize: 36,
    letterSpacing: 4,
    lineJoin: "round",
    miterLimit: 8,
    padding: 12,
    stroke: "#ffffff",
    textBaseline: "bottom",
    wordWrap: true,
    wordWrapWidth: 600
});

export class MenuTile{

    title: Text;
    value: Text;
    constructor()
    {}

    createTile(menuContainer: Container, x: number, y:number, title: string, value: string) {
        this.title = new Text(title, titleStyle);
        this.value = new Text(value, valueStyle);
        const graphics = new Graphics();

        graphics.beginFill(0xf57e1d);
        graphics.drawRect(0, 0, 300, 100);
        graphics.endFill();

        this.title.position.set(10, 15);
        this.title.anchor.set(0, 0.5);
        this.value.position.set(150,75);
        this.value.anchor.set(0.5, 0.5);
        const tileContainer = new Container();
        tileContainer.x = x;
        tileContainer.y = y;
        tileContainer.addChild(graphics, this.title, this.value);
        menuContainer.addChild(tileContainer);
    }

    updateValue(value: string) {
        this.value.text = value;
    }
}