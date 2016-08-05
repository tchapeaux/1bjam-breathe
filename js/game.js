"use strict";

function scrMinSize() {
    return Math.min(wScr(), hScr());
}

var Game = function() {
    this.state = Game.states.STARTING;

    this.breathing = new Breathing();
    this.tutorial = new Tutorial(this);

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

    if (this.state === Game.states.TUTORIAL) {
        this.tutorial.update(ds, keysPressed);
    }

};

Game.prototype.draw = function(ctx) {
    // blackness
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(-wScr() / 2, -hScr() / 2, wScr(), hScr());
    ctx.fill();

    this.breathing.draw(ctx);

    if (this.state === Game.states.TUTORIAL) {
        this.tutorial.draw(ctx);
    }

};

