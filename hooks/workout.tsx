import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentWorkoutState, IWorkout } from '../atoms/workouts';

export interface IWorkoutActions {
	startWorkout: () => void;
}

const useWorkout = (): [IWorkout, IWorkoutActions] => {
	const [currentWorkout, setCurrentWorkout] = useRecoilState(currentWorkoutState);
	const [secondsElapsed, setSecondsElapsed] = useState(0);

	const { pausedAt, startedAt, finishedAt, cancelledAt } = currentWorkout;
	const startWorkout = () => {
		if (finishedAt || cancelledAt) {
			return;
		}

		// Update round number and status when state changes
		let numSecondsElapsed = secondsElapsed;
		if (startedAt && !pausedAt) {
			numSecondsElapsed += (Date.now() - startedAt.getTime()) / 1000;
			setSecondsElapsed(numSecondsElapsed);
		}

		setCurrentWorkout({
			...currentWorkout,
			startedAt: startedAt || new Date(),
			pausedAt: startedAt && !pausedAt ? new Date() : undefined,
		});
	};

	return [currentWorkout, { startWorkout }];
};

export default useWorkout;
