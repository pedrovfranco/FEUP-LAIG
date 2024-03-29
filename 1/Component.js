class Component extends CGFobject
{
    constructor(scene, transformationMatrix, materials, texture, componentsRef, primitivesRef, components, primitives, id)
    {
        super(scene);

        this.scene = scene;
        this.transformationMatrix = transformationMatrix;
        this.materials = materials;
        this.texture = texture;
        this.componentsRef = componentsRef;
        this.primitivesRef = primitivesRef;
        this.components = components;
        this.primitives = primitives;
        this.id = id;

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

        // for (var i = 0; i < this.transformations.length; i++)
        // {
        //     if (this.transformations[i][0] == 0)
        //     {
        //         this.scene.translate(this.transformations[i][1], this.transformations[i][2], this.transformations[i][3]);
        //     }
        //     else if (this.transformations[i][0] == 1)
        //     {
        //         if (this.transformations[i][1] == "x")
        //             this.scene.rotate(this.transformations[i][2]*Math.PI/180, 1, 0, 0);
        //         else if (this.transformations[i][1] == "y")
        //             this.scene.rotate(this.transformations[i][2]*Math.PI/180, 0, 1, 0);
        //         else if (this.transformations[i][1] == "z")
        //             this.scene.rotate(this.transformations[i][2]*Math.PI/180, 0, 0, 1);
        //     }
        //     else if (this.transformations[i][0] == 2)
        //     {
        //         this.scene.scale(this.transformations[i][1], this.transformations[i][2], this.transformations[i][3]);
        //     }
        // }

        this.scene.multMatrix(this.transformationMatrix);

        for (var i = 0; i < this.componentsRef.length; i++)
        {
            this.components[this.componentsRef[i]].display();
        }

        for (var i = 0; i < this.primitivesRef.length; i++)
        {
            this.primitives[this.primitivesRef[i]].updateTexCoords(this.texture[1], this.texture[2]);
            this.primitives[this.primitivesRef[i]].display();
        }

        this.scene.popMatrix();

        this.scene.materialDefault.apply();
    }
}
