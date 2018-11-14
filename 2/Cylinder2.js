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

        this.texCoords = [];

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

        this.nurbsSurface = new CGFnurbsSurface(this.degree, this.degree, this.controlPoints);
        this.nurbsObject = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.nurbsSurface);

       
    };

    display()
    {
        this.nurbsObject.display();
    }

};