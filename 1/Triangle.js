function normal(x1,y1,z1,x2,y2,z2,x3,y3,z3)
{
    var u = [x2-x1, y2-y1, z2-z1], v = [x3-x2, y3-y2, z3-z2];

    var n = [1,0,0];

    n[1] = ((v[2]*u[0]/u[2] - v[0])/v[1])/(1 - u[1]*v[2]/u[2]/v[1]);
    n[2] = (-u[0] - u[1]*n[1])/u[2];

    return n;
}

class Triangle extends Primitive
{
	constructor(scene, x1, y1, z1, x2, y2, z2, x3 , y3, z3) 
	{
        super(scene);
        
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;
        
        this.initBuffers();
        
        super.setBuffers(this.vertices, this.indices);
	};

	initBuffers() 
	{
        this.vertices = [
            this.x1, this.y1, this.z1,
            this.x2, this.y2, this.z2,
            this.x3, this.y3, this.z3
            ];

        this.indices = [
            0,1,2
            ];
            
        var foo = normal(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3);
        this.normals = [
            foo[0], foo[1], foo[2],
            foo[0], foo[1], foo[2],
            foo[0], foo[1], foo[2],
            foo[0], foo[1], foo[2]
            ];
	};
};
