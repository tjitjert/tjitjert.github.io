import MainLevel from './levels/mainLevel';
import GameMenu from 'capmaningamemenu';
import {ScoreController, ShowScore, EnterName} from 'capmanhighscore';
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
        game.load.audio('sfx:boden', 'assets/audio/boden.ogg');
    },
    create: function(){
        game._sfx = {
            shot: this.game.add.audio('sfx:shot'),
            impact: this.game.add.audio('sfx:impact'),
            boden: this.game.add.audio('sfx:boden')
        };
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
            }
        ]
    },
    (button) =>{
        console.log(button);
        let players = 1;
        if(button.id === 'highScores'){
            game.state.start('showScore', true, false, score); 
        } else{
            if(button.id === 'twoPlayers') {
                players = 2;
            }
            game.state.start('main1', true, false, {players: players}, score); 
        }

    }
);



let main1 = new MainLevel();
game.state.add('main1', main1);
game.state.add('mainMenu', mainMenu);
game.state.add('preloader', preloader)
game.state.add('showScore', showScore);
game.state.add('enterName', enterName)
game.state.start('preloader', true, false);
//game.state.start('enterName', true, false, score, 999999);
