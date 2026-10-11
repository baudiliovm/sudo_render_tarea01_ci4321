import './style.css';
import { run } from './examples/triangle.ff';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw new Error('Canvas element was not found.');

run(canvas);
