import MainLevel from './levels/mainLevel';
import BossLevel from './levels/bossLevel';
import GameMenu from 'capmaningamemenu';
import {ScoreController, ShowScore, EnterName} from 'capmanhighscore';

var keys = {};
function keyHandle(event) {
  const keyName = event.type;
  
  keys[event.key] = event.type === 'keydown';
  if(keys['1'] && keys['2']){
  var url = "http://"+window.location.hostname+":"+window.location.port+'/index.html';
  	window.location = url;
  }
};

document.addEventListener('keydown',keyHandle);
document.addEventListener('keyup',keyHandle);

let game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'capManGalaxy');

var score = new ScoreController({name: 'aTestGame'});

const showScore = new ShowScore(
    {
        title: 'capman Crashing bugs',
        background: 'assets/img/Intro_Screen_background.png',
        logo: 'assets/img/CapmanLogo1.svg'
    },
    () =>{
        game.state.start('mainMenu', true, false);
    }
);

const enterName = new EnterName(
    {
        title: 'capman Crashing bugs',
        background: 'assets/img/Intro_Screen_background.png',
        logo: 'assets/img/CapmanLogo1.svg'
    }
);

let preloader = {
    preload: function(){
        game.load.image('ship1', 'assets/img/Jet-top.svg');
        game.load.image('ship2', 'assets/img/Jet2-top.svg');
        game.load.audio('sfx:shot', 'assets/audio/shot.wav');
        game.load.audio('sfx:impact', 'assets/audio/impact.wav');
        game.load.audio('sfx:boden', 'assets/audio/Superhero_pack/Superhero_violin.ogg');
        game.load.audio('sfx:bodenLoop', 'assets/audio/Superhero_pack/Superhero_violin_no_intro.ogg');
        game.load.audio('sfx:spacetheme', 'assets/audio/spacetheme.ogg');
        game.load.audio('sfx:bossTheme', 'assets/audio/Continuum.mp3');
    },
    create: function(){
        game._sfx = {
            shot: this.game.add.audio('sfx:shot'),
            impact: this.game.add.audio('sfx:impact'),
            boden: this.game.add.audio('sfx:boden'),
            bodenLoop: this.game.add.audio('sfx:bodenLoop'),
            boss: this.game.add.audio('sfx:bossTheme'),
            mainMenu: this.game.add.audio('sfx:spacetheme')
        };
        this.game._sfx.mainMenu.play();
        game.state.start('mainMenu', true, false);
    }
}

const mainMenu = new GameMenu(
    {
        title: 'capman Crashing bugs',
        background: 'assets/img/Intro_Screen_background.png',
        logo: 'assets/img/CapmanLogo1.svg',
        buttons: [
            {
                id: 'onePlayer',
                text: '- start one player -'
            },
            {
                id: 'twoPlayers',
                text: '- start two player -'
            },
            {
                id: 'highScores',
                text: '- High scores -'
            },
            {
                id: 'back',
                text: '- Back to launcher -'
            }
        ]
    },
    (button) =>{
        console.log(button);
        let main1 = new MainLevel();
        let bossLevel = new BossLevel();
        game.state.add('bossLevel', bossLevel);
        game.state.add('main1', main1);
        let players = 1;
        if(button.id === 'back'){
            window.history.back();
        }
        else if(button.id === 'highScores'){
            game.state.start('showScore', true, false, score); 
        } else{
            game._sfx.mainMenu.stop();
            if(button.id === 'twoPlayers') {
                players = 2;
            }
            game.state.start('main1', true, false, {players: players}, score); 
        }

    }
);


game.state.add('mainMenu', mainMenu);
game.state.add('preloader', preloader)
game.state.add('showScore', showScore);
game.state.add('enterName', enterName)
game.state.start('preloader', true, false);
//game.state.start('enterName', true, false, score, 999999);
