#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_resolution;

float random(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 random2(vec2 co) {
  return fract(sin(vec2(dot(co, vec2(127.1, 311.7)), dot(co, vec2(269.5, 183.3)))) * 43758.5453);
}

float value_noise(vec2 uv)
{
  vec2 i = floor(uv);
  vec2 f = fract(uv);

  float a = random(i + vec2(0.0, 0.0));
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // same as smoothstep(0.0, 1.0, f). but than fast.
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
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

float cellular_noise(vec2 uv)
{
  vec2 i = floor(uv);
  vec2 f = fract(uv);

  float d = sqrt(2.0);
  for (int y = -1; y <= 1; ++y)
    for (int x = -1; x <= 1; ++x)
      d = min(d, distance(uv, i + vec2(x, y) + random2(i + vec2(x, y))));

  return min(d, 1.0);
}

float fbm(vec2 uv)
{
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;

    // Loop of octaves
    for (int i = 0; i < 99; i++) {
        value += amplitude * gradiant_noise(uv);
        uv *= 2.0;
        amplitude *= 0.5;
    }
    return value;;
}

uniform float u_time;

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv.x -= 0.5;

    float noise;
    noise = value_noise(uv * 20.0);
    uv.x += u_time * 0.1;
    noise = gradiant_noise(uv * 20.0);
    noise = 1.0 - cellular_noise(uv * 20.0 );
    //noise += fbm(uv * 20.0);

    vec3 color = vec3(0.75, 0.2, 0.3);

    gl_FragColor = vec4(color * noise, 1.0);
}