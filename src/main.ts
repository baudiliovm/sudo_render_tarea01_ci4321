import { run } from './examples/triangle.ff';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw new Error('Canvas element was not found.');

const colorButton = document.querySelector<HTMLButtonElement>('#color-button');
if (!colorButton) throw new Error('Color button was not found.');

const colors = [
  { name: 'rojo', value: [1, 0, 0] },
  { name: 'verde', value: [0, 1, 0] },
  { name: 'azul', value: [0, 0, 1] },
] as const;

let colorIndex = 0;
const render = run(canvas);

colorButton.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % colors.length;
  const color = colors[colorIndex];
  render(color.value);
  colorButton.textContent = `Color: ${color.name}`;
  colorButton.setAttribute('aria-label', `Cambiar color. Color actual: ${color.name}`);
  canvas.setAttribute('aria-label', `Triángulo ${color.name}`);
});
