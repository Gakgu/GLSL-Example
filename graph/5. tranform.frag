#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float square(vec2 uv, vec2 origin, float size)
{
  vec2 d = abs(uv - origin);
  return 1.0 - step(size * 0.5, max(d.x, d.y));
}

mat3 translate(float x, float y)
{
  return mat3(1.0, 0.0, 0.0 ,
              0.0, 1.0, 0.0 ,
              x  , y  , 1.0);
}

mat3 scale(float x, float y)
{
  return mat3(x  , 0.0, 0.0,
              0.0, y  , 0.0,
              0.0, 0.0, 1.0);
}

mat3 rotate(float t)
{
  return mat3(cos(t), sin(t), 0.0,
             -sin(t), cos(t), 0.0,
              0.0   , 0.0   , 1.0);
}

const float pi = 3.14159265;

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5) * 2.0; // remap -1.0 ~ 1.0
    uv = (translate(0.0, 0.0) * rotate(pi * 0.25) * scale(1.0, 2.0) * vec3(uv, 1.0)).xy;

    float shape = square(uv, vec2(0.0), 0.5);
    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color * shape, 1.0);
}