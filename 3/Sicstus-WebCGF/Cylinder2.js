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

        this.degree = 2;
        this.controlPoints = [];

        var rb = this.base;
        var rt = this.top;

        var P0 = [-rb*2/Math.sqrt(2), 0, 0, 1];
        var P1 = [-rb*2/Math.sqrt(2), rb*2/Math.sqrt(2), 0, Math.sqrt(2)/2];
        var P2 = [0, rb*2/Math.sqrt(2), 0, 1];
        var P3 = [rb*2/Math.sqrt(2), rb*2/Math.sqrt(2), 0, Math.sqrt(2)/2];
        var P4 = [rb*2/Math.sqrt(2), 0, 0, 1];
        var P5 = [rb*2/Math.sqrt(2), -rb*2/Math.sqrt(2), 0, Math.sqrt(2)/2];
        var P6 = [0, -rb*2/Math.sqrt(2), 0, 1];
        var P7 = [-rb*2/Math.sqrt(2), -rb*2/Math.sqrt(2), 0, Math.sqrt(2)/2];
        var P8 = [-rb*2/Math.sqrt(2), 0, 0, 1];

        var P00 = [-rt*2/Math.sqrt(2), 0, this.height, 1];
        var P11 = [-rt*2/Math.sqrt(2), rt*2/Math.sqrt(2), this.height, Math.sqrt(2)/2];
        var P22 = [0, rt*2/Math.sqrt(2), this.height, 1];
        var P33 = [rt*2/Math.sqrt(2), rt*2/Math.sqrt(2), this.height, Math.sqrt(2)/2];
        var P44 = [rt*2/Math.sqrt(2), 0, this.height, 1];
        var P55 = [rt*2/Math.sqrt(2), -rt*2/Math.sqrt(2), this.height, Math.sqrt(2)/2];
        var P66 = [0, -rt*2/Math.sqrt(2), this.height, 1];
        var P77 = [-rt*2/Math.sqrt(2), -rt*2/Math.sqrt(2), this.height, Math.sqrt(2)/2];
        var P88 = [-rt*2/Math.sqrt(2), 0, this.height, 1];


        this.controlPoints = [
                               [
                                 P0,P1,P2,P3,P4,P5,P6,P7,P8   
                               ],
                               [
                                 P00,P11,P22,P33,P44,P55,P66,P77,P88
                               ]

                             ];

      //   console.log(this.controlPoints);
         this.nurbsSurface = new CGFnurbsSurface(1, 8, this.controlPoints);
         this.nurbsObject = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.nurbsSurface);
    };

    

    display()
    {
        this.nurbsObject.display();
    };

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