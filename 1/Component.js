class Component extends CGFobject
{
    constructor(scene, transformations, componentsRef, primitivesRef, components, primitives)
    {
        super(scene);
        
        this.transformations = transformations;
        this.componentsRef = componentsRef;
        this.primitivesRef = primitivesRef;
        this.components = components;
        this.primitives = primitives;
    }


    display()
    {
        for (var i = 0; i < this.componentsRef.length; i++)
        {
            this.components[this.componentsRef[i]].display();
        }

        for (var i = 0; i < this.primitivesRef.length; i++)
        {
            this.primitives[this.primitivesRef[i]].display();
        }
    }

}