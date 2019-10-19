
import Phaser from 'phaser';
import introBG from 'Assets/img/utils/bg/Intro_Screen_background.png'
import keys from 'Utils/keyCodeHandler';
import gamConfigJson from '../../gameConfig.json'

export default class EnterName extends Phaser.Scene {
    constructor() {
        super({key: 'enterName', active: true})
    }
    preload() {
        this.load.image('introBG', introBG);
        this.load.json('gameConfig', gamConfigJson)
    }
    create() {
        this.gameConfig = this.cache.json.get('gameConfig').gameConfig;
        this.bg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'introBG');
        this.bg.setDisplaySize(window.innerWidth, window.innerHeight);
        this.key = this.input.keyboard.addKey(keys.playerOne.green);
        let text = this.add.text(window.innerWidth/2, window.innerHeight/2, `Use the green button to shoot && Joystick to move \nTo start hit the green button`, { fontFamily: '"Roboto Condensed"', fontSize: '40px' });
        text.setOrigin(0.5);
    }
    update () {
        if (this.key.isDown) {
            this.cameras.default.shake();
            this.scene.start('mainGame', {
                gamerData: {
                    username: 'hackerman',
                    lives: 3
                },
                gameConfig :this.gameConfig
            });
        }

    }
}
