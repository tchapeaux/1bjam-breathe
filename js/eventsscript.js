var EventDialogLine = function(speaker, line, duration) {
    this.speaker = speaker;
    this.line = line;
    this.duration = duration; // s
    this.display_timer = duration;
};

EventDialogLine.prototype.start = function() {
    document.getElementById("subtitles").innerHTML = "<p><span class='subtitle_speaker_name'>" + this.speaker + "</span>: <span class='subtitle_dialog'" + this.line + "</span></p>";
}

EventDialogLine.prototype.update = function(ds) {
    if (this.display_timer > 0) {
        this.display_timer -= ds;
    }
};

EventDialogLine.prototype.stop = function() {
    document.getElementById("subtitles").innerHTML = "<p></p>";
}

EventDialogLine.prototype.is_finished = function() {
    return this.display_timer <= 0;
};

var EventPlaySound = function(text_description, duration) {
    this.text_description = text_description;
    this.duration = duration;
    this.display_timer = duration;
}

EventPlaySound.prototype.start = function() {
    document.getElementById("subtitles").innerHTML = "<p><span class='subtitle_sound_description'>*" + this.text_description + "*</span></p>";
}

EventPlaySound.prototype.update = function(ds) {
    if (this.display_timer > 0) {
        this.display_timer -= ds;
    }
};

EventPlaySound.prototype.stop = function() {
    document.getElementById("subtitles").innerHTML = "<p></p>";
}

EventPlaySound.prototype.is_finished = function() {
    return this.display_timer <= 0;
};

function Silence(duration) {
    return new EventPlaySound("", duration)
}



var EventsScript = function(events) {
    this.events = events;
    this.proximity = 100;
    this.awareness = 0;
    this.state = 0; // TODO
    this.started = false;

    this.current_event_id = 0;
};

EventsScript.prototype.update = function(ds) {
    // start (first call only)
    if (!this.started) {
        console.log("ah ah ah");
        this.started = true;
        this.events[0].start();
    }

    // update current event
    this.events[this.current_event_id].update(ds);

    // advance to next event if current one is finished
    if (this.events[this.current_event_id].is_finished()) {
        this.current_event_id += 1;
        if (this.current_event_id >= this.events.length) {
            // TODO handle end of script
            // for now reset it
            this.current_event_id = 0;
        }
        this.events[this.current_event_id].start();
    }

};

