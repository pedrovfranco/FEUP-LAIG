var DEGREE_TO_RAD = Math.PI / 180;

class Animation
{
	constructor(scene)
	{
		this.scene = scene;

		this.transformationMatrix = mat4.create();

		this.lastTime = -1;
		this.sumTime = 0;
		this.totalTime = -1;
		this.finished = false;
	};


	update(currTime)
	{
		if (this.lastTime == -1)
			this.lastTime = currTime;

		this.deltaTime = (currTime - this.lastTime)/1000;

		this.sumTime += this.deltaTime;

		if (this.sumTime >= this.totalTime && this.totalTime != -1)
		{
			this.finished = true;

			if (this.component != undefined)
			{
				this.component.passLastTime(currTime);
			}
		}
		else if (this.component != undefined)
			this.calculateMatrix();

		this.lastTime = currTime;
	}

	calculateMatrix()
	{

	}

	apply()
	{
		this.scene.multMatrix(this.transformationMatrix);
	}

	setComponent(component)
	{
		this.component = component;

		this.calculateMatrix();
	}

	reset()
	{
		this.lastTime = -1;
		this.sumTime = 0;
		this.finished = false;

		this.calculateMatrix();
	}
}

class LinearAnimation extends Animation
{
	constructor(scene, controlPoints, time)
	{
		super(scene);

		this.controlPoints = controlPoints;
		this.totalTime = time;
		this.intervalTime = this.totalTime/(this.controlPoints.length-1);
	};

	calculateMatrix()
	{
		var i = Math.floor(((this.sumTime / this.totalTime) % 1)* (this.controlPoints.length-1));
		var j = (this.sumTime / this.intervalTime) % 1;
		var coords = [];

		coords[0] = this.controlPoints[i][0] + ( this.controlPoints[i+1][0]-this.controlPoints[i][0] ) * j;
		coords[1] = this.controlPoints[i][1] + ( this.controlPoints[i+1][1]-this.controlPoints[i][1] ) * j;
		coords[2] = this.controlPoints[i][2] + ( this.controlPoints[i+1][2]-this.controlPoints[i][2] ) * j;
										
		var x = (this.controlPoints[i+1][0]-this.controlPoints[i][0]);
		var z = (this.controlPoints[i+1][2]-this.controlPoints[i][2]);

		this.directionAngle = Math.atan2(x, z);

		let center = this.component.getCenter();
		// console.log("x = " + center[0] + " y = " + center[1] + " z = " + center[2]);

		this.transformationMatrix = mat4.create();
		
		mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(coords[0], coords[1], coords[2]));

		mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(center[0], 0, center[2]));
		mat4.rotate(this.transformationMatrix, this.transformationMatrix, this.directionAngle, vec3.fromValues(0,1,0));
		mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(-center[0], 0, -center[2]));

	}

}


class CircularAnimation extends Animation
{

	constructor(scene, center, radius, initialAngle, rotationAngle, totalTime)
	{
		super(scene);

		this.center = [];
		this.center[0] = parseFloat(center[0]);
		this.center[1] = parseFloat(center[1]);
		this.center[2] = parseFloat(center[2]);

		this.radius = radius;
		this.initialAngle = initialAngle*DEGREE_TO_RAD;
		this.rotationAngle = rotationAngle*DEGREE_TO_RAD;
		this.totalTime = totalTime;
	};


	calculateMatrix()
	{
		let coords = [];
		let ratio = this.rotationAngle/this.totalTime;

		this.angle = this.initialAngle + ratio*this.sumTime;

		coords[0] = this.center[0] + this.radius*Math.sin(this.angle);
		coords[1] = this.center[1];
		coords[2] = this.center[2] + this.radius*Math.cos(this.angle);

		this.directionAngle = this.angle + Math.PI/2; 

		let center = this.component.getCenter();
		// console.log("x = " + center[0] + " y = " + center[1] + " z = " + center[2]);
		
		this.transformationMatrix = mat4.create();

		mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(coords[0], coords[1], coords[2]));

		mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(center[0], 0, center[2]));
		mat4.rotate(this.transformationMatrix, this.transformationMatrix, this.directionAngle, vec3.fromValues(0,1,0));
		mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(-center[0], 0, -center[2]));
	}
}


class QuadraticBezierAnimation extends Animation
{

	constructor(scene, P1, P2, P3, totalTime)
	{
		super(scene);

		this.P1 = P1;
		this.P2 = P2;
		this.P3 = P3;

		this.totalTime = totalTime;
	};


	calculateMatrix()
	{
		let t = this.sumTime/this.totalTime, coords = [];

		coords[0] = (1-t)*(1-t)*this.P1[0] + 2*(1-t)*t*this.P2[0] + t*t*this.P3[0];
		coords[1] = (1-t)*(1-t)*this.P1[1] + 2*(1-t)*t*this.P2[1] + t*t*this.P3[1];
		coords[2] = (1-t)*(1-t)*this.P1[2] + 2*(1-t)*t*this.P2[2] + t*t*this.P3[2];
		
		this.transformationMatrix = mat4.create();

		mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(coords[0], coords[1], coords[2]));
	}
}