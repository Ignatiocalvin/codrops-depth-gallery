varying vec2 vUv;

uniform vec3 uBgColor;
uniform vec3 uBlob1Color;
uniform vec3 uBlob2Color;
uniform float uNoiseStrength;
uniform float uBlobRadius;
uniform float uBlobRadiusSecondary;
uniform float uBlobStrength;
uniform float uTime;
uniform float uVelocityIntensity;

float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // Flat background color
  vec3 color = uBgColor;

  // Blob centers animated in shader — incommensurable frequencies (golden
  // ratio 1.618, sqrt2 1.414) so the path never exactly repeats
  float t = uTime * 0.00028;
  vec2 blob1Center = vec2(
    0.50 + sin(t * 1.000) * 0.13 + sin(t * 1.618) * 0.05,
    0.48 + cos(t * 0.794) * 0.09 + cos(t * 1.272) * 0.03
  );
  vec2 blob2Center = vec2(
    0.35 + cos(t * 0.927) * 0.11 + cos(t * 1.414) * 0.04,
    0.55 + sin(t * 1.175) * 0.07 + sin(t * 0.618) * 0.03
  );

  // Two blobs — proto-02 style: 1 at center, 0 at edge
  float blob1 = smoothstep(uBlobRadius, 0.0, distance(vUv, blob1Center));
  float blob2 = smoothstep(uBlobRadiusSecondary, 0.0, distance(vUv, blob2Center));

  // Harmonize blob colors toward bg before applying — keeps them atmospheric
  vec3 b1 = mix(uBlob1Color, uBgColor, 0.35);
  vec3 b2 = mix(uBlob2Color, uBgColor, 0.35);
  color = mix(color, b1, blob1 * uBlobStrength);
  color = mix(color, b2, blob2 * uBlobStrength);

  // Velocity luminance lift — subtle brightness bloom on fast scroll
  color += uVelocityIntensity * 0.10;

  // Film grain
  float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
  color += grain * uNoiseStrength;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
