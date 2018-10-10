var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.lightValues = {};
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.initCameras();

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights()
    {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];

                //lights are predefined in cgfscene
                this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
                this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

                this.lights[i].setVisible(true);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                //Spot

                if (light[5] != undefined)
                {
                    this.lights[i].setSpotDirection(light[5][0] - light[1][0], light[5][1] - light[1][1], light[5][2] - light[1][2]); // Direction is equal to the vector that starts on position and ends on target
                    this.lights[i].setSpotCutOff(light[6]);
                    this.lights[i].setSpotExponent(light[7]);
                }

                this.lights[i].update();

                i++;
            }
        }
    }

    initMaterials()
    {
        this.fixInheritanceMaterials(this.graph.components[this.graph.idRoot], undefined);
    }

    fixInheritanceTextures(componentX, componentLast)
    {
        if (componentX.texture[0] != "inherit")
        {
            componentX.material.loadTexture(componentX.texture[0]);
            componentX.material.setTextureWrap(componentX.texture[1], componentX.texture[2]);
        }
        else
        {
            componentX.material.loadTexture(componentLast.texture[0]);
            componentX.material.setTextureWrap(componentLast.texture[1], componentLast.texture[2]);
        }
    }


    fixInheritanceMaterials(componentX, componentLast)
    {
        if (componentX.materialRef != "inherit")
        {
            componentX.material = new CGFappearance(this);

            this.fixInheritanceTextures(componentX, componentLast);

            componentX.material.setEmission(this.graph.materials[componentX.materialRef][1][0], this.graph.materials[componentX.materialRef][1][1], this.graph.materials[componentX.materialRef][1][2], this.graph.materials[componentX.materialRef][1][3]);
            componentX.material.setAmbient(this.graph.materials[componentX.materialRef][2][0], this.graph.materials[componentX.materialRef][2][1], this.graph.materials[componentX.materialRef][2][2], this.graph.materials[componentX.materialRef][2][3]);
            componentX.material.setDiffuse(this.graph.materials[componentX.materialRef][3][0], this.graph.materials[componentX.materialRef][3][1], this.graph.materials[componentX.materialRef][3][2], this.graph.materials[componentX.materialRef][3][3]);
            componentX.material.setSpecular(this.graph.materials[componentX.materialRef][4][0], this.graph.materials[componentX.materialRef][4][1], this.graph.materials[componentX.materialRef][4][2], this.graph.materials[componentX.materialRef][4][3]);
            componentX.material.setShininess(this.graph.materials[componentX.materialRef][0]);
        }
        else
        {
            componentX.material = new CGFappearance(this);

            this.fixInheritanceTextures(componentX, componentLast);

            componentX.material.setEmission(this.graph.materials[componentLast.materialRef][1][0], this.graph.materials[componentLast.materialRef][1][1], this.graph.materials[componentLast.materialRef][1][2], this.graph.materials[componentLast.materialRef][1][3]);
            componentX.material.setAmbient(this.graph.materials[componentLast.materialRef][2][0], this.graph.materials[componentLast.materialRef][2][1], this.graph.materials[componentLast.materialRef][2][2], this.graph.materials[componentLast.materialRef][2][3]);
            componentX.material.setDiffuse(this.graph.materials[componentLast.materialRef][3][0], this.graph.materials[componentLast.materialRef][3][1], this.graph.materials[componentLast.materialRef][3][2], this.graph.materials[componentLast.materialRef][3][3]);
            componentX.material.setSpecular(this.graph.materials[componentLast.materialRef][4][0], this.graph.materials[componentLast.materialRef][4][1], this.graph.materials[componentLast.materialRef][4][2], this.graph.materials[componentLast.materialRef][4][3]);
            componentX.material.setShininess(this.graph.materials[componentLast.materialRef][0]);
        }
        
        for (var i = 0; i < componentX.componentsRef.length; i++)
        {
            this.fixInheritanceMaterials(this.graph.components[componentX.componentsRef[i]], componentX);
        }
    }

    
    /* Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {

        // this.camera = new CGFcamera(this.graph.fov, this.graph.near, this.graph.far, vec3.fromValues(this.graph.v1[0], this.graph.v1[1], this.graph.v1[2]), vec3.fromValues(this.graph.v2[0], this.graph.v2[1], this.graph.v2[2]));

        this.camera.near = this.graph.near;
        this.camera.far = this.graph.far;
        this.camera.fov = this.graph.fov;
        this.camera.position = vec4.fromValues(this.graph.v1[0], this.graph.v1[1], this.graph.v1[2], 1);
        this.camera.target = vec4.fromValues(this.graph.v2[0], this.graph.v2[1], this.graph.v2[2], 1);

        //TODO: Change reference length according to parsed graph
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        // TODO: Change ambient and background details according to parsed graph

        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);
        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

        this.initLights();

        // Adds lights group.
        this.interface.addLightsGroup(this.graph.lights);

        this.sceneInited = true;

        this.materialDefault = new CGFappearance(this);
        
        this.initMaterials();
    }


    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);


        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();

        if (this.sceneInited) {
            // Draw axis
            this.axis.display();

            var i = 0;
            for (var key in this.lightValues) {
                if (this.lightValues.hasOwnProperty(key)) {
                    if (this.lightValues[key]) {
                        this.lights[i].setVisible(true);
                        this.lights[i].enable();
                    }
                    else {
                        this.lights[i].setVisible(false);
                        this.lights[i].disable();
                    }
                    this.lights[i].update();
                    i++;
                }
            }

            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
        }
        else {
            // Draw axis
            this.axis.display();
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }
}