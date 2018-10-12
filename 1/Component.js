class Component extends CGFobject
{
    constructor(scene, transformations, materialRef, texture, componentsRef, primitivesRef, components, primitives, id)
    {
        super(scene);

        this.scene = scene;
        this.transformations = transformations;
        this.materialRef = materialRef;
        this.texture = texture;
        this.componentsRef = componentsRef;
        this.primitivesRef = primitivesRef;
        this.components = components;
        this.primitives = primitives;
        this.id = id;

        this.warned = [];

        this.material = new CGFappearance(scene);
    }


    display()
    {
        this.scene.pushMatrix();

        this.material.apply();

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
                    this.scene.rotate(this.transformations[i][2]*Math.PI/180, 0, 1, 0);
                else if (this.transformations[i][1] == "z")
                    this.scene.rotate(this.transformations[i][2]*Math.PI/180, 0, 0, 1);
            }
            else if (this.transformations[i][0] == 2)
            {
                this.scene.scale(this.transformations[i][1], this.transformations[i][2], this.transformations[i][3]);
            }
        }

        for (var i = 0; i < this.componentsRef.length; i++)
        {
            if (this.components[this.componentsRef[i]] == undefined)
            {
                if (this.warned[this.componentsRef[i]] == undefined)
                {
                    this.warned[this.componentsRef[i]] = true;
                    console.log("Component \"" + this.id + "\" has reference to undefined component \"" + this.componentsRef[i] + "\" ");    
                }
            }
            else
                this.components[this.componentsRef[i]].display();
        }

        for (var i = 0; i < this.primitivesRef.length; i++)
        {
            if (this.primitives[this.primitivesRef[i]] == undefined)
            {
                if (this.warned[this.primitivesRef[i]] == undefined)
                {
                    this.warned[this.primitivesRef[i]] = true;
                    console.log("Component \"" + this.id + "\" has reference to undefined primitive \"" + this.primitivesRef[i] + "\" ");    
                }
            }
            else
                this.primitives[this.primitivesRef[i]].display();
        }

        this.scene.popMatrix();

        this.scene.materialDefault.apply();
    }
}
