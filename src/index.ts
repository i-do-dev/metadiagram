import Two from 'two.js';

export interface TwoWindow extends Window {
    Two: Object;
}

declare let window: TwoWindow;
window.Two = Two;
require('two.js/extras/js/zui') ;

const init = () => {
    var params = {fullscreen: true};
    var elem = document.body;
    var two = new Two(params).appendTo(elem);
    
    var xCoord = two.width * 0.5;
    var yCoord = two.height * 0.5;
    var stage = new Two.Group();
    var size = 120;
    var shape = two.makeRoundedRectangle(xCoord, yCoord, size, size);
    shape.noStroke().fill = '#ccc';
    stage.add(shape);
    
    shape.fill = 'red';
    shape.position.set(two.width / 2, two.height / 2);
    two.add(stage);

    var rect = shape.getBoundingClientRect();

    var domElement = two.renderer.domElement;
    var zui = new Two.ZUI(stage);
    var mouse = new Two.Vector();
    var touches = {};
    var distance = 0;
    var dragging = false;

    zui.addLimits(0.1, 8);
    
    domElement.addEventListener('mousedown', mousedown, false);
    function mousedown(e: MouseEvent): void {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        let rect = shape.getBoundingClientRect();
        dragging = mouse.x > rect.left && mouse.x < rect.right
        && mouse.y > rect.top && mouse.y < rect.bottom;
        window.addEventListener('mousemove', mousemove, false);
        window.addEventListener('mouseup', mouseup, false);
    }

    function mousemove(e: MouseEvent): void {
        let dx = e.clientX - mouse.x, dy = e.clientY - mouse.y;
        if (dragging) {
            shape.position.x += dx / zui.scale;
            shape.position.y += dy / zui.scale
        } else {
            zui.translateSurface(dx, dy);
        }

        mouse.set(e.clientX, e.clientY);
    }

    function mouseup(e: MouseEvent) {
        window.removeEventListener('mousemove', mousemove, false);
        window.removeEventListener('mouseup', mouseup, false);
    }
    
    two.play();
    // two.update();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});