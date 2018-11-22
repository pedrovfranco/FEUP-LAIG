class Component extends CGFobject
{
    constructor(scene, transformationMatrix, materials, texture, animation, componentsRef, primitivesRef, id)
    {
        super(scene);

        this.scene = scene;
        this.transformationMatrix = transformationMatrix;
        this.materials = materials;
        this.texture = texture;
        this.animation = animation;
        this.componentsRef = componentsRef;
        this.primitivesRef = primitivesRef;
        this.id = id;

        if (this.animation != null)
        {
            this.animation.setComponent(this);
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


        if (this.animation != null)
        {
            this.animation.apply();
        }

        this.scene.multMatrix(this.transformationMatrix);

        for (var i = 0; i < this.componentsRef.length; i++)
        {
            this.scene.graph.components[this.componentsRef[i]].display();
        }

        for (var i = 0; i < this.primitivesRef.length; i++)
        {
            if (this.scene.graph.primitives[this.primitivesRef[i]] == undefined) 
                var a = 0;
                
            this.scene.graph.primitives[this.primitivesRef[i]].updateTexCoords(this.texture[1], this.texture[2]);
            this.scene.graph.primitives[this.primitivesRef[i]].display();
        }

        this.scene.popMatrix();

        this.scene.materialDefault.apply();
    }

    update(currTime)
    {            
        if (this.animation != null)
        {
            this.animation.update(currTime);
        }

        for (var i = 0; i < this.componentsRef.length; i++)
            this.scene.graph.components[this.componentsRef[i]].update(currTime);

    }

    getVerticeAverage()
    {
        var sum = [0, 0, 0, 0], count = 0;
        this.getVerticeAverageRecursive(sum, count);

        sum[0] /= sum[3];
        sum[1] /= sum[3];
        sum[2] /= sum[3];
        
        return sum;
    }

    getVerticeAverageRecursive(sum, count)
    {
        for (var i = 0; i < this.componentsRef.length; i++)
            this.scene.graph.components[this.componentsRef[i]].getVerticeAverageRecursive(sum, count);

        for (var i = 0; i < this.primitivesRef.length; i++)
            this.scene.graph.primitives[this.primitivesRef[i]].getVerticeAverageRecursive(sum, count);
    }

    getCenter()
    {
        let sum = [0, 0, 0.5];

        let pointMatrix = this.createMatrix(sum[0], sum[1], sum[2], 1,
                                          0, 0, 0, 0,
                                          0, 0, 0, 0,
                                          0, 0, 0, 0);
        
        let foobar = mat4.create();

        mat4.multiply(foobar, this.animation.transformationMatrix, this.transformationMatrix);
        mat4.multiply(pointMatrix, foobar, pointMatrix);

        return [pointMatrix[0], pointMatrix[1], pointMatrix[2]];
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
