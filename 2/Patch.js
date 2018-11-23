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

    this.totalControlPoints = this.npartsU * this.npartsV;

    if(this.totalControlPoints != this.controlPoints.length)
      return "Error on Patch control points";

    this.degreeU = npartsU-1;
    this.degreeV = npartsV-1;

    /*this.degreeArray = [];
    
    for(var i = 0; i < this.degree; i++)
    {
      if (i < this.degree/2)
        this.degreeArray.push(0);
      else
        this.degreeArray.push(1);
    }*/

    let controlPoints4R = [];

    for (let i = 0; i < this.npartsU; i++)
    {
      controlPoints4R[i] = [];
      for (let j = 0; j < this.npartsV; j++)
      {
        controlPoints4R[i][j] = this.controlPoints[i*this.npartsV+j];
        controlPoints4R[i][j].push(1);
      }

    }

    // console.log(controlPoints4R);

    this.nurbsSurface = new CGFnurbsSurface(this.degreeU, this.degreeV, controlPoints4R);
    this.nurbsObject = new CGFnurbsObject(this.scene, this.npointsU, this.npointsV, this.nurbsSurface);
         
  };

  display()
    {
        this.nurbsObject.display();
    };


};
