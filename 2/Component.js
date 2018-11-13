class Component extends CGFobject
{
    constructor(scene, transformationMatrix, materials, texture, animationRef, componentsRef, primitivesRef, id)
    {
        super(scene);

        this.scene = scene;
        this.transformationMatrix = transformationMatrix;
        this.materials = materials;
        this.texture = texture;
        this.animationRef = animationRef;
        this.componentsRef = componentsRef;
        this.primitivesRef = primitivesRef;
        this.id = id;

        if (this.animationRef != "")
        {
            this.scene.graph.animations[this.animationRef].setComponent(this);
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

        if (this.animationRef != "")
        {
            this.scene.graph.animations[this.animationRef].apply();
        }

        this.scene.multMatrix(this.transformationMatrix);

        for (var i = 0; i < this.componentsRef.length; i++)
        {
            this.scene.graph.components[this.componentsRef[i]].display();
        }

        for (var i = 0; i < this.primitivesRef.length; i++)
        {
            this.scene.graph.primitives[this.primitivesRef[i]].updateTexCoords(this.texture[1], this.texture[2], this.id);
            this.scene.graph.primitives[this.primitivesRef[i]].display();
        }

        this.scene.popMatrix();

        this.scene.materialDefault.apply();
    }

    update(currTime)
    {
        if (this.id = "raftCylinder")
            var a = 0;
            
        if (this.animationRef != "")
        {
            this.scene.graph.animations[this.animationRef].update(currTime);
        }

        for (var i = 0; i < this.componentsRef.length; i++)
            this.scene.graph.components[this.componentsRef[i]].update(currTime);

    }

}
