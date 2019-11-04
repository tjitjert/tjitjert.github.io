import Enemy from 'Characters/enemy';

export default class CollisionHandlers {
    constructor(scene) {
        this.scene = scene;
        scene.physics.add.collider(scene.enemyGroup, scene.hiddenWall, this.gameOver, null, this);
        scene.physics.add.overlap(scene.enemyBullets, scene.heroGroup, this.enemyBulletHitPlayer, null, this);

        scene.heroGroup.getChildren().forEach( (player)=>{
            scene.physics.add.overlap(player.bullets, scene.enemyGroup, this.bulletHitEnemy, null, this);
        });

        scene.physics.world.on('worldbounds', (element) => {
            if(element.gameObject instanceof Enemy && element.gameObject.active){
                this.enemyHitWorldBounds()
            }
        });
        this.isGameOver = false;
    }
    getAllLives (gamerData) {
        return gamerData.p1.lives + gamerData.p2.lives;
    }
    gameOver () {
        if(!this.isGameOver) {
            this.isGameOver = true
                    //have to stop both because dont know which one is playing
            this.scene.sfx.heroSongIntro.stop();
            this.scene.sfx.menuSong.stop();
            this.scene.sfx.heroSongLoop.stop();

            let text = this.scene.add.text(window.innerWidth/2, window.innerHeight/2, `You are DEAD!`, { fontFamily: '"Roboto Condensed"', fontSize: '40px' });
            text.setOrigin(0.5);
            setTimeout(()=>{
                console.log('test')
                text.destroy();
                this.scene.scene.start('gameOver', {
                    gamerData: this.scene.gamerData
                });
            },3000)
        }
    }
    bulletHitEnemy(bullet, enemy){
        if(bullet.active && enemy.active){
            this.scene.gamerData[bullet.playerID].score = this.scene.gamerData[bullet.playerID].score + this.scene.gameConfig.waves[this.scene.currentWave].killScore;
            this.scene.doExplosion(enemy);
            this.scene.enemyGroup.killAndHide(enemy);

            this.scene.heroGroup.getChildren().forEach((player)=>{
                if(player.id === bullet.playerID) {
                    player.bullets.killAndHide(bullet)
                }
            });
        }
    }
    enemyBulletHitPlayer(bullet, player) {
        if(bullet.active && player.active){
            this.scene.cameras.cameras[0].shake(200, 0.02, true)
            
            this.scene.gamerData[player.id].lives = this.scene.gamerData[player.id].lives - 1;
            this.scene.enemyBullets.killAndHide(bullet);
            this.scene.doExplosion(player);

            //kill player when he has no lives
            console.log(player.id);
            if(this.scene.gamerData[player.id].lives === 0){
                this.scene.heroGroup.killAndHide(player);
            }
            // if both players dont have lives end the game
            if(this.getAllLives(this.scene.gamerData) <= 0) {
                this.gameOver();
            }
        }
    }
    enemyHitWorldBounds () {
        this.scene.enemyGroup.getChildren().forEach(element => {
            element.goDownToggleDirection();
        });
    }
}