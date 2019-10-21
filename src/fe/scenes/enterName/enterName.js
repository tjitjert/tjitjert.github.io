
import Phaser from 'phaser';
import introBG from 'Assets/img/utils/bg/Intro_Screen_background.png'
import keys from 'Utils/keyCodeHandler';
import SFX from 'Fx/sfx';
import gamConfigJson from '../../gameConfig.json'

export default class EnterName extends Phaser.Scene {
    constructor() {
        super({key: 'enterName', active: true});
        this.sfx = new SFX(this);
    }
    preload() {
        this.load.image('introBG', introBG);
        this.load.json('gameConfig', gamConfigJson)
        this.sfx.preLoad();
    }
    create() {
        this.sfx.create();
        this.gameConfig = this.cache.json.get('gameConfig').gameConfig;
        this.bg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'introBG');
        this.bg.setDisplaySize(window.innerWidth, window.innerHeight);
        this.key = this.input.keyboard.addKey(keys.playerOne.black);
        let text = this.add.text(window.innerWidth/2, window.innerHeight/2, `Use the green button to shoot && Joystick to move \nTo start hit the black button`, { fontFamily: '"Roboto Condensed"', fontSize: '40px' });
        text.setOrigin(0.5);
        this.sfx.menuSong.play();
    }
    update () {
        if (this.key.isDown) {
            this.cameras.default.shake();
            this.sfx.menuSong.stop();
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
