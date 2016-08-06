"use strict";

var Tutorial = function() {
    this.state = Tutorial.states.STARTING;
    this.with_instr_full_cnt = 0; // count the number of full breath-in with instructions
    this.with_instr_empty_cnt = 0; // full breath-out with instrusctions
    this.without_instr_full_cnt = 0; // full breath-in without instructions
    this.without_instr_empty_cnt = 0; // full breath-out without instructions
};

Tutorial.states = {
    STARTING: 'STARTING',
    WITH_INSTR: 'WITH_INSTR',
    WITHOUT_INSTR: 'WITHOUT_INSTR',
    ENDING: 'ENDING'
};

Tutorial.prototype.update = function(ds) {

    // Starting state handling
    if (this.state == Tutorial.states.STARTING) {
        if (game.breathing.current == 0) {
            // Player hasn't started playing yet -- disable out of breath accumulator
            game.breathing.out_of_breath = 0;
        } else {
            document.getElementById("start_instructions").style.visibility = "hidden";
            this.state = Tutorial.states.WITH_INSTR;
        }
    }

    if (this.state == Tutorial.states.WITH_INSTR) {
        if (this.with_instr_empty_cnt >= 3) {
            console.log("WITHOUT NOW");
            this.state = Tutorial.states.WITHOUT_INSTR
        } else if (this.with_instr_empty_cnt < this.with_instr_full_cnt) {
            if (game.breathing.current <= game.breathing.threshold_can_press) {
                this.with_instr_empty_cnt += 1;
                console.log("ONE EMPTY");
            }
        } else {
            if (game.breathing.current >= game.breathing.threshold_can_release) {
                this.with_instr_full_cnt += 1;
                console.log("ONE FULL");
            }
        }
    } else if (this.state == Tutorial.states.WITHOUT_INSTR) {
        if (this.without_instr_empty_cnt >= 3) {
            console.log("ENDING NOW");
            this.state = Tutorial.states.ENDING;
            game.weather.start();
        } else if (this.without_instr_empty_cnt < this.without_instr_full_cnt) {
            if (game.breathing.current <= game.breathing.threshold_can_press) {
                this.without_instr_empty_cnt += 1;
                console.log("ONE EMPTY", this);
            }
        } else {
            if (game.breathing.current >= game.breathing.threshold_can_release) {
                this.without_instr_full_cnt += 1;
                console.log("ONE FULL", this);
            }
        }
    }
}

Tutorial.prototype.draw = function(ctx) {
    ctx.textAlign = "center";
    ctx.font = "normal normal 400 20px Raleway";
    if (this.state == Tutorial.states.WITH_INSTR
        || this.state == Tutorial.states.STARTING) {
        var text = ""
        if (this.with_instr_empty_cnt < this.with_instr_full_cnt) {
            ctx.fillStyle = "#383838";
            text = "Release";
        } else {
            ctx.fillStyle = "white";
            text = "Hold";
        }

        ctx.fillText(text, 0, 10);
    }
    if (this.state == Tutorial.states.WITHOUT_INSTR) {
        var text = "KEEP GOING"
        ctx.fillStyle = "rgb(200, 200, 200)";

        ctx.fillStyle = "white";
        ctx.fillText(text, -10, -5);
        ctx.fillStyle = "#383838";
        ctx.fillText(text, 10, 5);
    }
}

