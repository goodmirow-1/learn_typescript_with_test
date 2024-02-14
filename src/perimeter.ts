export interface Shape{
    Area(): number
}

export class Rectangle implements Shape{
    width: number;
    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

    public Area() : number{
        return (this.width * this.height);
    }
}

export class Circle implements Shape{
    radius: number;

    constructor(radius: number){
        this.radius = radius;
    }

    public Area(): number{
        return Math.PI * this.radius * this.radius;
    }
}

export class AreaTest{
    shape: Shape;
    want: number;

    constructor(shape: Shape, want: number){
        this.shape = shape;
        this.want = want;
    }
}