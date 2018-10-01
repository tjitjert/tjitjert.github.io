export default class Alien {
    constructor (context, invaderType) {
        this.xMultiply = 68
        this.yMultiply =70
        this.scale = 0.35
        this.tweenX = 550
        setInvaderProperties(invaderType)
        createAlien(context)
       
        context.aliens.x = 100;
        context.aliens.y = 50;
    
        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        var tween = context.game.add.tween(context.aliens).to( { x: tweenX }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        tween.onRepeat.add(()=>{context.aliens.y += 30;}, this);
    }


    setInvaderProperties(invaderType){
        if(invaderType === 1 || invaderType === 2 || invaderType === 3){
            xMultiply = invaderType === 3 ? 85 : 78; 
            //yMultiply =90;
            scale = invaderType === 3 ? 0.35 : 0.25;
            tweenX = 500
        }
    }
    
    createAlien(context){
        for (var y = 0; y < 4; y++)
        {
            for (var x = 0; x < 10; x++)
            {
                var alien = context.aliens.create(x * xMultiply, y * yMultiply, 'invader'+invaderType);
                alien.scale.setTo(scale, scale);
                alien.anchor.setTo(0.5, 0.5);
                //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                //alien.play('fly');
                // if(tint){
                //     alien.tint = tint
                // }
                
                alien.body.moves = false;
            }
        }
    
    }
} 