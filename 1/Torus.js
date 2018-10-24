class Torus extends Primitive
{
    constructor(scene, inner, outer, slices, loops)
    {
        super(scene);
        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;

        this.initBuffers();

        super.setBuffers(this.vertices, this.indices, this.normals, this.texCoords);
    }

    initBuffers()
    {
        var alpha = 2*Math.PI/this.slices;
        var beta = 2*Math.PI/this.loops;

		this.vertices = [];
		this.indices = [];
		this.normals = [];
        this.texCoords = [];

        for (var j = 0; j < this.loops; j++)
        {
            for (var i = 0; i < this.slices; i++)
            {
                this.vertices.push((this.outer + this.inner*Math.cos(alpha*i))*Math.cos(beta*j), (this.outer + this.inner*Math.cos(alpha*i))*Math.sin(beta*j), this.inner*Math.sin(alpha*i));		// A

                this.indices.push(this.slices*j + (i + 1)%this.slices, this.slices*j + i, this.slices*((j+1)%this.loops) + i); // ACB
                this.indices.push(this.slices*j + (i + 1)%this.slices, this.slices*((j+1)%this.loops) + i, this.slices*((j+1)%this.loops) + (i + 1)%this.slices); // ACB

                this.normals.push((this.outer + this.inner*Math.cos(alpha*i))*Math.cos(beta*j) - this.outer*Math.cos(beta*j), (this.outer + this.inner*Math.cos(alpha*i))*Math.sin(beta*j) - this.outer*Math.sin(beta*j), this.inner*Math.sin(alpha*i)); //Normal = vector starting at the center of the tube going to each pointof that slice    

                this.texCoords.push(beta*j/(2*Math.PI), alpha*i/(2*Math.PI));
            }
        }        

    }
}