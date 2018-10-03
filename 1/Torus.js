class Torus extends CGFobject
{

  inner="ff" outer="ff" slices="ii" loops="ii"

/*

x(u,v) = (DISTANCIA DO CENTRO DO TUBO AO CENTRO DO TORO + raio * cos v ) cos u
y(u,v) = (DISTANCIA DO CENTRO DO TUBO AO CENTRO DO TORO + raio * cos v) sin u
z(u,v) = r sin v

u,v [0,2pi]
*/

//inner raio interior
//outer raio exterior
//slices slices
//loops -> f [0,1] f(0) = f(1)

  constructor(scene, inner, outer, slices, loops)
	{
        super(scene);

        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = lopps;

		this.initBuffers();
	};

	initBuffers()
	{
    this.vertices = [];
    this.indices = [];

    var u,v;

    for(var i = 0; i < this.slices; i++)
    {

    }



    this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
