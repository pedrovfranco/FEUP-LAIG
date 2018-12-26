class MyBoard extends Primitive
{
	constructor(scene, depth)
	{
		super(scene);

		this.cameraId = "board";

		this.fov = 1.2;
		this.near = 0.1;
		this.far = 500;

		this.cameraAngle = 0;

		this.scene.views[this.cameraId] = new CGFcamera(this.fov, this.near, this.far, vec3.fromValues(0, 5, 15), vec3.fromValues(0, 5, 0));
		this.scene.graph.viewIds.push(this.cameraId);

		this.updateBoard(getPrologRequest("kl", getResponseArray));

		this.depth = depth || 0.5;

		this.countdown = 10;

		this.animation = new Animation(this.scene);

		this.selected = null;

		this.initBuffers();
	};

	updateBoard(newBoard)
	{
		this.board = newBoard;
		this.height = this.board.length;
		this.width = this.board[0].length;
	}

	initBuffers()
	{
		this.plane = new Plane(this.scene, 10, 10);

		this.whiteAppearence = new CGFappearance(this.scene);
		this.whiteAppearence.loadTexture("scenes/images/white.png");
		this.whiteAppearence.setAmbient(1.0,1.0,1.0,1);
		this.whiteAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.whiteAppearence.setSpecular(1.0,1.0,1.0,1);
		this.whiteAppearence.setShininess(120);

		this.blackAppearence = new CGFappearance(this.scene);
		this.blackAppearence.loadTexture("scenes/images/black.jpg");
		this.blackAppearence.setAmbient(1.0,1.0,1.0,1);
		this.blackAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.blackAppearence.setSpecular(1.0,1.0,1.0,1);
		this.blackAppearence.setShininess(120);

		this.blueAppearence = new CGFappearance(this.scene);
		this.blueAppearence.loadTexture("scenes/images/blue.png");
		this.blueAppearence.setAmbient(1.0,1.0,1.0,1);
		this.blueAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.blueAppearence.setSpecular(1.0,1.0,1.0,1);
		this.blueAppearence.setShininess(120);

		this.redAppearence = new CGFappearance(this.scene);
		this.redAppearence.loadTexture("scenes/images/red.jpg");
		this.redAppearence.setAmbient(1.0,1.0,1.0,1);
		this.redAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.redAppearence.setSpecular(1.0,1.0,1.0,1);
		this.redAppearence.setShininess(120);

		this.piece = new MyPiece(this.scene);

		this.scoreBoard = new ScoreBoard(this.scene);

		this.plays = 0;
	};

	getPlayerByColour(colour)
	{
		if (colour == "w")
		{
			return 0;
		}
		else if (colour == "b")
		{
			return 1;
		}
		else
		{
			console.error("Error on colour");
		}
	}

	selectStack(obj)
	{
		if (this.getPlayerByColour(this.board[obj[1]][obj[0]][1]) == this.plays % 2)
		{
			this.selected = obj;
			this.possibleMoves = getPrologRequest("getPieceMoves(" + obj[0] + "," + obj[1] + ")", getResponseArray);
		}
	}

	logPicking()
	{
		if (this.scene.pickMode == false)
		{
			if (this.scene.pickResults != null && this.scene.pickResults.length > 0)
			{
				for (var i=0; i< this.scene.pickResults.length; i++)
				{
					var obj = this.scene.pickResults[i][0];
					if (obj)
					{
						if (this.selected == null)
						{
							this.selectStack(obj);
						}
						else
						{
							if (!this.compareArray(obj, this.selected))
							{
								if (this.findMove(obj) != -1)
								{
									let N;
									if (this.plays == 0)
									{
										N = 1;
									}
									else
									{
										N = window.prompt("Insert number of pieces to move between 1 and " + this.board[this.selected[1]][this.selected[0]][0]);
									}

									if (N == null)
									{
										continue;
									}

									if (N > 0 && N < this.board[this.selected[1]][this.selected[0]][0])
									{
										this.updateBoard(getPrologRequest("move(" +  this.selected[0] + "," + this.selected[1] + "," + obj[0] + "," + obj[1] + "," + N + ")", getResponseArray));
										this.plays++;

										this.selected = null;
										this.possibleMoves = null;
									}
									else
									{
										window.alert("Invalid number of pieces!");
										continue;
									}
								}
								else
								{
									this.selectStack(obj);
								}
							}
							else
							{
								this.selected = null;
								this.possibleMoves = null;
							}
						}

					}
				}

				this.scene.pickResults.splice(0,this.scene.pickResults.length);
			}
		}
	}

	findMove(target)
	{
		for (let i = 0; i < this.possibleMoves.length; i++)
		{
			if (this.compareArray(this.possibleMoves[i], target))
			{
				return i;
			}
		}

		return -1;
	}

	compareArray(a,b)
	{
		if (a.length != b.length)
			return false;

		for (let i = 0; i < a.length; i++)
		{
			if (a[i] != b[i])
				return false;
		}

		return true;
	}

	update(currTime, component)
	{
		this.animation.update(currTime);

		this.cameraAngle += 0.02;

		this.scene.views[this.cameraId].fov = this.fov;
		this.scene.views[this.cameraId].near = this.near;
		this.scene.views[this.cameraId].far = this.far;

		this.scene.views[this.cameraId].setPosition(vec3.fromValues(15*Math.cos(this.cameraAngle), 5, 15* Math.sin(this.cameraAngle)));
		//
		// let target = vec3.fromValues(0,0,0);
		//
		// this.scene.views[this.cameraId].setTarget(target);

		// if (this.animation.sumTime > 10 && this.animation.flag == undefined)
		// {
		//     this.updateBoard(getPrologRequest("move(1,1,3,0,5)", getResponseArray));
		//     this.animation.flag = true;
		// }


		// if(currTime % 10 != 0 && this.countdown > 0)
		// {
		// 	this.countdown--;
		// 	console.log(this.countdown);
		// }
		// this.c--;

		// console.log(this.c);
	}

	display()
	{
		this.logPicking();
		this.scene.clearPickRegistration();
		let id = 1, coords = [];

		this.scene.pushMatrix();

			// this.scene.rotate(Math.PI, 0, 1, 0);

			if (this.possibleMoves != null)
			{
				for (let i = 0; i < this.possibleMoves.length; i++)
				{
					this.scene.pushMatrix();

						this.scene.registerForPick(id, this.possibleMoves[i]);
						id++;

						coords = [(1-this.height)/2 + this.possibleMoves[i][1], 0, (1-this.width)/2 + this.possibleMoves[i][0]];
						this.scene.translate(coords[0], 0, coords[2]);

						this.redAppearence.apply();

						this.plane.display();

					this.scene.popMatrix();
				}

			}


			for (let i = 0; i < this.width; i++)
			{
				for (let j = 0; j < this.height; j++)
				{
					this.scene.pushMatrix();

						if (this.possibleMoves != null && this.findMove([i,j]) != -1)
						{
							continue;
						}

						if (this.board[j][i][0] > 0)
						{
							this.scene.registerForPick(id, [i,j]);
							id++;
						}
						else
							this.scene.clearPickRegistration();

						coords = [(1-this.height)/2 + j, 0, (1-this.width)/2 + i];
						this.scene.translate(coords[0], 0, coords[2]);

						if ((i+j)%2 == 0)
							this.whiteAppearence.apply();
						else
							this.blackAppearence.apply();

						this.plane.display();

						let colour = this.board[j][i][1];

						if (colour == "w")
						{
							this.whiteAppearence.apply();
						}
						else
						{
							this.blueAppearence.apply();
						}

						for (let k = 0; k < this.board[j][i][0]; k++)
						{
							this.scene.pushMatrix();

								this.scene.translate(0, k*(this.piece.height+0.005), 0);

								this.piece.display();

							this.scene.popMatrix();
						}

					this.scene.popMatrix();

				}
			}

			this.scene.clearPickRegistration();

			this.scene.pushMatrix();

				this.scene.translate(this.height/2, 0, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, this.width);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.rotate(Math.PI, 0, 1, 0);
				this.scene.translate(this.height/2, 0, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, this.width);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.translate(0, 0, this.width/2);
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, this.height);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.rotate(Math.PI, 0, 1, 0);
				this.scene.translate(0, 0, this.width/2);
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, this.height);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.translate(0, -this.depth, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.scene.scale(this.height, 1, this.width);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scoreBoard.display(this.plays);
		this.scene.popMatrix();
	};
};
