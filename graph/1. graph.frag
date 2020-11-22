#extension GL_OES_standard_derivatives : enable
precision mediump float;

uniform vec2 u_resolution;

float function(float x)
{
    float f = sin(x);
    // f = cos(x);
    // f = tan(x);

    return f;
}

float plot_simple(vec2 uv)
{
    return 1.0 - step(0.1, abs(uv.y - function(uv.x)));
}

float plot(vec2 uv)
{
    float dx = dFdx(uv.x);
    float dy = dFdy(uv.y);

    float y0 = function(uv.x - dx);
    float y1 = function(uv.x + dx);

    float mn = min(y0, y1);
    float mx = max(y0, y1);

    return step(mn - dx, uv.y) * (1.0 - step(mx + dx, uv.y));
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5) * 20.0; // remap -10 ~ 10

    float graph = plot(uv);
    // graph = plot_simple(uv);
    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color * graph, 1.0);
}