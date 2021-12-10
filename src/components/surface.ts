import Two from 'two.js';

export default class Surface {
    private _el: any;
    private _shape: any;
    private _zui: any;
    private _mouse: any;
    private _dragging: boolean = false;

    constructor(el: any, shape: any, group: any) {
        require('two.js/extras/js/zui') ;
        this.zui = new Two.ZUI(group);
        this.zui.addLimits(0.1, 8);
        this.mouse = new Two.Vector();
        this.el = el;
        this.shape = shape;
        this.el.addEventListener('mousedown', this.mousedown.bind(this), false);
    }

    public set el(el: any) { this._el = el; }
    public get el(): any { return this._el; }

    public set shape(shape: any) { this._shape = shape; };
    public get shape(): any { return this._shape; }

    public set zui(zui: any) { this._zui = zui};
    public get zui(): any { return this._zui; };
    
    public set mouse(mouse: any) { this._mouse = mouse};
    public get mouse(): any { return this._mouse; };
    
    public set dragging(dragging: any) { this._dragging = dragging};
    public get dragging(): any { return this._dragging; };

    
    public mousedown(e: MouseEvent): void {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        let rect = this.shape.getBoundingClientRect();
        this.dragging = this.mouse.x > rect.left && this.mouse.x < rect.right
        && this.mouse.y > rect.top && this.mouse.y < rect.bottom;
        window.addEventListener('mousemove', this.mousemove.bind(this), false);
        window.addEventListener('mouseup', this.mouseup.bind(this), false);
    }

    public mousemove(e: MouseEvent): void {
        let dx = e.clientX - this.mouse.x, dy = e.clientY - this.mouse.y;
        if (this.dragging) {
            this.shape.position.x += dx / this.zui.scale;
            this.shape.position.y += dy / this.zui.scale;
        } else {
            this.zui.translateSurface(dx, dy);
        }

        this.mouse.set(e.clientX, e.clientY);
    }

    public mouseup(e: MouseEvent) {
        window.removeEventListener('mousemove',this.mousemove.bind(this), false);
        window.removeEventListener('mouseup', this.mouseup.bind(this), false);
    }



    static create(el: any, shape: any, group: any): any {
        return new Surface(el, shape, group);
    }
}