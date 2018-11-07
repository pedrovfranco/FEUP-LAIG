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

		this.updateTexCoordsGLBuffers();
    }

    setBuffers(vertices, indices, normals, texCoords)
    {
        this.vertices = vertices;

        this.originalVertices = [];
        this.originalVertices[0] = vertices[0];
        this.originalVertices[1] = vertices[1];
        this.originalVertices[2] = vertices[2];
        
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

    move(position)
    {
        for (var i = 0; i < 3; i++)
        {
            this.vertices[i] = this.originalVertices[i] + position[i];
        }
    }
}