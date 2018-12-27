class ScoreBoard extends Primitive
{
  constructor(scene)
	{
		super(scene);

    this.d1 = 0;
    this.d2 = 0;
    this.d3 = 0;

    this.initBuffers();
  }

  initBuffers()
  {
    this.vertices = [];
    this.indices = [];

    this.steel = new CGFappearance(this.scene);
		this.steel.loadTexture("scenes/images/ice.jpeg");
		this.steel.setAmbient(1.0,1.0,1.0,1);
		this.steel.setDiffuse(1.0,1.0,1.0,1);
		this.steel.setSpecular(1.0,1.0,1.0,1);
		this.steel.setShininess(120);

    this.cylinder2 = new Cylinder2(this.scene, 1, 1, 1, 30, 30);
    this.plane = new Plane(this.scene, 5, 5);

    this.loadNumbers();

    this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
  }

	loadNumbers()
	{
		this.zero = new CGFappearance(this.scene);
		this.zero.loadTexture("scenes/images/numbers/0.png");
		this.zero.setAmbient(1.0,1.0,1.0,1);
		this.zero.setDiffuse(1.0,1.0,1.0,1);
		this.zero.setSpecular(1.0,1.0,1.0,1);
		this.zero.setShininess(120);

		this.one = new CGFappearance(this.scene);
		this.one.loadTexture("scenes/images/numbers/1.png");
		this.one.setAmbient(1.0,1.0,1.0,1);
		this.one.setDiffuse(1.0,1.0,1.0,1);
		this.one.setSpecular(1.0,1.0,1.0,1);
		this.one.setShininess(120);

		this.two = new CGFappearance(this.scene);
		this.two.loadTexture("scenes/images/numbers/2.png");
		this.two.setAmbient(1.0,1.0,1.0,1);
		this.two.setDiffuse(1.0,1.0,1.0,1);
		this.two.setSpecular(1.0,1.0,1.0,1);
		this.two.setShininess(120);

		this.three = new CGFappearance(this.scene);
		this.three.loadTexture("scenes/images/numbers/3.png");
		this.three.setAmbient(1.0,1.0,1.0,1);
		this.three.setDiffuse(1.0,1.0,1.0,1);
		this.three.setSpecular(1.0,1.0,1.0,1);
		this.three.setShininess(120);

    this.four = new CGFappearance(this.scene);
    this.four.loadTexture("scenes/images/numbers/4.png");
    this.four.setAmbient(1.0,1.0,1.0,1);
    this.four.setDiffuse(1.0,1.0,1.0,1);
    this.four.setSpecular(1.0,1.0,1.0,1);
    this.four.setShininess(120);

    this.five = new CGFappearance(this.scene);
    this.five.loadTexture("scenes/images/numbers/5.png");
    this.five.setAmbient(1.0,1.0,1.0,1);
    this.five.setDiffuse(1.0,1.0,1.0,1);
    this.five.setSpecular(1.0,1.0,1.0,1);
    this.five.setShininess(120);

    this.six = new CGFappearance(this.scene);
    this.six.loadTexture("scenes/images/numbers/6.png");
    this.six.setAmbient(1.0,1.0,1.0,1);
    this.six.setDiffuse(1.0,1.0,1.0,1);
    this.six.setSpecular(1.0,1.0,1.0,1);
    this.six.setShininess(120);

    this.seven = new CGFappearance(this.scene);
    this.seven.loadTexture("scenes/images/numbers/7.png");
    this.seven.setAmbient(1.0,1.0,1.0,1);
    this.seven.setDiffuse(1.0,1.0,1.0,1);
    this.seven.setSpecular(1.0,1.0,1.0,1);
    this.seven.setShininess(120);

    this.eight = new CGFappearance(this.scene);
    this.eight.loadTexture("scenes/images/numbers/8.png");
    this.eight.setAmbient(1.0,1.0,1.0,1);
    this.eight.setDiffuse(1.0,1.0,1.0,1);
    this.eight.setSpecular(1.0,1.0,1.0,1);
    this.eight.setShininess(120);

    this.nine = new CGFappearance(this.scene);
    this.nine.loadTexture("scenes/images/numbers/9.png");
    this.nine.setAmbient(1.0,1.0,1.0,1);
    this.nine.setDiffuse(1.0,1.0,1.0,1);
    this.nine.setSpecular(1.0,1.0,1.0,1);
    this.nine.setShininess(120);

    this.dots = new CGFappearance(this.scene);
    this.dots.loadTexture("scenes/images/numbers/dots.png");
    this.dots.setAmbient(1.0,1.0,1.0,1);
    this.dots.setDiffuse(1.0,1.0,1.0,1);
    this.dots.setSpecular(1.0,1.0,1.0,1);
    this.dots.setShininess(120);
	};

  display(playsW, playsB, m, s)
  {
    this.d1B = playsW % 10;
  	this.d2B = (playsW % 100)/10;
  	this.d3B = (playsW % 1000)/100;

    this.d1W = playsB % 10;
  	this.d2W = (playsB % 100)/10;
  	this.d3W = (playsB % 1000)/100;

    this.s1 = s % 10;
  	this.s2 = (s % 100)/10;

    this.m1 = m % 10;
  	this.m2 = (m % 100)/10;

    this.scene.pushMatrix();
    this.scene.translate(10,0,0);
    this.scene.scale(0.15, 4, 0.15);
    this.scene.rotate(-Math.PI/2, 1,0,0);
    this.steel.apply();
    this.cylinder2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(10,6,0);
    this.scene.scale(10,6,10);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.steel.apply();
    this.plane.display();
    this.scene.popMatrix();

    //CLOCK
    this.scene.pushMatrix();
    this.scene.translate(9.9,8,-2);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.m2){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

        default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,8,-1);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.m1){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

        default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,8,0);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.dots.apply();
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,8,1);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.zero.apply();
    switch(this.s2){

      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

        // default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,8,2);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.s1){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

      default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    //Whites
    this.scene.pushMatrix();
    this.scene.translate(9.9,4.5,-4);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.d3W){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

      default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,4.5,-3);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.d2W){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

      default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,4.5,-2);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.d1W){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

      default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();


    //Blacks
    this.scene.pushMatrix();
    this.scene.translate(9.9,4.5,2);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.d3B){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

      default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,4.5,3);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.d2B){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

      default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,4.5,4);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.d1B){
      case 0:
        this.zero.apply();
        break;

      case 1:
        this.one.apply();
        break;

      case 2:
        this.two.apply();
        break;

      case 3:
        this.three.apply();
        break;

      case 4:
        this.four.apply();
        break;

      case 5:
        this.five.apply();
        break;

      case 6:
        this.six.apply();
        break;

      case 7:
        this.seven.apply();
        break;

      case 8:
        this.eight.apply();
        break;

      case 9:
        this.nine.apply();
        break;

      default: this.zero.apply();
    }
    this.plane.display();
    this.scene.popMatrix();
  };

};
