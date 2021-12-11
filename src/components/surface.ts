import Two from 'two.js';

export default class Surface {
    private _el: any;
    private _shape: any;
    private _zui: any;
    private _mouse: any;
    private _dragging: boolean = false;
    private _mouseDownHandler: any;
    private _mouseMoveHandler: any;
    private _mouseUpHandler: any;
    
    constructor(el: any, shape: any, group: any) {
        let self = this;
        this._zui = new Two.ZUI(group);
        this._zui.addLimits(0.1, 8);
        this.mouse = new Two.Vector();
        this._el = el;
        this._shape = shape;
        this._mouseDownHandler = (e: MouseEvent) => { self.mousedown(e); }
        this.el.addEventListener('mousedown', this._mouseDownHandler , false);
        
    }

    public get el(): any { return this._el; }
    public get shape(): any { return this._shape; }

    public set mouse(mouse: any) { this._mouse = mouse};
    public get mouse(): any { return this._mouse; };
    
    public set dragging(dragging: any) { this._dragging = dragging};
    public get dragging(): any { return this._dragging; };

    
    
    public mousedown(e: MouseEvent): void {
        let self = this;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        let rect = this.shape.getBoundingClientRect();
        this.dragging = this.mouse.x > rect.left && this.mouse.x < rect.right
        && this.mouse.y > rect.top && this.mouse.y < rect.bottom;

        this._mouseMoveHandler = (e: MouseEvent) => { self.mousemove(e); }
        this._mouseUpHandler = (e: MouseEvent) => { self.mouseup(e); }
        window.addEventListener('mousemove', this._mouseMoveHandler , false);
        window.addEventListener('mouseup', this._mouseUpHandler, false);
    }

    public mousemove(e: MouseEvent): void {
        let dx = e.clientX - this.mouse.x, dy = e.clientY - this.mouse.y;
        if (this.dragging) {
            this.shape.position.x += dx / this._zui.scale;
            this.shape.position.y += dy / this._zui.scale;
        } else {
            this._zui.translateSurface(dx, dy);
        }

        this.mouse.set(e.clientX, e.clientY);
    }

    public mouseup(e: MouseEvent) {
        let self = this;
        window.removeEventListener('mousemove', self._mouseMoveHandler , false);
        window.removeEventListener('mouseup',  self._mouseUpHandler , false);
    }

    static create(el: any, shape: any, group: any): any {
        return new Surface(el, shape, group);
    }
}