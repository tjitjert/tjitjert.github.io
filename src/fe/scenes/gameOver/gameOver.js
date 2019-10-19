
import Phaser from 'phaser';
import introBG from 'Assets/img/utils/bg/Intro_Screen_background.png'
import keys from 'Utils/keyCodeHandler';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'gameOver', active: false})
    }
    init(data) {
        this.gamerData = data.gamerData;
    }
    preload() {
        this.load.image('introBG', introBG);

    }
    create() {
        this.bg = this.add.image(window.innerWidth/2, window.innerHeight/2, 'introBG');
        this.bg.setDisplaySize(window.innerWidth, window.innerHeight);

        let text = this.add.text(window.innerWidth/2, window.innerHeight/2, `Your Score: ${this.gamerData.score}\n hit green to reset`, { fontFamily: '"Roboto Condensed"', fontSize: '40px' });
        text.setOrigin(0.5);
        this.key = this.input.keyboard.addKey(keys.playerOne.green);

    }
    update () {
        if (this.key.isDown) {
            this.scene.start('enterName', {});
        }
    }
}
