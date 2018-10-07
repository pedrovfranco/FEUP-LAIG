class Primitive extends CGFobject
{
    constructor(scene)
    {
        super(scene);
    }

    setBuffers(vertices, indices, normals, texCoords)
    {
        this.vertices = vertices;
        this.indices = indices;
        this.normals = normals;
        this.texCoords = texCoords;

        this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}