"use strict";

function scrMinSize() {
    return Math.min(wScr(), hScr());
}

var Game = function() {
    this.state = Game.states.STARTING;
    this.breathing = new Breathing();
    this.tutorial = new Tutorial();
    this.weather = new Weather();

    this.state = Game.states.TUTORIAL;
};

Game.states = {
    STARTING: 'STARTING',
    TUTORIAL: 'TUTORIAL',
    NORMAL_GAME: 'NORMAL_GAME',
    PAUSED: 'PAUSED'
};

Game.prototype.update = function(ds, keysPressed) {
    this.breathing.update(ds, keysPressed);
    this.weather.update(ds, keysPressed);

    if (this.state === Game.states.TUTORIAL) {
        this.tutorial.update(ds, keysPressed);
    }

};

Game.prototype.draw = function(ctx) {
    ctx.clearRect(-wScr() / 2,-hScr() / 2,wScr(), hScr());



    this.breathing.draw(ctx);
};

