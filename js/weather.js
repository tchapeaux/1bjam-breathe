var Weather = function() {
    this.snd_rain = new Howl({
        src: ['res/346642__inspectorj__rain-on-windows-interior-a.ogg'],
        loop: true
    });

    this.snd_thunder = new Howl({
        src: ['res/101934__juskiddink__dry-thunder2.ogg']
    });

    this.started = false;
    this.next_thunder_countdown = 0;
};

Weather.prototype.start = function() {
    new Easing(game.gui_overlay, "opacity", 0.4, 3, easing.easeInOutCirc);
    this.snd_rain.play();
    this.started = true;
    this.next_thunder_countdown = 3;
};

Weather.prototype.update = function(ds) {
    if (this.started) {
        this.next_thunder_countdown -= ds;

        if (this.next_thunder_countdown <= 0) {
            var id = this.snd_thunder.play();
            var volume = Math.random() * 0.5 + 0.3
            this.snd_thunder.volume(volume, id);
            this.next_thunder_countdown = 15 + Math.random() * 10;
        }
    }
};
