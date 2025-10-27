class VideoAutoplayQueue {
  private queue: Array<() => Promise<void>> = [];
  private isProcessing = false;
  private delay = 150;

  add(playFunction: () => Promise<void>) {
    this.queue.push(playFunction);
    if (!this.isProcessing) {
      this.process();
    }
  }

  private async process() {
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const playFunction = this.queue.shift();
      if (playFunction) {
        try {
          await playFunction();
        } catch (error) {
          console.error('Error in autoplay queue:', error);
        }
        await new Promise(resolve => setTimeout(resolve, this.delay));
      }
    }

    this.isProcessing = false;
  }

  setDelay(ms: number) {
    this.delay = ms;
  }
}

export const videoAutoplayQueue = new VideoAutoplayQueue();
