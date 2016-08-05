var Breathing = function() {
    this.breathe_in_speed = 0.55;  // units: full breath-in per second
    this.breathe_out_speed = 0.55;  // units: full breath-out per second
    this.current_breath = 0;  // 0: empty  ; 1: full ; value outside those bounds are possible

    // out of breath -- when current_breath == 0
    this.out_of_breath = 0;
    this.out_of_breath_in_speed = 1;
    this.out_of_breath_out_speed = 0.2;

    // hyperventilation -- when current_breath > 1
    this.hyperventilation = 0;
    this.hyperventilation_in_speed = 1;
    this.hyperventilation_out_speed = 0.2;

}

Breathing.prototype.update = function(ds, keysPressed) {
    if (keysPressed.has(66) /* B */) {
        this.current_breath += this.breathe_in_speed * ds;
    } else {
        this.current_breath -= this.breathe_out_speed * ds;
        this.current_breath = Math.max(0, this.current_breath);
    }

}

Breathing.prototype.draw = function(ctx) {
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
}
