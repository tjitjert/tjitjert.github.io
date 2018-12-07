import Hero from '../characters/hero';
import Boss from '../characters/boss';

function bossColision (boss, bullet) {

    bullet.kill();

    if(bullet.fromPlayer === 'one') {
        this.player.score += 5;
        this.player.scoreText.text = `Score: ${this.player.score}`;
    } else if(bullet.fromPlayer === 'two') {
        this.playerTwo.score += 5;
        this.playerTwo.scoreText.text = `Score: ${this.playerTwo.score}`;
    }

    this.game._sfx.impact.play();
    let explosion = this.explosions.getFirstExists(false);

    explosion.reset(bullet.body.x, bullet.body.y);
    explosion.play('kaboom', 30, false, true);
    boss.health --;

    if(boss.health === boss.halfLifeIntervention){
        boss.halfLifeInterventionCB(boss);
    }

    if(boss.health === 0){
        let explosionOne = this.explosions.getFirstExists(false);
        explosionOne.scale.setTo(2, 2);
        explosionOne.reset(boss.body.center.x, boss.body.center.y);
        explosionOne.play('kaboom', 30, false, true);
        this.game.camera.shake(0.005, 500);
        boss.kill();
        this.endGameTimer = this.game.time.now + 600;
    }
}

function endGame (context, playersDeath){
    context.game._sfx.boss.stop();
    if(context.levelConfig.endGame || playersDeath){
        context.levelConfig.endGame = false;
        let gstateText = context.game.add.text(context.game.world.centerX,context.game.world.centerY,'Game OVer ', { font: '84px Arial', fill: '#fff' });
        gstateText.anchor.setTo(0.5, 0.5);

        if(context.levelConfig.players === 2){
            if(context.score.isScoreMoreThenLast(context.player.score)){
                context.game._sfx.mainMenu.play();
                context.game.state.start('enterName', true, false, context.score, context.player.score, ()=>{
                    if(context.score.isScoreMoreThenLast(context.playerTwo.score)){
                        context.game.state.start('enterName', true, false, context.score, context.playerTwo.score, ()=>{
                            context.game.state.start('showScore', true, false, context.score);
                        });
                    } else {
                        context.game._sfx.mainMenu.play();
                        context.game.state.start('showScore', true, false, context.score);
                    }
                });
            } else if(context.score.isScoreMoreThenLast(context.playerTwo.score)){
                context.game._sfx.mainMenu.play();
                context.game.state.start('enterName', true, false, context.score, context.playerTwo.score, ()=>{
                    context.game.state.start('showScore', true, false, context.score);
                });
            }
            else {
                context.game._sfx.mainMenu.play();
                context.game.state.start('showScore', true, false, context.score); 
            }
        
        }else {
            if(context.score.isScoreMoreThenLast(context.player.score)){
                context.game._sfx.mainMenu.play();
                context.game.state.start('enterName', true, false, context.score, context.player.score, ()=>{
                    context.game.state.start('showScore', true, false, context.score);
                });
            } else {
                context.game._sfx.mainMenu.play();
                context.game.state.start('showScore', true, false, context.score); 
            }
        }

    } else {
        if(context.levelConfig.players === 2){
            let player = 0;
            let playerTwo = 0;
    
            context.player.lives.forEachAlive(()=>{
                player =  player+1
            })
            context.playerTwo.lives.forEachAlive(()=>{
                playerTwo =  playerTwo+1
            })
            context.game.state.start('main1', true, false, 
            {
                players: context.levelConfig.players,
                playerScore: context.player.score,
                playerTwoScore: context.playerTwo.score,
                playerLives: player,
                playerTwoLives: playerTwo,
                shootSpeed: 1000, 
                endGame: true
            }, context.score);
        }else {
            let player = 0;
    
            context.player.lives.forEachAlive(()=>{
                player =  player+1
            })

            context.game.state.start('main1', true, false, 
                {
                    players: context.levelConfig.players,
                    playerScore: context.player.score,
                    playerLives: player,
                    shootSpeed: 1000, 
                    endGame: true
                }, 
                context.score);
        }
    }



}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

    let live = player.lives.getFirstAlive();
    if (live && !player.hasShield)
    {
        player.kill();
        live.kill();
    }

    //  And create an explosion :)
    this.game._sfx.impact.play();
    var explosion = this.explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (player.lives.countLiving() < 1)
    {
        player.kill();
        player.statusText.text = 'No more lives';
    }else {
        if(!player.hasShield){
            player.reviveAble = true;
            player.revivePenalty = this.game.time.now + 3000;
        }
    }

    if(this.levelConfig.players === 2){
        if(this.player.lives.countLiving() <1 && this.playerTwo.lives.countLiving() <1){
            endGame(this, true);
        }
    } else {
        if(this.player.lives.countLiving() <1 ){
            endGame(this, true);
        }
    }
}

