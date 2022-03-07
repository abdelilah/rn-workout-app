export interface IStopWatchOptions {
	numSeconds?: number;
	onTick?: (stopwatch: Stopwatch) => void;
	onComplete?: (stopwatch: Stopwatch) => void;
}

class Stopwatch {
	private options: IStopWatchOptions;
	private isStarted = false;
	private isPaued = false;
	private time = 0;
	private interval: NodeJS.Timer = null;

	constructor(options?: IStopWatchOptions) {
		this.options = options || {};
	}

	private tick() {
		if (this.isStarted) {
			this.time++;

			if (this.time === this.options.numSeconds) {
				this.stop();
				this.options.onComplete && this.options.onComplete(this);
			}

			if (this.options.onTick) {
				this.options.onTick(this);
			}
		}
	}

	public start() {
		if (!this.isStarted) {
			this.isStarted = true;
			this.interval = setInterval(() => {
				this.tick();
			}, 1000);
		}
	}

	public pause() {
		if (this.isStarted && !this.isPaued) {
			this.isPaued = true;
			clearInterval(this.interval);
		}
	}

	public stop() {
		if (this.isStarted) {
			this.isStarted = false;
			this.isPaued = false;
			clearInterval(this.interval);
			if (this.options.onComplete) {
				this.options.onComplete(this);
			}
		}
	}

	public reset() {
		this.stop();
		this.time = 0;
		clearInterval(this.interval);
	}

	public getTime() {
		return this.time;
	}
}

export default Stopwatch;
