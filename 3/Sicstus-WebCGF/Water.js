class Water extends Primitive
{
	constructor(scene , idtexture, idheightmap, parts, heightscale, texscale)
	{
		super(scene);

		this.scene = scene;
		this.idtexture = idtexture;
		this.idheightmap = idheightmap;
		this.parts = parts;
        this.heightscale = heightscale;
        this.texscale = texscale;

		this.plane = new Plane(scene, this.parts, this.parts);

        this.animation = new Animation(scene);

		this.texCoordsSet = false;

		this.initializeShaders();
	}

	initializeShaders()
	{

		this.shader = new CGFshader(this.scene.gl, "scenes/shaders/water.vert", "scenes/shaders/terrain.frag"),

		this.shader.setUniformsValues({uSampler2: 1});
        this.shader.setUniformsValues({normScale: this.heightscale});
        this.shader.setUniformsValues({length_s: this.texscale});
        this.shader.setUniformsValues({length_t: this.texscale});

		this.texture1 = new CGFtexture(this.scene, this.scene.graph.textures[this.idtexture]);
        this.texture2 = new CGFtexture(this.scene, this.scene.graph.textures[this.idheightmap]);
        

	};


    update(currTime)
    {
        this.animation.update(currTime);

        let x = Math.sin(this.animation.sumTime/1.5)/8;

        this.shader.setUniformsValues({animationX: x});
    }

	display()
	{
		this.scene.setActiveShader(this.shader);

		this.texture1.bind(0);
		this.texture2.bind(1);

		this.plane.display();
		
		this.scene.setActiveShader(this.scene.defaultShader);
	};

};
