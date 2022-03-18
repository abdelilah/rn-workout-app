import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '../components/Button';
import GradientCircularProgress from '../components/GradientCircularProgress';
import SliderSection from '../components/SliderSection';

import IconRounds from '../assets/img/icon-rounds.svg';
import IconWorkTime from '../assets/img/icon-work-time.svg';
import IconRestTime from '../assets/img/icon-rest-time.svg';
import ImgRightDecoration from '../assets/img/right-decoration.svg';
import ImgArcDecoration from '../assets/img/arc-decoration.svg';
import IconPause from '../assets/img/icon-pause.svg';

let timerInterval = null;

const Home = () => {
	const [rounds, setRounds] = useState(10);
	const [workTime, setWorkTime] = useState(30);
	const [restTime, setRestTime] = useState(25);
	const [isStarted, setIsStarted] = useState(false);
	const [time, setTime] = useState(0);
	const [maxTime] = useState(10);
	const [progress, setProgress] = useState(0);

	const startTimer = useCallback(() => {
		setProgress(0);
		setTime(0);
		setIsStarted(true);
	}, []);

	useEffect(() => {
		if (!isStarted && timerInterval) {
			clearInterval(timerInterval);
			return;
		}

		timerInterval = setInterval(() => {
			const newTime = time + 1;
			setProgress(Math.round((time / maxTime) * 100));
			if (newTime > maxTime) {
				setIsStarted(false);
				return;
			}

			setTime(newTime);
		}, 1000);

		return () => {
			clearInterval(timerInterval);
		};
	}, [isStarted, time]);

	return (
		<View
			style={{
				height: '100%',
			}}
		>
			<ScrollView
				style={{
					flex: 1,
					position: 'absolute',
					zIndex: 0,
					width: '100%',
					height: '100%',
				}}
			>
				<View
					style={{
						paddingBottom: 200,
					}}
				>
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

						<Button
							size={193}
							onPress={() => {
								if (isStarted) {
									return setIsStarted(!isStarted);
								}

								startTimer();
							}}
						>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<Text
									style={{
										fontFamily: 'ProductSans-Bold',
										color: '#ffffff',
										fontSize: 55,
										opacity: isStarted ? 1 : 0.2,
									}}
								>
									{workTime}
								</Text>
								<View
									style={{
										marginLeft: 5,
									}}
								>
									<Text
										style={{
											fontFamily: 'ProductSans-Regular',
											color: '#ffffff',
											fontSize: 28,
											opacity: isStarted ? 1 : 0.2,
										}}
									>
										00
									</Text>
									<Text
										style={{
											fontFamily: 'ProductSans-Regular',
											color: '#6F7880',
											fontSize: 14,
											marginTop: -5,
										}}
									>
										Min Sec
									</Text>
								</View>
							</View>
						</Button>

						{/* Progress */}
						{isStarted && (
							<View
								pointerEvents="none"
								style={{
									position: 'absolute',
									zIndex: 3,
									top: -1,
									left: -1,
								}}
							>
								<GradientCircularProgress
									width={199}
									strokeWidth={2}
									progress={progress}
								/>
							</View>
						)}
					</View>

					{/* Workout Settings */}
					<View
						style={{
							marginTop: 35,
						}}
					>
						<SliderSection
							title="Rounds"
							icon={IconRounds}
							min={1}
							max={50}
							value={rounds}
							onChange={setRounds}
							renderValue={(value) => `x${value}`}
						/>

						<SliderSection
							title="Work Time"
							icon={IconWorkTime}
							min={1}
							max={180}
							value={workTime}
							onChange={setWorkTime}
							renderValue={(value) => `${value} mins`}
						/>

						<SliderSection
							title="Rest Time"
							icon={IconRestTime}
							min={0}
							max={300}
							value={restTime}
							onChange={setRestTime}
							renderValue={(value) => `${value} secs`}
						/>
					</View>
				</View>
			</ScrollView>

			<View
				style={{
					height: 200,
					position: 'absolute',
					alignItems: 'center',
					width: '100%',
					bottom: 0,
					zIndex: 5,
				}}
			>
				<Button
					style={{
						position: 'relative',
						zIndex: 2,
						opacity: isStarted ? 0.6 : 1,
					}}
					size={95}
					disabled={isStarted}
					onPress={() => {
						if (!isStarted) {
							setIsStarted(true);
							startTimer();
						}
					}}
				>
					<Text
						style={{
							color: '#ffffff',
							fontFamily: 'ProductSans-Bold',
							fontSize: 28,
						}}
					>
						GO
					</Text>
				</Button>

				<Button
					style={{
						marginTop: 25,
						position: 'relative',
						zIndex: 2,
						opacity: isStarted ? 1 : 0.6,
					}}
					disabled={!isStarted}
					size={65}
					onPress={() => setIsStarted(false)}
				>
					<IconPause />
				</Button>

				<View
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						height: 164,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1,
					}}
				>
					<ImgArcDecoration width={328} height={164} />
				</View>

				<View
					style={{
						backgroundColor: '#242A2E',
						position: 'absolute',
						width: 328,
						height: 328,
						borderRadius: 164,
						bottom: -164,
						zIndex: 0,
						shadowColor: '#000000',
						shadowOpacity: 0.2,
						shadowRadius: 30,
						shadowOffset: {
							width: 0,
							height: -10,
						},
					}}
				/>
			</View>
		</View>
	);
};

export default Home;
