varying vec2 vUv;

uniform vec3 uTopColor;
uniform vec3 uMidColor;
uniform vec3 uBottomColor;
uniform vec3 uAccentColor;
uniform float uAccentStrength;
uniform float uNoiseStrength;
uniform vec2 uBlobCenter;
uniform float uBlobRadius;
uniform float uBlobStrength;

float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 blobDelta = vUv - uBlobCenter;
  float blobDistance = length(blobDelta);
  float blobMask = 1.0 - smoothstep(uBlobRadius, uBlobRadius + 0.35, blobDistance);

  // Warp vertical sampling inside the blob so palette zones melt together.
  float warpedY = clamp(vUv.y + blobMask * (0.35 - blobDelta.y) * 0.22, 0.0, 1.0);

  // Gaussian palette weights avoid visible top/mid/bottom demarcations.
  float sigmaBottom = mix(0.36, 0.58, blobMask);
  float sigmaMid = mix(0.30, 0.52, blobMask);
  float sigmaTop = mix(0.36, 0.58, blobMask);

  float weightBottom = exp(-pow((warpedY - 0.14) / sigmaBottom, 2.0));
  float weightMid = exp(-pow((warpedY - 0.50) / sigmaMid, 2.0));
  float weightTop = exp(-pow((warpedY - 0.86) / sigmaTop, 2.0));

  float totalWeight = max(weightBottom + weightMid + weightTop, 0.0001);
  vec3 color =
      (uBottomColor * weightBottom + uMidColor * weightMid + uTopColor * weightTop) / totalWeight;

  // Inside the blob, collapse contrast toward one cohesive atmospheric tone.
  vec3 paletteAverage = (uBottomColor + uMidColor + uTopColor) / 3.0;
  color = mix(color, paletteAverage, blobMask * 0.28);

  // Keep blob perception more stable across bright and dark palettes.
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float luminanceCompensation = mix(1.2, 0.75, luminance);
  float blobLift = blobMask * uBlobStrength * luminanceCompensation;
  color += vec3(blobLift);

  // Accent should lift the palette, not darken it.
  float accentMask = pow(blobMask, 1.4) * uAccentStrength;
  vec3 screenAccent = 1.0 - (1.0 - color) * (1.0 - uAccentColor);
  color = mix(color, screenAccent, accentMask);

  float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
  color += vec3(grain * uNoiseStrength);
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
