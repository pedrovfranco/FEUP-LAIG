class Animation
{
	constructor(scene)
	{
		this.scene = scene;
	};


	update(currTime)
	{

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

		this.lastTime = -1;
		this.sumTime = 0;
	};

	update(currTime)
	{
		if (this.component != undefined)
		{
			if (this.lastTime == -1)
				this.lastTime = currTime;

			this.deltaTime = (currTime - this.lastTime)/1000;

			this.sumTime += this.deltaTime;

			var i = Math.floor(((this.sumTime / this.totalTime) % 1)* (this.controlPoints.length));
			var j = (this.sumTime / this.intervalTime) % 1;
			var coords = [];

			coords[0] = this.controlPoints[i][0] + ( this.controlPoints[(i+1) % (this.controlPoints.length)][0]-this.controlPoints[i][0] ) * j;
			coords[1] = this.controlPoints[i][1] + ( this.controlPoints[(i+1) % (this.controlPoints.length)][1]-this.controlPoints[i][1] ) * j;
			coords[2] = this.controlPoints[i][2] + ( this.controlPoints[(i+1) % (this.controlPoints.length)][2]-this.controlPoints[i][2] ) * j;
			
			this.transformationMatrix = mat4.create();
			
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

			// console.log(ratio);

			// console.log(angle);

			mat4.translate(this.transformationMatrix, this.transformationMatrix, vec3.fromValues(coords[0], coords[1], coords[2]));
			mat4.rotate(this.transformationMatrix, this.transformationMatrix, angle, vec3.fromValues(0,1,0));


			// var defaultVector = [0, 0, 1];
			// var v = [x, 0, z];

			// var angle2 = Math.atan2(defaultVector[0]*v[2] - defaultVector[2]*v[0], defaultVector[0]*v[0] + defaultVector[2]*v[2]);

			// console.log(angle2);

			// var vector = this.[];

			// vector[0] = thi

			this.lastTime = currTime;
		}
	}
}


class CircularAnimation extends Animation
{

	constructor(scene, center, radius, initialAngle, rotationAngle,time)
	{
		super(scene);

		var radiusPerSecond = rotationAngle / time;

		var s = radius * rotationAngle;

		var alpha = initialAngle;

		var i,u;

		  //for ( i = 0; i < ;i++)

		  // radius * Math.cos(alpha) + center[0], radius * Math.sin(alpha) + center[1], 0 + center[2]
	};

}