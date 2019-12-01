import Phaser from 'phaser';

console.log(Phaser);

var keys = JSON.parse(localStorage.getItem("capManKeys"));
if(keys === null) {
    keys = {
        playerOne: {
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            green: Phaser.Input.Keyboard.KeyCodes.SPACE,
            black: Phaser.Input.Keyboard.KeyCodes.R,
            white: Phaser.Input.Keyboard.KeyCodes.U,
            blueBelowWhite: Phaser.Input.Keyboard.KeyCodes.K,
            topRightBlue: Phaser.Input.Keyboard.KeyCodes.O,
            buttomRightBlue: Phaser.Input.Keyboard.KeyCodes.L
        },
        playerTwo: {
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            green: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
            black: Phaser.Input.Keyboard.KeyCodes.X,
            white: Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN,
            blueBelowWhite: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE,
            topRightBlue: Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE,
            buttomRightBlue: Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX
        },
        pinBallLeft: Phaser.Input.Keyboard.KeyCodes.Z,
        pinBallRight: Phaser.Input.Keyboard.KeyCodes.THREE,
        OnePlayerSelection: Phaser.Input.Keyboard.KeyCodes.N,
        TwoPlayerSelection: Phaser.Input.Keyboard.KeyCodes.M
    }
}
export default keys;