var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = null;                    // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */

        this.reader.open('scenes/' + filename, this);
    }


    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "yas")
            return "root tag <yas> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <scene>
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order");

            //Parse scene block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <ambient>
        if ((index = nodeNames.indexOf("ambient")) == -1)
            return "tag <ambient> missing";
        else {
            if (index != AMBIENT_INDEX)
                this.onXMLMinorError("tag <ambient> out of order");

            //Parse ambient block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }

        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <transformations>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse transformations block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <primitives>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse primitives block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <components>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse components block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }
    }

    /**
     * Parses the <scene> block.
     * @param {scene block element} sceneNode
     */
    parseScene(sceneNode) {

        var root = this.reader.getString(sceneNode, 'root');
        this.referenceLength = this.reader.getString(sceneNode, 'axis_length');

        if (!(this.isValid(root) && this.isValid(this.referenceLength)))
            return "Unable to parse scene";
        

        this.idRoot = root;

        this.log("Parsed scene");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {illumination block element} illuminationNode
     */
    parseViews(viewsNode) {

        var children = viewsNode.children;
        var numViews = 0;
        var viewId;

        var grandChildren = [];

        for (var i = 0; i < children.length; i++)
        {
            if (children[i].nodeName == "perspective")
            {
                var viewId = this.reader.getString(children[i], 'id');

                // Checks for error on getString
                if (viewId == null)
                    return "no ID defined for light";

                this.near = this.reader.getFloat(children[i], 'near');
                this.far = this.reader.getFloat(children[i], 'far');
                this.angle = this.reader.getFloat(children[i], 'angle');
                

                if (!(this.isValid(this.near) && this.isValid(this.far) && this.isValid(this.angle)))
                    return "Unable to parse view id=\"" + viewId + "\"";

                var x, y, z;

                grandChildren = children[i].children;

                for (var j = 0; j < grandChildren.length; j++)
                {
                    if (grandChildren[j].nodeName == "from")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'x');
                        y = this.reader.getFloat(grandChildren[j], 'y');
                        z = this.reader.getFloat(grandChildren[j], 'z');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
                            return "Unable to parse view id=\"" + viewId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.v1 = vec3.fromValues(x, y, z);
                    }
                    else if (grandChildren[j].nodeName == "to")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'x');
                        y = this.reader.getFloat(grandChildren[j], 'y');
                        z = this.reader.getFloat(grandChildren[j], 'z');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
                            return "Unable to parse view id=\"" + viewId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.v2 = vec3.fromValues(x, y, z);
                    }
                    else
                    {
                        this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
                        continue;
                    }
                }

                this.scene.camera = new CGFcamera(angle, near, far, v1, v2);
            }
            else if (children[i].nodeName == "ortho")
            {
                var viewId = this.reader.getString(children[i], 'id');

                // Checks for error on getString
                if (viewId == null)
                    return "no ID defined for light";

                var near = this.reader.getFloat(children[i], 'near');
                var far = this.reader.getFloat(children[i], 'far');
                var left = this.reader.getFloat(children[i], 'left');
                var right = this.reader.getFloat(children[i], 'right');
                var top = this.reader.getFloat(children[i], 'top');
                var bottom = this.reader.getFloat(children[i], 'bottom');

                if (!(this.isValid(near) && this.isValid(far) && this.isValid(left) && this.isValid(right) && this.isValid(top) && this.isValid(bottom)))
                    return "Unable to parse view id=\"" + viewId + "\"";
 
            }
            else
            {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            numViews++;
        }

        this.log("Parsed " + numViews + " views");

        return null;
    }

    /**
     * Parses the <ambient> block.
     * @param {illumination block element} illuminationNode
     */
    parseAmbient(ambientNode) {

        var children = ambientNode.children;

        for (var i = 0; i < children.length; i++)
        {
            if (children[i].nodeName == "ambient")
            {
                this.scene.setGlobalAmbientLight(this.reader.getFloat(children[i], 'r'), this.reader.getFloat(children[i], 'b'), this.reader.getFloat(children[i], 'g'), this.reader.getFloat(children[i], 'a'));
            }
            else if (children[i].nodeName == "background")
            {
                this.scene.gl.clearColor();
            }
            else
            {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
        }

        this.log("Parsed ambient");
        return null;
    }


    /**
     * Parses the <LIGHTS> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {

        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];        

        for (var i = 0; i < children.length; i++)
        {
            if (children[i].nodeName == "omni")
            {
                var lightId = this.reader.getString(children[i], 'id');

                // Checks for error on getString
                if (lightId == null)
                    return "no ID defined for light";

                // Checks for repeated IDs.
                if (this.lights[lightId] != null)
                    return "ID must be unique for each light (conflict: ID = " + lightId + ")";

                           
                if (this.reader.getBoolean(children[i], 'enabled'))
                    this.scene.lights[numLights].enable();

                grandChildren = children[i].children;

                var x, y ,z ,w;

                for (var j = 0; j < grandChildren.length; j++)
                {
                    if (grandChildren[j].nodeName == "location")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'x');
                        y = this.reader.getFloat(grandChildren[j], 'y');
                        z = this.reader.getFloat(grandChildren[j], 'z');
                        w = this.reader.getFloat(grandChildren[j], 'w');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setPosition(x, y, z, w);
                    }
                    else if (grandChildren[j].nodeName == "ambient")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'r');
                        y = this.reader.getFloat(grandChildren[j], 'g');
                        z = this.reader.getFloat(grandChildren[j], 'b');
                        w = this.reader.getFloat(grandChildren[j], 'a');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setAmbient(x, y, z, w);
                    }
                    else if (grandChildren[j].nodeName == "diffuse")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'r');
                        y = this.reader.getFloat(grandChildren[j], 'g');
                        z = this.reader.getFloat(grandChildren[j], 'b');
                        w = this.reader.getFloat(grandChildren[j], 'a');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setDiffuse(x, y, z, w);
                    }
                    else if (grandChildren[j].nodeName == "specular")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'r');
                        y = this.reader.getFloat(grandChildren[j], 'g');
                        z = this.reader.getFloat(grandChildren[j], 'b');
                        w = this.reader.getFloat(grandChildren[j], 'a');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setSpecular(x, y, z, w);
                    }
                    else
                    {
                        this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
                        continue;
                    }
                }

                numLights++;
            }
            else if (children[i].nodeName == "spot")
            {
                var lightId = this.reader.getString(children[i], 'id');

                // Checks for error on getString
                if (lightId == null)
                    return "no ID defined for light";

                // Checks for repeated IDs.
                if (this.lights[lightId] != null)
                    return "ID must be unique for each light (conflict: ID = " + lightId + ")";

                           
                if (this.reader.getBoolean(children[i], 'enabled'))
                    this.scene.lights[numLights].enable();

                this.scene.lights[numLights].setSpotCutOff(this.reader.getFloat(children[i], 'angle'));

                this.scene.lights[numLights].setSpotExponent(this.reader.getFloat(children[i], 'exponent'));


                grandChildren = children[i].children;

                var x, y ,z, w;

                for (var j = 0; j < grandChildren.length; j++)
                {
                    if (grandChildren[j].nodeName == "location")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'x');
                        y = this.reader.getFloat(grandChildren[j], 'y');
                        z = this.reader.getFloat(grandChildren[j], 'z');
                        w = this.reader.getFloat(grandChildren[j], 'w');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setPosition(x, y, z, w);
                    }
                    else if (grandChildren[j].nodeName == "target")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'x');
                        y = this.reader.getFloat(grandChildren[j], 'y');
                        z = this.reader.getFloat(grandChildren[j], 'z');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        // --------TODO-------------
                    }
                    else if (grandChildren[j].nodeName == "ambient")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'r');
                        y = this.reader.getFloat(grandChildren[j], 'g');
                        z = this.reader.getFloat(grandChildren[j], 'b');
                        w = this.reader.getFloat(grandChildren[j], 'a');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setAmbient(x, y, z, w);
                    }
                    else if (grandChildren[j].nodeName == "diffuse")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'r');
                        y = this.reader.getFloat(grandChildren[j], 'g');
                        z = this.reader.getFloat(grandChildren[j], 'b');
                        w = this.reader.getFloat(grandChildren[j], 'a');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setDiffuse(x, y, z, w);
                    }
                    else if (grandChildren[j].nodeName == "specular")
                    {
                        x = this.reader.getFloat(grandChildren[j], 'r');
                        y = this.reader.getFloat(grandChildren[j], 'g');
                        z = this.reader.getFloat(grandChildren[j], 'b');
                        w = this.reader.getFloat(grandChildren[j], 'a');

                        if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
                            return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

                        this.scene.lights[numLights].setSpecular(x, y, z, w);
                    }
                    else
                    {
                        this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
                        continue;
                    }
                }

                numLights++;
            }
            else
            {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }   
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed " + numLights + " lights");

        return null;
    }

    /**
     * Parses the <TEXTURES> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
        // TODO: Parse block

        var children = texturesNode.children;

        this.textures = [];
        var numTextures = 0;
        
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current texture.
            var textureId = this.reader.getString(children[i], 'id');

            if (textureId == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.textures[textureId] != null)
                return "ID must be unique for each texture (conflict: ID = " + textureId + ")";

            var filename = this.reader.getString(children[i], 'file');
            if (filename == null)
                return "no Filename defined for texture";      
                
            this.textures[textureId] = children[i];
            
        }


        console.log("Parsed textures");

        return null;
    }

    /**
     * Parses the <MATERIALS> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        
        var children = materialsNode.children;

        this.materials = [];

        var grandChildren = [];

        this.emission = [];
        this.ambient = [];
        this.diffuse = [];
        this.specular = [];

        for (var i = 0; i < children.length; i++)
        {
            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else
            {
                var materialId = this.reader.getString(children[i], 'id');
                   if (materialId == null)
                       return "no ID defined for texture";

                       // Checks for repeated IDs.
           
                if (this.materials[materialId] != null)
                    return "ID must be unique for each texture (conflict: ID = " + textureId + ")";

                
                grandChildren = children[i].children;

                for (var j = 0; j < grandChildren.length; j++)
                {
                    if (grandChildren[i].nodeName == "emission") {
                
                        this.emission[0] = this.reader.getFloat(grandChildren[i], 'r');
                        this.emission[1] =this.reader.getFloat(grandChildren[i], 'g')
                        this.emission[2] =this.reader.getFloat(grandChildren[i], 'b');
                        this.emission[3] =this.reader.getFloat(grandChildren[i], 'a');
        
        
                        }
                    else if (grandChildren[i].nodeName == "ambient") {
                        
                        this.ambient[0] = this.reader.getFloat(grandChildren[i], 'r');
                        this.ambient[1] =this.reader.getFloat(grandChildren[i], 'g')
                        this.ambient[2] =this.reader.getFloat(grandChildren[i], 'b');
                        this.ambient[3] =this.reader.getFloat(grandChildren[i], 'a');
                        }
                    else if (grandChildren[i].nodeName == "diffuse") {
                        
                        this.diffuse[0] = this.reader.getFloat(grandChildren[i], 'r');
                        this.diffuse[1] =this.reader.getFloat(grandChildren[i], 'g')
                        this.diffuse[2] =this.reader.getFloat(grandChildren[i], 'b');
                        this.diffuse[3] =this.reader.getFloat(grandChildren[i], 'a');
                        }
        
                    else if (grandChildren[i].nodeName == "specular") {
                        
                        this.specular[0] = this.reader.getFloat(grandChildren[i], 'r');
                        this.specular[1] =this.reader.getFloat(grandChildren[i], 'g')
                        this.specular[2] =this.reader.getFloat(grandChildren[i], 'b');
                        this.specular[3] =this.reader.getFloat(grandChildren[i], 'a');
                        }
                    else
                    {
                        this.onXMLMinorError("unknown tag <" + grandChildren[i].nodeName + ">");
                        continue;
                    }

                }
            }
                
            
        }
        
        this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <transformations> node.
     * @param {transformations block element} transformationsNode
     */
    parseTransformations(transformationsNode) {
        // TODO: Parse block
        this.log("Parsed transformations");
        return null;

    }

    /**
     * Parses the <primitives> node.
     * @param {primitives block element} primitivesNode
     */
    parsePrimitives(primitivesNode) {
        // TODO: Parse block
        this.log("Parsed transformations");
        return null;

    }

    /**
     * Parses the <components> node.
     * @param {components block element} componentsNode
     */
    parseComponents(componentsNode) {
        // TODO: Parse block
        this.log("Parsed components");
        return null;

    }


    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }


    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        // entry point for graph rendering
        //TODO: Render loop starting at root of graph


    }

    isValid(x)
    {
        return (x != null && !isNaN(x));
    }
}