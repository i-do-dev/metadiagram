import Two from 'two.js';
import shape from './shape';

export default class Surface {
    private _el: any;
    private _zui: any;
    private _mouse: any;
    private _group: any;
    private _focusedShape: any;
    private _dragging: boolean = false;
    private _mouseDownHandler: any;
    private _mouseMoveHandler: any;
    private _mouseUpHandler: any;
    
    constructor(el: any, group: any) {
        let self = this;
        this._group = group;
        this._zui = new Two.ZUI(this._group);
        this._zui.addLimits(0.1, 8);
        this.mouse = new Two.Vector();
        this._el = el;
        this._mouseDownHandler = (e: MouseEvent) => { self.mousedown(e); }
        this.el.addEventListener('mousedown', this._mouseDownHandler , false);
    }

    public set mouse(mouse: any) { this._mouse = mouse};
    public get mouse(): any { return this._mouse; };
    public set dragging(dragging: boolean) { this._dragging = dragging};
    public get dragging(): boolean { return this._dragging; };
    public set focusedShape(focusedShape: any) { this._focusedShape = focusedShape; }
    public get focusedShape(): any { return this._focusedShape; };
    public get el(): any { return this._el; }

    public initializeShapEvents() {
        let self = this;
        this._group.children.forEach((child: any) => {
            child.renderer.elem.addEventListener('mousedown', (e: MouseEvent) => {
                console.log('I AM CLICKED === ', e.target);
                console.log('I AM EL === ', child);
                self.focusedShape = child;
            }, false);
        });
    }

    private mousedown(e: MouseEvent): void {
        let self = this;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        let rect = this.focusedShape.getBoundingClientRect();
        this.dragging = this.mouse.x > rect.left && this.mouse.x < rect.right
        && this.mouse.y > rect.top && this.mouse.y < rect.bottom;

        this._mouseMoveHandler = (e: MouseEvent) => { self.mousemove(e); }
        this._mouseUpHandler = (e: MouseEvent) => { self.mouseup(e); }
        window.addEventListener('mousemove', this._mouseMoveHandler , false);
        window.addEventListener('mouseup', this._mouseUpHandler, false);
        
    }

    private mousemove(e: MouseEvent): void {
        let dx = e.clientX - this.mouse.x, dy = e.clientY - this.mouse.y;
        if (this.dragging) {
            this.focusedShape.position.x += dx / this._zui.scale;
            this.focusedShape.position.y += dy / this._zui.scale;
        } else {
            this._zui.translateSurface(dx, dy);
        }

        this.mouse.set(e.clientX, e.clientY);
    }
    
    private mouseup(e: MouseEvent) {
        let self = this;
        window.removeEventListener('mousemove', self._mouseMoveHandler , false);
        window.removeEventListener('mouseup',  self._mouseUpHandler , false);
    }

    public addShape(shape: any) {
        this._group.add(shape);
    }

    static create(el: any, group: any): any {
        return new Surface(el, group);
    }
}