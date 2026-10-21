/**
 * The last pass over the picture: a vignette, a touch of contrast and warmth, and a little
 * film grain. It is what separates a rendered scene from a photograph of one.
 */
export const GradeShader = {
  name: 'GradeShader',
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    warmth: { value: 0.02 },
    vignette: { value: 0.4 },
    grain: { value: 0.018 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float warmth;
    uniform float vignette;
    uniform float grain;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233)) + time) * 43758.5453); }

    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      // Contrast around mid grey, then a warm tint in the highlights.
      c.rgb = (c.rgb - 0.5) * 1.04 + 0.5;
      c.rgb += vec3(warmth, warmth * 0.5, -warmth * 0.6) * c.rgb;
      // Vignette.
      vec2 d = vUv - 0.5;
      float v = 1.0 - dot(d, d) * vignette * 1.6;
      c.rgb *= clamp(v, 0.0, 1.0);
      // Grain.
      c.rgb += (hash(vUv) - 0.5) * grain;
      gl_FragColor = c;
    }
  `,
};
