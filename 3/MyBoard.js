class MyBoard extends Primitive
{
	constructor(scene, width, height, depth)
	{
        super(scene);
        
        this.width = width;
        this.height = height;
        this.depth = depth || 0.5;
        
        this.initBuffers();
	};

	initBuffers()
	{
        this.plane = new Plane(this.scene, 10, 10);

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
        
        this.piece = new MyPiece(this.scene);
	};
   

    update(currTime, component)
    {

    }
    
	display()
	{
        this.scene.pushMatrix();
          
            let coords = [];

            for (let i = 0; i < this.width; i++)
            {
                for (let j = 0; j < this.height; j++)
                {
                    this.scene.pushMatrix();

                        coords = [(1-this.height)/2 + j, 0, (1-this.width)/2 + i];
                        this.scene.translate(coords[0], coords[1], coords[2]);
                        // console.log("position = " + coords[0] + " " + coords[1] + " " + coords[2]);
                        
                        if ((i+j)%2 == 0)
                            this.whiteAppearence.apply();
                        else
                            this.blackAppearence.apply();

                        this.plane.display();
                    
                    this.scene.popMatrix();

                }
            }

            this.scene.pushMatrix();
              
                this.scene.translate(this.height/2, 0, 0);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.scene.scale(this.depth, 1, this.width);
                this.scene.translate(0.5, 0, 0);

                this.whiteAppearence.apply();
                this.plane.display();

            this.scene.popMatrix();

            this.scene.pushMatrix();

                this.scene.rotate(Math.PI, 0, 1, 0);
                this.scene.translate(this.height/2, 0, 0);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.scene.scale(this.depth, 1, this.width);
                this.scene.translate(0.5, 0, 0);

                this.whiteAppearence.apply();
                this.plane.display();

            this.scene.popMatrix();

            this.scene.pushMatrix();
              
                this.scene.translate(0, 0, this.width/2);
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.scene.scale(this.depth, 1, this.height);
                this.scene.translate(0.5, 0, 0);

                this.whiteAppearence.apply();
                this.plane.display();

            this.scene.popMatrix();

            this.scene.pushMatrix();
              
                this.scene.rotate(Math.PI, 0, 1, 0);
                this.scene.translate(0, 0, this.width/2);
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.scene.rotate(-Math.PI/2, 0, 0, 1);
                this.scene.scale(this.depth, 1, this.height);
                this.scene.translate(0.5, 0, 0);

                this.whiteAppearence.apply();
                this.plane.display();

            this.scene.popMatrix();

            this.scene.pushMatrix();
              
                this.scene.translate(0, -this.depth, 0);
                this.scene.rotate(Math.PI, 0, 0, 1);
                this.scene.scale(this.height, 1, this.width);

                this.whiteAppearence.apply();
                this.plane.display();

            this.scene.popMatrix();


            this.scene.pushMatrix();

                this.scene.translate(0, 0, 0.5);

                this.whiteAppearence.apply();
                this.piece.display();

            this.scene.popMatrix();

            this.scene.pushMatrix();

                this.scene.translate(0, 0, -0.5);

                this.blackAppearence.apply();
                this.piece.display();

            this.scene.popMatrix();

        this.scene.popMatrix();
	};
};