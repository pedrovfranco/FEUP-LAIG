class Terrain
{

	constructor(scene , idtexture, idheightmap, parts, heightscale)
	{
		super(scene);

		this.idtexture = idtexture;
		this.idheightmap = idheightmap;
		this.parts = parts;
		this.heightscale = heightscale;
	}

	initializeShaders()
	{

	this.texture = new CGFtexture(this, "scenes/iamges/.jpg");
	this.appearance.setTexture(this.texture);
	this.appearance.setTextureWrap ('REPEAT', 'REPEAT');


	// texture will have to be bound to unit 1 later, when using the shader, with "this.texture2.bind(1);"

	this.terrain = new Plane(this.scene, this.parts, this.parts);

	this.texture = null;
	this.appearance = null;
	this.selectedExampleShader=8;
	this.wireframe=false;
	this.scaleFactor=50.0;

	this.testShaders=[
		new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag"),
		new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag"),
		new CGFshader(this.gl, "shaders/varying.vert", "shaders/varying.frag"),
		new CGFshader(this.gl, "shaders/texture1.vert", "shaders/texture1.frag"), //idtexture
		new CGFshader(this.gl, "shaders/texture2.vert", "shaders/texture2.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/texture3.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/sepia.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/convolution.frag"),
		new CGFshader(this.gl, "shaders/tvarying.vert", "shaders/tvarying.frag") ]; // idheightmap

	// texture will have to be bound to unit 1 later, when using the shader, with "this.texture2.bind(1);"
	this.testShaders[4].setUniformsValues({uSampler2: 1});
	this.testShaders[5].setUniformsValues({uSampler2: 1});
	this.testShaders[8].setUniformsValues({selColor: [1.0, 0.0, 0.0, 1.0] });

	this.texture2 = new CGFtexture(this.scene, "scenes/images/heightmap.jpg");
	
	// this.updateScaleFactor();

	};

	// LightingScene.prototype.updateScaleFactor=function(v)
	// {
	// 	this.testShaders[1].setUniformsValues({normScale: this.scaleFactor});
	// this.testShaders[2].setUniformsValues({normScale: this.scaleFactor});
	// this.testShaders[5].setUniformsValues({normScale: this.scaleFactor});
	// 						OR (?)
	// 	this.testShaders[1].setUniformsValues({normScale: this.scaleFactor});
	// this.testShaders[2].setUniformsValues({normScale: this.scaleFactor});
	// this.testShaders[5].setUniformsValues({normScale: this.scaleFactor});
	// this.testShaders[8].setUniformsValues({normScale: this.scaleFactor});
	// }

	display()
	{
		this.setActiveShader(this.testShaders[this.selectedExampleShader]);
		
		this.texture2.bind(1);

		this.terrain.display();
		
		this.setActiveShader(this.defaultShader);
	};

};
