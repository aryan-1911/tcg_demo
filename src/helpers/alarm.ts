const audioFile = require('assets/audio/notification-coins.mp3');

class Alarm {
  private audio: HTMLAudioElement;
  constructor() {
    this.audio = new Audio(audioFile);
  }
  async success() {
    try {
      await this.audio.play();
    } catch (err) {
      console.error(err);
    }
  }
}

export const alarm = new Alarm();
