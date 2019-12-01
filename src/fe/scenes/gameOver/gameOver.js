
import Phaser from 'phaser';
import introBG from 'Assets/img/utils/bg/Intro_Screen_background.png'
import keys from 'Utils/keyCodeHandler';
import SFX from 'Fx/sfx';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'gameOver', active: false})
        this.sfx = new SFX(this);
    }
    init(data) {
        this.gamerData = data.gamerData;
    }
    preload() {
        this.load.image('introBG', introBG);
        this.sfx.preLoad();

    }
    create() {
        this.sfx.create();
        this.bg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'introBG');
        this.bg.setDisplaySize(window.innerWidth, window.innerHeight);

        let text = this.add.text(window.innerWidth/2, window.innerHeight/2, `SCORE: ${this.gamerData.score}\n R = RESET`, { fontFamily: '"Arial"', fontSize: '30px', align: 'center', });
        text.setOrigin(0.5);
        this.key = this.input.keyboard.addKey(keys.playerOne.black);
        this.sfx.menuSong.play();
    }
    update () {
        if (this.key.isDown) {
            this.sfx.menuSong.stop();
            //window.history.back();
            this.scene.start('enterName', {});
        }
    }
}
