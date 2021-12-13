import Two from 'two.js';
import Rectangle from './components/rectangle';
import Circle from './components/circle';
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
    var domElement = two.renderer.domElement;

    // surface setup start
    var group = new Two.Group();
    var surface = Surface.create(domElement, group);

    // Make shape 1
    let rectangleParams = {two, size: 100, skin: {
        color: 'brown'
    }, position: {x: 100, y: 200 }};
    var rectangle = Rectangle.create(rectangleParams);
    var shape = rectangle.shape;
    surface.addShape(shape);
    
    // Make shape 2
    let rectangleParams1 = {two, size: 100, skin: {
        color: 'green'
    }, position: {x: 100, y: 400 }};
    var rectangle1 = Circle.create(rectangleParams1);
    var shape1 = rectangle1.shape;
    surface.addShape(shape1);
    
    // surface setup end
    two.add(group);
    two.play();
    // two.update();

    var shapEventInitialzed = false;

    two.bind("resize", function (e: Event) {
        /* console.log("RESIZE", e); */        
        
    }).bind("update", function (frameCount: any, timeDelta: any) {
        
        if (!shapEventInitialzed) {
            surface.initializeShapEvents();
            shapEventInitialzed = true;
        }
        
    });


    
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});