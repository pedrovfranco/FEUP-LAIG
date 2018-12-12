class Cylinder extends Primitive
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

        super.setBuffers(this.vertices, this.indices, this.normals, this.texCoords);
    };

    initBuffers()
    {
        this.vertices = [];
		this.indices = [];
		this.normals = [];
        this.texCoords = [];
        
        var alpha = 2*Math.PI/this.slices;
        var radius;
        var P1, a, b, normal;

		for (var j = 0; j <= this.stacks; j++)
		{
			for (var i = 0; i < this.slices; i++)
			{
                radius = this.base + (this.top - this.base)*(j/this.stacks);

                P1 = [this.base*Math.cos(alpha*i), this.base*Math.sin(alpha*i), 0];
                a = this.normalize(this.subtract([this.top*Math.cos(alpha*i), this.top*Math.sin(alpha*i), this.height], P1));
                b = [Math.sin(alpha*i), -Math.cos(alpha*i), 0];
                normal = this.crossProduct(a,b);

				this.vertices.push(radius*Math.cos(alpha*i), radius*Math.sin(alpha*i), this.height*j/this.stacks);

                if (j != this.stacks)
                {
                    this.indices.push(j * (this.slices+1) + i, j * (this.slices+1) + (i+1), (j+1) * (this.slices+1) + (i+1));
                    this.indices.push(j * (this.slices+1) + i, (j+1) * (this.slices+1) + (i+1), (j+1) * (this.slices+1) + i);
                }

				this.normals.push(normal[0], normal[1], normal[2]);

				this.texCoords.push(i/this.slices, 1 - j/this.stacks);
            }

            radius = this.base + (this.top - this.base)*(j/this.stacks);

            P1 = [this.base, 0, 0];
            a = this.normalize(this.subtract([this.top, 0, this.height], P1));
            b = [0, -1, 0];
            normal = this.crossProduct(a,b);

            if (normal[0] == NaN || normal[1] == NaN || normal[2] == NaN)
                var a = 0;
            
            this.vertices.push(radius, 0, this.height*j/this.stacks);    // Adds another vertice equal to the first of each "i" loop to be able to bind the texture at the last rectangle
            this.normals.push(normal[0], normal[1], normal[2]);
			this.texCoords.push(1, 1 - j/this.stacks);
        }

        // Base

        var verticesLength = this.vertices.length/3;
        radius = this.base;

        for (var i = 0; i < this.slices; i++)
        {
            this.vertices.push(radius*Math.cos(alpha*i), radius*Math.sin(alpha*i), 0);

            this.indices.push(verticesLength + i%this.slices);
            this.indices.push(verticesLength + this.slices);
            this.indices.push(verticesLength + (i + 1)%this.slices);

            this.normals.push(0, 0, -1);

            this.texCoords.push((Math.cos(alpha*i) + 1)/2, (-Math.sin(alpha*i) + 1)/2);
        }

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        this.texCoords.push(1/2, 1/2);

        // Top

        verticesLength = this.vertices.length/3;
        radius = this.top;

        for (var i = 0; i < this.slices; i++)
        {
            this.vertices.push(radius*Math.cos(alpha*i), radius*Math.sin(alpha*i), this.height);

            this.indices.push(verticesLength + i%this.slices);
            this.indices.push(verticesLength + (i + 1)%this.slices);
            this.indices.push(verticesLength + this.slices);

            this.normals.push(0, 0, 1);

            this.texCoords.push((Math.cos(alpha*i) + 1)/2, (-Math.sin(alpha*i) + 1)/2);
        }

        this.vertices.push(0, 0, this.height);
        this.normals.push(0, 0, 1);
        this.texCoords.push(1/2, 1/2);
    };

    crossProduct(a,b)
    {
        var x = a[1]*b[2] - a[2]*b[1];
        var y = a[2]*b[0] - a[0]*b[2];
        var z = a[0]*b[1] - a[1]*b[0];

        return [x,y,z];
    }

    subtract(a,b)
    {
        var x = a[0] - b[0];
        var y = a[1] - b[1];
        var z = a[2] - b[2];

        return [x,y,z];
    }

    normalize(a)
    {
        var d = this.length(a);

        return [a[0]/d, a[1]/d, a[2]/d];
    }

    length(a)
    {
        return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
    }
};
