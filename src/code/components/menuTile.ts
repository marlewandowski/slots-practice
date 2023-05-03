import { TextStyle, Text, Graphics, Container } from "pixi.js";

const titleStyle = new TextStyle({
    align: "center",
    dropShadowAngle: 90,
    dropShadowColor: "#b1573e",
    dropShadowDistance: 4,
    fill: "#ffffff",
    fillGradientType: 1,
    fontFamily: "Helvetica",
    fontSize: 12,
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

    title: string;
    value: string;
    constructor()
    {}

    createTile(menuContainer: Container, x: number, y:number, title: string, value: string) {
        const titleText = new Text('Hello World', titleStyle);
        const valueText = new Text('Hello value', valueStyle);
        const graphics = new Graphics();

        graphics.beginFill(0xFF0000);
        graphics.drawRect(0, 0, 400, 100);
        graphics.endFill();

        titleText.position.set(60, 15);
        titleText.anchor.set(0.5, 0.5);
        valueText.position.set(200,50);
        valueText.anchor.set(0.5, 0.5);
        const tileContainer = new Container();
        tileContainer.x = x;
        tileContainer.y = y;
        tileContainer.addChild(graphics, titleText, valueText);
        menuContainer.addChild(tileContainer);
    }

}