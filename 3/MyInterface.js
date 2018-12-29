/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();


        this.initKeys();

        return true;
    }

    /**
     * Adds a folder containing the IDs of the lights passed as parameter.
     * @param {array} lights
     */
    addLightsGroup(lights) {

        var group = this.gui.addFolder("Lights");
        group.open();

        // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
        // e.g. this.option1=true; this.option2=false;

        for (var key in lights) {
            if (lights.hasOwnProperty(key)) {
                this.scene.lightValues[key] = lights[key][0];
                group.add(this.scene.lightValues, key);
            }
        }
    }

    addViewsGroup(views) {

        var element = this.gui.add(this.scene, 'viewId', views);
        element.scene = this.scene;

        element.onChange(function(arg)
        {
            this.scene.setCamera();
        });
    }

    addDifficultyGroup(board)
    {
        this.scene.difficultyArray = ['Medium', 'Hard'];
        board.difficulty = this.scene.difficultyArray[0];

        var element = this.gui.add(board, 'difficulty', this.scene.difficultyArray);
        element.scene = this.scene;

        element.onChange(function(arg)
        {
            board.difficulty = arg;
        });
    }

    addEnvironmentGroup(board)
    {
      let environmentArray = ['Ice', 'Mountain'];
      board.environment = environmentArray[0];

      var element = this.gui.add(board, 'environment', environmentArray);
      element.scene = this.scene;

      element.onChange(function(arg)
      {
          board.environment = arg;
      });

    };

    addGameTypeGroup(board)
    {
        let gameTypeArray = ['Player vs Player', 'Player vs Bot', 'Bot vs Bot'];
        board.gameType = gameTypeArray[0];

        var element = this.gui.add(board, 'gameType', gameTypeArray);
        element.scene = this.scene;

        element.onChange(function(arg)
        {
            board.winner = "none";

            board.cameraGameAngle = 0;
            board.cameraMove = 0;

            board.updateBoard(getPrologRequest("kl", getResponseArray));
            board.previousBoard = board.board;

            board.selected = null;
            board.possibleMoves = null;

            board.moving = null
            board.movingAmount = null;
            board.moveAnimation = null;
            board.moveAnimationTotalTime = 1.5;

            board.botDelay = 2000;

            board.botPlayQueued = false;

            board.animation = new Animation();

            board.plays = 0;
            board.playsW = 0;
            board.playsB = 0;

            board.botPlay();
        });
    }

    addUndoButton(board)
    {
        var obj =
        {
            undoLastMove:function()
            {
                board.undoMove();
            }
        };

        this.gui.add(obj, 'undoLastMove');
    }

    /**
	 * processKeyboard
	 * @param event {Event}
	 */
	initKeys()
	{
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}


	processKeyDown(event)
	{
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event)
	{
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode)
	{
		return this.activeKeys[keyCode] || false;
	}
}
