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

		for (var j = 0; j <= this.stacks; j++)
		{
			for (var i = 0; i < this.slices; i++)
			{
				this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), j/this.stacks);

                if (j != this.stacks)
                {
                    this.indices.push(j * (this.slices+1) + i, j * (this.slices+1) + (i+1), (j+1) * (this.slices+1) + (i+1));
                    this.indices.push(j * (this.slices+1) + i, (j+1) * (this.slices+1) + (i+1), (j+1) * (this.slices+1) + i);
                }

				this.normals.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);

				this.texCoords.push(i/this.slices, 1 - j/this.stacks);
            }
            
            this.vertices.push(1, 0, j/this.stacks);    // Adds another vertice equal to the first of each "i" loop to be able to bind the texture at the last rectangle
            this.normals.push(1, 0, 0);
			this.texCoords.push(1, 1 - j/this.stacks);
        }

        var verticesLength = this.vertices.length/3;
        
        for (var i = 0; i < this.slices; i++)
        {
            this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 1);

            this.indices.push(verticesLength + i%this.slices);
            this.indices.push(verticesLength + (i + 1)%this.slices);
            this.indices.push(verticesLength + this.slices);

            this.normals.push(0, 0, 1);

            this.texCoords.push((Math.cos(alpha*i) + 1)/2, (-Math.sin(alpha*i) + 1)/2);
        }

        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        this.texCoords.push(1/2, 1/2);

        verticesLength = this.vertices.length/3;

        for (var i = 0; i < this.slices; i++)
        {
            this.vertices.push(Math.cos(alpha*i), Math.sin(alpha*i), 0);        // A

            this.indices.push(verticesLength + i%this.slices);
            this.indices.push(verticesLength + this.slices);
            this.indices.push(verticesLength + (i + 1)%this.slices);

            this.normals.push(0, 0, -1);

            this.texCoords.push((Math.cos(alpha*i) + 1)/2, (-Math.sin(alpha*i) + 1)/2);
        }

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        this.texCoords.push(1/2, 1/2);

        this.primitiveType=this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};