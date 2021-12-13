import {IVector} from '../interface';

export default abstract class Shape {
    private _position: IVector;
    private _shape: any;
    private _skin: any;
    
    constructor(shape: any = null, params: any) {
        this.shape = shape;
        this.skin = params.skin;
        let x = params.position.x;
        let y = params.position.y;
        this.position = {x, y};
    }
    
    public get position(): IVector {
        return this._position
    };

    public set position(value: IVector) {
        if (this.shape) {
            this.shape.position.set(value.x, value.y);
        }
        this._position = value; 
    }

    public set skin(value: any) { 
        if (this.shape) {
            this.shape.noStroke().fill = value.color;
        }
        this._skin = value; 
    }
    public get skin() { return this._skin; }
    
    public get shape(): any { return this._shape; };
    public set shape(value: any) { this._shape = value;}
}