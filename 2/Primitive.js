class Primitive extends CGFobject
{
    constructor(scene)
    {
        super(scene);
    }

    updateTexCoords(s, t)
    {
        if (this.texCoords != undefined)
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

    getVerticeAverage()
    {
        var sum = [0, 0, 0, 0], count = 0;
        this.getVerticeAverageRecursive(sum, count);

        sum[0] /= sum[3];
        sum[1] /= sum[3];
        sum[2] /= sum[3];
        
        return sum;
    }

    getVerticeAverageRecursive(sum, count)
    {
        for (let i = 0; i < this.vertices.length; i++)
        {
            sum[i%3] += this.vertices[i];

            if ((i % 3) == 2)
                sum[3]++;
        }
    }
}