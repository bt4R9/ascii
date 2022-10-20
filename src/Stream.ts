export class Stream {
  video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  async start() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 640,
        height: 480
      },
      audio: false,
    });

    this.video.srcObject = stream;
    this.video.play();
  }

  stop() {
    this.video.pause();
    this.video.srcObject = null;
  }
}