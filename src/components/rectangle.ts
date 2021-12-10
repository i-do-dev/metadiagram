import Shape from './shape';

export default class Rectangle extends Shape {

    constructor(shape: any, params: any) {
        super(shape, params);
    }

    static create (params: any) {
        return new Rectangle(params.two.makeRoundedRectangle(0, 0, params.size, params.size), params);
    }
}