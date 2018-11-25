#ifdef GL_ES
precision highp float;
#endif

vec2 vTextureCoord2;

uniform float length_s;
uniform float length_t;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
	vTextureCoord2 = vTextureCoord;

	vTextureCoord2[0] /= length_s;
	vTextureCoord2[1] /= length_t;

	gl_FragColor = texture2D(uSampler, vTextureCoord2);
}

