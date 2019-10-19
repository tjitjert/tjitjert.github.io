import Phaser from 'phaser';
import heroSongIntro from 'Assets/audio/themeSongs/Superhero_violin.ogg'
import heroSongLoop from 'Assets/audio/themeSongs/Superhero_violin_no_intro.ogg'
import shot from 'Assets/audio/sfx/shot.wav'
import impact from 'Assets/audio/sfx/impact.wav'

export default class SFX {
    constructor(scene) {
        this.scene = scene

    }
    preLoad () {
        this.scene.load.audio('heroSongWithIntro', heroSongIntro);
        this.scene.load.audio('heroSongLoop', heroSongLoop);
        this.scene.load.audio('shot', shot);
        this.scene.load.audio('impact', impact);

    }
    create () {
        let themeSongConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        let themeSongConfigLoop = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.heroSongIntro = this.scene.sound.add('heroSongWithIntro', themeSongConfig);
        this.heroSongLoop = this.scene.sound.add('heroSongLoop', themeSongConfigLoop);

        this.shot = this.scene.sound.add('shot', themeSongConfig);
        this.impact = this.scene.sound.add('impact', themeSongConfig);
    }

}