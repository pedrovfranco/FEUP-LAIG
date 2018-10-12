class Cylinder extends CGFobject
{
    constructor(scene, base, top, height, slices , stacks)
    {
        super(scene);

        this.base = base;
        this.top = top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    };

    initBuffers()
    {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];


        var angle = 2*Math.PI/this.slices;
        var texCoordX = 0;
        var texCoordY = 0;

        for (var w = 0; w < this.stacks+1; w++) //Defining vertices, indices, normals and texCoords
        {

            for (var i = 0; i < this.slices; i++)
            {
                this.vertices.push(Math.cos(angle * i), Math.sin(angle * i), w/this.stacks);
                this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);
                this.texCoords.push(texCoordX, texCoordY);

                if (w != this.stacks)
                {
                    this.indices.push(w*this.slices+i,w*this.slices+((i+1)%this.slices),(w+1)*this.slices+(i+1)%this.slices);
                    this.indices.push(w*this.slices+i,(w+1)*this.slices+((i+1)%this.slices),(w+1)*this.slices+i);

                    //Oposite
                    this.indices.push((w+1)*this.slices+(i+1)%this.slices,w*this.slices+((i+1)%this.slices),w*this.slices+i);
                    this.indices.push((w+1)*this.slices+i,(w+1)*this.slices+((i+1)%this.slices),w*this.slices+i);
                }
                
                texCoordX += 1/this.stacks;
            }

            texCoordX = 0;
            texCoordY += 1/this.stacks;

        }

        var verticesLength = this.vertices.length/3;
        
        for (var i = 0; i < this.slices; i++)
        {
            this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), 1);        // A

            this.indices.push(verticesLength + i%this.slices);
            this.indices.push(verticesLength + (i + 1)%this.slices);
            this.indices.push(verticesLength + this.slices);

            this.normals.push(0, 0, -1);

            this.texCoords.push((Math.cos(angle*i) + 1)/2, (-Math.sin(angle*i) + 1)/2);
        }

        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        this.texCoords.push(1/2, 1/2);

        verticesLength = this.vertices.length/3;

        for (var i = 0; i < this.slices; i++)
        {
            this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), 0);        // A

            this.indices.push(verticesLength + i%this.slices);
            this.indices.push(verticesLength + this.slices);
            this.indices.push(verticesLength + (i + 1)%this.slices);

            this.normals.push(0, 0, 1);

            this.texCoords.push((Math.cos(angle*i) + 1)/2, (-Math.sin(angle*i) + 1)/2);
        }

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(1/2, 1/2);

        this.primitiveType=this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
};
