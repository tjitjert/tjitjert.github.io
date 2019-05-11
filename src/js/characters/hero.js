const getDefaultSettings = function(game){
    return {
        ship: 'ship1',
        player: 'one',
        positionHUD: 'left',
        lives: 3,
        spawnPosition: {
            x: 640,
            y: 900
        },
        keys: game.input.keyboard.addKeys({
            left: Phaser.KeyCode.LEFT,
            right: Phaser.KeyCode.RIGHT,
            fire: Phaser.KeyCode.CONTROL
        })
    };
}

export default class Hero extends Phaser.Sprite {
    constructor(game, settings = getDefaultSettings(game)) {
        super(game, settings.spawnPosition.x, settings.spawnPosition.y, settings.ship);
        this.settings = settings
        this.score = 0;
        this.scale.setTo(0.30, 0.30);
        this.anchor.setTo(0.5, 0.5);
        this.hasShield = false;
        
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.lives = game.add.group();
        this.bulletTime= 0;
        
        //give hero random color tint
       // this.tint = Math.floor(Math.random() * 1000) * 0xffffff;
        
        //  Our bullet group
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        //this.alive = true
        this.createLives(settings.lives);
    }
    update(){
        if (this.alive)
        {
            //  Reset the player, then check for movement keys
            this.body.velocity.setTo(0, 0);
    
            if (this.settings.keys.left.isDown)
            {
                this.body.velocity.x = -200;
            }
            else if (this.settings.keys.right.isDown)
            {
                this.body.velocity.x = 200;
            }

            //  Firing?
            if (this.settings.keys.fire.isDown)
            {
                this.fireBullet();
            }


            if(this.hasShield && this.shieldTimer < this.game.time.now){
                this.hasShield = false;
                this.tint = 0xffffff;
            }

            this.nicknameText.text = this.game._nickname;
        }
    }
    createLives(amount = 0 ){
        if(this.settings.positionHUD === 'left'){
            this.scoreText = this.game.add.text(10, 10, `Score: ${this.score}`, { font: '34px Arial', fill: '#fff' });
            this.nicknameText = this.game.add.text(this.game.world.width/2, 10, `${this.game._nickname}`, { font: '34px Arial', fill: '#fff' });
            this.statusText = this.game.add.text(10, 60, ``, { font: '34px Arial', fill: '#fff' });
        }else{
            this.scoreText = this.game.add.text(this.game.world.width - 230, 10, `Score: ${this.score}`, { font: '34px Arial', fill: '#fff' });
            this.nicknameText = this.game.add.text(this.game.world.width/2, 10, `${this.game._nickname}`, { font: '34px Arial', fill: '#fff' });
            this.statusText = this.game.add.text(this.game.world.width - 230, 60, ``, { font: '34px Arial', fill: '#fff' });
        }

        for (var i = 0; i < amount; i++) 
        {
            let ship;
            if(this.settings.positionHUD === 'left'){
                ship = this.lives.create(30 + (30 * i), 80, this.settings.ship);
            } else {
                ship = this.lives.create(this.game.world.width - 100 + (30 * i), 60, this.settings.ship);
            }
            
            ship.scale.setTo(0.15, 0.15);
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }
    }
    fireBullet(){
        //  To avoid them being allowed to fire too fast we set a time limit
        if (this.game.time.now > this.bulletTime)
        {
            //  Grab the first bullet we can from the pool
            let bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                //  And fire it
                this.game._sfx.shot.play();
                bullet.reset(this.x, this.y + 8);
                bullet.body.velocity.y = -400;
                bullet.fromPlayer = this.settings.player;
                this.bulletTime = this.game.time.now + 400;
            }
        }
    }
}