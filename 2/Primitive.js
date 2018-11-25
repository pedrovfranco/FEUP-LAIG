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
        var sum = [0, 0, 0, 0];
        let matrix = mat4.create();

        this.getVerticeAverageRecursive(sum, matrix);

        sum[0] /= sum[3];
        sum[1] /= sum[3];
        sum[2] /= sum[3];
        
        return sum;
    }

    getVerticeAverageRecursive(sum, matrix)
    {
        let tempSum = [0, 0, 0, 0];
        for (let i = 0; i < this.vertices.length; i+=3)
        {

            tempSum[0] += this.vertices[i];
            tempSum[1] += this.vertices[i+1];
            tempSum[2] += this.vertices[i+2];

            tempSum[3]++;
        }

        tempSum[0] /= tempSum[3];
        tempSum[1] /= tempSum[3];
        tempSum[2] /= tempSum[3];

        let pointMatrix = this.createMatrix(tempSum[0], tempSum[1], tempSum[2], 1,
                                              0, 0, 0, 1,
                                              0, 0, 0, 1,
                                              0, 0, 0, 1);
            
        mat4.multiply(pointMatrix, matrix, pointMatrix);

        sum[0] += pointMatrix[0];
        sum[1] += pointMatrix[1];
        sum[2] += pointMatrix[2];
        sum[3]++;
    }

    createMatrix(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
    {
        let out = mat4.create();

        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m03;
        out[4] = m10;
        out[5] = m11;
        out[6] = m12;
        out[7] = m13;
        out[8] = m20;
        out[9] = m21;
        out[10] = m22;
        out[11] = m23;
        out[12] = m30;
        out[13] = m31;
        out[14] = m32;
        out[15] = m33;

        return out;
      }
}