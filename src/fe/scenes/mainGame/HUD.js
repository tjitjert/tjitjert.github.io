import Phaser from 'phaser';

export default class Hud {
    constructor(scene) {
        this.scene = scene

    }
    preLoad () {

    }
    create (gamerData) {
         this.livesText = this.scene.add.text(0, 0, 'Lives', { fontFamily: '"Roboto Condensed"' });
        this.scene.add.text(screen.width /2, 0, `Player: ${gamerData.username}`, { fontFamily: '"Roboto Condensed"' });
        this.scoreText = this.scene.add.text(screen.width -200, 0, `Score: ${gamerData.score}`, { fontFamily: '"Roboto Condensed"' });
    }
    update (gamerData){
        this.scoreText.setText(`Score: ${gamerData.score}`);
        this.livesText.setText(`Lives: ${gamerData.lives}`)
    }

}