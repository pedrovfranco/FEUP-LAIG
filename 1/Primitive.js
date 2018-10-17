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
    }

    setBuffers(vertices, indices, normals, texCoords)
    {
        this.vertices = vertices;
        this.indices = indices;
        this.normals = normals;
        this.originalTexCoords = texCoords;
        this.texCoords = this.originalTexCoords;

        this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}