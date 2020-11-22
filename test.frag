#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 puv = uv;
    uv = (uv - 0.5) * 8.0;
    uv = fract(uv);

    vec3 color = vec3(uv.x, 1.0 - uv.y, 1.0 - puv.y);// vec3(0.3, 0.2, 0.0) * shape;// (1.0 - shape);

    gl_FragColor = vec4(color, 1.0);
}