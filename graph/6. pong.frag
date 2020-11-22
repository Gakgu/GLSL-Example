#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

float ambient()
{
  return 0.01;
}

float diffuse(vec2 uv, vec3 normal, vec3 light_pos)
{
  vec3 light_dir = normalize(light_pos - vec3(uv, 0.0));
  normal = normalize(normal);

  return max(dot(normal, light_dir), 0.0) * diffuse_stranth;
}

float specular(vec2 uv, vec3 normal, vec3 light_pos, vec3 camera_pos)
{
  float specularStrength = 1.0;
  vec3 camera_dir = normalize(vec3(uv, 0.0) - camera_pos);
  vec3 light_dir = normalize(vec3(uv, 0.0) - light_pos);
  vec3 proj = normal * dot(normal, -light_dir);
  vec3 reflect_dir = light_dir + 2.0 * proj;

  float spec = pow(max(dot(-camera_dir, reflect_dir), 0.0), 1.0);
  return specularStrength * spec;  
}

vec3 object_color = vec3(0.4, 0.2, 1.0);
vec3 light_color  = vec3(1.0, 1.0, 0.1);
vec3 light_pos    = vec3(sin(u_time), cos(u_time), 1.0);
vec3 camera_pos   = vec3(0.0, 0.0, 1.0);
vec3 normal       = vec3(0.0, 0.0, 1.0);

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5) * 2.0; // remap -1.0 ~ 1.0 

    vec3 color = (ambient() + diffuse(uv, normal, light_pos) + specular(uv, normal, light_pos, camera_pos))
                 * light_color * object_color + emissive(vec3(1.0, 0.0, 0.0), 0.7);

    gl_FragColor = vec4(color * gradiant_noise(uv * 300.0), 1.0);
}