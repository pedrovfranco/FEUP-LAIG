class Vehicle extends Primitive
{

	constructor(scene)
	{
		super(scene);

		this.animation = new Animation(this.scene);

		this.cameraId = "drone";

		this.fov = 1.2;
		this.near = 0.1;
		this.far = 500;

		this.scene.views[this.cameraId] = new CGFcamera(this.fov, this.near, this.far, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
		this.scene.graph.viewIds.push(this.cameraId);
		
		this.propellerAngle = 0;
		this.initBuffers();
	};

	update(currTime, component)
    {
        this.animation.update(currTime);

        this.propellerAngle = Math.PI*7 * this.animation.sumTime;

        let center = component.getCenterAnimation();
        let angle = 0;

        for (var i = 0; i < component.animations.length; i++)
		{
			if (!component.animations[i].finished)
			{
				angle = component.animations[i].directionAngle;
				break;
			}
		}

		this.scene.views[this.cameraId].fov = this.fov;
		this.scene.views[this.cameraId].near = this.near;
		this.scene.views[this.cameraId].far = this.far;

        this.scene.views[this.cameraId].setPosition(vec3.fromValues(center[0], center[1], center[2]));

        let target = vec3.fromValues(center[0] + 5*Math.sin(angle), center[1] - 5, center[2] + 5*Math.cos(angle));

        this.scene.views[this.cameraId].setTarget(target);
    }


	initBuffers()
	{
		this.cylinder2 = new Cylinder2(this.scene, 1, 1, 1, 30, 30);

		this.controlPointsPatch = [ [-1.5,-1.5, 0], [-1.5,1.5,0], [0,-1.5,1.1], [0,1.5,1.1], [1.5,-1.5,0], [1.5,1.5,0]];
		this.controlPointsPatch2 = [ [1,0,0], [0,0,0], [1,0,1], [0,0,1]];

		this.patch = new Patch(this.scene, 3, 2, 5, 5, this.controlPointsPatch);
  		this.patch2 = new Patch(this.scene, 2, 2, 2, 2, this.controlPointsPatch2);

  		this.plane = new Plane(this.scene, 5, 5);
		

  		this.red = new CGFappearance(this.scene);
		this.red.loadTexture("scenes/images/red.png");
		this.red.setAmbient(1.0,1.0,1.0,1);
		this.red.setDiffuse(1.0,1.0,1.0,1);
		this.red.setSpecular(1.0,1.0,1.0,1);
		this.red.setShininess(120);

		this.black = new CGFappearance(this.scene);
		this.black.loadTexture("scenes/images/black.jpg");
		this.black.setAmbient(1.0,1.0,1.0,1);
		this.black.setDiffuse(1.0,1.0,1.0,1);
		this.black.setSpecular(1.0,1.0,1.0,1);
		this.black.setShininess(120);

		this.steel = new CGFappearance(this.scene);
		this.steel.loadTexture("scenes/images/steel.jpg");
		this.steel.setAmbient(1.0,1.0,1.0,1);
		this.steel.setDiffuse(1.0,1.0,1.0,1);
		this.steel.setSpecular(1.0,1.0,1.0,1);
		this.steel.setShininess(120);

		this.vertices = [];

		this.indices = [];


		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	getVerticeAverageRecursive(sum, matrix)
    {
    	let pointMatrix = this.createMatrix(0, 0, 0, 1,
                                              0, 0, 0, 1,
                                              0, 0, 0, 1,
                                              0, 0, 0, 1);
            
        mat4.multiply(pointMatrix, matrix, pointMatrix);

        sum[0] += pointMatrix[0];
        sum[1] += pointMatrix[1];
        sum[2] += pointMatrix[2];
        sum[3]++;
    }
   

	display()
	{
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.translate(0, -7, 0);

		this.scene.pushMatrix();  //up part
		this.scene.translate(0, 7, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.steel.apply();
		this.patch.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //down part
		this.scene.translate(0, 7, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.steel.apply();
		this.patch.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // side left
		this.scene.translate(-1.5, 7, 1.45);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.scale(0.1, 0.8, 3.3);
		this.black.apply();
		this.cylinder2.display();
		this.scene.popMatrix();


		this.scene.pushMatrix(); // side right
		this.scene.translate(-1.5, 7, -1.45);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.scale(0.1, 0.8, 3.3);
		this.black.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //crossing connection
		this.scene.translate(0, 7, -2);
		this.scene.scale(0.2, 0.2, 4);
		this.steel.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //left connection
		this.scene.translate(2.25, 7, 2);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.2, 0.2, 4.5);
		this.steel.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //left connection
		this.scene.translate(2.25, 7, -2);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(0.2, 0.2, 4.5);
		this.steel.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder1
		this.scene.translate(-3, 7.2, 2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.4);
		this.red.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder2
		this.scene.translate(3.5, 7.2, 2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.4);
		this.red.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder3
		this.scene.translate(-3, 7.2, -2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.4);
		this.red.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //cylinder4
		this.scene.translate(3.5, 7.2, -2);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(1, 1, 0.4);
		this.red.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); //camera
		this.scene.translate(0, 6, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.2, 0.2, 1);
		this.black.apply();
		this.cylinder2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // conector1
		this.scene.translate(2.75, 7, -2);
		this.scene.scale(1.2, 1, 0.2);
		this.steel.apply();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // conector2
		this.scene.translate(2.75, 7, 2);
		this.scene.scale(1.2, 1, 0.2);
		this.steel.apply();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // conector3
		this.scene.translate(-2.75, 7, 2);
		this.scene.scale(1.2, 1, 0.2);
		this.steel.apply();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // conector4
		this.scene.translate(-2.75, 7, -2);
		this.scene.scale(1.2, 1, 0.2);
		this.steel.apply();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // propeller1
		this.scene.translate(-3.25, 7, 1.9);
		this.scene.rotate(this.propellerAngle,0,1,0);
		this.scene.scale(0.2, 1.2, 1.5);
		this.black.apply();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // propeller2
		this.scene.translate(3.25, 7, 1.9);
		this.scene.rotate(this.propellerAngle,0,1,0);
		this.scene.scale(0.2, 1.2, 1.5);
		this.black.apply();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // propeller3
		this.scene.translate(-3.25, 7, -1.9);
		this.scene.rotate(this.propellerAngle,0,1,0);
		this.scene.scale(0.2, 1.2, 1.5);
		this.black.apply();
		this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); // propeller4
		this.scene.translate(3.25, 7, -1.9);
		this.scene.rotate(this.propellerAngle,0,1,0);
		this.scene.scale(0.2,1.2,1.5);
		this.black.apply();
		this.plane.display();
		this.scene.popMatrix();
	};
};