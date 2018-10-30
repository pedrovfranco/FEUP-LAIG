function normalizeVector(n)
{
    var size = 0;

    for (var i = 0; i < n.length; i++)
    {
        size += n[i]*n[i];
    }

    size = Math.sqrt(size);

    for (var i = 0; i < n.length; i++)
    {
        n[i] /= size;
    }

    return n;
}

function normal(x1,y1,z1,x2,y2,z2,x3,y3,z3)
{
    var u = [x2-x1, y2-y1, z2-z1], v = [x3-x2, y3-y2, z3-z2];

	var n = [
		u[1]*v[2] - u[2]*u[1],
		u[2]*v[0] - u[0]*v[2],
		u[0]*v[1] - u[1]*v[0]
	];

    var n = normalizeVector(n);

    return n;
}

/*
 a = x1x3
 b = x1x2
 c = x2x3
*/

function distance(x1,y1,z1,x2,y2,z2,x3,y3,z3)
{
    var distances = [];
    
    var distanceX1X3 = Math.sqrt( Math.pow((x1-x3),2) + Math.pow((y1-y3),2) + Math.pow((z1-z3),2));
    distances.push(distanceX1X3); // a

    var distanceX1X2 = Math.sqrt( Math.pow((x2-x1),2) + Math.pow((y2-y1),2) + Math.pow((z2-z1),2));
    distances.push(distanceX1X2); // b
        
    var distanceX2X3 = Math.sqrt( Math.pow((x3-x2),2) + Math.pow((y3-y2),2) + Math.pow((z3-z2),2));
    distances.push(distanceX2X3); // c

    return distances;
}

function innerAngle(sides)
{
    var angles = [];

    var angle_ba;
    angle_ba = Math.acos( (Math.pow(sides[0],2) + Math.pow(sides[1],2) - Math.pow(sides[2],2) ) / ( 2*sides[0]*sides[1] ) );
    angles.push(angle_ba);


    var angle_bc;
    angle_bc = Math.acos( (-Math.pow(sides[0],2) + Math.pow(sides[1],2) + Math.pow(sides[2],2) ) / ( 2*sides[1]*sides[2]));
    angles.push(angle_bc);


    var angle_ac;
    angle_ac = Math.acos( (Math.pow(sides[0],2) - Math.pow(sides[1],2) + Math.pow(sides[2],2) ) / ( 2*sides[0]*sides[2]));
    angles.push(angle_ac);

    return angles;
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
        
        super.setBuffers(this.vertices, this.indices, this.normals, this.texCoords);
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
            foo[0], foo[1], foo[2]
            ];

        var sides = distance(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3);
        var angles = innerAngle(sides);

        this.texCoords = [
            sides[2]- sides[0]*Math.cos(angles[2]), 1-sides[0]*Math.sin(angles[2]),
            0,1,
            1,1
        ];     

	};
};
