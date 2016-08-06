"use strict";

var Tutorial = function() {
    this.state = Tutorial.states.STARTING;
    this.with_instr_full_cnt = 0; // count the number of full breath-in with instructions
    this.with_instr_empty_cnt = 0; // full breath-out with instrusctions
    this.without_instr_full_cnt = 0; // full breath-in without instructions
    this.without_instr_empty_cnt = 0; // full breath-out without instructions

    this.instructions_area = document.getElementById("start_instructions")
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
            this.instructions_area.innerHTML = "<p>Hold</p>";
            this.state = Tutorial.states.WITH_INSTR;
        }
    }

    // Cough reset tutorial
    if (game.breathing.is_coughing()) {
        this.with_instr_empty_cnt = 0;
        this.with_instr_full_cnt = 0;
        this.without_instr_empty_cnt = 0;
        this.without_instr_full_cnt = 0;
        this.state = Tutorial.states.WITH_INSTR;
        this.instructions_area.innerHTML = "<p>Hold</p>";
    }

    if (this.state == Tutorial.states.WITH_INSTR) {
        if (this.with_instr_empty_cnt >= 3) {
            console.log("WITHOUT NOW");
                this.instructions_area.innerHTML = "<p>Keep going</p>";
            this.state = Tutorial.states.WITHOUT_INSTR
        } else if (this.with_instr_empty_cnt < this.with_instr_full_cnt) {
            if (game.breathing.current <= game.breathing.threshold_can_press) {
                this.with_instr_empty_cnt += 1;
            this.instructions_area.innerHTML = "<p>Hold</p>";
                console.log("ONE EMPTY");
            }
        } else {
            if (game.breathing.current >= game.breathing.threshold_can_release) {
                this.with_instr_full_cnt += 1;
            this.instructions_area.innerHTML = "<p>Release</p>";
                console.log("ONE FULL");
            }
        }
    } else if (this.state == Tutorial.states.WITHOUT_INSTR) {
        if (this.without_instr_empty_cnt >= 3) {
            console.log("ENDING NOW");
            this.instructions_area.innerHTML = "";
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
