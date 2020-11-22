#extension GL_OES_standard_derivatives : enable
precision lowp float;

uniform vec2 u_resolution;
uniform float u_time;

float eye(vec2 uv, vec2 origin)
{
    float a = acos(dot(vec2(1.0, 0.0), uv) / (length(uv)));
    float d = distance(origin, uv);
    return step(((sin(a * 10.0) + 1.0) / 2.0), d);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5);

    float shape = eye(uv, vec2(0.0, 0.0));
    vec3 color = vec3(1.0, 1.0, 1.0);

    vec3 result = color * shape;

    gl_FragColor = vec4(shape, 1.0, 1.0, 1.0);
}