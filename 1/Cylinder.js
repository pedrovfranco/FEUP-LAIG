class Cylinder extends CGFobject
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
        this.vertices = [
            x1, y1, 0,
            x2, y1, 0,
            x1, y2, 0,
            x2, y2, 0
            ];

    this.indices = [
            0, 1, 2, 
            3, 2, 0
        ];
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
