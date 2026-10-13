// Position-only figures with a constant color provided by FixedFunction.
import { ATTRIB, createFixedFunction, LIGHTING, type Color } from '../vendor/ff/ff';
import { CANVAS_SIZE, CLEAR_COLOR, SQUARE, SQUARE_INDICES, TRIANGLE } from './shared';

export type Shape = 'triangle' | 'square';

type Geometry = {
  vao: WebGLVertexArrayObject;
  mode: GLenum;
  count: number;
  indexed: boolean;
};

function getContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  if (!gl) throw new Error('WebGL2 is not available.');
  return gl;
}

function createVertexBuffer(gl: WebGL2RenderingContext, data: Float32Array): WebGLBuffer {
  const buffer = gl.createBuffer();
  if (!buffer) throw new Error('Failed to create the vertex buffer.');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

function createGeometry(
  gl: WebGL2RenderingContext,
  vertices: Float32Array,
  mode: GLenum,
  indices?: Uint16Array,
): Geometry {
  const buffer = createVertexBuffer(gl, vertices);
  const vao = gl.createVertexArray();
  if (!vao) throw new Error('Failed to create the vertex array.');

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, 0, 0);

  if (indices) {
    const indexBuffer = gl.createBuffer();
    if (!indexBuffer) throw new Error('Failed to create the index buffer.');
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  }

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return {
    vao,
    mode,
    count: indices ? indices.length : vertices.length / 3,
    indexed: indices !== undefined,
  };
}

function setupState(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement): void {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(...CLEAR_COLOR);
}

function draw(
  gl: WebGL2RenderingContext,
  ff: ReturnType<typeof createFixedFunction>,
  geometry: Geometry,
): void {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindVertexArray(geometry.vao);
  if (geometry.indexed) {
    ff.drawElements(geometry.mode, geometry.count, gl.UNSIGNED_SHORT, 0);
  } else {
    ff.drawArrays(geometry.mode, 0, geometry.count);
  }
}

export function run(canvas: HTMLCanvasElement): (color: Color, shape?: Shape) => void {
  const gl = getContext(canvas);
  const ff = createFixedFunction(gl, { debug: true });
  ff.disable(LIGHTING);

  const geometries: Record<Shape, Geometry> = {
    triangle: createGeometry(gl, TRIANGLE, gl.TRIANGLES),
    square: createGeometry(gl, SQUARE, gl.TRIANGLES, SQUARE_INDICES),
  };

  setupState(gl, canvas);
  const render = (color: Color, shape: Shape = 'triangle'): void => {
    ff.setColor(color);
    draw(gl, ff, geometries[shape]);
  };

  render([1, 0, 0]);
  return render;
}
