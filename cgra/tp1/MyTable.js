/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class myLeg extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
	};


	display()
	{			
		this.scene.scale(0.3, 3.5, 0.3);
		this.scene.translate(0, 0.5, 0);
		this.cube.display();
	}
	
};

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
		this.leg = new myLeg(this.scene);
	};


	display()
	{	
		this.scene.pushMatrix(); // Tampo da mesa
		
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);
		this.scene.translate(0, 0.5, 0);

		this.cube.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();
		
		this.scene.translate(5/2 - 0.3/2, 0, 3/2 - 0.3/2);
		this.leg.display();
	
		this.scene.popMatrix();

		this.scene.pushMatrix();
		
		this.scene.translate(-(5/2 - 0.3/2), 0, 3/2 - 0.3/2);
		this.leg.display();
	
		this.scene.popMatrix();
	
		this.scene.pushMatrix();
		
		this.scene.translate(5/2 - 0.3/2, 0, -(3/2 - 0.3/2));
		this.leg.display();
	
		this.scene.popMatrix();

		this.scene.pushMatrix();
		
		this.scene.translate(-(5/2 - 0.3/2), 0, -(3/2 - 0.3/2));
		this.leg.display();
	
		this.scene.popMatrix();


	}
	
};


class MyFloor extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
	};


	display()
	{	
		this.scene.scale(8,0.1,6);
		this.cube.display();
	}
	
};