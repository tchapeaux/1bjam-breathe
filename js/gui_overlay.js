"use strict";

var GuiOverlay = function() {
    this.canvas = gui_overlay;
    this.fillColor = "black";
    this.opacity = 0;
};

GuiOverlay.prototype.update = function(ds) {
    
};

GuiOverlay.prototype.draw = function() {
    var ctx = this.canvas.getContext("2d");
    var _w = this.canvas.width;
    var _h = this.canvas.height;
    ctx.clearRect(0, 0, _w, _h);
    ctx.beginPath();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.fillColor;
    ctx.rect(0, 0, _w, _h);
    ctx.fill();
    ctx.globalAlpha = 1;
};
