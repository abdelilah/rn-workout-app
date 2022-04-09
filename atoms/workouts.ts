import { atom } from 'recoil';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IWorkout {
	id: string;
	rounds: number;
	workTime: number;
	restTime: number;
	startedAt?: Date;
	finishedAt?: Date;
	pausedAt?: Date;
	cancelledAt?: Date;
}

export const createNewWorkout = () =>
	AsyncStorage.multiGet(['workTime', 'restTime', 'rounds']).then((result) => {
		const [workTime, restTime, rounds] = result.map((item) => item[1]);
		return {
			id: uuid.v1().toString(),
			rounds: rounds ? parseInt(rounds, 10) : 3,
			workTime: workTime ? parseInt(workTime, 10) : 30,
			restTime: restTime ? parseInt(restTime, 10) : 5,
		};
	});

// Current workout
export const currentWorkoutState = atom<IWorkout>({
	key: 'CurrentWorkout',
	default: createNewWorkout(),
});

export default currentWorkoutState;
