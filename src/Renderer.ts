import { Ascii } from "./Ascii";

export class Renderer {
  canvas: HTMLCanvasElement;
  helper: HTMLCanvasElement;
  video: HTMLVideoElement;
  canvasContext: CanvasRenderingContext2D;
  helperContext: CanvasRenderingContext2D;
  ascii: Ascii;
  frameId = -1;

  constructor(canvas: HTMLCanvasElement, helper: HTMLCanvasElement, video: HTMLVideoElement) {
    this.canvas = canvas;
    this.helper = helper;
    this.video = video;
    this.canvasContext = canvas.getContext('2d')!;
    this.helperContext = helper.getContext('2d')!;

    this.ascii = new Ascii(this.helper);
  }

  start() {
    this.animate();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    this.helperContext.drawImage(this.video, 0, 0, this.helper.width, this.helper.height);

    const pixels = this.ascii.transform();

    if (this.ascii.inversion) {
      this.canvasContext.fillStyle = '#000';
      this.canvasContext.fillRect(0, 0, this.helper.width, this.helper.height);
    } else {
      this.canvasContext.clearRect(0, 0, this.helper.width, this.helper.height);
    }

    this.canvasContext.fillStyle = this.ascii.inversion ? '#fff' : '#000';
    this.canvasContext.font = `${this.ascii.resolution * 1.5}px monospace`;

    for (const pixel of pixels) {
      this.canvasContext.fillText(pixel.symbol, pixel.x, pixel.y);
    }
  }
}