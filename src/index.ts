import Two from 'two.js';
import Rectangle from './components/rectangle';
import Surface from './components/surface';

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
    
    var group = new Two.Group();
    var size = 100;
    let rectangleParams = {two, size: 100, skin: {
        color: 'brown'
    }};
    var rectangle = Rectangle.create(rectangleParams);
    var shape = rectangle.shape;
    //var shape = two.makeRoundedRectangle(0, 0, size, size);
    
    
    //shape.noStroke().fill = '#ccc';
    group.add(shape);
    
    //shape.fill = 'red';
    //shape.position.set(two.width / 2, two.height / 2);
    two.add(group);

    //var rect = shape.getBoundingClientRect();

    var domElement = two.renderer.domElement;
    Surface.create(domElement, shape, group);
    
    /* 
    var zui = new Two.ZUI(group);
    
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
            shape.position.y += dy / zui.scale;
        } else {
            zui.translateSurface(dx, dy);
        }

        mouse.set(e.clientX, e.clientY);
    }

    function mouseup(e: MouseEvent) {
        window.removeEventListener('mousemove', mousemove, false);
        window.removeEventListener('mouseup', mouseup, false);
    }
    */
    
    two.play();
    // two.update();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});