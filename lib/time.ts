export const secondsToMinutesAndSeconds = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = seconds % 60;
	return {
		minutes,
		seconds: secondsLeft,
	};
};
