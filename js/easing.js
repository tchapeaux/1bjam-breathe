// I'm sure this exist in some other form anywhere else

"use strict";

var Easing = function(object_, property_, newval, duration, easingFunction) {
    this.object_ = object_;
    this.property_ = property_;
    this.oldval = object_[property_];
    this.newval = newval;
    this.easingFunction = easingFunction;

    var rate = 1000 / 30;  // miliseconds
    var occurences_count = duration / (rate / 1000);
    this.mini_daemon = new MiniDaemon(this, this.update, rate, occurences_count);
    this.mini_daemon.start();
};

Easing.prototype.update = function(step_nbr, step_total, backwards) {
    var factor_in = step_nbr / step_total;    
    var factor_out = this.easingFunction(factor_in);
    var current_value = this.oldval + (this.newval - this.oldval) * factor_out;
    this.object_[this.property_] = current_value;
};

