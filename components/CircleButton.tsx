import React, { useState } from 'react';
import {
	View,
	TouchableWithoutFeedback,
	StyleProp,
	ViewStyle,
	GestureResponderEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export interface ICircleProps {
	children?: React.ReactNode;
	width?: number;
	disabled?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
}

const CircleButton: React.FC<ICircleProps> = ({
	children,
	width,
	disabled,
	onPress,
	style = {},
}) => {
	const [isPressed, setIsPressed] = useState(false);

	const borderWidth = 1.5;
	const innerWidth = width - borderWidth * 2;

	const circleStyles: StyleProp<ViewStyle> = {
		width,
		height: width,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: width / 2,
	};

	const circlesInnerStyles = {
		...circleStyles,
		width: innerWidth,
		height: innerWidth,
	};

	const shadowOffset = (width * 13) / 100;
	const shadowRadius = (width * 15) / 100;
	const shadowOpacity = 0.8;

	return (
		<View style={{ position: 'relative', ...((style || {}) as object) }}>
			{/* Upper light shadow */}
			<View
				style={{
					...circlesInnerStyles,
					position: 'absolute',
					zIndex: 0,
					top: borderWidth,
					left: borderWidth,
					backgroundColor: '#ffffff',
					shadowColor: '#3E4549',
					shadowOffset: {
						width: shadowOffset * -1,
						height: shadowOffset * -1,
					},
					shadowOpacity,
					shadowRadius,
					opacity: isPressed ? 0 : 1,
					borderWidth: 1,
				}}
			/>

			{/* Lower dark shadow */}
			<View
				style={{
					...circlesInnerStyles,
					position: 'absolute',
					zIndex: 1,
					top: borderWidth,
					left: borderWidth,
					backgroundColor: '#ffffff',
					shadowColor: '#181E22',
					shadowOffset: {
						width: shadowOffset,
						height: shadowOffset,
					},
					shadowOpacity,
					shadowRadius,
					opacity: isPressed ? 0 : 1,
				}}
			/>

			<View
				style={{
					position: 'relative',
					zIndex: 3,
				}}
			>
				<TouchableWithoutFeedback
					disabled={disabled}
					onPressIn={() => setIsPressed(true)}
					onPressOut={() => setIsPressed(false)}
					onPress={(event) => onPress && onPress(event)}
					style={{
						position: 'relative',
						zIndex: 2,

						borderWidth: 1,
						borderColor: 'red',
					}}
				>
					<LinearGradient
						colors={
							isPressed
								? ['#313B42', '#1D252B']
								: ['#1D252B', '#313B42']
						}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={circleStyles}
					>
						<LinearGradient
							colors={
								isPressed
									? ['#242A2E', '#363C40']
									: ['#363C40', '#242A2E']
							}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								...circlesInnerStyles,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<View>{children}</View>
						</LinearGradient>
					</LinearGradient>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

export default CircleButton;
