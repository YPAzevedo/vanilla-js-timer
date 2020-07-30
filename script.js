class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    // callbacks logic
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onPause = callbacks.onPause;
    }
    // add event listeners
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  tick = () => {
    this.seconds = this.seconds - 0.05;
    this.durationInput.value = this.seconds >= 0 ? this.seconds.toFixed(2) : 0;
    if (this.onTick) {
      this.onTick(this.seconds);
    }
  };

  start = () => {
    this.seconds = parseFloat(this.durationInput.value);
    
    if (this.onStart) {
      this.onStart(this.seconds);
    }

    if (this.seconds <= 0) return;

    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.seconds > 0) {
          this.tick();
        } else {
          // if interval reaches 0 clearTimeout.
          this.pause();
        }
      }, 50);
    }
  };

  pause = () => {
    if (this.onPause) {
      this.onPause("udahisduhaiudsa");
    }
    // when you pause clearTimeout.
    clearTimeout(this.interval);
    this.interval = null;
  };
}

const timerInput = document.getElementById("duration");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const circle = document.getElementById('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter)

let currentOffset = 0;
let duration = 0;

const timer = new Timer(timerInput, playButton, pauseButton, {
  onStart: function (totalDuration) {
    duration = totalDuration;
  },
  onTick: function (seconds) {
    const offset = perimeter * seconds/duration - perimeter;
    circle.setAttribute('stroke-dashoffset', offset);
  },
  onPause: function (seconds) {
    currentOffset = 0
    circle.setAttribute('stroke-dashoffset', currentOffset);
  }
});
