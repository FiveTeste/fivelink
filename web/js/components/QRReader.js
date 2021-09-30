import { debounce } from "../utils/debounce.js";

class QRReader extends HTMLElement {
  constructor() {
    super();

    this.video = document.createElement("video");
    this.video.style.cssText = `
      max-width: 28rem;
      max-height: 28rem;
      width: fit-content;
      height: fit-content;
      object-fit: cover;
    `;

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext("2d");

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.video);
  }

  handleResult(data) {
    if (this.onResult) {
      this.onResult(data);
    }
  }

  handleReadQR() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvas.height = this.video.videoHeight;
      this.canvas.width = this.video.videoWidth;

      this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

      const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert"
      });

      if (code) {
        this.handleResult(code.data);
        return;
      }
    }

    const debounced = debounce(this.handleReadQR.bind(this), 300);
    this.animationFrame = requestAnimationFrame(debounced);
  }

  handleVideoStream(stream) {
    this.stream = stream;

    this.video.srcObject = stream;
    this.video.setAttribute("playsinline", true);
    this.video.play();

    this.handleReadQR();
  }

  connectedCallback() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(this.handleVideoStream.bind(this));
    }
  }

  disconnectedCallback() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }
}

export const { name, component } = registerComponent({
  name: "qr-reader",
  component: QRReader,
});