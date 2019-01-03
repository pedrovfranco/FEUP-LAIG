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

    this.ice = new CGFappearance(this.scene);
		this.ice.loadTexture("scenes/images/ice.jpeg");
		this.ice.setAmbient(1.0,1.0,1.0,1);
		this.ice.setDiffuse(1.0,1.0,1.0,1);
		this.ice.setSpecular(1.0,1.0,1.0,1);
		this.ice.setShininess(120);

    this.steel = new CGFappearance(this.scene);
		this.steel.loadTexture("scenes/images/steel.jpg");
		this.steel.setAmbient(1.0,1.0,1.0,1);
		this.steel.setDiffuse(1.0,1.0,1.0,1);
		this.steel.setSpecular(1.0,1.0,1.0,1);
		this.steel.setShininess(120);

    this.info = new CGFappearance(this.scene);
		this.info.loadTexture("scenes/images/player.png");
		this.info.setAmbient(1.0,1.0,1.0,1);
		this.info.setDiffuse(1.0,1.0,1.0,1);
		this.info.setSpecular(1.0,1.0,1.0,1);
		this.info.setShininess(120);

    this.remaining = new CGFappearance(this.scene);
		this.remaining.loadTexture("scenes/images/remaining.png");
		this.remaining.setAmbient(1.0,1.0,1.0,1);
		this.remaining.setDiffuse(1.0,1.0,1.0,1);
		this.remaining.setSpecular(1.0,1.0,1.0,1);
		this.remaining.setShininess(120);

    this.playerB = new CGFappearance(this.scene);
		this.playerB.loadTexture("scenes/images/playerBlue.png");
		this.playerB.setAmbient(1.0,1.0,1.0,1);
		this.playerB.setDiffuse(1.0,1.0,1.0,1);
		this.playerB.setSpecular(1.0,1.0,1.0,1);
		this.playerB.setShininess(120);

    this.playerW = new CGFappearance(this.scene);
		this.playerW.loadTexture("scenes/images/playerWhite.png");
		this.playerW.setAmbient(1.0,1.0,1.0,1);
		this.playerW.setDiffuse(1.0,1.0,1.0,1);
		this.playerW.setSpecular(1.0,1.0,1.0,1);
		this.playerW.setShininess(120);

    this.playerY = new CGFappearance(this.scene);
		this.playerY.loadTexture("scenes/images/playerYellow.png");
		this.playerY.setAmbient(1.0,1.0,1.0,1);
		this.playerY.setDiffuse(1.0,1.0,1.0,1);
		this.playerY.setSpecular(1.0,1.0,1.0,1);
		this.playerY.setShininess(120);

    this.blackAppearence = new CGFappearance(this.scene);
		this.blackAppearence.loadTexture("scenes/images/black.jpg");
		this.blackAppearence.setAmbient(1.0,1.0,1.0,1);
		this.blackAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.blackAppearence.setSpecular(1.0,1.0,1.0,1);
		this.blackAppearence.setShininess(120);

    this.cylinder2 = new Cylinder2(this.scene, 1, 1, 1, 30, 30);
    this.plane = new Plane(this.scene, 5, 5);

    this.loadNumbers();
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

  display(plays, playsW, playsB, m, s, environmentChange, counter)
  {
    this.d1B = Math.floor(playsW % 10);
  	this.d2B = Math.floor((playsW / 10) % 10);
  	this.d3B = Math.floor((playsW / 100) % 10);

    this.d1W = Math.floor(playsB % 10);
  	this.d2W = Math.floor((playsB / 10) % 10);
  	this.d3W = Math.floor((playsB / 100) % 10);

    this.s1 = Math.floor(s % 10);
  	this.s2 = Math.floor((s / 10) % 10);

    this.m1 = Math.floor(m % 10);
  	this.m2 = Math.floor((m / 10) % 10);

    this.c1 = Math.floor(counter % 10);
    this.c2 = Math.floor((counter/10) % 10);

    // this.scene.pushMatrix();
    // this.scene.translate(10,0,0);
    // this.scene.scale(0.15, 4, 0.15);
    // this.scene.rotate(-Math.PI/2, 1,0,0);
    // this.ice.apply();
    // this.cylinder2.display();
    // this.scene.popMatrix();
    this.scene.translate(4.9,-2,0);

    this.scene.pushMatrix();
    this.scene.translate(10,6,0);
    this.scene.scale(12,6,12);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.blackAppearence.apply();
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(10.05,6,0);
    this.scene.scale(13,7,13);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.steel.apply();
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.87,5.25,9.37);
    this.scene.scale(2,1,0.51);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.blackAppearence.apply();
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.9,5.25,6.91);
    this.scene.scale(2,1,0.51);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.blackAppearence.apply();
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(10.07,6.75,8.25);
    this.scene.scale(3.5,5.5,3.5);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.steel.apply();
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(10,6,0);
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.scale(10,6,10);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.ice.apply();
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
    this.scene.translate(9.9,4.5,-5);
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
    this.scene.translate(9.9,4.5,-4);
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
    this.scene.translate(9.9,4.5,-3);
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
    this.scene.translate(9.9,4.5,3);
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
    this.scene.translate(9.9,4.5,4);
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
    this.scene.translate(9.9,4.5,5);
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

    //Time to play
    this.scene.pushMatrix();
    this.scene.translate(9.9,7,8.15);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.scene.scale(3,1,3);
    this.remaining.apply();
    this.plane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(9.89,5.5,7.65);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.zero.apply();
    switch(this.c2){

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
    this.scene.translate(9.89,5.5,8.65);
    this.scene.scale(2,1.5,1);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    switch(this.c1){
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

    //Playing plane
    this.scene.pushMatrix();
    this.scene.translate(9.9,6,0);
    this.scene.scale(2,1.5,2);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.info.apply();
    this.plane.display();
    this.scene.popMatrix();

    //White Info
    this.scene.pushMatrix();
    this.scene.translate(9.9,6,-4);
    this.scene.scale(2,1.5,3);
    this.scene.rotate(Math.PI/2, 1,0,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.playerW.apply();
    this.plane.display();
    this.scene.popMatrix();

    if(environmentChange == 0) //Blue info
    {
      this.scene.pushMatrix();
      this.scene.translate(9.9,6,4);
      this.scene.scale(2,1.5,3);
      this.scene.rotate(Math.PI/2, 1,0,0);
      this.scene.rotate(Math.PI/2,0,0,1);
      this.playerB.apply();
      this.plane.display();
      this.scene.popMatrix();
    }
    else //Yellow info
    {
      this.scene.pushMatrix();
      this.scene.translate(9.9,6,4);
      this.scene.scale(2,1.5,3);
      this.scene.rotate(Math.PI/2, 1,0,0);
      this.scene.rotate(Math.PI/2,0,0,1);
      this.playerY.apply();
      this.plane.display();
      this.scene.popMatrix();
    }

    if (plays % 2 == 0) //whites playing
      {
        this.scene.pushMatrix();
        this.scene.translate(9.9,4.5,0);
        this.scene.scale(2,1.5,2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.playerW.apply();
        this.plane.display();
        this.scene.popMatrix();
      }
  	else
    {
      if(environmentChange == 0) //blues playing
        {
          this.scene.pushMatrix();
          this.scene.translate(9.9,4.5,0);
          this.scene.scale(2,1.5,2);
          this.scene.rotate(Math.PI/2, 1,0,0);
          this.scene.rotate(Math.PI/2,0,0,1);
          this.playerB.apply();
          this.plane.display();
          this.scene.popMatrix();
        }
      else //yellows playing
      {
          this.scene.pushMatrix();
          this.scene.translate(9.9,4.5,0);
          this.scene.scale(2,1.5,2);
          this.scene.rotate(Math.PI/2, 1,0,0);
          this.scene.rotate(Math.PI/2,0,0,1);
          this.playerY.apply();
          this.plane.display();
          this.scene.popMatrix();
      }
    }
  };

};
