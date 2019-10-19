import Phaser from 'phaser';

export default class Hero extends Phaser.GameObjects.Sprite {
    constructor(scene, positionY, positionX, fixture, config) {
        super(scene, positionY, positionX, fixture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.lives = 3
        this.config = config
        this.scale = 0.3
        this.keys = {
            left: scene.input.keyboard.addKey(this.config.keys.left),
            right: scene.input.keyboard.addKey(this.config.keys.right),
            fire: scene.input.keyboard.addKey(this.config.keys.green)
        };
        this.body.setCollideWorldBounds(true);
        this.bullets = scene.physics.add.group({
            defaultKey: 'heroDefaultBullet',
            maxSize: 10
        });
        this.fireTimeStamp = 0;
    }
    cleanBullets() {
        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    }
    update() {
        this.cleanBullets();
        this.body.velocity.setTo(0, 0);
    
        if (this.keys.left.isDown) {
            this.body.velocity.x = -200;
        }
        else if (this.keys.right.isDown) {
            this.body.velocity.x = 200;
        }
        if (this.keys.fire.isDown) {
           if(this.scene.time.now > this.fireTimeStamp){
               this.fireTimeStamp = this.scene.time.now + this.config.fireSpeed;
               this.shoot(this);
           }
        }
    }
    shoot(pointer) {
        var bullet = this.bullets.get(pointer.x, pointer.y);
        if (bullet) {
            this.scene.sfx.shot.play();
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = -200;
        }
    }
}