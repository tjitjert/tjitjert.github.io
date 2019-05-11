import MainLevel from './levels/mainLevel';
import BossLevel from './levels/bossLevel';
import {ScoreController} from 'capmanhighscore';

const pageURL = `http://${window.location.hostname}:${window.location.port}/game`;
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
      startCountDown();
    } else if (data.eventName === 'resetGame') {
      resetGame();
    } else if (data.eventName === 'updatePlayerScore') {
      //This one wil be one that you send not needed to read
    } else if (data.eventName === 'addNewPlayer') {
      updateName(data);
    } else if (data.eventName === 'playerGameOver') {
      gameOver(data.player);
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
let game = new Phaser.Game(1152, 648, Phaser.AUTO, 'capManGalaxy');

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

const startCountDown = () => {
  let secs = 3;
  let interval = setInterval(()=>{
    elems.countdown.innerText = secs;
    if (secs <= 0) {
      clearInterval(interval);
      startGame();
    }
    secs -= 1;
  }, 1000);
};

const startGame = () => {
  game._connection = connection;
  game._nickname = nickname;
  if (gameStatus.status !== 'waiting') {
    console.log('User not ready!');
    return;
  }
  elems.capManGalaxy.classList.remove("d-none");
  elems.formplaceholder.classList.add("d-none");
  elems.userwaiting.classList.add("d-none");
  let main1 = new MainLevel();
  let bossLevel = new BossLevel();
  game.state.add('bossLevel', bossLevel);
  game.state.add('main1', main1);
  let players = 1;
  game._sfx.mainMenu.stop();
  game.state.start('main1', true, false, {players: players}, score);
};

const gameOver = (player) => {
  console.log('gameOver');
  if (player) {
    elems.score.innerText = game._playerScore ? game._playerScore : 0;
    elems.name.innerText = player.nickName;
  }
  elems.capManGalaxy.classList.add("d-none");
  elems.formplaceholder.classList.remove("d-none");
  elems.gameover.classList.remove("d-none");
};

const resetGame = () => {
  console.log('resetGame');
  window.location = pageURL;
};

const updateName = (data) => {
  game._nickname = nickname;
  nickname = data.nickname;
  data.b ? elems.overlayb.classList.remove("d-none") : elems.overlayb.classList.add("d-none");
};

window.addEventListener('load', function () {
  elems.userform = document.getElementById('userform');
  elems.userwaiting = document.getElementById('userwaiting');
  elems.countdown = document.getElementById('countdown');
  elems.gameover = document.getElementById('gameover');
  elems.name = document.getElementById('name');
  elems.score = document.getElementById('score');
  elems.capManGalaxy = document.getElementById('capManGalaxy');
  elems.overlayb = document.getElementById('overlayb');
  elems.formplaceholder = document.getElementById('formplaceholder');

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  const validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (form.checkValidity() === true) {
        let player = {
          nickName: userform.nickname.value,
          fullName: userform.fullname.value,
          email: userform.email.value
        };
        console.log(JSON.stringify({eventName: "addNewPlayer", player}));
        nickname = userform.nickname.value;
        connection.send(JSON.stringify({eventName: "addNewPlayer", player}));
        gameStatus.status = 'waiting';
        console.log('Validation OK! Wait for game start.');
        elems.userform.classList.add("d-none");
        elems.userwaiting.classList.remove("d-none");
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);
