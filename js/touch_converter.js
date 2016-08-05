// touch screen functionality converter : translates "touch" events to Button press
function convertTouchEvent(ev) {
    var touch, ev_type, mouse_ev;
    touch = ev.targetTouches[0];
    ev.preventDefault();
    switch (ev.type) {
    case 'touchstart':
        keyDown({keyCode: 66});
        break;
    case 'touchend':
        // Make sure only one finger is lifted from the target
        // TODO AND CHECK: check that targetTouches is empty?
        if (ev.changedTouches.length != 1) {
            return;
        }
        keyUp({keyCode: 66});
        break;
    default:
        return;
    }
};

function touch2mouse(el) {
    el.addEventListener("touchstart", convertTouchEvent);
    el.addEventListener("touchend", convertTouchEvent);
};
