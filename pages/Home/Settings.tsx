import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SliderSection from '../../components/SliderSection';
import { currentWorkoutState } from '../../atoms/workouts';

import IconRounds from '../../assets/img/icon-rounds.svg';
import IconWorkTime from '../../assets/img/icon-work-time.svg';
import IconRestTime from '../../assets/img/icon-rest-time.svg';

const Settings: React.FC = () => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [currentWorkout, setCurrentWorkout] = useRecoilState(currentWorkoutState);
	const { rounds, restTime, workTime, startedAt } = currentWorkout;

	const handleSettingChange = (key: 'rounds' | 'workTime' | 'restTime') => {
		return (value: number) => {
			AsyncStorage.setItem(key, value.toString());
			setCurrentWorkout({
				...currentWorkout,
				[key]: value[0],
			});
		};
	};

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: startedAt ? 0 : 1,
			duration: 300,
			easing: Easing.in(Easing.ease),
			useNativeDriver: true,
		}).start();
	}, [startedAt]);

	const isStarted = !!startedAt;

	return (
		<Animated.View
			style={{
				marginTop: 'auto',
				opacity: fadeAnim,
				transform: [
					{
						translateY: fadeAnim.interpolate({
							inputRange: [0, 1],
							outputRange: [0, -35],
						}),
					},
				],
			}}
			pointerEvents={isStarted ? 'none' : 'auto'}
		>
			<SliderSection
				title="Rounds"
				icon={IconRounds}
				min={1}
				max={20}
				value={rounds}
				onChange={handleSettingChange('rounds')}
				renderValue={(value) => `x${value}`}
			/>

			<SliderSection
				title="Work Time"
				subtitle="per round"
				icon={IconWorkTime}
				min={1}
				max={60}
				value={workTime}
				onChange={handleSettingChange('workTime')}
				renderValue={(value) => `${value} mins`}
			/>

			<SliderSection
				title="Rest Time"
				subtitle="per round"
				icon={IconRestTime}
				min={0}
				max={30}
				value={restTime}
				onChange={handleSettingChange('restTime')}
				renderValue={(value) => `${value} mins`}
			/>
		</Animated.View>
	);
};

export default Settings;
