class Cylinder2 extends Primitive
{
    constructor(scene, base, top, height, slices , stacks)
    {
        super(scene);

        this.base = base;
        this.top = top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    };

    initBuffers()
    {
        this.degree = 2;
        this.controlPoints = [];

        var r = this.base;
        var unity = r*Math.tan(30 * Math.PI/180);
        var h = Math.sqrt(3)* unity;

        //Part z = 0
        this.controlPoints.push([-unity,r,0]);
        this.controlPoints.push([0,r,0]);
        this.controlPoints.push([unity,r,0]);
        this.controlPoints.push([-r,0,0]);
        this.controlPoints.push([r,0,0]);
        this.controlPoints.push([0,-h/2,0]);

        //Part z = 1
        this.controlPoints.push([-unity,r,1]);
        this.controlPoints.push([0,r,1]);
        this.controlPoints.push([unity,r,1]);
        this.controlPoints.push([-r,0,1]);
        this.controlPoints.push([r,0,1]);
        this.controlPoints.push([0,-h/2,1]);        

        var f = new oo(this); 
        this.nurbsSurface = new CGFnurbsSurface(this.degree, this.degree, this.controlPoints);
        this.nurbsObject = new CGFnurbsObject(this.scene, this.slices, this.stacks, f);

       
    };

    

    display()
    {
        this.nurbsObject.display();
    }

};


class oo
{

    constructor(primitive)
    {
        this.primitive = primitive;
    }

    getPoint(v, u)
    {
        let h = this.primitive.height*this.primitive.base/(this.primitive.base-this.primitive.top);
        let coords = [(h-u*this.primitive.height)/h*this.primitive.base*Math.cos(v*2*Math.PI), (h-u*this.primitive.height)/h*this.primitive.base*Math.sin(v*2*Math.PI), u*this.primitive.height];
        return coords;
    }
 
}