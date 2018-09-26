import MainLevel from './levels/mainLevel';
var game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'capManGalaxy');

var preloader = {
    preload: function(){
        game.load.image('ship1', 'assets/img/Jet-top.svg');
        game.load.image('ship2', 'assets/img/Jet2-top.svg');
        game.load.audio('sfx:shot', 'assets/audio/shot.wav');
        game.load.audio('sfx:impact', 'assets/audio/impact.wav');
        game.load.audio('sfx:boden', 'assets/audio/boden.ogg');
    },
    create: function(){
        game._sfx = {
            shot: this.game.add.audio('sfx:shot'),
            impact: this.game.add.audio('sfx:impact'),
            boden: this.game.add.audio('sfx:boden'),
            //boden: new Phaser.Sound(game,'sfx:boden',1,true)
        };
        game.state.start('main1', true, false, {level: 0});
    }
}


var main1 = new MainLevel();
game.state.add('main1', main1);
//game.state.add('mainLevel',  { preload: preload, create: create, update: update, render: render });
game.state.add('preloader', preloader)
game.state.start('preloader', true, false, {level: 0});
