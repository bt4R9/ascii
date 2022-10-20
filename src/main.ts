import { App } from './App';
import './style.css'

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const helper = <HTMLCanvasElement>document.getElementById('helper');
const video = <HTMLVideoElement>document.getElementById('video');

const app = new App(canvas, helper, video);

app.init();