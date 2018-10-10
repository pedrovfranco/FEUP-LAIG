class Rectangle extends CGFobject
{
	constructor(scene, x1, y1, x2, y2, nDivs = 10) 
	{
        super(scene);
        
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.nDivs = nDivs;
        
		this.initBuffers();
	};

	initBuffers() 
	{
        var incrementX = this.nDivs / (this.x2-this.x1);
        var incrementY = this.nDivs / (this.y2-this.y1);

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (var j = 0; j <= this.nDivs; j++) //x coordinate increment
        {
            for (var i = 0; i <= this.nDivs; i++) //y coordinate increment
            {
                this.vertices.push(this.x1 + i/incrementX, this.y1 + j/incrementY, 0);

                if (i != this.nDivs && j != this.nDivs)
                {
                    this.indices.push(j * (this.nDivs+1) + i%(this.nDivs+1), j * (this.nDivs+1) + (i+1)%(this.nDivs+1), (j+1) * (this.nDivs+1) + (i+1)%(this.nDivs+1));
                    this.indices.push(j * (this.nDivs+1) + i%(this.nDivs+1), (j+1) * (this.nDivs+1) + (i+1)%(this.nDivs+1), (j+1) * (this.nDivs+1) + i%(this.nDivs+1));
                }

                this.normals.push(0, 0, 1);
                this.texCoords.push(i/this.nDivs, 1 - j/this.nDivs);
            }
        }
        
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