export default class MainLevel {
    constructor() {
        this.player;
        this.bullets;
        this.bulletTime = 0;
        this.cursors;
        this.fireButton;
        this.explosions;
        this.starfield;
        this.lives;
        this.enemyBullet;
        this.firingTimer = 0;
        this.stateText;
        this.livingEnemies = [];
        this.waveCounter = 0;
    }
    preload() {
        this.game.load.image('bullet', 'assets/img/bullet.png');
        this.game.load.image('boss1', 'assets/img/boss1.svg');
        this.game.load.image('enemyBullet', 'assets/img/enemy-bullet.png');
        this.game.load.image('invader4', 'assets/img/bug4.svg');
        this.game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);
        this.game.load.image('starfield', 'assets/img/starfield.png');
    }
    init(config, score) {
        this.game.renderer.renderSession.roundPixels = true;
        this.levelConfig = config;
        this.score = score;
    }
    create() {
    
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
        //  The scrolling starfield background
        this.starfield = this.game.add.tileSprite(0, 0, 1280, 1024, 'starfield');
        //this.starfield.tint = (Math.floor(Math.random() * 1000)+700) * 0xffffff;    
        //  The hero!
        this.player =  new Hero(this.game, {
            ship: 'ship1',
            player: 'one',
            lives: this.levelConfig.playerLives,
            positionHUD: 'left',
            spawnPosition: {
                x: 240,
                y: 900
            },
            keys: this.game.input.keyboard.addKeys({
                left: Phaser.KeyCode.LEFT,
                right: Phaser.KeyCode.RIGHT,
                fire: Phaser.KeyCode.CONTROL
            })
        });
        this.player.score = this.player.score + this.levelConfig.playerScore;
        this.game.add.existing(this.player);
        if(this.levelConfig.players === 2) {
            this.playerTwo =  new Hero(this.game, {
                ship: 'ship2',
                player: 'two',
                lives: this.levelConfig.playerTwoLives,
                positionHUD: 'right',
                spawnPosition: {
                    x: 1040,
                    y: 900
                },
                keys: this.game.input.keyboard.addKeys({
                    left: Phaser.KeyCode.D,
                    right: Phaser.KeyCode.G,
                    fire: Phaser.KeyCode.A
                })
            });
            this.playerTwo.score = this.playerTwo.score + this.levelConfig.playerTwoScore;
            this.game.add.existing(this.playerTwo);
        }
        
        this.boss = new Boss(this.game, function(bosje){
            bosje.tween.timeScale =1.2;
        });
        this.game.add.existing(this.boss);
    
        //  An explosion pool
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(setupInvader, this);
        this.game._sfx.boss.loop = true;
        this.game._sfx.boss.play();



                // The enemy's bullets
        this.enemyBullets = this.game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'enemyBullet');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

    }
    update () {
        this.starfield.tilePosition.y += 2;

        this.game.physics.arcade.overlap(this.player.bullets, this.boss, bossColision, null, this);
        this.game.physics.arcade.overlap(this.boss.bullets, this.player, enemyHitsPlayer, null, this);

        if(this.player.reviveAble && this.player.revivePenalty < this.game.time.now){
            this.player.revive();
            this.player.tint = 500 * 0xffffff;
            this.player.reviveAble = false;
            this.player.hasShield = true;
            this.player.shieldTimer = this.game.time.now + 2000;
        }

        if(this.levelConfig.players === 2) {
            this.game.physics.arcade.overlap(this.playerTwo.bullets, this.boss, bossColision, null, this);
            this.game.physics.arcade.overlap(this.boss.bullets, this.playerTwo, enemyHitsPlayer, null, this);
            if(this.playerTwo.reviveAble && this.playerTwo.revivePenalty < this.game.time.now){
                this.playerTwo.revive();
                this.playerTwo.tint = 500 * 0xffffff;
                this.playerTwo.reviveAble = false;
                this.playerTwo.hasShield = true;
                this.playerTwo.shieldTimer = this.game.time.now + 2000;
            }
        }
        if(this.endGameTimer === this.game.time.now ){
            endGame(this);
        }
    }
}
