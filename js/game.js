"use strict";

function scrMinSize() {
    return Math.min(wScr(), hScr());
}

var Game = function() {
    this.state = Game.states.STARTING;

    this.breathe_in_speed = 0.55  // units: full breath-in per second
    this.breathe_out_speed = 0.55  // units: full breath-out per second
    this.current_breath = 0  // 0: empty  ; 1: full ; value outside those bounds are possible

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
    if (this.state === Game.states.TUTORIAL) {
        this.tutorial.update(ds, keysPressed);
    }

    if (keysPressed.has(66) /* B */) {
        this.current_breath += this.breathe_in_speed * ds;
    } else {
        this.current_breath -= this.breathe_out_speed * ds;
        this.current_breath = Math.max(0, this.current_breath);
    }

};

Game.prototype.draw = function(ctx) {
    // blackness
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(-wScr() / 2, -hScr() / 2, wScr(), hScr());
    ctx.fill();

    // helper circle outline
    ctx.beginPath();
    ctx.strokeStyle = "rgb(230,230,230)";
    ctx.arc(0, 0, 0.9 * scrMinSize() / 2, 0, 2 * Math.PI);
    ctx.stroke();

    // helper circle jauge
    var factor = this.current_breath
    var save_glob_alpha = ctx.globalAlpha;
    ctx.globalAlpha = 0.5 + factor / 2;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(0, 0, factor * 0.9 * scrMinSize() / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = save_glob_alpha;
    // hyperventilation stroke
    if (factor > 1) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    if (this.state === Game.states.TUTORIAL) {
        this.tutorial.draw(ctx);
    }
    
};

