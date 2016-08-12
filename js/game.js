"use strict";

function scrMinSize() {
    return Math.min(wScr(), hScr());
}

var Game = function() {
    this.state = Game.states.STARTING;
    this.breathing = new Breathing();
    this.tutorial = new Tutorial();
    this.weather = new Weather();
    this.gui_overlay = new GuiOverlay();

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
    this.gui_overlay.update(ds);

    if (this.state === Game.states.TUTORIAL) {
        this.tutorial.update(ds, keysPressed);
    }

};

Game.prototype.draw = function(ctx) {
    ctx.clearRect(-wScr() / 2,-hScr() / 2,wScr(), hScr());
    this.gui_overlay.draw(); // gui overlay draw on its own canvas
    this.breathing.draw(ctx);
};

