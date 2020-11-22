#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform vec2 u_resolution;

float random(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5) * 10.0; // remap uv -10.0 ~ 10.0

    float r = random(uv);
    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color * r, 1.0);
}