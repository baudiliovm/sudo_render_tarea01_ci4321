/** Background color #1b1e2b as RGB components in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

/** Square canvas size in pixels. */
export const CANVAS_SIZE = 480;

/** Original triangle positions in clip space, ordered counterclockwise. */
export const TRIANGLE = new Float32Array([
  //  x      y     z
   0.0,   0.7,  0.0,
  -0.7,  -0.6,  0.0,
   0.7,  -0.6,  0.0,
]);
