import { Renderer } from "./Renderer";
import { Settings } from "./Settings";
import { Stream } from "./Stream";

export class App {
  stream: Stream;
  renderer: Renderer;
  settings: Settings;

  constructor(canvas: HTMLCanvasElement, helper: HTMLCanvasElement,  video: HTMLVideoElement) {
    this.renderer = new Renderer(canvas, helper, video);
    this.stream = new Stream(video);
    this.settings = new Settings();

    this.settings.events.on('onPixelSizeChange', (size) => {
      this.renderer.ascii.resolution = size;
    });

    this.settings.events.on('onAdvancedPaletteChange', (flag) => {
      this.renderer.ascii.mode = flag ? 'advanced' : 'basic';
    });

    this.settings.events.on('onInversionChange', (flag) => {
      document.body.classList.toggle('inversion', flag);
      this.renderer.ascii.inversion = flag;
    })
  }

  async init() {
    await this.stream.start();
    this.renderer.start();
  }
}