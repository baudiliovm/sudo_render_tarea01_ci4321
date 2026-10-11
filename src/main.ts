import './style.css';
import { run } from './examples/triangle.ff';

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw new Error('Canvas element was not found.');

// Keep the original RGB triangle as the starting point for the assignment.
run(canvas);
