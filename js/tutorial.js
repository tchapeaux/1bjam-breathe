"use strict";

var Tutorial = function(game) {
    this.game = game;
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

    if (this.state == Tutorial.states.STARTING) {
        this.state = Tutorial.states.WITH_INSTR;
    }

    if (this.state == Tutorial.states.WITH_INSTR) {
        if (this.with_instr_empty_cnt >= 3) {
            console.log("WITHOUT NOW");
            this.state = Tutorial.states.WITHOUT_INSTR
        } else if (this.with_instr_empty_cnt < this.with_instr_full_cnt) {
            if (game.breathing.current <= 0) {
                this.with_instr_empty_cnt += 1;
                console.log("ONE EMPTY");
            }
        } else {
            if (game.breathing.current >= 1) {
                this.with_instr_full_cnt += 1;
                console.log("ONE FULL");
            }
        }
    } else if (this.state == Tutorial.states.WITHOUT_INSTR) {
        if (this.without_instr_empty_cnt >= 3) {
            console.log("ENDING NOW");
            this.state = Tutorial.states.ENDING;
        } else if (this.without_instr_empty_cnt < this.without_instr_full_cnt) {
            if (game.breathing.current <= 0) {
                this.without_instr_empty_cnt += 1;
                console.log("ONE EMPTY", this);
            }
        } else {
            if (game.breathing.current >= 1) {
                this.without_instr_full_cnt += 1;
                console.log("ONE FULL", this);
            }
        }
    }
}

Tutorial.prototype.draw = function(ctx) {
    ctx.textAlign = "center";
    if (this.state == Tutorial.states.WITH_INSTR) {
        var text = ""
        if (this.with_instr_empty_cnt < this.with_instr_full_cnt) {
            ctx.fillStyle = "black";
            text = "Release B";
        } else {
            ctx.fillStyle = "white";
            text = "Press B";
        }

        ctx.font = "75px";
        ctx.fillText(text, 0, 0);
    }
    if (this.state == Tutorial.states.WITHOUT_INSTR) {
        var text = "KEEP GOING"
        ctx.fillStyle = "rgb(200, 200, 200)";

        ctx.font = "75px";
        ctx.fillText(text, 0, 0);
    }

}

