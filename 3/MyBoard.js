class MyBoard extends Primitive
{
	constructor(scene, depth)
	{
		super(scene);

		this.getBoard("kl");
        this.previousBoard = this.board;

        this.checkWin();

		this.cameraId = "ScoreBoard";
		this.fov = 1.2;
		this.near = 0.1;
		this.far = 500;
		this.cameraAngle = 0;
		this.scene.views[this.cameraId] = new CGFcamera(this.fov, this.near, this.far, vec3.fromValues(3, 5, 2), vec3.fromValues(15, 5, 2));
		this.scene.graph.viewIds.push(this.cameraId);

		this.cameraId2 = "All";
		this.fov = 1.2;
		this.near = 0.1;
		this.far = 500;
		this.enterX = 5;
		this.enterY = 2;
		this.enterZ = -2;
		this.targetX = 15;
		this.targetY = 2;
		this.targetZ = -2;
		this.incrementX = 0;
		this.incrementY = 0;
		this.incrementZ = 0;
		this.incrementTX = 0;
		this.incrementTY = 0;
		this.incrementTZ = 0;
		this.scene.views[this.cameraId2] = new CGFcamera(this.fov, this.near, this.far, vec3.fromValues(this.enterX, this.enterY, this.enterZ), vec3.fromValues(this.targetX, this.targetY, this.targetZ));
		this.scene.graph.viewIds.push(this.cameraId2);

		this.cameraId1 = "game";
		this.cameraGameAngle = 0;
		this.cameraMove = 0;
		this.scene.views[this.cameraId1] = new CGFcamera(this.fov, this.near, this.far, vec3.fromValues(0, 11, -5), vec3.fromValues(0, 5, 0));
		this.scene.graph.viewIds.push(this.cameraId1);

		this.scene.viewId = this.cameraId1;
		this.scene.setCamera();

		this.depth = depth || 0.5;

		this.countdown = 25;
		this.c = this.countdown;
		this.countdownStart = 0;

		this.selected = null;
		this.possibleMoves = null;

		this.moving = null
		this.movingAmount = null;
		this.moveAnimation = null;
		this.moveAnimationTotalTime = 1.5;

		this.botPlayQueued = false;

		this.botDelay = 2000;

		this.animation = new Animation();

		this.aux = new Animation();

		this.zecas = [ [10,0,0], [-7,0,0], [0,0,0] ];

		this.openingAnimations = 1;
		this.startAnimationWhite = new QuadraticBezierAnimation(this.scene,  this.zecas[0], this.zecas[1], this.zecas[2], 5);
		this.closeDoor = 0;

		this.scene.interface.addDifficultyGroup(this);
		this.scene.interface.addGameTypeGroup(this);
		this.scene.interface.addEnvironmentGroup(this);
		this.scene.interface.addUndoButton(this);
		this.scene.interface.addCountdownSlider(this);

		this.controlPointsPatch = [ [-1.5,-1.5, 0], [-1.5,1.5,0], [0,-1.5,1.1], [0,1.5,1.1], [1.5,-1.5,0], [1.5,1.5,0]];
		this.patch = new Patch(this.scene, 3, 2, 5, 5, this.controlPointsPatch);

		this.moves = [];
		this.newGame = false;

		this.initBuffers();
	};

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

		this.yellowAppearence = new CGFappearance(this.scene);
		this.yellowAppearence.loadTexture("scenes/images/yellow.jpg");
		this.yellowAppearence.setAmbient(1.0,1.0,1.0,1);
		this.yellowAppearence.setDiffuse(1.0,1.0,1.0,1);
		this.yellowAppearence.setSpecular(1.0,1.0,1.0,1);
		this.yellowAppearence.setShininess(120);

		this.dirt = new CGFappearance(this.scene);
		this.dirt.loadTexture("scenes/images/dirt.jpg");
		this.dirt.setAmbient(1.0,1.0,1.0,1);
		this.dirt.setDiffuse(1.0,1.0,1.0,1);
		this.dirt.setSpecular(1.0,1.0,1.0,1);
		this.dirt.setShininess(120);

		this.steel = new CGFappearance(this.scene);
		this.steel.loadTexture("scenes/images/steel.jpg");
		this.steel.setAmbient(1.0,1.0,1.0,1);
		this.steel.setDiffuse(1.0,1.0,1.0,1);
		this.steel.setSpecular(1.0,1.0,1.0,1);
		this.steel.setShininess(120);

		this.piece = new MyPiece(this.scene);

		this.scoreBoard = new ScoreBoard(this.scene);

		this.plays = 0;
		this.playsW = 0;
		this.playsB = 0;
	};

	getBoard(requestString)
	{
		var func = function (response, target)
		{
			target.board = getResponseArray(response);
		};

		getPrologRequest(requestString, this, func);
	}

	getNewBoard(requestString)
	{
		var func = function (response, target)
		{
			target.newBoard = getResponseArray(response);

			if (!target.newGame)
				target.moves.push([target.moving, target.movingAmount]);
		};

		getPrologRequest(requestString, this, func);
	}

	getMoves(requestString)
	{
		var func = function (response, target)
		{
			target.possibleMoves = getResponseArray(response);
		};

		getPrologRequest(requestString, this, func);
	}

	getBotMoves(requestString)
	{
		var func = function (response, target)
		{
			target.botMoves = getResponseArray(response);

			target.moving = [target.botMoves[0][0][0], target.botMoves[0][0][1], target.botMoves[0][1][0], target.botMoves[0][1][1]];
			target.movingAmount = target.botMoves[1];
			target.moveAnimation = new QuadraticBezierAnimation(target.scene, [0, 0, 0], [(target.moving[3]-target.moving[1])/2, 5, (target.moving[2]-target.moving[0])/2], [target.moving[3]-target.moving[1], -(target.board[target.moving[1]][target.moving[0]][0]-target.movingAmount)*(target.piece.height+0.005), target.moving[2]-target.moving[0]], target.moveAnimationTotalTime);

			target.getNewBoard("move(" +  target.moving[0] + "," + target.moving[1] + "," + target.moving[2] + "," + target.moving[3] + "," + target.movingAmount + ")");

			target.increasePlays();

			target.aux.reset();
			target.c = target.countdown;
			target.countdownStart = 0;

		};

		getPrologRequest(requestString, this, func);
	}

	getWinner()
	{
		var func = function (response, target)
		{
			target.winner = getResponse(response);
		};

		getPrologRequest("game_over", this, func);
	}

	sendRequest(requestString)
	{
		var func = function (response, thisBoard)
		{};

		getPrologRequest(requestString, this, func);
	}

	checkWin()
	{
		var func = function (response, target)
		{
			if (target.winner == "none" || target.winner == undefined || target.winner == null)
			{
				target.winner = getResponse(response);

				if (target.winner != "none")
				{
					target.display();
					window.alert(target.winner + " won!");

					target.selected = null;
					target.possibleMoves = null;
				}
			}
		};

		getPrologRequest("game_over", this, func);

	}

	increasePlays()
	{
		this.plays++;

		if (this.plays % 2 == 0)
			this.playsW++;
		else
			this.playsB++;
	}

	botPlay()
	{
		if (this.winner == "none" && this.moveAnimation == null && (this.gameType == "Bot vs Bot" || (this.gameType == "Player vs Bot" && this.plays%2 == 1)))
		{
			setTimeout(() =>
			{
				this.getBotMoves("chooseBotMove(" + this.plays + "," + (this.scene.difficultyArray.indexOf(this.difficulty)+1) + ")");

			}, this.botDelay);
		}
	}

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
			console.error("Error on colour = " + colour);
		}
	}

	selectStack(obj)
	{
		if (this.getPlayerByColour(this.board[obj[1]][obj[0]][1]) == this.plays % 2 && this.winner == "none")
		{
			this.selected = obj;
			this.getMoves("getPieceMoves(" + obj[0] + "," + obj[1] + ")");

			this.countdownStart = 1;
		}
	}

	undoMove()
	{
		if (this.previousBoard != this.board && this.winner == "none" && this.gameType != "Bot vs Bot")
		{
			this.board = this.previousBoard;

			let boardStr = JSON.stringify(this.board).replace(/"/g, "");

			this.sendRequest("setBoard(" + boardStr + ")", getResponse);

			this.selected = null;
			this.possibleMoves = null;

			if (this.gameType == "Player vs Player")
			{
				this.plays--;

				if (this.plays % 2 == 0)
					this.playsB--;
				else
					this.playsW--;
			}
			else if (this.gameType == "Player vs Bot")
			{
				this.plays -= 2;

				this.playsB--;
				this.playsW--;
			}
		}

		this.cameraGameAngle = this.plays * Math.PI;
	}

	logPicking()
	{
		if (this.scene.pickMode == false && this.winner == "none" && this.moveAnimation == null && this.cameraMove == 0  && this.openingAnimations == 0 && !this.newGame && (!(this.gameType == "Bot vs Bot" || (this.gameType == "Player vs Bot" && this.plays%2 == 1))))
		{
			if (this.scene.pickResults != null && this.scene.pickResults.length > 0)
			{
				for (var i=0; i< this.scene.pickResults.length; i++)
				{
					var obj = this.scene.pickResults[i][0];

					if (obj == "new game")
					{
						this.newGame = true;
						this.newGameIterator = 0;

						this.getBoard("kl");

						if (this.newGameIterator < this.moves.length)
						{
							setTimeout(() =>
							{
								let move = this.moves[this.newGameIterator];

								this.moving = [move[0][0], move[0][1], move[0][2], move[0][3]];
								this.movingAmount = move[1];
								this.moveAnimation = new QuadraticBezierAnimation(this.scene, [0, 0, 0], [(this.moving[3]-this.moving[1])/2, 5, (this.moving[2]-this.moving[0])/2], [this.moving[3]-this.moving[1], -(this.board[this.moving[1]][this.moving[0]][0]-this.movingAmount)*(this.piece.height+0.005), this.moving[2]-this.moving[0]], this.moveAnimationTotalTime);

								this.getNewBoard("move(" +  this.moving[0] + "," + this.moving[1] + "," + this.moving[2] + "," + this.moving[3] + "," + this.movingAmount + ")");

								this.increasePlays();

								this.selected = null;
								this.possibleMoves = null;

								this.aux.reset();
								this.c = this.countdown;
								this.countdownStart = 0;

								this.newGameIterator++;
							}, 1000);

						}
					}

					else if (obj)
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
									if (this.plays == 0 || this.board[this.selected[1]][this.selected[0]][0] == 2)
										N = 1;
									else
									{
										N = window.prompt("Insert number of pieces to move between 1 and " + (this.board[this.selected[1]][this.selected[0]][0] - 1));
										this.scene.interface.processMouseUp(new MouseEvent("mouseup"));
									}

									if (N == null)
									{
										continue;
									}

									if (N > 0 && N < this.board[this.selected[1]][this.selected[0]][0])
									{
										this.moving = [this.selected[0], this.selected[1], obj[0], obj[1]];
										this.movingAmount = N;
										this.moveAnimation = new QuadraticBezierAnimation(this.scene, [0, 0, 0], [(this.moving[3]-this.moving[1])/2, 5, (this.moving[2]-this.moving[0])/2], [this.moving[3]-this.moving[1], -(this.board[this.moving[1]][this.moving[0]][0]-this.movingAmount)*(this.piece.height+0.005), this.moving[2]-this.moving[0]], this.moveAnimationTotalTime);

										this.getNewBoard("move(" +  this.moving[0] + "," + this.moving[1] + "," + this.moving[2] + "," + this.moving[3] + "," + this.movingAmount + ")");

										this.increasePlays();

										this.selected = null;
										this.possibleMoves = null;

										this.aux.reset();
										this.c = this.countdown;
										this.countdownStart = 0;
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
			if (a[i] instanceof Array && b[i] instanceof Array)
			{
				if (!this.compareArray(a[i], b[i]))
					return false;
			}
			else if (a[i] != b[i])
			{
				return false;
			}

		}

		return true;
	}

	update(currTime, component)
	{
		if (this.openingAnimations == 1)
		{

			this.incrementX -= 0.026;
			this.incrementY += 0.046;
			this.incrementZ -= 0.016;

			this.incrementTX -= 0.078;
			this.incrementTY += 0.015;
			this.incrementTZ += 0.0105;

			if ( ((this.enterX + this.incrementX) < 0) && ((this.enterY + this.incrementY) > 11) &&  ( (this.enterZ + this.incrementZ) < -5))
			{
				this.incrementX = -5;
				this.incrementY = 9;
				this.incrementZ = -7;
			}

			if ( ((this.targetX + this.incrementTX) < 0) && ((this.targetY + this.incrementTY) > 5) &&  ( (this.targetZ + this.incrementTZ) > 0))
			{
				this.incrementTX = -15;
				this.incrementTY = 3;
				this.incrementTZ = 2;
			}


			if(this.enterX >= 0 && this.enterY <= 11 && this.enterZ >= -5)
				 {
							this.scene.views[this.cameraId2].setPosition(vec3.fromValues(this.enterX + this.incrementX, this.enterY + this.incrementY , this.enterZ + this.incrementZ ));//*Math.sin(this.cameraAngle)));
							console.log("X");
							console.log(this.enterX + this.incrementX);
							console.log("Y");
							console.log(this.enterY + this.incrementY);
							console.log("Z");
							console.log(this.enterZ + this.incrementZ);
				 }

		if(this.targetX >= 0 && this.targetY <= 5 && this.targetZ <= 0)
		{
					this.scene.views[this.cameraId2].setTarget(vec3.fromValues(this.targetX + this.incrementTX, this.targetY + this.incrementTY, this.targetZ + this.incrementTZ));
					console.log("XX");
					console.log(this.targetX + this.incrementX);
					console.log("YY");
					console.log(this.targetY + this.incrementY);
					console.log("ZZ");
					console.log(this.enterZ + this.incrementZ);
		}

			if (this.startAnimationWhite != null)
			{
				if (this.plays == 0)
				{
					if (this.startAnimationWhite.component == undefined)
						this.startAnimationWhite.setComponent(component);

					if (this.startAnimationWhite.finished)
					{
						this.moving = null;
						this.openingAnimations = 0;
						this.closeDoor = 1;
					}
					else
						this.startAnimationWhite.update(currTime);
				}
			}
		}
		else
		{
			this.scene.viewId = this.cameraId1;
			// this.scene.setCamera();

				if (this.countdownStart == 1)
				{
					this.aux.update(currTime);
					this.c -= this.aux.deltaTime;

					if (this.c <= 0)
					{
						this.increasePlays();

						this.aux.reset();
						this.c = this.countdown;

						this.selected = null;
						this.possibleMoves = null;

						this.moving = null;
						this.movingAmount = null;
						this.moveAnimation = null;

						this.cameraMove = 1;

						this.botPlayQueued = true;

						this.countdownStart = 0;
					}
				}


				this.scene.views[this.cameraId1].setPosition(vec3.fromValues(-5*Math.sin(this.cameraGameAngle), 11, -5*Math.cos(this.cameraGameAngle)));//*Math.sin(this.cameraAngle)));

				if (this.cameraMove == 1)
				{
					if (this.cameraGameAngle <= this.plays * Math.PI)
					{
						this.cameraGameAngle += Math.PI/100;

						if (this.cameraGameAngle > this.plays * Math.PI)
						{
							this.cameraGameAngle = this.plays * Math.PI;
							this.cameraMove = 0;

							if (this.newGame)
							{
								if (this.newGameIterator < this.moves.length)
								{
									let move = this.moves[this.newGameIterator];

									this.moving = [move[0][0], move[0][1], move[0][2], move[0][3]];
									this.movingAmount = move[1];
									this.moveAnimation = new QuadraticBezierAnimation(this.scene, [0, 0, 0], [(this.moving[3]-this.moving[1])/2, 5, (this.moving[2]-this.moving[0])/2], [this.moving[3]-this.moving[1], -(this.board[this.moving[1]][this.moving[0]][0]-this.movingAmount)*(this.piece.height+0.005), this.moving[2]-this.moving[0]], this.moveAnimationTotalTime);

									this.getNewBoard("move(" +  this.moving[0] + "," + this.moving[1] + "," + this.moving[2] + "," + this.moving[3] + "," + this.movingAmount + ")");

									this.increasePlays();

									this.selected = null;
									this.possibleMoves = null;

									this.aux.reset();
									this.c = this.countdown;
									this.countdownStart = 0;

									this.newGameIterator++;
								}
								else
								{
									this.newGame = false;
									this.newGameIterator = 0;
								}

							}
						}
					}
				}
				else
				{
					if (this.botPlayQueued)
					{
						this.botPlay();
						this.botPlayQueued = false;
					}

				}

				if (this.plays > 0 && this.winner == "none")
				{
					this.animation.update(currTime);
				}

				if (this.moveAnimation != null)
				{
					if (this.moveAnimation.component == undefined)
						this.moveAnimation.setComponent(component);

					if (this.moveAnimation.finished)
					{
						this.countdownStart = 0;
						this.previousBoard = this.board;

						if (this.newBoard != null && this.newBoard != undefined)
							this.board = this.newBoard;

						this.moving = null;
						this.movingAmount = null;
						this.moveAnimation = null;

						this.checkWin();

						this.cameraMove = 1;

						this.botPlayQueued = true;
					}
					else
						this.moveAnimation.update(currTime);
				}
		}
	}

	display()
	{

		if(this.closeDoor == 0)
		{
			this.scene.pushMatrix();
			this.scene.translate(14.75,1.5,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.scale(5.5,1,3);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(14,1.5,1.5);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.scale(5.5,1,1.5);
			// this.scene.rotate(-Math.PI/2,0,1,0);
			this.steel.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(14,1.5,-1.5);
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.scale(5.5,1,1.5);
			this.steel.apply();
			this.plane.display();
			this.scene.popMatrix();
		}

		if(this.environment == "Mountain")
		{
			this.scene.pushMatrix();
			this.scene.translate(14.99,3.6,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.rotate(Math.PI/2, 0,1,0);
			this.scene.scale(40,0,8.60);
			this.dirt.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,-0.39,0);
			this.scene.scale(30,0,30);
			this.dirt.apply();
			this.plane.display();
			this.scene.popMatrix();
		}

		this.scene.pushMatrix();

			if (this.board != null && this.board != undefined)
			{
				this.logPicking();
				this.scene.clearPickRegistration();
				let id = 1, coords = [], height = this.board.length, width = this.board[0].length;


					if (this.possibleMoves != null)
					{
						for (let i = 0; i < this.possibleMoves.length; i++)
						{
							this.scene.pushMatrix();

								this.scene.registerForPick(id, this.possibleMoves[i]);
								id++;

								coords = [(1-height)/2 + this.possibleMoves[i][1], 0, (1-width)/2 + this.possibleMoves[i][0]];
								this.scene.translate(coords[0], 0, coords[2]);

								this.redAppearence.apply();

								this.plane.display();

								this.scene.clearPickRegistration();


							this.scene.popMatrix();
						}

					}

					for (let i = 0; i < width; i++)
					{
						for (let j = 0; j < height; j++)
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

								coords = [(1-height)/2 + j, 0, (1-width)/2 + i];
								this.scene.translate(coords[0], 0, coords[2]);

								if(this.environment == "Ice")
								{
								if ((i+j)%2 == 0)
									this.whiteAppearence.apply();
								else
									this.blackAppearence.apply();
								}
								else {
									if ((i+j)%2 == 0)
										this.whiteAppearence.apply();
									else
										this.blueAppearence.apply();
								}
								this.plane.display();

								let colour = this.board[j][i][1];


								if(this.environment == 'Ice')
								{
									this.environmentChange = 0;
									if (colour == "w")
									{
										this.whiteAppearence.apply();
									}
									else
									{
										this.blueAppearence.apply();
									}
								}
								else
								{
									this.environmentChange = 1;
									if (colour == "w")
									{
										this.whiteAppearence.apply();
									}
									else
									{
										this.yellowAppearence.apply();
									}
								}

								for (let k = 0; k < this.board[j][i][0]; k++)
								{
									this.scene.pushMatrix();

										this.scene.translate(0, k*(this.piece.height+0.005), 0);


										if(this.openingAnimations == 1 )//&&  this.moving[0] == i && this.moving[1] == j)
										{
											this.startAnimationWhite.apply();
										}


										if (this.moving != null && this.moving[0] == i && this.moving[1] == j && this.board[j][i][0] - k <= this.movingAmount)
										{
											this.moveAnimation.apply();
										}


										this.piece.display();

									this.scene.popMatrix();
								}


								this.scene.clearPickRegistration();

							this.scene.popMatrix();

					}
				}


			this.scene.pushMatrix();

				this.scene.translate(height/2, 0, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, width);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.rotate(Math.PI, 0, 1, 0);
				this.scene.translate(height/2, 0, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, width);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.translate(0, 0, width/2);
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, height);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.rotate(Math.PI, 0, 1, 0);
				this.scene.translate(0, 0, width/2);
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.scene.rotate(-Math.PI/2, 0, 0, 1);
				this.scene.scale(this.depth, 1, height);
				this.scene.translate(0.5, 0, 0);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				this.scene.translate(0, -this.depth, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.scene.scale(height, 1, width);

				this.whiteAppearence.apply();
				this.plane.display();

			this.scene.popMatrix();

			this.scene.pushMatrix();

				let m = this.animation.sumTime / 60;
				let s = this.animation.sumTime % 60;

				if (this.aux.sumTime == 0)
					this.scoreBoard.display(this.plays, this.playsW, this.playsB, m, s, this.environmentChange, this.countdown);
				else
					this.scoreBoard.display(this.plays, this.playsW, this.playsB, m, s, this.environmentChange, this.c);

			this.scene.popMatrix();

				//Bench1
			this.scene.pushMatrix();
			this.scene.translate(0,2,-7);
		  this.scene.rotate(Math.PI/6,1,0,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.scale(2,2,1);
			this.steel.apply();
			this.patch.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,2,-7);
		  this.scene.rotate(Math.PI/6,1,0,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.scale(-2,2,1);
			this.steel.apply();
			this.patch.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-2.8,0,-7.2);
			this.scene.scale(1.5,2.0,1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-2.8,0,-7.2);
			this.scene.scale(1.5,2.0,-1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(2.8,0,-7.2);
			this.scene.scale(1.5,2.0,1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(2.8,0,-7.2);
			this.scene.scale(1.5,2.0,-1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,1,-7.2);
			this.scene.scale(5.5,1,1.5);
			this.whiteAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();


			//Bench2
			this.scene.pushMatrix();
			this.scene.translate(0,2,7);
		  this.scene.rotate(-Math.PI/6,1,0,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.scale(2,2,1);
			this.steel.apply();
			this.patch.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,2,7);
		  this.scene.rotate(-Math.PI/6,1,0,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.scale(-2,2,1);
			this.steel.apply();
			this.patch.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-2.8,0,7.2);
			this.scene.scale(1.5,2.0,1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-2.8,0,7.2);
			this.scene.scale(1.5,2.0,-1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(2.8,0,7.2);
			this.scene.scale(1.5,2.0,1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(2.8,0,7.2);
			this.scene.scale(1.5,2.0,-1.5);
			this.scene.rotate(Math.PI/2, 0,0,1);
			this.blackAppearence.apply();
			this.plane.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,1,7.2);
			this.scene.scale(5.5,1,1.5);

			if(this.environmentChange == 0)
				this.blueAppearence.apply();
			else
				this.yellowAppearence.apply();

			this.plane.display();
			this.scene.popMatrix();

			this.scene.popMatrix();
		}


	};

};
