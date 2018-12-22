class MyBoard extends Primitive
{
	constructor(scene, depth)
	{
        super(scene);
        
        this.board = getPrologRequest("kl", getResponseArray);
        this.height = this.board.length;
        this.width = this.board[0].length;
        this.depth = depth || 0.5;

        this.animation = new Animation(this.scene);
        
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

        this.blueAppearence = new CGFappearance(this.scene);
		this.blueAppearence.loadTexture("scenes/images/blue.png");
		this.blueAppearence.setAmbient(1.0,1.0,1.0,1);
		this.blueAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.blueAppearence.setSpecular(1.0,1.0,1.0,1);
        this.blueAppearence.setShininess(120);
        
        this.piece = new MyPiece(this.scene);
	};
   

    update(currTime, component)
    {
        this.animation.update(currTime);

        if (this.animation.sumTime > 1 && this.animation.flag == undefined)
        {
            this.board = getPrologRequest("move(1,1,3,0,5)", getResponseArray);
            console.log(this.board);
            
            this.height = this.board.length;
        	this.width = this.board[0].length;
            this.animation.flag = true;
        }
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
                        this.scene.translate(coords[0], 0, coords[2]);
                        // console.log("position = " + coords[0] + " " + coords[1] + " " + coords[2]);
                        
                        if ((i+j)%2 == 0)
                            this.whiteAppearence.apply();
                        else
                            this.blackAppearence.apply();

                        this.plane.display();

                        let colour = this.board[j][i][1];

                        if (colour == "w")
                        {
                            this.whiteAppearence.apply();
                        }
                        else
                        {
                            this.blueAppearence.apply();
                        }

                        for (let k = 0; k < this.board[j][i][0]; k++)
                        {
                            this.scene.pushMatrix();

                                this.scene.translate(0, k*(this.piece.height+0.005), 0);

                                this.piece.display();

                            this.scene.popMatrix();
                        }
                    
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


            // this.scene.pushMatrix();
            //     this.whiteAppearence.apply();
    
            //     this.scene.translate(0, 0, 0.5);

            //     for (let i = 0; i < 20; i++)
            //     {  
            //         this.scene.pushMatrix();

            //             this.scene.translate(0, i*(this.piece.height+0.003), 0);

            //             this.piece.display();

            //         this.scene.popMatrix();
            //     }
                

            // this.scene.popMatrix();

            // this.scene.pushMatrix();
            //     this.blueAppearence.apply();

            //     this.scene.translate(0, 0, -0.5);

            //     for (let i = 0; i < 20; i++)
            //     {  
            //         this.scene.pushMatrix();

            //             this.scene.translate(0, i*(this.piece.height+0.003), 0);

            //             this.piece.display();

            //         this.scene.popMatrix();
            //     }

            // this.scene.popMatrix();

        this.scene.popMatrix();
	};
};