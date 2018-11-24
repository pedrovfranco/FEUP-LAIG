var DEGREE_TO_RAD = Math.PI / 180;

class Animation
{
	constructor(scene)
	{
		this.scene = scene;

		this.transformationMatrix = mat4.create();

		this.lastTime = -1;
		this.sumTime = 0;
	};


	update(currTime)
	{
		if (this.lastTime == -1)
				this.lastTime = currTime;

		this.deltaTime = (currTime - this.lastTime)/1000;

		this.sumTime += this.deltaTime;

		this.lastTime = currTime;
	}


	apply()
	{
		// this.scene.pushMatrix();
	
			this.scene.multMatrix(this.transformationMatrix);

		// this.scene.popMatrix();
	}

	setComponent(component)
	{
		this.component = component;
	}
}

class LinearAnimation extends Animation
{
	constructor(scene, controlPoints, time)
	{
		super(scene);

		this.controlPoints = controlPoints;
		this.totalTime = time;
		this.intervalTime = this.totalTime/(this.controlPoints.length);
	};

	update(currTime)
	{
		super.update(currTime);

		if (this.component != undefined)
		{
			var i = Math.floor(((this.sumTime / this.totalTime) % 1)* (this.controlPoints.length));
			var j = (this.sumTime / this.intervalTime) % 1;
			var coords = [];

			coords[0] = this.controlPoints[i][0] + ( this.controlPoints[(i+1) % (this.controlPoints.length)][0]-this.controlPoints[i][0] ) * j;
			coords[1] = this.controlPoints[i][1] + ( this.controlPoints[(i+1) % (this.controlPoints.length)][1]-this.controlPoints[i][1] ) * j;
			coords[2] = this.controlPoints[i][2] + ( this.controlPoints[(i+1) % (this.controlPoints.length)][2]-this.controlPoints[i][2] ) * j;
						
			var x = (this.controlPoints[(i+1) % (this.controlPoints.length)][0]-this.controlPoints[i][0]);
			var z = (this.controlPoints[(i+1) % (this.controlPoints.length)][2]-this.controlPoints[i][2]);

			var ratio, angle;
			if (x != 0)
			{
				ratio = x/z;
				angle = Math.atan(ratio);
			}
			else
			{
				if (z > 0)
					angle = 0;
				else
					angle = Math.PI;
			}

			let center = this.component.getCenter();
			// console.log("x = " + center[0] + " y = " + center[1] + " z = " + center[2]);

			this.transformationMatrix = mat4.create();
			
			mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(coords[0], coords[1], coords[2]));

			// mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(center[0], center[1], center[2]));
			mat4.rotate(this.transformationMatrix, this.transformationMatrix, angle, vec3.fromValues(0,1,0));
			// mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(-center[0], -center[1], -center[2]));



			// var defaultVector = [0, 0, 1];
			// var v = [x, 0, z];

			// var angle2 = Math.atan2(defaultVector[0]*v[2] - defaultVector[2]*v[0], defaultVector[0]*v[0] + defaultVector[2]*v[2]);

			// console.log(angle2);

			// var vector = this.[];

			// vector[0] = thi

			
		}

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

	update(currTime)
	{
		super.update(currTime);

		if (this.component != undefined)
		{
			let coords = [];
			let ratio = this.rotationAngle/this.totalTime;

			this.angle = this.initialAngle + ratio*this.sumTime;

			coords[0] = this.center[0] + this.radius*Math.cos(this.angle);
			coords[1] = this.center[1];
			coords[2] = this.center[2] + this.radius*Math.sin(this.angle);

			let x = this.radius*Math.sin(this.angle);
			let z = -this.radius*Math.cos(this.angle);

			var directionRatio, directionAngle;
			if (x != 0)
			{
				directionRatio = x/z;
				directionAngle = Math.atan(directionRatio);
			}
			else
			{
				if (z > 0)
					directionAngle = 0;
				else
					directionAngle = Math.PI;
			}

			this.transformationMatrix = mat4.create();

			mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(coords[0], coords[1], coords[2]));

			mat4.rotate(this.transformationMatrix, this.transformationMatrix, directionAngle, vec3.fromValues(0,1,0));
		}
	}
}