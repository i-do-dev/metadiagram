import Shape from './shape';

export default class Circle extends Shape {

    constructor(shape: any, params: any) {
        super(shape, params);
    }

    static create (params: any) {
        return new Circle(params.two.makeCircle(0, 0, params.size, params.size), params);
    }
}