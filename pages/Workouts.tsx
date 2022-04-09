import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { format, formatDuration } from 'date-fns';

import { IWorkout } from '../atoms/workouts';
import Page from '../components/Page';
import { getWorkouts } from '../lib/db';
import { textStyleBold, textStyleSecondary } from '../theme';

import IconCalendar from '../assets/img/icon-calendar.svg';
import IconOptions from '../assets/img/icon-dots.svg';
import IconClock from '../assets/img/icon-clock.svg';
import WorkoutsGradientTop from '../assets/img/workouts-gradient-top.svg';

const Workouts = () => {
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);

	useEffect(() => {
		getWorkouts().then(setWorkouts);
	}, []);

	const hasWorkouts = Array.isArray(workouts) && workouts.length > 0;

	return (
		<Page
			style={{
				alignItems: hasWorkouts ? 'flex-start' : 'center',
				justifyContent: hasWorkouts ? 'flex-start' : 'center',
				height: '100%',
				position: 'relative',
			}}
		>
			<View
				style={{
					position: 'absolute',
					top: -10,
					left: 0,
					width: '100%',
					zIndex: 1,
				}}
			>
				<WorkoutsGradientTop />
			</View>

			{hasWorkouts ? (
				<ScrollView
					style={{
						flex: 1,
						alignSelf: 'stretch',
						padding: 15,
					}}
				>
					{workouts.map(({ id, startedAt, rounds, workTime, restTime }) => {
						const totalSeconds = (workTime + restTime) * rounds * 60;
						const hours = Math.floor(totalSeconds / 3600);
						const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
						const seconds = totalSeconds - hours * 3600 - minutes * 60;

						return (
							<View
								key={id}
								style={{
									marginBottom: 15,
									backgroundColor: '#272F34',
									borderRadius: 10,
									padding: 15,
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<IconCalendar style={{ marginRight: 5 }} />
									<Text style={{ ...textStyleSecondary, color: '#6E7880' }}>
										{format(startedAt, 'MMM dd, yyyy')}
									</Text>

									<TouchableOpacity
										style={{
											paddingHorizontal: 5,
											marginLeft: 'auto',
										}}
									>
										<IconOptions />
									</TouchableOpacity>
								</View>

								<View
									style={{
										marginTop: 20,
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<IconClock style={{ marginRight: 5 }} />
									<Text style={textStyleBold}>
										Total time:{' '}
										{formatDuration(
											{
												hours,
												minutes,
												seconds,
											},
											{
												format: ['hours', 'minutes', 'seconds'],
											},
										)}
									</Text>
								</View>
							</View>
						);
					})}
				</ScrollView>
			) : (
				<Text
					style={{
						...textStyleSecondary,
						fontSize: 18,
					}}
				>
					No workouts
				</Text>
			)}
		</Page>
	);
};

export default Workouts;
