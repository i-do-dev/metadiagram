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
    
    let rectangleParams = {two, size: 100, skin: {
        color: 'brown'
    }};
    
    var rectangle = Rectangle.create(rectangleParams);
    var shape = rectangle.shape;
    
    group.add(shape);
    
    two.add(group);

    var domElement = two.renderer.domElement;
    Surface.create(domElement, shape, group);
    
    two.play();
    // two.update();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});