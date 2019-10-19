//js stuff
import Phaser from 'phaser';
import Hero from 'Characters/hero';
import Enemy from 'Characters/enemy';
import SFX from 'Fx/sfx';
import Hud from './HUD';
import ColisionHandlers from 'Utils/colisionHandlers';
import keys from 'Utils/keyCodeHandler';

//assets
import heroIMG from 'Assets/img/characters/heros/Jet-top.svg';
import heroBullet from 'Assets/img/bullets/bullet.png'
import enemyBullet from 'Assets/img/bullets/enemy-bullet.png'
import explode from 'Assets/img/bullets/explode.png'
import eyeUfo from 'Assets/img/characters/baddies/bug1.svg';
import flagEars from 'Assets/img/characters/baddies/bug2.svg';
import muscito from 'Assets/img/characters/baddies/bug3.svg';
import beetle from 'Assets/img/characters/baddies/bug4.svg';
import hiddenWall from 'Assets/img/utils/invisible_wall.png';

class HiddenWall extends Phaser.GameObjects.Sprite {
    constructor(scene, positionX, positionY, width, height) {
        super(scene, positionX, positionY, 'hiddenWall');
        this.setSize(width, height,true);

        this.visible = true;
        scene.physics.world.enable(this);
        scene.add.existing(this);
    }
}
export default class MainGame extends Phaser.Scene {
    constructor() {
        super({key: 'mainGame', active: false})
        this.sfx = new SFX(this);
        this.hud = new Hud(this);
    }
    init(data) {
        this.gamerData = data.gamerData;
        this.gameConfig = data.gameConfig;
    }
    preload() {
        
        this.load.image('hero', heroIMG);
        this.load.image('heroDefaultBullet', heroBullet)
        this.load.image('enemyDefaultBullet', enemyBullet)
        this.load.image('eyeUfo', eyeUfo)
        this.load.image('muscito', muscito)
        this.load.image('beetle', beetle)
        this.load.image('hiddenWall', hiddenWall)
        this.load.image('flagEars', flagEars)
        this.load.spritesheet('kaboom', 
            explode,
            { frameWidth: 128, frameHeight: 128 }
        );

        this.sfx.preLoad();
        this.hud.preLoad();
    }
    create() {
        this.sfx.create();
        this.timeEnemyFireCounter = this.time.now;
        this.currentWave = 0;
        
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers( 'kaboom', {
                start: 0,
                end: 15
            }),
            frameRate: 32,
            repeat: 0,
            hideOnComplete: true
        });

        this.enemyBullets = this.physics.add.group({
            defaultKey: 'enemyDefaultBullet',
            maxSize: 60
        });

        this.explosions = this.add.group({
            defaultKey: 'kaboom',
            maxSize: 30
        });

        let _heros = [];
        _heros.push(new Hero(this, screen.width /2, screen.height - 100, 'hero', {
            keys: keys.playerOne,
            fireSpeed: 500
        }));
        this.heroGroup = new Phaser.Physics.Arcade.Group(
            this.physics.world,
            this,
            _heros
        );
        this.enemyGroup = new Phaser.Physics.Arcade.Group(
            this.physics.world,
            this,
            this.spawnNewEnemys(this.gameConfig.waves[0])
        );
        this.sfx.heroSongIntro.play();
        this.sfx.heroSongIntro.once('complete', ()=> {
            this.sfx.heroSongLoop.play();
        })

        this.gamerData.score = this.gamerData.score || 0; 

        this.hiddenWall = new HiddenWall(this, 1, window.innerHeight-30, window.innerWidth, 10);

        this.colisionHandlers = new ColisionHandlers(this);

        //Creation of HUD as last because it will be over all other things
        this.hud.create(this.gamerData); 
    }
    update () {
        this.cleanEnemyBullets();
        this.heroGroup.getChildren()[0].update();
        this.enemyGroup.getChildren().forEach(element => {
            element.update();
        });
        if(this.enemyGroup.countActive() === 0) {
            this.nextPhase()
        }
        this.hud.update(this.gamerData);

        if (this.time.now > this.timeEnemyFireCounter) {
            this.randomEnemyFire();
            this.timeEnemyFireCounter = this.time.now + this.gameConfig.waves[this.currentWave].shootSpeed;
        }
    }
    nextPhase () {
        this.currentWave = this.currentWave + 1;
        //clean up bullets before new wave
        this.heroGroup.getChildren()[0].bullets.getChildren().forEach(bullet =>{
            this.heroGroup.getChildren()[0].bullets.killAndHide(bullet);
        })
        this.enemyBullets.clear(true, true);
        this.enemyGroup.clear(true, true);

        this.enemyBullets.addMultiple(this.physics.add.group({
            defaultKey: 'enemyDefaultBullet',
            maxSize: 60
        }));

        if(this.currentWave <= this.gameConfig.waves.length -1){
            this.enemyGroup.addMultiple(this.spawnNewEnemys(this.gameConfig.waves[this.currentWave]), true)
        } else {
            // make it -1 so that when caling next phaese it will be 0
            this.currentWave = -1;
            this.nextPhase();
        }
        
    }
    doExplosion(gameObj) {
        this.sfx.impact.play();
        let explosion = this.explosions.get().setActive( true );
        explosion.on('animationcomplete', ()=> explosion.destroy());
        // Place the explosion on the screen, and play the animation.
        explosion.setOrigin( 0.5, 0.5 );
        explosion.x = gameObj.x;
        explosion.y = gameObj.y;
        explosion.play( 'explode' );

    }
    spawnNewEnemys (config) {
        let enemys = [];
        let spawnList = Array.from(config.spawnOrder);
        let currentPosition = {
            x: config.startingPosition.x,
            y: config.startingPosition.y
        };
        spawnList.forEach( (character) => {
            if(character === '0'){
                currentPosition.x = currentPosition.x + config.spacer.x;
            } else if (character === '#'){
                currentPosition.y = currentPosition.y + config.spacer.y;
                currentPosition.x = config.startingPosition.x;
            } else if (character === '1'){
                enemys.push(new Enemy(this, currentPosition.x, currentPosition.y, config.texture, config));
                currentPosition.x = currentPosition.x + config.spacer.x;
            }
        });
        
        return enemys;
    }
    randomEnemyFire () {
        let aliveEnemys = this.enemyGroup.getChildren().filter((enemy) =>{
            return enemy.active
        });
        let shootingEnemy = aliveEnemys[Phaser.Math.Between(0, aliveEnemys.length-1)];
        shootingEnemy.shoot(this.enemyBullets.get(shootingEnemy.x, shootingEnemy.y));
        
    }
    cleanEnemyBullets() {
        this.enemyBullets.children.each(function(b) {
            if (b.active) {
                if (b.y > screen.height) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    }
}
