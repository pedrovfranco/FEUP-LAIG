class Component extends CGFobject
{
    constructor(scene, transformations, texture, componentsRef, primitivesRef, components, primitives)
    {
        super(scene);

        this.transformations = transformations;
        this.texture = texture;
        this.componentsRef = componentsRef;
        this.primitivesRef = primitivesRef;
        this.components = components;
        this.primitives = primitives;
    }


    display()
    {
        this.scene.pushMatrix();

        // this.texture.apply();

        for (var i = 0; i < this.transformations.length; i++)
        {
            if (this.transformations[i][0] == 0)
            {
                this.scene.translate(this.transformations[i][1], this.transformations[i][2], this.transformations[i][3]);
            }
            else if (this.transformations[i][0] == 1)
            {
                if (this.transformations[i][1] == "x")
                    this.scene.rotate(this.transformations[i][2]*Math.PI/180, 1, 0, 0);
                else if (this.transformations[i][1] == "y")
                    this.scene.rotate(this.transformations[i][2], 0, 1, 0);
                else if (this.transformations[i][1] == "z")
                    this.scene.rotate(this.transformations[i][2], 0, 0, 1);
            }
            else if (this.transformations[i][0] == 2)
            {
                this.scene.scale(this.transformations[i][1], this.transformations[i][2], this.transformations[i][3]);
            }
        }

        for (var i = 0; i < this.componentsRef.length; i++)
        {
            this.components[this.componentsRef[i]].display();
        }

        for (var i = 0; i < this.primitivesRef.length; i++)
        {
            this.primitives[this.primitivesRef[i]].display();
        }

        this.scene.popMatrix();
    }

}
