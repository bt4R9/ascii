export class Ascii {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  resolution: number = 4;

  #pixels: Uint8ClampedArray = new Uint8ClampedArray;
  #height: number = 0;
  #width: number = 0;

  mode: 'basic' | 'advanced' = 'basic';
  inversion: boolean = false

  // white -> black
  basicSymbols = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];
  advancedSymbols = [' ', '.', "'", '`', '^', '"', ',', ':', ';', 'I', 'l', '!', 'i', '>', '<', '~', '+', '_', '-', '?', ']', '[', '}', '{', '1', ')', '(', '|', '/', 't', 'f', 'j', 'r', 'x', 'n', 'u', 'v', 'c', 'z', 'X', 'Y', 'U', 'J', 'C', 'L', 'Q', '0', 'O', 'Z', 'm', 'w', 'q', 'p', 'd', 'b', 'k', 'h', 'a', 'o', '*', '#', 'M', 'W', '&', '8', '%', 'B', '@', '$'];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d', {
      willReadFrequently: true
    })!;
  }

  getSymbol(r: number, g: number, b: number) {
    const average = ((r + g + b) / 3) | 0;
    let percent = average / 255;

    if (!this.inversion) {
      percent = 1 - percent;
    }

    if (this.mode === 'basic') {

      if (average === 0) {
        return this.basicSymbols[9];
      }


      const index = (1 - average / 255) * 10 | 0;

      return this.basicSymbols[index];
    }

    const index = (this.advancedSymbols.length * percent) | 0;

    return this.advancedSymbols[index];
  }

  averageColor(y: number, x: number) {
    let R = 0;
    let G = 0;
    let B = 0;

    let count = 0;

    for (let dy = y; y < Math.min(this.#height, y + this.resolution); y++) {
      for (let dx = x; x < Math.min(this.#width, x + this.resolution); x++) {
        count += 1;
        const index = (dy * this.#width + dx) * 4;

        const r = this.#pixels[index];
        const g = this.#pixels[index + 1];
        const b = this.#pixels[index + 2];

        R += r;
        G += g;
        B += b;
      }
    }

    R = R / count | 0;
    G = G / count | 0;
    B = B / count | 0;

    return { R, G, B };
  }

  transform() {
    this.#pixels = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    this.#height = this.canvas.height;
    this.#width = this.canvas.width;

    const symbols: { y: number; x: number; symbol: string }[] = [];

    for (let y = 0; y < this.#height; y += this.resolution) {
      for (let x = 0; x < this.#width; x += this.resolution) {
        const { R, G, B } = this.averageColor(y, x);

        const symbol = this.getSymbol(R, G, B);
        const ny = (y / this.resolution) | 0;
        const nx = (x / this.resolution) | 0;

        symbols.push({ y: ny, x: nx, symbol });
      }
    }

    return {
      symbols,
      width: (this.#width / this.resolution) | 0,
      height: (this.#height / this.#height) | 0,
    };
  }
}