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


};
