import Phaser from 'phaser';

import MainGame from './scenes/mainGame/mainGame';
import EnterName from './scenes/enterName/enterName';
import GaneOver from './scenes/gameOver/gameOver'

const config = {
  type: Phaser.AUTO,
  parent: 'capman-galaxy-infinity',
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  scale: {
    mode: Phaser.Scale.EXACT_FIT
  },
  physics:{
    default: 'arcade',
    arcade: {
      
      debug: false
    }
  },
  scene: [EnterName , MainGame, GaneOver]
};

const game = new Phaser.Game(config);

