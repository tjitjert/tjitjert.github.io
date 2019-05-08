import MainLevel from './levels/mainLevel';
import BossLevel from './levels/bossLevel';
import {ScoreController} from 'capmanhighscore';

const pageURL = `http://${window.location.hostname}"${window.location.port}/index.html`;
const wsURL = `ws://${window.location.hostname}:8081/`;
let elems = {};
let gameStatus = {status: 'form'};
let nickname;

// Init sockets
const connection = new WebSocket(wsURL);
connection.onopen = () => console.log('WebSocket open');
connection.onerror = error => console.log(`WebSocket error: ${error}`);

connection.onmessage = message => {
  console.log('WebSocket message:', message);
  try {
    let data = JSON.parse(message.data);
    if (data.eventName === 'startGame') {
      startGame();
    } else if (data.eventName === 'resetGame') {
      resetGame();
    } else if (data.eventName === 'updatePlayerScore') { //This one wil be one that you send not needed to read

    } else {

    }
  } catch (err) {
    console.log(err)
  }
};

// Init key controls
let keys = {};

function keyHandle(event) {
  keys[event.key] = event.type === 'keydown';
  if (keys['1'] && keys['2']) {
    resetGame();
  }
}

document.addEventListener('keydown', keyHandle);
document.addEventListener('keyup', keyHandle);

// Init game
let score = new ScoreController({name: 'aTestGame'});
let game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'capManGalaxy');

let preloader = {
  preload: function () {
    game.load.image('ship1', 'assets/img/Jet-top.svg');
    game.load.image('ship2', 'assets/img/Jet2-top.svg');
    game.load.audio('sfx:shot', 'assets/audio/shot.wav');
    game.load.audio('sfx:impact', 'assets/audio/impact.wav');
    game.load.audio('sfx:boden', 'assets/audio/Superhero_pack/Superhero_violin.ogg');
    game.load.audio('sfx:bodenLoop', 'assets/audio/Superhero_pack/Superhero_violin_no_intro.ogg');
    game.load.audio('sfx:spacetheme', 'assets/audio/spacetheme.ogg');
    game.load.audio('sfx:bossTheme', 'assets/audio/Continuum.mp3');
  },
  create: function () {
    game._sfx = {
      shot: this.game.add.audio('sfx:shot'),
      impact: this.game.add.audio('sfx:impact'),
      boden: this.game.add.audio('sfx:boden'),
      bodenLoop: this.game.add.audio('sfx:bodenLoop'),
      boss: this.game.add.audio('sfx:bossTheme'),
      mainMenu: this.game.add.audio('sfx:spacetheme')
    };
    this.game._sfx.mainMenu.play();
  }
};
game.state.add('preloader', preloader)
game.state.start('preloader', true, false);

const startGame = () => {
  game._connection = connection;
  game._nickname = nickname;
  if (gameStatus.status !== 'waiting') {
    console.log('User not ready!');
    return;
  }
  elems.capManGalaxy.style.display = 'block';
  elems.formplaceholder.style.display = 'none';
  let main1 = new MainLevel();
  let bossLevel = new BossLevel();
  game.state.add('bossLevel', bossLevel);
  game.state.add('main1', main1);
  let players = 1;
  game._sfx.mainMenu.stop();
  game.state.start('main1', true, false, {players: players}, score);
};

const resetGame = () => {
  console.log('resetGame');
  window.location = pageURL;
};

window.addEventListener('load', function () {
  elems.userform = document.getElementById('userform');
  elems.userwaiting = document.getElementById('userwaiting');
  elems.capManGalaxy = document.getElementById('capManGalaxy');
  elems.formplaceholder = document.getElementById('formplaceholder');

  // hide the game
  elems.capManGalaxy.style.display = 'none';
  elems.userwaiting.style.display = 'none';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  const validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (form.checkValidity() === true) {
        let player = {nickName: userform.nickname.value, fullName: userform.fullname.value, email: userform.email.value};
        console.log(JSON.stringify({eventName: "addNewPlayer", player}));
        nickname = userform.nickname.value;
        connection.send(JSON.stringify({eventName: "addNewPlayer", player}));
        gameStatus.status = 'waiting';
        console.log('Validation OK! Wait for game start.');
        elems.userform.style.display = 'none';
        elems.userwaiting.style.display = 'block';
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);
