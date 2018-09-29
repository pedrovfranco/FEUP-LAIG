/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyObject extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-0.5, -0.5, 0,
				0.5, -0.5, 0,
				-0.5, 0.5, 0,
				0.5, 0.5, 0
				];

		this.indices = [
				0, 1, 2, 
				3, 2, 1
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

class MyObject2 extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-1, 0.5, 0,
				1,0.5, 0,
				0, 1.5, 0,
				];

		this.indices = [
				0, 1, 2, 
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-0.5, -0.5, -0.5, //vertice inferior mais negativo
				0.5, -0.5, -0.5, //vertice inferior positivo
				-0.5, 0.5, -0.5,
				0.5, 0.5, -0.5,

				-0.5, -0.5, 0.5,
				0.5, -0.5, 0.5,
				-0.5, 0.5, 0.5,
				0.5, 0.5, 0.5
				];

		this.indices = [
				2, 1, 0, //back face of the cube
				1, 2, 3,

				4, 5, 6, //front face of the cube
				7, 6, 5,

				5, 4, 0, //inferior face of the cube
				0, 1, 5, 
				
				2, 6, 7, //top face of the cube
				7, 3, 2,

				5, 1, 3, //left side of the cube
				5, 3, 7, 

				2, 0, 4, //right side of the cube		
				4, 6, 2		

			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

