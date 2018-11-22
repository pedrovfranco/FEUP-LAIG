class Terrain extends Primitive
{

	constructor(scene , idtexture, idheightmap, parts, heightscale)
	{
		super(scene);

		this.scene = scene;
		this.idtexture = idtexture;
		this.idheightmap = idheightmap;
		this.parts = parts;
		this.heightscale = heightscale;

		this.plane = new Plane(scene, 50, 50);

		this.initializeShaders();
	}

	initializeShaders()
	{

		this.shader = new CGFshader(this.scene.gl, "terrain.vert", "terrain.frag"),

		this.shader.setUniformsValues({uSampler2: 1});
		this.shader.setUniformsValues({normScale: 0.15});

		this.texture1 = new CGFtexture(this.scene, this.idtexture);
		this.texture2 = new CGFtexture(this.scene, this.idheightmap);

	};


	display()
	{

		this.scene.setActiveShader(this.shader);

		this.texture1.bind(0);
		this.texture2.bind(1);

		this.plane.display();
		
		this.scene.setActiveShader(this.scene.defaultShader);

	};

};
