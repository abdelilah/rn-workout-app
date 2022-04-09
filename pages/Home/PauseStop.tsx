import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import Button from '../../components/Button';

import ImgArcDecoration from '../../assets/img/arc-decoration.svg';
import IconPause from '../../assets/img/icon-pause.svg';
import IconStop from '../../assets/img/icon-stop.svg';
import useWorkout from '../../hooks/workout';

export interface IPauseStopProps {
	onStop?: () => void;
}

const PauseStop: React.FC<IPauseStopProps> = ({ onStop }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [{ startedAt, pausedAt }, { startWorkout }] = useWorkout();

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: startedAt ? 1 : 0,
			duration: 300,
			easing: Easing.in(Easing.ease),
			useNativeDriver: true,
		}).start();
	}, [startedAt]);

	return (
		<Animated.View
			style={{
				height: 200,
				position: 'absolute',
				alignItems: 'center',
				width: '100%',
				zIndex: 5,
				bottom: 0,
				opacity: fadeAnim,
				transform: [
					{
						translateY: fadeAnim.interpolate({
							inputRange: [0, 1],
							outputRange: [220, 0],
						}),
					},
				],
			}}
		>
			<Button
				style={{
					position: 'relative',
					zIndex: 2,
				}}
				size={95}
				onPress={startWorkout}
			>
				{pausedAt ? (
					<Text
						style={{
							color: '#ffffff',
							fontFamily: 'ProductSans-Bold',
							fontSize: 16,
						}}
					>
						Resume
					</Text>
				) : (
					<IconPause />
				)}
			</Button>

			<Button
				style={{
					marginTop: 25,
					position: 'relative',
					zIndex: 2,
				}}
				size={65}
				onPress={() => onStop && onStop()}
			>
				<IconStop />
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
		</Animated.View>
	);
};

export default PauseStop;
