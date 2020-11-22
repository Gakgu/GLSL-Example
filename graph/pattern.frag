precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3  u_camera;
uniform vec2  u_mouse;

float pi = 3.14159265;

float checker(vec2 uv)
{
    uv = fract(uv) - 0.5;
    return step(0.0, uv.x * uv.y);
}

float square(vec2 uv, vec2 origin, float size)
{
  vec2 d = abs(uv - origin);
  return 1.0 - step(size * 0.5, max(d.x, d.y));
}

vec2 offset(vec2 uv)
{
    return fract(vec2(uv.x + mod(floor(uv.y), 2.0) * 0.5, uv.y));
}

float brick(vec2 uv)
{
  uv.x *= 0.5;
  uv = offset(uv);
  vec2 i = floor(uv);
  vec2 f = fract(uv);

  vec2 d = min(f, 1.0 - f);
  return step(0.05, min(d.x * 2.0, d.y));
}

float skew(vec2 uv)
{
    return 10.0;
}


mat3 rotate(float t)
{
  return mat3(cos(t), sin(t), 0.0,
             -sin(t), cos(t), 0.0,
              0.0   , 0.0   , 1.0);
}

float random(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float gradiant_noise(vec2 uv)
{
    vec2 i = floor(uv);
    vec2 f = fract(uv);

    float a = dot(vec2(2.0 * random(i + vec2(0.0, 0.0)) - 1.0), f - vec2(0.0, 0.0));
    float b = dot(vec2(2.0 * random(i + vec2(1.0, 0.0)) - 1.0), f - vec2(1.0, 0.0));
    float c = dot(vec2(2.0 * random(i + vec2(0.0, 1.0)) - 1.0), f - vec2(0.0, 1.0));
    float d = dot(vec2(2.0 * random(i + vec2(1.0, 1.0)) - 1.0), f - vec2(1.0, 1.0));

    // same as smoothstep(0.0, 1.0, f). but than fast.
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 0.5 + 0.5;
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    // uv = (uv - 0.5) * 2.0 * 10.0; // remap -1.0 ~ 1.0
    uv *= 10.0;

    float pattern = checker(uv);
    pattern = checker(uv);
    // pattern = square(brick_offset(uv), vec2(0.5), 0.9);

    vec3 color = vec3(0.9, 0.3, 0.2);

    // gl_FragColor = vec4(color * pattern * gradiant_noise(uv * 5.0), 1.0);
    gl_FragColor = vec4(color * brick(uv) * gradiant_noise(uv * 20.0) * 1.5, 1.0);
}