import { run, type Shape } from './examples/shapes.ff';

function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Element not found: ${selector}`);
  return element;
}

const canvas = getElement<HTMLCanvasElement>('#canvas');
const colorButton = getElement<HTMLButtonElement>('#color-button');
const shapeButton = getElement<HTMLButtonElement>('#shape-button');

const colors = [
  { name: 'rojo', value: [1, 0, 0] },
  { name: 'verde', value: [0, 1, 0] },
  { name: 'azul', value: [0, 0, 1] },
] as const;

const shapes: { name: string; value: Shape }[] = [
  { name: 'triángulo', value: 'triangle' },
  { name: 'cuadrado', value: 'square' },
  { name: 'hexágono', value: 'hexagon' },
  { name: 'círculo', value: 'circle' },
];

let colorIndex = 0;
let shapeIndex = 0;
const render = run(canvas);

function update(): void {
  const color = colors[colorIndex];
  const shape = shapes[shapeIndex];

  render(color.value, shape.value);
  colorButton.textContent = `Color: ${color.name}`;
  colorButton.setAttribute('aria-label', `Cambiar color. Color actual: ${color.name}`);
  shapeButton.textContent = `Figura: ${shape.name}`;
  shapeButton.setAttribute('aria-label', `Cambiar figura. Figura actual: ${shape.name}`);
  canvas.setAttribute('aria-label', `${shape.name} ${color.name}`);
}

colorButton.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % colors.length;
  update();
});

shapeButton.addEventListener('click', () => {
  shapeIndex = (shapeIndex + 1) % shapes.length;
  update();
});
