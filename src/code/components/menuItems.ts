import { Circle, Container, Graphics, Resource, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Spin } from "../utils/spin";
import { emitter } from "../utils/spin";
import { State, balanceEmitter, scoreEmitter } from "../common/state";
import { MenuTile } from "./menuTile";

const style = new TextStyle({
    align: "center",
    dropShadowAngle: 90,
    dropShadowColor: "#b1573e",
    dropShadowDistance: 4,
    fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 4,
    lineJoin: "round",
    miterLimit: 8,
    padding: 12,
    stroke: "#ffffff",
    strokeThickness: 6,
    textBaseline: "bottom",
    wordWrapWidth: 600
});
export class MenuItems {
    betValueText = new Text('Bet value: 5', style);
    balanceText = new Text('Balance : 1000', style);
    scoreText = new Text('Score: 0', style);
    createMenuButtons(menuContainer: Container, textures: Record<string, Texture<Resource>>, spin: Spin, state: State) {
        const increaseBet = new Sprite(textures.chevron);
        increaseBet.scale.x = -1;        
        const increaseBetContainer = new Container();
        increaseBetContainer.addChild(increaseBet);
        increaseBetContainer.position.set(350, 0);
        increaseBetContainer.eventMode = "static";
        increaseBetContainer.cursor = "pointer";
        increaseBetContainer.on("click", () => {
            this.increaseBet(state)
        });
        
        const decreaseBet = new Sprite(textures.chevron);
        const decreaseBetContainer = new Container();
        decreaseBetContainer.addChild(decreaseBet);
        decreaseBetContainer.position.set(150, 0);
        decreaseBetContainer.eventMode = "static";
        decreaseBetContainer.cursor = "pointer";
        decreaseBetContainer.on("click", () => {
            this.decreaseBet(state)
        });

        const maxBetContainer = new Container();
        const maxBet = new Graphics();
        maxBet.beginFill(0xFF0000); 
        maxBet.drawCircle(550, 50, 50); 
        maxBet.endFill();
        const maxText = new Text("MAX", {
            fontSize: 24,
            fill: "white"
          });
        maxText.anchor.set(0.5);        
        maxBetContainer.addChild(maxBet);
        maxBetContainer.addChild(maxText);          
        maxText.position.set(maxBet.width / 2 + 500,  maxBet.height / 2);
        maxBetContainer.eventMode = "static";
        maxBetContainer.cursor = "pointer";
        maxBetContainer.on("click", () => {
            this.maxBet(state)
        });

        const minBetContainer = new Container();
        const minBet = new Graphics();
        minBet.beginFill(0x00FF00); 
        minBet.drawCircle(420, 50, 50); 
        minBet.endFill();
        const minText = new Text("MIN", {
            fontSize: 24,
            fill: "white"
          });
        minText.anchor.set(0.5);        
        minBetContainer.addChild(minBet);
        minBetContainer.addChild(minText);          
        minText.position.set(minBet.width / 2 + 370,  minBet.height / 2);
        minBetContainer.eventMode = "static";
        minBetContainer.cursor = "pointer";
        minBetContainer.on("click", () => {
            this.minBet(state)
        });

        this.betValueText.position.set(0, 150);
        this.balanceText.position.set(0, 200);
        this.scoreText.position.set(0,250);
        
        //TODO: text menu to menu tiles
        const menuTile = new MenuTile();
        menuTile.createTile(menuContainer,300,200,"Name","Marcin");
        const buttonContainer = new Container();

        const buttonActive = new Sprite(textures["btnActive"]);
        const buttonInActive = new Sprite(textures["btnInActive"]);
        buttonInActive.visible = false;
        buttonContainer.addChild(buttonInActive, buttonActive);
        this.buttonListener(buttonContainer, 
            buttonActive, 
            buttonInActive,
            state,
            spin);
        menuContainer.addChild(
            buttonContainer,
            increaseBetContainer,
            decreaseBetContainer,
            this.betValueText,
            this.balanceText,
            this.scoreText,
            minBetContainer,
            maxBetContainer);

        scoreEmitter.on("updateScore", (value: number) => {
            this.updateScore(state, value);
        })
        balanceEmitter.on("updateBalance", (value: number) => {
            this.updateBalance(state, value);
        })
    }

    buttonListener(
        buttonContainer: Container, 
        buttonActive: Sprite, 
        buttonInActive: Sprite,
        state: State,
        spin: Spin) {
        buttonContainer.eventMode = "static";
        buttonContainer.cursor = "pointer";
        buttonContainer.on("click", () => {
            buttonContainer.eventMode = "none";
            spin.start(state);
            this.setButtonState(buttonActive, buttonInActive);
            emitter.once('stopSpin', () => {
            this.setButtonState(buttonActive, buttonInActive);
            buttonContainer.eventMode = "static";
            });
        })
        }


    setButtonState(buttonActive: Sprite, buttonInActive: Sprite) {
        buttonActive.visible = !buttonActive.visible;
        buttonInActive.visible = !buttonInActive.visible;
      }

    public increaseBet(state: State) {
        if (state.bet >= state.balance)
            state.bet = state.balance -5;
        this.betValueText.text = "Bet value: " + (state.bet + 5).toString();
        state.bet += 5;
    }

    public decreaseBet(state: State) {
        if (state.bet - 5 <= 5)
            state.bet = 10;
        this.betValueText.text = "Bet value: " + (state.bet - 5).toString();
        state.bet -= 5;
    }

    public maxBet(state:State) {
        state.bet = state.balance;
        this.betValueText.text = "Bet value: " + state.balance;
    }

    public minBet(state:State) {
        state.bet = 5;
        this.betValueText.text = "Bet value: " + 5;
    }

    public updateBalance(state: State, value: number) {
        this.balanceText.text = "Balance: " + state.balance.toString(); 
    }

    public updateScore(state:State, value: number) {
        this.scoreText.text = "Score: " + state.score.toString();
    }

}