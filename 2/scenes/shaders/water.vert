attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;
uniform float animationX;

void main()
{	
	vTextureCoord = aTextureCoord;
	vTextureCoord[0] += animationX;

	float h = texture2D(uSampler2, vTextureCoord).r * normScale;
	
	vec3 offset=vec3(0.0, h, 0.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

}
