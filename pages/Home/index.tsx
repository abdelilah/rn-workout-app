import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Page from '../../components/Page';
import PauseStop from './PauseStop';
import Timer from './Timer';
import currentWorkoutState, { createNewWorkout } from '../../atoms/workouts';

import IconMenu from '../../assets/img/icon-menu.svg';
import UserBox from '../../components/UserBox';
import Settings from './Settings';
import { saveWorkout } from '../../lib/db';
import { useRecoilState } from 'recoil';

const Home = () => {
	const nav = useNavigation();
	const [workout, setCurrentWorkout] = useRecoilState(currentWorkoutState);

	useEffect(() => {
		nav.setOptions({
			headerTitle: () => (
				<View
					style={{
						flex: 1,
						paddingLeft: 15,
						paddingRight: 5,
					}}
				>
					<UserBox />
				</View>
			),
			headerRight: () => (
				<Button
					style={{
						marginRight: 5,
					}}
					hideShadow={true}
					size={40}
					onPress={() => nav.navigate('Workouts')}
				>
					<IconMenu />
				</Button>
			),
		});

		// Show welcome screen on first launch
		AsyncStorage.getItem('isFirstLaunch')
			.then((value) => {
				if (value === null) {
					AsyncStorage.setItem('isFirstLaunch', 'false');
					nav.navigate('Welcome');
				}
			})
			.catch(() => {
				console.log('Failed to navigate to Welcome screen');
			});
	}, []);

	const resetWorkout = () => {
		createNewWorkout().then(setCurrentWorkout);
	};

	return (
		<Page
			style={{
				justifyContent: 'flex-start',
			}}
		>
			<Timer
				onComplete={() => {
					saveWorkout({
						...workout,
						finishedAt: new Date(),
					}).then(resetWorkout);

					Alert.alert('Complete!', 'You have completed your workout.', [
						{
							text: 'OK',
						},
					]);
				}}
			/>
			<Settings />
			<PauseStop
				onStop={() => {
					Alert.alert('Confirmation', 'Are you sure you want to stop the workout?', [
						{
							text: 'Cancel',
							style: 'cancel',
						},
						{
							text: 'Stop workout',
							style: 'destructive',
							onPress: () => {
								saveWorkout({
									...workout,
									cancelledAt: new Date(),
								}).then(resetWorkout);
							},
						},
					]);
				}}
			/>
		</Page>
	);
};

export default Home;
