class Patch extends Primitive
{
	constructor(scene, npointsU, npointsV, npartsU, npartsV , controlPoints)
	{
		super(scene);

		this.npointsU = npointsU;
		this.npointsV = npointsV;
		this.npartsU = npartsU;
		this.npartsV = npartsV;
		this.controlPoints = controlPoints;

		this.totalControlPoints = this.npointsU * this.npointsV;

		if(this.totalControlPoints != this.controlPoints.length)
			return "Error on Patch control points";

		this.degreeU = npointsU-1;
		this.degreeV = npointsV-1;

		let controlPoints4R = [];

		for (let i = 0; i < this.npointsU; i++)
		{
			controlPoints4R[i] = [];
			for (let j = 0; j < this.npointsV; j++)
			{
				controlPoints4R[i][j] = this.controlPoints[i*this.npointsV+j];
				controlPoints4R[i][j].push(1);
			}

		}

		// console.log(controlPoints4R);

		this.nurbsSurface = new CGFnurbsSurface(this.degreeU, this.degreeV, controlPoints4R);
		this.nurbsObject = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, this.nurbsSurface);
				 
	};

	display()
	{
		this.nurbsObject.display();
	};

	getVerticeAverage()
    {
        var sum = [0, 0, 0, 0];
        let matrix = mat4.create();

        this.getVerticeAverageRecursive(sum, matrix);

        sum[0] /= sum[3];
        sum[1] /= sum[3];
        sum[2] /= sum[3];
        
        return sum;
    }

	getVerticeAverageRecursive(sum, matrix)
	{
		let pointMatrix;
		for (let i = 0; i < this.nurbsObject.vertices.length; i+=3)
		{
			pointMatrix = this.createMatrix(this.nurbsObject.vertices[i], this.nurbsObject.vertices[i+1], this.nurbsObject.vertices[i+2], 1,
																				0, 0, 0, 1,
																				0, 0, 0, 1,
																				0, 0, 0, 1);
			
			mat4.multiply(pointMatrix, matrix, pointMatrix);

			sum[0] += pointMatrix[0];
			sum[1] += pointMatrix[1];
			sum[2] += pointMatrix[2];

			sum[3] += 1;
		}
	}
};
