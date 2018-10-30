class Primitive extends CGFobject
{
    constructor(scene)
    {
        super(scene);
    }

    updateTexCoords(s, t)
    {		
        for (var i = 0; i < this.texCoords.length; i++)
        {
            if (i % 2 == 0)
                this.texCoords[i] = this.originalTexCoords[i] / s;
            else
                this.texCoords[i] = this.originalTexCoords[i] / t;
        }

		this.initGLBuffers();
    }

    setBuffers(vertices, indices, normals, texCoords)
    {
        this.vertices = vertices;
        this.indices = indices;
        this.normals = normals;
        this.texCoords = texCoords;
        this.originalTexCoords = [];

        for (var i = 0; i < texCoords.length; i++) // Copies texCoords to originalTexCoords, the reason the assinement operator (=) is not used is because we want different positions in memory so that texCoords is able to be different than originalTexCoords
        {
            this.originalTexCoords[i] = texCoords[i];
        }

        this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}