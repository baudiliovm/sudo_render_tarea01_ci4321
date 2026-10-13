/** Background color #1b1e2b as RGB components in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [
  0x1b / 255,
  0x1e / 255,
  0x2b / 255,
  1,
];

/** Square canvas size in pixels. */
export const CANVAS_SIZE = 480;

/** Original triangle positions in clip space, ordered counterclockwise. */
export const TRIANGLE = new Float32Array([
  //  x      y     z
  0.0, 0.7, 0.0, -0.7, -0.6, 0.0, 0.7, -0.6, 0.0,
]);

/** Square: four vertices, shared by two counterclockwise triangles. */
export const SQUARE = new Float32Array([
  -0.55, -0.55, 0.0, 0.55, -0.55, 0.0, 0.55, 0.55, 0.0, -0.55, 0.55, 0.0,
]);

export const SQUARE_INDICES = new Uint16Array([0, 1, 2, 0, 2, 3]);

/** Build a triangle fan: center, perimeter vertices and the first one again to close it. */
export function createFanVertices(segments: number): Float32Array {
  if (!Number.isInteger(segments) || segments < 3 || segments > 64) {
    throw new RangeError('Segments must be an integer between 3 and 64.');
  }

  const radius = 0.65;
  const positions: number[] = [0, 0, 0];

  for (let i = 0; i <= segments; i++) {
    const angle = (2 * Math.PI * i) / segments;
    positions.push(radius * Math.cos(angle), radius * Math.sin(angle), 0);
  }

  return new Float32Array(positions);
}

/** Six counterclockwise triangles around the center. */
export const HEXAGON = createFanVertices(6);

/** Number of triangles used to approximate a circle (maximum: 64). */
export const SEGMENTS = 64;

export const CIRCLE = createFanVertices(SEGMENTS);
