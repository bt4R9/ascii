import EventEmitter from 'eventemitter3';

export class Settings {
  events = new EventEmitter<{
    onPixelSizeChange: (size: number) => unknown;
    onAdvancedPaletteChange: (flag: boolean) => unknown;
    onInversionChange: (flag: boolean) => unknown;
  }>();

  pixelSizeInput = <HTMLInputElement>document.getElementById('pixel-size');
  pixelSizeValue = <HTMLSpanElement>document.getElementById('pixel-size-value');

  advancedPaletteInput = <HTMLInputElement>document.getElementById('advanced-palette');
  inversionInput = <HTMLInputElement>document.getElementById('inversion');

  constructor() {
    this.pixelSizeInput.addEventListener('change', this.onPixelSizeChange);
    this.advancedPaletteInput.addEventListener('change', this.onAdvancedPaletteChange);
    this.inversionInput.addEventListener('change', this.onInversionChange);
  }

  onPixelSizeChange = () => {
    const value = this.pixelSizeInput.value;
    this.pixelSizeValue.textContent = `${value}px`;
    this.events.emit('onPixelSizeChange', parseInt(value));
  }

  onAdvancedPaletteChange = () => {
    const value = this.advancedPaletteInput.checked;
    this.events.emit('onAdvancedPaletteChange', value);
  }

  onInversionChange = () => {
    const value = this.inversionInput.checked
    this.events.emit('onInversionChange', value);
  }
}