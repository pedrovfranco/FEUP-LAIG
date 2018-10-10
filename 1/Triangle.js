function swap(a, b)
{
    var temp = a;
    a = b;
    b = temp;
}

function solve_linear(matrix) {
	var temp;
	if (matrix[0][0] == 0)
		for(var i = 0; i < matrix.length; i++)
			if (matrix[i][0] != 0)
				swap(matrix[0], matrix[i]);

	for(var i = 0; i < matrix.length - 1; i++)
	{
		for(var j = i + 1; j < matrix.length; j++)
		{
			temp = matrix[j][i] / matrix[i][i];

			for(var k = i; k < matrix[i].length; k++)
				matrix[j][k] -= matrix[i][k]*temp;

		}

	}

	for(var i = 0; i < matrix.length; i++)
	{
		temp = matrix[i][i];

		for(var k = 0; k < matrix[i].length; k++)
			matrix[i][k] /= temp;

	}

	var res = Array.from(matrix[0].keys());
	temp = 0;
	for(var i = matrix.length - 1; i >= 0; i--)
	{
		temp = matrix[i][matrix[i].length-1];
		for(var j = i + 1; j < matrix[i].length - 1; j++)
		{
			temp -= matrix[i][j] * res[j];
		}
		res[i] = temp;
	}

	return res;
}

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

    var n = normalizeVector(solve_linear([u,v]));

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
            foo[0], foo[1], foo[2]
            ];
	};
};
