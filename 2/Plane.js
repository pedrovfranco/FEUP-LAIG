class Plane extends Primitive
{
		constructor(scene,nPartsU, nPartsV)
		{
			super(scene);

			this.nPartsU = nPartsU;
			this.nPartsV = nPartsV;

			this.controlPoints = [
											[
												[-0.5,0,0.5,1], // U = 0, V = [0,1]
												[-0.5,0,-0.5,1]
											],
											[
												[0.5,0,0.5,1], // U = 1, V = [0,1]
												[0.5,0,-0.5,1]
											]
										];

      // console.log(this.controlPoints);              

			this.nurbsSurface = new CGFnurbsSurface(1, 1, this.controlPoints);
			this.nurbsObject = new CGFnurbsObject(this.scene, this.nPartsU, this.nPartsV, this.nurbsSurface);
		};

		display()
		{
			this.nurbsObject.display();
		}
}
