class Component extends CGFobject
{
	constructor(scene, transformationMatrix, materials, texture, animations, componentsRef, primitivesRef, id)
	{
		super(scene);

		this.scene = scene;
		this.transformationMatrix = transformationMatrix;
		this.materials = materials;
		this.texture = texture;
		this.animations = animations;
		this.componentsRef = componentsRef;
		this.primitivesRef = primitivesRef;
		this.id = id;

		if (this.animations == null)
		{
			this.animations = [];
		}

		for (var i = 0; i < this.animations.length; i++)
		{
			this.animations[i].setComponent(this);
		}

		this.idMaterial = 0;

		this.material = new CGFappearance(scene);
	}

	incrementMaterial()
	{
		this.idMaterial++;
		this.idMaterial %= this.materials.length;
	}


	display()
	{
		this.scene.pushMatrix();

		this.material.apply();


		let resetFlag = false;
		for (var i = 0; i < this.animations.length; i++)
		{
			if (i == 1)
				var a = 0;

			resetFlag = true;
			if (!this.animations[i].finished)
			{
				this.animations[i].apply();
				resetFlag = false;
				this.lastAnimation = i;
				break;
			}
		}

		if (resetFlag)
		{
			for (var i = 0; i < this.animations.length; i++)
				this.animations[i].reset();

			var currDate = new Date();
			this.animations[0].update(currDate.getTime());
			this.animations[0].apply();
		}

		this.scene.multMatrix(this.transformationMatrix);

		for (var i = 0; i < this.componentsRef.length; i++)
		{
			this.scene.graph.components[this.componentsRef[i]].display();
		}

		for (var i = 0; i < this.primitivesRef.length; i++)
		{
			this.scene.graph.primitives[this.primitivesRef[i]].updateTexCoords(this.texture[1], this.texture[2]);
			this.scene.graph.primitives[this.primitivesRef[i]].display();
		}

		this.scene.popMatrix();

		this.scene.materialDefault.apply();
	}

	update(currTime)
	{
		let resetFlag = false;
		for (var i = 0; i < this.animations.length; i++)
		{
			resetFlag = true;
			if (!this.animations[i].finished)
			{
				this.animations[i].update(currTime);
				resetFlag = false;
				break;
			}
		}

		if (resetFlag)
		{
			for (var i = 0; i < this.animations.length; i++)
				this.animations[i].reset();

			this.animations[0].update(currTime);
		}

		for (var i = 0; i < this.componentsRef.length; i++)
			this.scene.graph.components[this.componentsRef[i]].update(currTime);

		for (var i = 0; i < this.primitivesRef.length; i++)
		{
			if (typeof(this.scene.graph.primitives[this.primitivesRef[i]].update) === typeof(Function))
			{
				this.scene.graph.primitives[this.primitivesRef[i]].update(currTime, this);
			}
		}
	}

	passLastTime(lastTime)
	{
		for (var i = 0; i < this.animations.length; i++)
		{
			if (!this.animations[i].finished)
			{
				this.animations[i].lastTime = lastTime;
				break;
			}
		}
	}

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

	getVerticeAverageAnimation()
	{
		var sum = [0, 0, 0, 0];
		let matrix = mat4.create();
		for (var i = 0; i < this.animations.length; i++)
		{
			if (!this.animations[i].finished)
			{
				matrix = this.animations[i].transformationMatrix
				break;
			}
		}

		this.getVerticeAverageRecursive(sum, matrix);

		sum[0] /= sum[3];
		sum[1] /= sum[3];
		sum[2] /= sum[3];
		
		return sum;
	}

	getVerticeAverageRecursive(sum, matrix)
	{
		let matrix2 = mat4.create();

		mat4.multiply(matrix2, matrix, this.transformationMatrix);

		for (var i = 0; i < this.componentsRef.length; i++)
		{
			if (this.scene.graph.components[this.componentsRef[i]] != undefined) 
				this.scene.graph.components[this.componentsRef[i]].getVerticeAverageRecursive(sum, matrix2);
		}

		for (var i = 0; i < this.primitivesRef.length; i++)
		{
			if (this.scene.graph.primitives[this.primitivesRef[i]] != undefined)
				this.scene.graph.primitives[this.primitivesRef[i]].getVerticeAverageRecursive(sum, matrix2);
		}
	}


	getCenter()
	{
		let sum = this.getVerticeAverage();

		return [sum[0], sum[1], sum[2]];
	}

	getCenterAnimation()
	{
		let sum = this.getVerticeAverageAnimation();

		return [sum[0], sum[1], sum[2]];
	}


	createMatrix(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
	{
		let out = mat4.create();

		out[0] = m00;
		out[1] = m01;
		out[2] = m02;
		out[3] = m03;
		out[4] = m10;
		out[5] = m11;
		out[6] = m12;
		out[7] = m13;
		out[8] = m20;
		out[9] = m21;
		out[10] = m22;
		out[11] = m23;
		out[12] = m30;
		out[13] = m31;
		out[14] = m32;
		out[15] = m33;

		return out;
	  }

}
