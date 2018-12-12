class Rectangle extends Primitive
{
	constructor(scene, x1, y1, x2, y2) 
	{
        super(scene);
        
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        
		this.initBuffers();

        super.setBuffers(this.vertices, this.indices, this.normals, this.texCoords);
	}

	initBuffers() 
	{
        var deltaX = this.x2 - this.x1;
        var deltaY = this.y2 - this.y1;

        //var deltaX = 2;
        //var deltaY = 2;

        this.vertices = [
            this.x1, this.y1, 0,
            this.x2, this.y1, 0,
            this.x1, this.y2, 0,
            this.x2, this.y2, 0
        ];

        this.indices = [
            0, 1, 3,
            0, 3, 2
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.texCoords = [
            0, deltaY,
            deltaX, deltaY,
            0, 0,
            deltaX, 0
        ];
	}
}
