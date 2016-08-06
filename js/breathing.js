var Breathing = function() {
    this.in_speed = 0.55;  // units: full breath-in per second
    this.out_speed = 0.55;  // units: full breath-out per second
    this.current = 0;  // 0: empty  ; 1: full ; value outside those bounds are possible
    this.state = Breathing.states.OUT;

    // out of breath -- when current == 0
    this.out_of_breath = 0;
    this.out_of_breath_in_speed = 1.2;
    this.out_of_breath_out_speed = 0.1;

    // hyperventilation -- when current > 1
    this.hyperventilation = 0;
    this.hyperventilation_in_speed = 1.2;
    this.hyperventilation_out_speed = 0.1;

    // threshold -- when is it ok to switch breath direction (in/out)
    this.threshold_can_press = 0.1;
    this.threshold_can_release = 0.9;
    this.timing_discomfort = 0;
    this.timing_discomfort_step = 0.3;
    this.timing_discomfort_out_speed = 0.1;

    this.snd_breath_i = new Howl({
        src: ['res/breath_in2.ogg']
    });

    this.snd_breath_o = new Howl({
        src: ['res/breath_out.ogg']
    });

};

Breathing.states = {
    IN: "IN",
    OUT: "OUT"
};

Breathing.prototype.update = function(ds, keysPressed) {
    // breathe with button
    if (keysPressed.has(66) /* B */) {
        if (this.state == Breathing.states.OUT) {
            this.snd_breath_i.play();
            this.snd_breath_o.stop();
            this.state = Breathing.states.IN;
            if (this.current > this.threshold_can_press) {
                this.timing_discomfort += this.timing_discomfort_step;
            }
        }
        this.current += this.in_speed * ds;
    } else {
        if (this.state == Breathing.states.IN) {
            this.snd_breath_o.play();
            this.snd_breath_i.stop();
            this.state = Breathing.states.OUT;
            if (this.current < this.threshold_can_release) {
                this.timing_discomfort += this.timing_discomfort_step;
            }
        }
        this.current -= this.out_speed * ds;
        this.current = Math.max(0, this.current);
    }

    // out of breath
    if (this.current == 0) {
        this.out_of_breath += this.out_of_breath_in_speed * ds;
    } else if (this.out_of_breath > 0) {
        this.out_of_breath = Math.max(0, this.out_of_breath - this.out_of_breath_out_speed * ds);
    }

    // hyperventilation
    if (this.current > 1) {
        this.hyperventilation += this.hyperventilation_in_speed * ds;
    } else if (this.hyperventilation > 0) {
        this.hyperventilation = Math.max(0, this.hyperventilation - this.hyperventilation_out_speed * ds);
    }

    // discomfort cooldown
    if (this.timing_discomfort > 0) {
        this.timing_discomfort -= this.timing_discomfort_out_speed * ds;
        this.timing_discomfort = Math.max(0, this.timing_discomfort);
    }

}

Breathing.prototype.draw = function(ctx) {
    // helper circle outline
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(230,230,230)";
    ctx.arc(0, 0, 0.7 * scrMinSize() / 2, 0, 2 * Math.PI);
    ctx.stroke();

    // helper circle jauge
    var factor = this.current
    var save_glob_alpha = ctx.globalAlpha;
    ctx.globalAlpha = 0.5 + factor / 2;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(0, 0, factor * 0.7 * scrMinSize() / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = save_glob_alpha;
    // hyperventilation stroke
    if (factor > 1) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "green";
        if (factor > 1.1) {
            ctx.strokeStyle = "red";
        }
        ctx.stroke();
    }

    // debug jauges
    ctx.beginPath();
    ctx.rect(- wScr() / 2 + 10, -hScr() / 2 + 10, this.out_of_breath * 20, 10);
    ctx.rect(- wScr() / 2 + 10, -hScr() / 2 + 30, this.hyperventilation * 20, 10);
    ctx.rect(- wScr() / 2 + 10, -hScr() / 2 + 50, this.timing_discomfort * 20, 10);
    ctx.fill();
}
