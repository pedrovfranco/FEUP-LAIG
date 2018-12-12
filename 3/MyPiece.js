class MyPiece extends Primitive
{
	constructor(scene)
	{
        super(scene);

        this.height = 0.1;
        this.slices = 15;
        this.stacks = 3;
                
        this.initBuffers();
	};

	initBuffers()
	{
        this.cylinder = new Cylinder(this.scene, 0.5, 0.5, this.height, this.slices, this.stacks);

        this.whiteAppearence = new CGFappearance(this.scene);
		this.whiteAppearence.loadTexture("scenes/images/white.png");
		this.whiteAppearence.setAmbient(1.0,1.0,1.0,1);
		this.whiteAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.whiteAppearence.setSpecular(1.0,1.0,1.0,1);
        this.whiteAppearence.setShininess(120);
        
        this.blackAppearence = new CGFappearance(this.scene);
		this.blackAppearence.loadTexture("scenes/images/black.jpg");
		this.blackAppearence.setAmbient(1.0,1.0,1.0,1);
		this.blackAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.blackAppearence.setSpecular(1.0,1.0,1.0,1);
		this.blackAppearence.setShininess(120);
	};
   

    update(currTime, component)
    {

    }
    
	display()
	{
        this.scene.pushMatrix();

            this.scene.translate(0, this.height, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);

            this.cylinder.display();

        this.scene.popMatrix();
	};
};