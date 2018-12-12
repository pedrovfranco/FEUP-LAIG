var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var ANIMATIONS_INDEX = 7;
var PRIMITIVES_INDEX = 8;
var COMPONENTS_INDEX = 9;

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

			// <animations>
		  if ((index = nodeNames.indexOf("animations")) == -1)
			return "tag <animations> missing";
		  else {
			if (index != ANIMATIONS_INDEX)
				this.onXMLMinorError("tag <animations> out of order");

				//Parse animations block
				if ((error = this.parseAnimations(nodes[index])) != null)
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
		this.referenceLength = this.reader.getFloat(sceneNode, 'axis_length');

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

		this.views = [];
		this.viewIds = [];
		var children = viewsNode.children;
		var numViews = 0;
		var viewId;
		this.defaultViewId = this.reader.getString(viewsNode, 'default');

		var grandChildren = [];

		for (var i = 0; i < children.length; i++)
		{
			var viewId = this.reader.getString(children[i], 'id');

				 // Checks for error on getString
				 if (viewId == null)
					return "no ID defined for light";

				// Checks for repeated IDs.
				if (this.views[viewId] != undefined)
					return "ID must be unique for each light (conflict: ID = " + viewId + ")";

				this.viewIds.push(viewId);

				this.views[viewId] = [];
				this.views[viewId][1] = this.reader.getFloat(children[i], 'near');
				this.views[viewId][2] = this.reader.getFloat(children[i], 'far');

				if (children[i].nodeName == "perspective")
				{
					this.views[viewId][0] = "perspective";

					this.views[viewId][3] = this.reader.getFloat(children[i], 'angle');

					if (!this.isValid(this.views[viewId][3]))
						return "Unable to parse view id=\"" + viewId + "\"";

					grandChildren = children[i].children;

					for (var j = 0; j < grandChildren.length; j++)
					{
						if (grandChildren[j].nodeName == "from")
						{
							this.views[viewId][4] = [];
							this.views[viewId][4][0] = this.reader.getFloat(grandChildren[j], 'x');
							this.views[viewId][4][1] = this.reader.getFloat(grandChildren[j], 'y');
							this.views[viewId][4][2] = this.reader.getFloat(grandChildren[j], 'z');

							if (!(this.isValid(this.views[viewId][4][0]) && this.isValid(this.views[viewId][4][1]) && this.isValid(this.views[viewId][4][2])))
								return "Unable to parse view id=\"" + viewId + "\" on the \"" + grandChildren[j].nodeName + "\" node";
						}
						else if (grandChildren[j].nodeName == "to")
						{
							this.views[viewId][5] = [];
							this.views[viewId][5][0] = this.reader.getFloat(grandChildren[j], 'x');
							this.views[viewId][5][1] = this.reader.getFloat(grandChildren[j], 'y');
							this.views[viewId][5][2] = this.reader.getFloat(grandChildren[j], 'z');

							if (!(this.isValid(this.views[viewId][5][0]) && this.isValid(this.views[viewId][5][1]) && this.isValid(this.views[viewId][5][2])))
								return "Unable to parse view id=\"" + viewId + "\" on the \"" + grandChildren[j].nodeName + "\" node";
						}
						else
						{
							this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
							continue;
						}
					}
				}
				else if (children[i].nodeName == "ortho")
				{
					this.views[viewId][0] = "ortho";

					this.views[viewId][1] = this.reader.getFloat(children[i], 'near');
					this.views[viewId][2] = this.reader.getFloat(children[i], 'far');
					this.views[viewId][3] = this.reader.getFloat(children[i], 'left');
					this.views[viewId][4] = this.reader.getFloat(children[i], 'right');
					this.views[viewId][5] = this.reader.getFloat(children[i], 'top');
					this.views[viewId][6] = this.reader.getFloat(children[i], 'bottom');

					if (!(this.isValid(this.views[viewId][1]) && this.isValid(this.views[viewId][2]) && this.isValid(this.views[viewId][3]) && this.isValid(this.views[viewId][4]) && this.isValid(this.views[viewId][5]) && this.isValid(this.views[viewId][6])))
						return "Unable to parse view id=\"" + viewId + "\"";

					grandChildren = children[i].children;

					for (var j = 0; j < grandChildren.length; j++)
					{
						if (grandChildren[j].nodeName == "from")
						{
							this.views[viewId][7] = [];
							this.views[viewId][7][0] = this.reader.getFloat(grandChildren[j], 'x');
							this.views[viewId][7][1] = this.reader.getFloat(grandChildren[j], 'y');
							this.views[viewId][7][2] = this.reader.getFloat(grandChildren[j], 'z');

							if (!(this.isValid(this.views[viewId][7][0]) && this.isValid(this.views[viewId][7][1]) && this.isValid(this.views[viewId][7][2])))
								return "Unable to parse view id=\"" + viewId + "\" on the \"" + grandChildren[j].nodeName + "\" node";
						}
						else if (grandChildren[j].nodeName == "to")
						{
							this.views[viewId][8] = [];
							this.views[viewId][8][0] = this.reader.getFloat(grandChildren[j], 'x');
							this.views[viewId][8][1] = this.reader.getFloat(grandChildren[j], 'y');
							this.views[viewId][8][2] = this.reader.getFloat(grandChildren[j], 'z');

							if (!(this.isValid(this.views[viewId][8][0]) && this.isValid(this.views[viewId][8][1]) && this.isValid(this.views[viewId][8][2])))
								return "Unable to parse view id=\"" + viewId + "\" on the \"" + grandChildren[j].nodeName + "\" node";
						}
						else
						{
							this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
							continue;
						}
					}

				}
				else
				{
					this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
					continue;
				}

				numViews++;
			}

			if (numViews == 0)
				return "the must be at least one view defined"

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
				this.ambient = [];
				this.ambient[0] = this.reader.getFloat(children[i], 'r');
				this.ambient[1] = this.reader.getFloat(children[i], 'g');
				this.ambient[2] = this.reader.getFloat(children[i], 'b');
				this.ambient[3] = this.reader.getFloat(children[i], 'a');

				if (!(this.isValid(this.ambient[0]) && this.isValid(this.ambient[1]) && this.isValid(this.ambient[2]) && this.isValid(this.ambient[3])))
					return "Unable to parse ambient on the \"" + children[j].nodeName + "\" node";
			}
			else if (children[i].nodeName == "background")
			{
				this.background = [];
				this.background[0] = this.reader.getFloat(children[i], 'r');
				this.background[1] = this.reader.getFloat(children[i], 'g');
				this.background[2] = this.reader.getFloat(children[i], 'b');
				this.background[3] = this.reader.getFloat(children[i], 'a');

				if (!(this.isValid(this.background[0]) && this.isValid(this.background[1]) && this.isValid(this.background[2]) && this.isValid(this.background[3])))
					return "Unable to parse ambient on the \"" + children[j].nodeName + "\" node";

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
			var lightId = this.reader.getString(children[i], 'id');

				// Checks for error on getString
				if (lightId == null)
					return "no ID defined for light";

				// Checks for repeated IDs.
				if (this.lights[lightId] != null)
					return "ID must be unique for each light (conflict: ID = " + lightId + ")";

				this.lights[lightId] = [];

				this.lights[lightId][0] = this.reader.getBoolean(children[i], 'enabled');

				grandChildren = children[i].children;

				var x, y ,z ,w;

				for (var j = 0; j < grandChildren.length; j++)
				{
					if (children[i].nodeName != "omni" && children[i].nodeName != "spot")
					{
						this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
						continue;
					}

					if (grandChildren[j].nodeName == "location")
					{
						x = this.reader.getFloat(grandChildren[j], 'x');
						y = this.reader.getFloat(grandChildren[j], 'y');
						z = this.reader.getFloat(grandChildren[j], 'z');
						w = this.reader.getFloat(grandChildren[j], 'w');

						if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
							return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.lights[lightId][1] = [];
						this.lights[lightId][1][0] = x;
						this.lights[lightId][1][1] = y;
						this.lights[lightId][1][2] = z;
						this.lights[lightId][1][3] = w;
					}
					else if (grandChildren[j].nodeName == "ambient")
					{
						x = this.reader.getFloat(grandChildren[j], 'r');
						y = this.reader.getFloat(grandChildren[j], 'g');
						z = this.reader.getFloat(grandChildren[j], 'b');
						w = this.reader.getFloat(grandChildren[j], 'a');

						if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
							return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.lights[lightId][2] = [];
						this.lights[lightId][2][0] = x;
						this.lights[lightId][2][1] = y;
						this.lights[lightId][2][2] = z;
						this.lights[lightId][2][3] = w;
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

						this.lights[lightId][3] = [];
						this.lights[lightId][3][0] = x;
						this.lights[lightId][3][1] = y;
						this.lights[lightId][3][2] = z;
						this.lights[lightId][3][3] = w;
					}
					else if (grandChildren[j].nodeName == "specular")
					{
						x = this.reader.getFloat(grandChildren[j], 'r');
						y = this.reader.getFloat(grandChildren[j], 'g');
						z = this.reader.getFloat(grandChildren[j], 'b');
						w = this.reader.getFloat(grandChildren[j], 'a');

						if (!(this.isValid(x) && this.isValid(y) && this.isValid(z) && this.isValid(w)))
							return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.lights[lightId][4] = [];
						this.lights[lightId][4][0] = x;
						this.lights[lightId][4][1] = y;
						this.lights[lightId][4][2] = z;
						this.lights[lightId][4][3] = w;
					}
					else if (grandChildren[j].nodeName == "target")
					{
						x = this.reader.getFloat(grandChildren[j], 'x');
						y = this.reader.getFloat(grandChildren[j], 'y');
						z = this.reader.getFloat(grandChildren[j], 'z');

						if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
							return "Unable to parse light id=\"" + lightId + "\" on the \"" + grandChildren[j].nodeName + "\" node";


						this.lights[lightId][5] = [];
						this.lights[lightId][5][0] = x;
						this.lights[lightId][5][1] = y;
						this.lights[lightId][5][2] = z;

					}
					else
					{
						this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
						continue;
					}
				}

				if (children[i].nodeName == "spot")
				{
					this.lights[lightId][6] = this.reader.getFloat(children[i], 'angle');
					this.lights[lightId][7] = this.reader.getFloat(children[i], 'exponent');

					if (!(this.isValid(this.lights[lightId][6]) && this.isValid(y) && this.isValid(this.lights[lightId][7])))
						return "Unable to parse light id=\"" + lightId + "\"";
				}


				numLights++;
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
		  this.textures["inherit"] = "inherit";
		  this.textures["none"] = "none";
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

				this.textures[textureId] = filename;

				numTextures++;
			}

			if (numTextures == 0)
				return "there must be defined at least one texture";

			this.log("Parsed textures");

			return null;
		}

	 /**
	  * Parses the <MATERIALS> node.
	  * @param {materials block element} materialsNode
	  */
	  parseMaterials(materialsNode) {

		var children = materialsNode.children;

		this.materials = [];
		var numMaterials = 0;

		var grandChildren = [];

		var r,g,b,a;

		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeName != "material") {
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}

			var materialId = this.reader.getString(children[i], 'id');

			if (materialId == null)
				return "no ID defined for material";

			if (this.materials[materialId] != null)
				return "ID must be unique for each material (conflict: ID = " + materialId + ")";

			this.materials[materialId] = [];

			this.materials[materialId][0] = this.reader.getFloat(children[i], 'shininess');

			if (!this.isValid(this.materials[materialId][0]))
				return "Unable to parse material id=\"" + materialId + "\" on the \"" + children[j].nodeName + "\" node";

			grandChildren = children[i].children;

			for (var j = 0; j < grandChildren.length; j++)
			{
				if (grandChildren[j].nodeName == "emission")
				{
					r = this.reader.getFloat(grandChildren[j], 'r');
					g = this.reader.getFloat(grandChildren[j], 'g');
					b = this.reader.getFloat(grandChildren[j], 'b');
					a = this.reader.getFloat(grandChildren[j], 'a');

					if (!(this.isValid(r) && this.isValid(g) && this.isValid(b) && this.isValid(a)))
						return "Unable to parse material id=\"" + materialId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

					this.materials[materialId][1] = [];
					this.materials[materialId][1][0] = r;
					this.materials[materialId][1][1] = g;
					this.materials[materialId][1][2] = b;
					this.materials[materialId][1][3] = a;
				}
				else if (grandChildren[j].nodeName == "ambient")
				{
					r = this.reader.getFloat(grandChildren[j], 'r');
					g = this.reader.getFloat(grandChildren[j], 'g');
					b = this.reader.getFloat(grandChildren[j], 'b');
					a = this.reader.getFloat(grandChildren[j], 'a');

					if (!(this.isValid(r) && this.isValid(g) && this.isValid(b) && this.isValid(a)))
						return "Unable to parse material id=\"" + materialId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

					this.materials[materialId][2] = [];
					this.materials[materialId][2][0] = r;
					this.materials[materialId][2][1] = g;
					this.materials[materialId][2][2] = b;
					this.materials[materialId][2][3] = a;
				}
				else if (grandChildren[j].nodeName == "diffuse")
				{
					r = this.reader.getFloat(grandChildren[j], 'r');
					g = this.reader.getFloat(grandChildren[j], 'g');
					b = this.reader.getFloat(grandChildren[j], 'b');
					a = this.reader.getFloat(grandChildren[j], 'a');

					if (!(this.isValid(r) && this.isValid(g) && this.isValid(b) && this.isValid(a)))
						return "Unable to parse material id=\"" + materialId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

					this.materials[materialId][3] = [];
					this.materials[materialId][3][0] = r;
					this.materials[materialId][3][1] = g;
					this.materials[materialId][3][2] = b;
					this.materials[materialId][3][3] = a;
				}

				else if (grandChildren[j].nodeName == "specular")
				{
					r = this.reader.getFloat(grandChildren[j], 'r');
					g = this.reader.getFloat(grandChildren[j], 'g');
					b = this.reader.getFloat(grandChildren[j], 'b');
					a = this.reader.getFloat(grandChildren[j], 'a');

					if (!(this.isValid(r) && this.isValid(g) && this.isValid(b) && this.isValid(a)))
						return "Unable to parse material id=\"" + materialId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

					this.materials[materialId][4] = [];
					this.materials[materialId][4][0] = r;
					this.materials[materialId][4][1] = g;
					this.materials[materialId][4][2] = b;
					this.materials[materialId][4][3] = a;
				}
				else
				{
					this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
					continue;
				}

			}

			numMaterials++;
		}

		if (numMaterials == 0)
			return "there must be defined at least one material";

		this.log("Parsed materials");

		return null;
	  }

	 /**
	  * Parses the <transformations> node.
	  * @param {transformations block element} transformationsNode
	  */
	  parseTransformations(transformationsNode) {

		var children = transformationsNode.children;

		this.transformations = [];

		var grandChildren = [];

		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeName == "transformation")
			{
				var transformationId = this.reader.getString(children[i], 'id');

				if (!this.isValid(transformationId))
					return "no ID defined for transformation";

				if (this.transformations[transformationId] != null)
					return "ID must be unique for each transformation (conflict: ID = " + transformationId + ")";

				this.transformations[transformationId] = [];

				var transformationMatrix = mat4.create();

				grandChildren = children[i].children;

				for (var j = 0; j < grandChildren.length; j++)
				{
					if (grandChildren[j].nodeName == "translate")
					{
						var x = this.reader.getFloat(grandChildren[j], 'x');
						var y = this.reader.getFloat(grandChildren[j], 'y');
						var z = this.reader.getFloat(grandChildren[j], 'z');

						if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
							return "Unable to parse transformation id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						mat4.translate(transformationMatrix, transformationMatrix, vec3.fromValues(x, y, z));
					}
					else if (grandChildren[j].nodeName == "rotate")
					{
						var axis = this.reader.getString(grandChildren[j], 'axis');
						var angle = this.reader.getFloat(grandChildren[j], 'angle');

						if (!(this.isValid(axis) && this.isValid(angle)))
							return "Unable to parse transformation id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						if (axis == "x")
							mat4.rotate(transformationMatrix, transformationMatrix, angle*DEGREE_TO_RAD, vec3.fromValues(1,0,0));
						else if (axis == "y")
							mat4.rotate(transformationMatrix, transformationMatrix, angle*DEGREE_TO_RAD, vec3.fromValues(0,1,0));
						else if (axis == "z")
							mat4.rotate(transformationMatrix, transformationMatrix, angle*DEGREE_TO_RAD, vec3.fromValues(0,0,1));
						else
							return "Unable to parse transformation id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node. Axis must be \"x\", \"y\" or \"z\"";
					}
					else if (grandChildren[j].nodeName == "scale")
					{
						var x = this.reader.getFloat(grandChildren[j], 'x');
						var y = this.reader.getFloat(grandChildren[j], 'y');
						var z = this.reader.getFloat(grandChildren[j], 'z');

						if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
							return "Unable to parse transformation id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						mat4.scale(transformationMatrix, transformationMatrix, vec3.fromValues(x, y, z));
					}
					else
					{
						this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
						continue;
					}
				}

				this.transformations[transformationId] = transformationMatrix;
			}
			else
			{
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}

		}

		this.log("Parsed transformations");
		return null;
	  }

	parseAnimations(animationsNode)
	{
		var children = animationsNode.children;

		this.animations = [];
		var numAnimations = 0;

		var grandChildren = [];

		for (var i = 0; i < children.length; i++)
		{
			var animationId = this.reader.getString(children[i], 'id');

			// Checks for error on getString
			if (animationId == null)
				return "no ID defined for animation";

			// Checks for repeated IDs.
			if (this.animations[animationId] != null)
				return "ID must be unique for each animation (conflict: ID = " + animationId + ")";

			grandChildren = children[i].children;

			if (children[i].nodeName == "linear")
			{
				this.animations[animationId] = [];
				this.animations[animationId][0] = 0;											// type of animation
				this.animations[animationId][2] = this.reader.getFloat(children[i], 'span');	// span
				this.animations[animationId][1] = [];											// control points
				var xx,yy,zz;

				for (var j = 0; j < grandChildren.length; j++)
				{
					if (grandChildren[j].nodeName == "controlpoint")
					{
						this.animations[animationId][1][j] = [];
						xx = this.reader.getFloat(grandChildren[j], 'xx');
						yy = this.reader.getFloat(grandChildren[j], 'yy');
						zz = this.reader.getFloat(grandChildren[j], 'zz');

						if (!(this.isValid(xx) && this.isValid(yy) && this.isValid(zz)))
							return "Unable to parse animation id=\"" + animationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.animations[animationId][1][j][0] = xx;
						this.animations[animationId][1][j][1] = yy;
						this.animations[animationId][1][j][2] = zz;
					}
				}
			}
			else if (children[i].nodeName == "circular")
			{
				this.animations[animationId] = [];
				this.animations[animationId][0] = 1;				

				this.animations[animationId][1] = this.reader.getString(children[i],'center').split(" ");
				this.animations[animationId][2] = this.reader.getFloat(children[i],'radius');
				this.animations[animationId][3] = this.reader.getFloat(children[i],'startang');
				this.animations[animationId][4] = this.reader.getFloat(children[i],'rotang');
				this.animations[animationId][5] = this.reader.getFloat(children[i],'span');
			}
			else
			{
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}
		}
	}

	 /**
	  * Parses the <primitives> node.
	  * @param {primitives block element} primitivesNode
	  */
	  parsePrimitives(primitivesNode) 
	{

		var children = primitivesNode.children;

		this.primitives = [];

		var grandChildren = [];

		var counter = 0;

		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeName != "primitive") {
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}
			else
			{
				var primitiveId = this.reader.getString(children[i], 'id');
				if (!this.isValid(primitiveId))
					return "no ID defined for primitive";

				if (this.primitives[primitiveId] != null)
					return "ID must be unique for each primitve (conflict: ID = " + primitiveId + ")";

				grandChildren = children[i].children;

				if (grandChildren.length != 1)
					return "there must be one and only one tag for each primitive";

				for (var j = 0; j < grandChildren.length; j++)
				{
					if (grandChildren[j].nodeName == "rectangle")
					{
						counter++;
						var x1, y1, x2, y2;
						x1 = this.reader.getFloat(grandChildren[j], 'x1');
						y1 = this.reader.getFloat(grandChildren[j], 'y1');
						x2 = this.reader.getFloat(grandChildren[j], 'x2');
						y2 = this.reader.getFloat(grandChildren[j], 'y2');

						if (!(this.isValid(x1) && this.isValid(y1) && this.isValid(x2) && this.isValid(y2)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.primitives[primitiveId] = new Rectangle(this.scene, x1,y1,x2,y2, 100);
					}

					else if (grandChildren[j].nodeName == "triangle")
					{
						var x1,x2,x3,y1,y2,y3,z1,z2,z3;
						x1 = this.reader.getFloat(grandChildren[j], 'x1');
						y1 = this.reader.getFloat(grandChildren[j], 'y1');
						z1 = this.reader.getFloat(grandChildren[j], 'z1');
						x2 = this.reader.getFloat(grandChildren[j], 'x2');
						y2 = this.reader.getFloat(grandChildren[j], 'y2');
						z2 = this.reader.getFloat(grandChildren[j], 'z2');
						x3 = this.reader.getFloat(grandChildren[j], 'x3');
						y3 = this.reader.getFloat(grandChildren[j], 'y3');
						z3 = this.reader.getFloat(grandChildren[j], 'z3');

						if (!(this.isValid(x1) && this.isValid(y1) && this.isValid(z1) && this.isValid(x2) && this.isValid(y2) && this.isValid(z2) && this.isValid(x3) && this.isValid(y3) && this.isValid(z3)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.primitives[primitiveId] = new Triangle(this.scene, x1, y1, z1, x2, y2, z2, x3, y3, z3);
					}

					else if (grandChildren[j].nodeName == "cylinder")
					{
						var base, top, height, slices, stacks;
						base = this.reader.getFloat(grandChildren[j], 'base');
						top = this.reader.getFloat(grandChildren[j], 'top');
						height = this.reader.getFloat(grandChildren[j], 'height');
						slices = this.reader.getInteger(grandChildren[j], 'slices');
						stacks = this.reader.getInteger(grandChildren[j], 'stacks');

						if (!(this.isValid(base) && this.isValid(top) && this.isValid(height) && this.isValid(slices) && this.isValid(stacks)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.primitives[primitiveId] = new Cylinder(this.scene, base, top, height, slices, stacks);
					}

					else if (grandChildren[j].nodeName == "sphere")
					{
						var radius, slices, stacks;
						radius = this.reader.getFloat(grandChildren[j], 'radius');
						slices = this.reader.getInteger(grandChildren[j], 'slices');
						stacks = this.reader.getInteger(grandChildren[j], 'stacks');

						if (!(this.isValid(radius) && this.isValid(slices) && this.isValid(stacks)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.primitives[primitiveId] = new Sphere(this.scene, radius, slices, stacks);
					}

					else if (grandChildren[j].nodeName == "torus")
					{
						var inner, outer, slices, loops;
						inner = this.reader.getFloat(grandChildren[j], 'inner');
						outer = this.reader.getInteger(grandChildren[j], 'outer');
						slices = this.reader.getInteger(grandChildren[j], 'slices');
						loops = this.reader.getInteger(grandChildren[j], 'loops');

						if (!(this.isValid(inner) && this.isValid(outer) && this.isValid(slices) && this.isValid(loops)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.primitives[primitiveId] = new Torus(this.scene, inner, outer, slices, loops);
					}
					else if (grandChildren[j].nodeName == "plane")
					{
						var nPartsU,nPartsV ;
						nPartsU = this.reader.getInteger(grandChildren[j], 'npartsU');
						nPartsV = this.reader.getInteger(grandChildren[j], 'npartsV');

						if (!(this.isValid(nPartsU) && this.isValid(nPartsV)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

							 //  this.primitives[primitiveId] = new Plane());
							}
					else if (grandChildren[j].nodeName == "patch")
					{
						var npointsU,npointsV, npartsU, npartsV ;

						npointsU = this.reader.getInteger(grandChildren[j], 'npointsU');
						npointsV = this.reader.getInteger(grandChildren[j], 'npointsV');
						npartsU = this.reader.getInteger(grandChildren[j], 'npartsU');
						npartsV = this.reader.getInteger(grandChildren[j], 'npartsV');

						if (!(this.isValid(npointsU) && this.isValid(npointsV) && this.isValid(npartsU) && this.isValid(npartsV)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";


						var greatgrandChildren = grandChildren[j].children;

						this.controlpoints = [];
			
						for( var p = 0 ; p < greatgrandChildren.length; p++)
						{ 
							if(greatgrandChildren[p].nodeName == "controlpoint")
							{
								var xx,yy,zz;

								xx = this.reader.getFloat(greatgrandChildren[p], 'xx');
								yy = this.reader.getFloat(greatgrandChildren[p], 'yy');
								zz = this.reader.getFloat(greatgrandChildren[p], 'zz');

								if (!(this.isValid(xx) && this.isValid(yy) && this.isValid(zz)))
									return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";
							
								this.controlpoints.push([xx,yy,zz]);
							}

							else
							{
								this.onXMLMinorError("unknown tag <" + greatgrandChildren[j].nodeName + ">");
								continue;
							}
						}

						// this.log("controlpoints: ");
						// console.log(this.controlpoints);
						this.primitives[primitiveId] = new Patch(this.scene, npointsU, npointsV, npartsU, npartsV, this.controlpoints);
					}
					
					else if (grandChildren[j].nodeName == "vehicle")
					{

					  this.primitives[primitiveId] = new Vehicle(this.scene);
					}

					else if (grandChildren[j].nodeName == "cylinder2")
					{
						var base,top,height,slices,stacks;

						base = this.reader.getFloat(grandChildren[j],'base');
						top = this.reader.getFloat(grandChildren[j],'top');
						height = this.reader.getFloat(grandChildren[j],'height');
						slices = this.reader.getInteger(grandChildren[j],'slices');
						stacks = this.reader.getInteger(grandChildren[j],'stacks');

						if (!(this.isValid(base) && this.isValid(top) && this.isValid(height) && this.isValid(slices) && this.isValid(stacks)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

					this.primitives[primitiveId] = new Cylinder2(this.scene, base, top, height, slices ,stacks);
					}
					else if (grandChildren[j].nodeName == "terrain")
					{
						var idtexture,idheightmap,parts,heightscale;

						idtexture = this.reader.getString(grandChildren[j], 'idtexture');
						idheightmap = this.reader.getString(grandChildren[j], 'idheightmap');
						parts = this.reader.getInteger(grandChildren[j], 'parts');
						heightscale = this.reader.getFloat(grandChildren[j], 'heightscale');

						if (!(this.isValid(idtexture) && this.isValid(idheightmap) && this.isValid(parts) && this.isValid(heightscale)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

					   this.primitives[primitiveId] = new Terrain(this.scene , idtexture, idheightmap, parts, heightscale);
					}
					else if (grandChildren[j].nodeName == "water")
					{
						var idtexture, idwavemap, parts, heightscale, texscale;

						idtexture = this.reader.getString(grandChildren[j],'idtexture');
						idwavemap = this.reader.getString(grandChildren[j],'idwavemap');
						parts = this.reader.getInteger(grandChildren[j],'parts');
						heightscale = this.reader.getFloat(grandChildren[j],'heightscale');
						texscale = this.reader.getFloat(grandChildren[j],'texscale');

						if (!(this.isValid(idtexture) && this.isValid(idwavemap) && this.isValid(parts) && this.isValid(heightscale) && this.isValid(texscale)))
							return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

						this.primitives[primitiveId] = new Water(this.scene , idtexture, idwavemap, parts, heightscale, texscale);							
					}
					else
					{
						this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
						continue;
					}

				}

			}
		}


		this.log("Parsed primitives");
		return null;
	}

	 /**
	  * Parses the <components> node.
	  * @param {components block element} componentsNode
	  */
	  parseComponents(componentsNode) {

		var children = componentsNode.children;
		var grandChildren;
		var grandGrandChildren;

		this.components = [];
		var componentsTemp = [];

		var numComponents = 0;
		var componentId;

		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeName == "component")
			{
				componentId = this.reader.getString(children[i], 'id');
				if (!this.isValid(componentId))
					return "no ID defined for component";

				if (componentsTemp[componentId] != null)
					return "ID must be unique for each component (conflict: ID = " + componentId + ")";

				componentsTemp[componentId] = [];
				componentsTemp[componentId][3] = null;

				grandChildren = children[i].children;

				for (var j = 0; j < grandChildren.length; j++)
				{
					if (grandChildren[j].nodeName == "transformation")
					{
						componentsTemp[componentId][0] = [];
						var numTransformations = 0;

						var transformationMatrix = mat4.create();

						grandGrandChildren = grandChildren[j].children;

						for (var k = 0; k < grandGrandChildren.length; k++)
						{
							componentsTemp[componentId][0][numTransformations] = [];

							if (grandGrandChildren[k].nodeName == "transformationref")
							{
								var transformationId = this.reader.getString(grandGrandChildren[k], 'id');

								if (!this.isValid(transformationId))
									return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node" + "on the \"" + grandGrandChildren[k].nodeName + "\" node";

								componentsTemp[componentId][0][numTransformations] = this.transformations[transformationId];

								if (this.transformations[transformationId] == undefined)
									return "Undefined transformationref in component \"" + componentId + "\"";

								if (grandGrandChildren.length != 1)
									return "Only one transformation reference can be used";
							}
							else if (grandGrandChildren[k].nodeName == "translate")
							{
								var x = this.reader.getFloat(grandGrandChildren[k], 'x');
								var y = this.reader.getFloat(grandGrandChildren[k], 'y');
								var z = this.reader.getFloat(grandGrandChildren[k], 'z');

								if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
									return "Unable to parse transformationl id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

								mat4.translate(transformationMatrix, transformationMatrix, vec3.fromValues(x, y, z));
							}
							else if (grandGrandChildren[k].nodeName == "rotate")
							{
								var axis = this.reader.getString(grandGrandChildren[k], 'axis');
								var angle = this.reader.getFloat(grandGrandChildren[k], 'angle');

								if (!(this.isValid(axis) && this.isValid(angle)))
									return "Unable to parse transformation id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

								if (axis == "x")
									mat4.rotate(transformationMatrix, transformationMatrix, angle*DEGREE_TO_RAD, vec3.fromValues(1,0,0));
								else if (axis == "y")
									mat4.rotate(transformationMatrix, transformationMatrix, angle*DEGREE_TO_RAD, vec3.fromValues(0,1,0));
								else if (axis == "z")
									mat4.rotate(transformationMatrix, transformationMatrix, angle*DEGREE_TO_RAD, vec3.fromValues(0,0,1));
								else
									return "Unable to parse transformation id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node. Axis must be \"x\", \"y\" or \"z\"";
							}
							else if (grandGrandChildren[k].nodeName == "scale")
							{
								var x = this.reader.getFloat(grandGrandChildren[k], 'x');
								var y = this.reader.getFloat(grandGrandChildren[k], 'y');
								var z = this.reader.getFloat(grandGrandChildren[k], 'z');

								if (!(this.isValid(x) && this.isValid(y) && this.isValid(z)))
									return "Unable to parse transformation id=\"" + transformationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

								mat4.scale(transformationMatrix, transformationMatrix, vec3.fromValues(x, y, z));
							}
							else
							{
								this.onXMLMinorError("unknown tag <" + grandGrandChildren[k].nodeName + ">");
								continue;
							}

							numTransformations++;
						}

						componentsTemp[componentId][0] = transformationMatrix;
					}

					else if (grandChildren[j].nodeName == "materials")
					{
						componentsTemp[componentId][1] = [];

						grandGrandChildren = grandChildren[j].children;

						for (var k = 0; k < grandGrandChildren.length; k++)
						{
							componentsTemp[componentId][1][k] = this.reader.getString(grandGrandChildren[k], 'id');

							if (!(this.isValid(componentsTemp[componentId][1][k])))
								return "Unable to parse " + children[i].nodeName + "id=\"" + primitiveId + "\" on the \"" + grandChildren[j].nodeName + "\" node" + "on the \"" + grandGrandChildren[k].nodeName + "\" node";

						}
					}

					else if (grandChildren[j].nodeName == "texture")
					{
						componentsTemp[componentId][2] = [];
						componentsTemp[componentId][2][0] = this.reader.getString(grandChildren[j], 'id');
						componentsTemp[componentId][2][1] = this.reader.getFloat(grandChildren[j], 'length_s');
						componentsTemp[componentId][2][2] = this.reader.getFloat(grandChildren[j], 'length_t');

						if (!(this.isValid(componentsTemp[componentId][2][0]) && this.isValid(componentsTemp[componentId][2][1]) && this.isValid(componentsTemp[componentId][2][2])))
							return "Unable to parse component id=\"" + componentId + "\" on the \"" + grandChildren[j].nodeName + "\" node";
					}

					else if (grandChildren[j].nodeName == "animations")
					{
						componentsTemp[componentId][3] = [];

						grandGrandChildren = grandChildren[j].children;

						for (var k = 0; k < grandGrandChildren.length; k++)
						{
							var id = this.reader.getString(grandGrandChildren[k], 'id');

							if (!this.isValid(id))
								return "Unable to parse component id=\"" + componentId + "\" on the \"" + grandChildren[j].nodeName + "\" node" + " on the \"" + grandGrandChildren[k].nodeName + "\" node";

							if (this.animations[id][0] == 0) // Linear
							{
								componentsTemp[componentId][3].push(new LinearAnimation(this.scene, this.animations[id][1], this.animations[id][2]));
							}
							else if (this.animations[id][0] == 1) // Circular
							{
								componentsTemp[componentId][3].push(new CircularAnimation(this.scene, this.animations[id][1], this.animations[id][2], this.animations[id][3], this.animations[id][4], this.animations[id][5]));
							}
						}

						
					}

					else if (grandChildren[j].nodeName == "children")
					{
						componentsTemp[componentId][4] = [];
						componentsTemp[componentId][4][0] = [];
						componentsTemp[componentId][4][1] = [];

						var numComponentsref = 0;
						var numPrimitiveref = 0;

						grandGrandChildren = grandChildren[j].children;

						for (var k = 0; k < grandGrandChildren.length; k++)
						{
							if (grandGrandChildren[k].nodeName == "componentref")
							{
								var id = this.reader.getString(grandGrandChildren[k], 'id');
								if (!this.isValid(id))
									return "Unable to parse component id=\"" + componentId + "\" on the \"" + grandChildren[j].nodeName + "\" node" + "on the \"" + grandGrandChildren[k].nodeName + "\" node";

								componentsTemp[componentId][4][0].push(id);

								numComponentsref++;
							}

							else if (grandGrandChildren[k].nodeName == "primitiveref")
							{
								var id = this.reader.getString(grandGrandChildren[k], 'id');

								if (!this.isValid(id))
									return "Unable to parse component id=\"" + componentId + "\" on the \"" + grandChildren[j].nodeName + "\" node" + "on the \"" + grandGrandChildren[k].nodeName + "\" node";

								componentsTemp[componentId][4][1].push(id);

								numPrimitiveref++;
							}

							else
							{
								this.onXMLMinorError("unknown tag <" + grandGrandChildren[k].nodeName + ">");
								continue;
							}
						}

					}

					else
					{
						this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
						continue;
					}

				}
			}
			else
			{
				this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
				continue;
			}

			this.components[componentId] = new Component(this.scene, componentsTemp[componentId][0], componentsTemp[componentId][1], componentsTemp[componentId][2], componentsTemp[componentId][3], componentsTemp[componentId][4][0], componentsTemp[componentId][4][1], componentId);

			numComponents++;
		}

		this.checkBrokenRef(this.components[this.idRoot]);

		this.initMaterials();

		this.log("Parsed components");
		return null;

	  }



	  checkBrokenRef(componentX)
	  {
		for (var i = 0; i < componentX.componentsRef.length; i++)
		{
			if (this.components[componentX.componentsRef[i]] == undefined)
				console.log("Component \"" + componentX.id + "\" has reference to undefined component \"" + componentX.componentsRef[i] + "\" ");
			else
				this.checkBrokenRef(this.components[componentX.componentsRef[i]]);
		}

		for (var i = 0; i < componentX.primitivesRef.length; i++)
		{
			if (this.primitives[componentX.primitivesRef[i]] == undefined)
				console.log("Component \"" + componentX.id + "\" has reference to undefined primitive \"" + componentX.primitivesRef[i] + "\" ");
		}

	  }


	  initMaterials()
	  {
		this.fixInheritanceMaterials(this.components[this.idRoot], undefined);
	  }

	fixInheritanceTextures(componentX, componentLast)
	{
		if (componentX.texture[0] == "inherit")
		{
			if (componentLast.texture[0] != "none")
			{
				componentX.texture[0] = componentLast.texture[0];
				componentX.material.loadTexture(this.textures[componentX.texture[0]]);
			}
		}
		else if (componentX.texture[0] == "none")
		{
			// Doesn't load texture			
		}
		else
		{
			if (this.textures[componentX.texture[0]] == undefined)
				var a = 0;
				
			componentX.material.loadTexture(this.textures[componentX.texture[0]]);
		}
	}

		fixInheritanceMaterials(componentX, componentLast)
		{
			if (componentX.materials[componentX.idMaterial] == "inherit")
			{
				componentX.material = new CGFappearance(this.scene);

				componentX.materialParameters = componentLast.materialParameters;

				this.fixInheritanceTextures(componentX, componentLast);

				componentX.material.setEmission(componentX.materialParameters[1][0], componentX.materialParameters[1][1], componentX.materialParameters[1][2], componentX.materialParameters[1][3]);
				componentX.material.setAmbient(componentX.materialParameters[2][0], componentX.materialParameters[2][1], componentX.materialParameters[2][2], componentX.materialParameters[2][3]);
				componentX.material.setDiffuse(componentX.materialParameters[3][0], componentX.materialParameters[3][1], componentX.materialParameters[3][2], componentX.materialParameters[3][3]);
				componentX.material.setSpecular(componentX.materialParameters[4][0], componentX.materialParameters[4][1], componentX.materialParameters[4][2], componentX.materialParameters[4][3]);
				componentX.material.setShininess(componentX.materialParameters[0]);
			}
			else if (componentX.materials[componentX.idMaterial] == "none")
			{
				componentX.material = new CGFappearance(this.scene);

				this.fixInheritanceTextures(componentX, componentLast);
			}
			else
			{
				componentX.material = new CGFappearance(this.scene);

				componentX.materialParameters = this.materials[componentX.materials[componentX.idMaterial]];

				this.fixInheritanceTextures(componentX, componentLast);

				componentX.material.setEmission(componentX.materialParameters[1][0], componentX.materialParameters[1][1], componentX.materialParameters[1][2], componentX.materialParameters[1][3]);
				componentX.material.setAmbient(componentX.materialParameters[2][0], componentX.materialParameters[2][1], componentX.materialParameters[2][2], componentX.materialParameters[2][3]);
				componentX.material.setDiffuse(componentX.materialParameters[3][0], componentX.materialParameters[3][1], componentX.materialParameters[3][2], componentX.materialParameters[3][3]);
				componentX.material.setSpecular(componentX.materialParameters[4][0], componentX.materialParameters[4][1], componentX.materialParameters[4][2], componentX.materialParameters[4][3]);
				componentX.material.setShininess(componentX.materialParameters[0]);

			}

			for (var i = 0; i < componentX.componentsRef.length; i++)
			{
				if (this.components[componentX.componentsRef[i]] == undefined)
				{
					if (this.warned[0][componentX.componentsRef[i]] == undefined)
					{
						this.warned[0][componentX.componentsRef[i]] = true;
						console.log("Undefined component reference on component \"" + componentX.id + "\" to component \"" + componentX.componentsRef[i] + "\"");
					}
				}
				else if (componentX.materialParameters == undefined && componentX.materials[componentX.idMaterial] != "inherit" && componentX.materials[componentX.idMaterial] != "inherit")
				{
					if (this.warned[1][componentX.componentsRef[i]] == undefined)
					{
						this.warned[0][componentX.componentsRef[i]] = true;
						console.log("Undefined material reference on component \"" + componentX.id + "\" to material \"" + componentLast.materialRef + "\"");
					}
				}
				else if (this.textures[componentX.texture[0]] == undefined && componentX.texture[0] != "inherit" && componentX.texture[0] != "inherit")
				{
					if (this.warned[2][componentX.componentsRef[i]] == undefined)
					{
						this.warned[2][componentX.componentsRef[i]] = true;
						console.log("Undefined texture reference on component \"" + componentX.id + "\" to texture \"" + componentX.texture[0] + "\"");
					}
				}
				else
				{
					this.fixInheritanceMaterials(this.components[componentX.componentsRef[i]], componentX);
				}
			}
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
	  displayScene() 
	  {
		  // entry point for graph rendering
		  //TODO: Render loop starting at root of graph


		  this.components[this.idRoot].display();

		}

		isValid(x)
		{
			if (typeof x === "string")
				return (x !== null);
			else
				return (x !== null && !isNaN(x));
		}
	}
