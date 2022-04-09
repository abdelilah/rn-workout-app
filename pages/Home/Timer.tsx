import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { padStart } from 'lodash';

import Button from '../../components/Button';
import AnimatedCircularProgress from '../../components/AnimatedCircularProgress';
import useWorkout from '../../hooks/workout';

import ImgRightDecoration from '../../assets/img/right-decoration.svg';
import { textStyle, textStyleBold, textStyleSecondary } from '../../theme';

export interface ITimerProps {
	onComplete?: () => void;
}

const Timer: React.FC<ITimerProps> = ({ onComplete }) => {
	const [currentWorkout, { startWorkout }] = useWorkout();
	const [secondsElapsed, setSecondsElapsed] = useState(0);

	// Reset when workout changes
	useEffect(() => {
		setSecondsElapsed(0);
	}, [currentWorkout.startedAt]);

	useEffect(() => {
		const { startedAt, pausedAt, finishedAt, cancelledAt } = currentWorkout;

		if (!startedAt || pausedAt || finishedAt || cancelledAt) {
			return;
		}

		const interval = setInterval(() => {
			const { workTime, restTime, rounds } = currentWorkout;
			const totalWorkoutSeconds = (workTime + (restTime - 1)) * rounds * 60;
			if (secondsElapsed >= totalWorkoutSeconds) {
				onComplete && onComplete();
				startWorkout(); // Pauses the workout
				return;
			}
			setSecondsElapsed(secondsElapsed + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [secondsElapsed, currentWorkout]);

	const { startedAt, pausedAt, workTime, restTime, rounds } = currentWorkout;
	const secondsPerRound = (workTime + restTime) * 60;
	const round = Math.floor(secondsElapsed / secondsPerRound) + 1;

	const curRoundSecondsElapsed = secondsElapsed - (round - 1) * secondsPerRound;
	const secondsRemainingInRound = secondsPerRound - curRoundSecondsElapsed;

	const secondsWorkRemaining = secondsRemainingInRound - restTime * 60;
	const secondsRestRemaining = secondsRemainingInRound;

	let status: 'work' | 'rest' = 'rest';
	let minutes = padStart(Math.floor(secondsRestRemaining / 60).toString(), 2, '0');
	let seconds = padStart((secondsRestRemaining % 60).toString(), 2, '0');
	let progress = 0; // Percentage

	if (secondsWorkRemaining > 0) {
		status = 'work';
		minutes = padStart(Math.floor(secondsWorkRemaining / 60).toString(), 2, '0');
		seconds = padStart((secondsWorkRemaining % 60).toString(), 2, '0');
	}

	if (status === 'work') {
		progress = 100 - (secondsWorkRemaining / (workTime * 60)) * 100;
	}

	if (status === 'rest') {
		progress = (secondsRestRemaining / (restTime * 60)) * 100;
	}

	return (
		<View
			style={{
				position: 'relative',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 55,
				marginBottom: 40,
				alignSelf: 'center',
			}}
		>
			<ImgRightDecoration
				style={{
					position: 'absolute',
					right: -120,
					top: 80,
					width: 180,
					height: 270,
					zIndex: 0,
				}}
			/>

			<Button size={193} onPress={startWorkout}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							...textStyleBold,
							lineHeight: 55,
							fontSize: 55,
							width: 75,
							textAlign: 'right',
							opacity: startedAt && !pausedAt ? 1 : 0.2,
						}}
					>
						{minutes}
					</Text>
					<View
						style={{
							marginLeft: 5,
						}}
					>
						<Text
							style={{
								...textStyle,
								lineHeight: 28,
								textAlign: 'left',
								fontSize: 28,
								opacity: startedAt && !pausedAt ? 1 : 0.2,
							}}
						>
							{seconds}
						</Text>
						<Text
							style={{
								...textStyleSecondary,
								maxWidth: '100%',
								marginTop: -5,
							}}
						>
							Min Sec
						</Text>
					</View>
				</View>
				{startedAt && (
					<Text
						style={{
							...textStyleBold,
							fontSize: 14,
							position: 'absolute',
							top: 35,
							opacity: 0.3,
						}}
					>
						Round {round < rounds ? round : rounds}
					</Text>
				)}

				<Text
					style={{
						...textStyleBold,
						position: 'absolute',
						bottom: 45,
						opacity: startedAt ? 0.3 : 1,
					}}
				>
					{startedAt ? `${status === 'rest' ? 'Rest' : 'Work'} time` : 'Tap to start'}
				</Text>
			</Button>

			{/* Progress */}
			{startedAt && (
				<View
					pointerEvents="none"
					style={{
						position: 'absolute',
						zIndex: 3,
						top: -6,
						left: -6,
					}}
				>
					<AnimatedCircularProgress width={205} strokeWidth={3.5} progress={progress}>
						{null}
					</AnimatedCircularProgress>
				</View>
			)}
		</View>
	);
};

export default Timer;
