// Position-only triangle with a constant color provided by FixedFunction.
import { ATTRIB, createFixedFunction, LIGHTING, type Color } from '../vendor/ff/ff';
import { CANVAS_SIZE, CLEAR_COLOR, TRIANGLE } from './shared';

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

function createVAO(gl: WebGL2RenderingContext, buffer: WebGLBuffer): WebGLVertexArrayObject {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error('Failed to create the vertex array.');
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return vao;
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
  vao: WebGLVertexArrayObject,
): void {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindVertexArray(vao);
  ff.drawArrays(gl.TRIANGLES, 0, 3);
}

export function run(canvas: HTMLCanvasElement): (color: Color) => void {
  const gl = getContext(canvas);
  const ff = createFixedFunction(gl, { debug: true });
  ff.disable(LIGHTING);
  const buffer = createVertexBuffer(gl, TRIANGLE);
  const vao = createVAO(gl, buffer);
  setupState(gl, canvas);
  const render = (color: Color): void => {
    ff.setColor(color);
    draw(gl, ff, vao);
  };

  render([1, 0, 0]);
  return render;
}
