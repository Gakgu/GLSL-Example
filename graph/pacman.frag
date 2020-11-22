#extension GL_OES_standard_derivatives : enable
precision lowp float;

uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 uv, vec2 origin, float r)
{
    return 1.0 - step(r, distance(uv, origin));
}

float pacman(vec2 uv, vec2 origin, float r)
{
    vec2 n = vec2(1.0, 0.0);
    vec2 d = normalize(uv - origin);
    float odd = mod(floor(u_time), 2.0);
    if (1.0 <= odd) odd = 1.0; else odd = 2.0 * fract(u_time);

    if (acos(dot(n, d)) < (3.141592 / 4.0) * (odd - fract(u_time)))
        return 0.0;
    return 1.0 - step(r, distance(uv, origin));
}

float pixel(vec2 uv)
{
    vec2 origin = vec2(0.0, 0.0);
    float size = 20.0;
    return pacman(floor(uv), origin, size);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5) * 10.0; // remap uv -10.0 ~ 10.0

    float shape;
    // shape = circle(uv, vec2(0.0), 0.7);
    shape = pixel(uv * 10.0);
    float c1 = circle(uv, vec2(0.5, 1.0), 0.2);

    vec3 color = vec3(1.0, 1.0, 0.0);

    vec3 result = color * shape + vec3(c1, -1.0, -1.0);

    gl_FragColor = vec4(result, 1.0);
}