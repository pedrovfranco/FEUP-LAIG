class Vehicle extends CGFobject
{

	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};


	//move(deltaTime)

	initBuffers()
	{
		this.cylinder2 = new Cylinder2(this.scene, 1, 1, 1, 30, 30);

		this.controlPointsPatch = [ [-1.5,-1.5, 0], [-1.5,1.5,0], [0,-1.5,1.1], [0,1.5,1.1], [1.5,-1.5,0], [1.5,1.5,0]];
		this.controlPointsPatch2 = [ [1,0,0], [0,0,0], [1,0,1], [0,0,1]];

		this.patch = new Patch(this.scene, 3, 2, 5, 5, this.controlPointsPatch);
  		this.patch2 = new Patch(this.scene, 2, 2, 2, 2, this.controlPointsPatch2);

  		this.red = new CGFappearance(this.scene);
		this.red.loadTexture("../scene/images/red.png");
		this.red.setAmbient(1.0,1.0,1.0,1);
		this.red.setDiffuse(1.0,1.0,1.0,1);
		this.red.setSpecular(1.0,1.0,1.0,1);
		this.red.setShininess(120);

		//this.black
	};

	display()
	{

		this.scene.translate(5, 0, 0);

		this.scene.pushMatrix();  //up part
		this.scene.translate(0, 7, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.red.apply();
		this.patch.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //down part
		this.scene.translate(0, 7, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.red.apply();
		this.patch.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // side left
		this.scene.translate(-1.5, 7, 1.45);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.scale(0.1, 0.8, 3.3);
	//	this.black.apply();
		this.cylinder2.display();
		this.scene.popMatrix();


		this.scene.pushMatrix(); // side right
		this.scene.translate(-1.5, 7, -1.45);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.scale(0.1, 0.8, 3.3);
	//	this.black.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //crossing connection
		this.scene.translate(0, 7, -2);
		this.scene.scale(0.2, 0.2, 4);
		//this.iron.apply();
		this.cylinder2.display();
		this.scene.pop();

		this.scene.pushMatrix(); //left connection
		this.scene.translate(2.25, 7, 2);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.2, 0.2, 4.5);
		this.scene.popMatrix();

		this.scene.pushMatrix(); //left connection
		this.scene.translate(2.25, 7, -2);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.2, 0.2, 4.5);
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder1
		this.scene.translate(-3, 7.2, 2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.3);
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder2
		this.scene.translate(3, 7.2, 2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.3);
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder3
		this.scene.translate(-3, 7.2, -2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.3);
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder4
		this.scene.translate(3, 7.2, -2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.3);
		this.scene.popMatrix();

		this.scene.pushMatrix(); //camera
		this.scene.translate(0, 6, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.2, 0.2, 1);
		this.scene.popMatrix();
	}
};