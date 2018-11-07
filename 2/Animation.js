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
		this.intervalTime = this.totalTime/(this.controlPoints.length-1);

		this.lastTime = -1;
		this.sumTime = 0;
	};

	update(currTime)
	{
		if (this.component != undefined)
		{
			if (this.lastTime == -1)
				this.lastTime = currTime;

			this.deltaTime = currTime - this.lastTime;

			this.sumTime += this.deltaTime;

			var i = Math.floor(this.sumTime / this.intervalTime);
			var j = this.sumTime % this.intervalTime;
			
			this.component.vertices[0] = this.controlPoints[i][0] + ( this.controlPoints[i+1][0]-this.controlPoints[i][0] ) * j;
			this.component.vertices[1] = this.controlPoints[i][1] + ( this.controlPoints[i+1][1]-this.controlPoints[i][1] ) * j;
			this.component.vertices[2] = this.controlPoints[i][2] + ( this.controlPoints[i+1][2]-this.controlPoints[i][2] ) * j;
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