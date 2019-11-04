import Phaser from 'phaser';

export default class Hud {
    constructor(scene) {
        this.scene = scene

    }
    preLoad () {

    }
    create (gamerData) {
        let sceenWith = screen.width /4;

        this.livesTextp1 = this.scene.add.text(0, 0, 'Lives P1', { fontFamily: '"Roboto Condensed"' });
        this.scoreTextp1 = this.scene.add.text(sceenWith, 0, `Score P1: ${gamerData.p1.score}`, { fontFamily: '"Roboto Condensed"' });

        if(gamerData.p2){
            this.livesTextp2 = this.scene.add.text(sceenWith * 2 , 0, 'Lives P2', { fontFamily: '"Roboto Condensed"' });
            this.scoreTextp2 = this.scene.add.text(sceenWith * 3, 0, `Score P2: ${gamerData.p2.score}`, { fontFamily: '"Roboto Condensed"' });
        }
    }
    update (gamerData){
        this.livesTextp1.setText(`Score P1: ${gamerData.p1.score}`);
        this.scoreTextp1.setText(`Lives P1: ${gamerData.p1.lives}`);
        if(gamerData.p2){
            this.livesTextp2.setText(`Score P2: ${gamerData.p2.score}`);
            this.scoreTextp2.setText(`Lives P2: ${gamerData.p2.lives}`);
        }
    }

}