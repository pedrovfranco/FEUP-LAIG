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

      this.initBuffers();

  };

  initBuffers()
  {
    this.totalControlPoints = this.npointsU * this.npointsV;
    this.degree = this.totalControlPoints - 1;

    this.degreeArray = [];
    
    for(var i = 0; i < this.degree; i++)
    {
      if (i < this.degree/2)
        this.degreeArray.push(0);
      else
        this.degreeArray.push(1);
    }

    this.nurbsSurface = new CGFnurbsSurface(this.degree, this.degree, this.controlPoints);
    this.nurbsObject = new CGFnurbsObject(this.scene, this.nPartsU, this.nPartsV, this.nurbsSurface);
         
  };

};
