const fireLocations = [
    {
        x:275,
        y:1024
    },
    {
        x:550,
        y:1024
    },
    {
        x:825,
        y:1024
    },
    {
        x:1100,
        y:1024
    }
]

export default class Boss extends Phaser.Sprite {
    constructor(game) {
        super(game, 200, 200, 'boss1');
        this.game = game;
        var tween = game.add.tween(this).to( { x: 800 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.firingTimer = game.time.now + 4000
        this.health = 50;

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(60, 'enemyBullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);


    }
    bossFire(){
        //  Grab the first bullet we can from the pool
        fireLocations.forEach((location)=>{
            let bullet = this.bullets.getFirstExists(false);
            bullet.reset(this.body.center.x, this.body.center.y);
            this.game.physics.arcade.moveToXY(bullet,location.x + this.game.rnd.integerInRange(0,100),location.y, 120);
        })

        this.firingTimer = this.game.time.now + this.game.rnd.integerInRange(300,5000);
    }
    update(){
        if (this.game.time.now > this.firingTimer && this.alive) {
            this.bossFire();
        }
    }

}