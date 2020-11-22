#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 uv, vec2 origin, float r)
{
    float k = (dFdx(uv.x) + dFdy(uv.y) / 2.0);
    return 1.0 - smoothstep(r - k, r + k, distance(uv, origin));
}

float rect(vec2 uv, float left, float top, float width, float height)
{
    return step(0.0, top - uv.y) * step(0.0, uv.y - (top - height))
           * step(0.0, uv.x - left) * step(0.0, (left + width) - uv.x);
}

float square(vec2 uv, vec2 origin, float size)
{
  vec2 d = abs(uv - origin);
  return 1.0 - step(size * 0.5, max(d.x, d.y));
}

float triangle(vec2 uv, vec2 origin, float size)
{
    const float pi = 3.14159265;
    float h = size * cos(pi / 3.0); // 원점과 변의 최소거리
                                                                  //     C
    vec2 A = vec2(origin.x - size * sin(pi / 3.0), origin.y - h); //     *
    vec2 B = vec2(origin.x + size * sin(pi / 3.0), origin.y - h); //   *   *
    vec2 C = vec2(origin.x, origin.y + size); //                     * * * * *
                                              //                    A         B
    float da = distance(uv, A);
    float db = distance(uv, B);
    float dc = distance(uv, C);

    vec2 nearest;
    if (da < db && da < dc)
        nearest = A;
    else if (db < da && db < dc)
        nearest = B;
    else
        nearest = C;

    vec2 v = uv - origin;
    vec2 vn = nearest - origin;
    float between_angle = acos(dot(vn, v) / (length(vn) * length(v)));

    return step(length(v), h / cos(pi / 3.0 - between_angle));
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5) * 10.0; // remap uv -10.0 ~ 10.0

    float shape;
    shape = circle(uv, vec2(0.0), 0.7);
    // shape = rect(uv, -1.0, 2.0, 2.0, 4.0);
    // shape = square(uv, vec2(0.0, 0.0), 2.0);
    // shape = triangle(uv, vec2(0.0, 0.0), 2.0);
    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color * shape, 1.0);
}