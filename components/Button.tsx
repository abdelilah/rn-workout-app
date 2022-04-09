import React, { useState } from 'react';
import {
	View,
	TouchableWithoutFeedback,
	ViewStyle,
	StyleProp,
	Platform,
} from 'react-native';
import {
	Svg,
	Circle,
	Defs,
	LinearGradient,
	Stop,
	Ellipse,
	RadialGradient,
} from 'react-native-svg';

export interface IButtonProps {
	onPress?: () => void;
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	size?: number;
	disabled?: boolean;
	hideShadow?: boolean;
}

const Button: React.FC<IButtonProps> = ({
	children,
	onPress,
	style = {},
	size = 63,
	disabled = false,
	hideShadow = false,
}) => {
	const [isPressed, setIsPressed] = useState(false);

	// Values are coming from original SVG
	const shadowWidth = size * (487 / 193); // Shadow width / bg width
	const shadowHeight = size * (487 / 193); // Shadow height / bg height

	return (
		<View
			style={{
				width: size,
				height: size,
				borderRadius: size / 2,
				alignItems: 'center',
				justifyContent: 'center',
				...(style as object),
			}}
		>
			{/* Shadow */}
			{!isPressed && hideShadow === false && (
				<Svg
					style={{
						position: 'absolute',
						zIndex: -2,
						top: '-83%',
						left: '-65%',
					}}
					width={shadowWidth}
					height={shadowHeight}
					viewBox="0 0 487 563"
					fill="none"
				>
					<Ellipse
						cx={214.5}
						cy={360.5}
						rx={272.5}
						ry={272.5}
						transform="rotate(180 214.5 360.5)"
						fill="url(#paint0_radial_267_8)"
					/>
					<Circle
						cx={237}
						cy={249}
						r={249}
						fill="url(#paint1_radial_267_8)"
					/>
					<Defs>
						<RadialGradient
							id="paint0_radial_267_8"
							cx={0}
							cy={0}
							r={1}
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(229.925 459.658) rotate(47.6802) scale(155.402)"
						>
							<Stop stopColor="#575F65" />
							<Stop
								offset={0.3}
								stopColor="#575F65"
								stopOpacity={Platform.OS == 'ios' ? 0.8 : 0.3}
							/>
							<Stop
								offset={Platform.OS == 'ios' ? 1 : 0.8}
								stopColor="#242A2E"
								stopOpacity={0}
							/>
						</RadialGradient>
						<RadialGradient
							id="paint1_radial_267_8"
							cx={0}
							cy={0}
							r={1}
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(251.094 339.606) rotate(46.6555) scale(164.274)"
						>
							<Stop stopColor="#1C2226" />
							<Stop offset={0.3} stopColor="#1C2226" />
							<Stop
								offset={Platform.OS == 'ios' ? 1 : 0.8}
								stopColor="#1C2226"
								stopOpacity={0}
							/>
						</RadialGradient>
					</Defs>
				</Svg>
			)}

			{/* Button background */}
			<Svg
				width={size}
				height={size}
				viewBox="0 0 193 193"
				fill="none"
				style={{
					position: 'absolute',
					zIndex: -1,
				}}
			>
				<Circle
					cx={96.5005}
					cy={96.5002}
					r={95.5}
					fill="url(#paint0_linear_1)"
					stroke="url(#paint1_linear_2)"
					strokeWidth={2 * (2 / size) * 100}
				/>
				<Defs>
					<LinearGradient
						id="paint0_linear_1"
						x1={22.3479}
						y1={38.6002}
						x2={146.274}
						y2={178.779}
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#363C40" />
						<Stop offset={1} stopColor="#242A2E" />
					</LinearGradient>
					<LinearGradient
						id="paint1_linear_2"
						x1={26.411}
						y1={28.4423}
						x2={168.622}
						y2={168.621}
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#1D252B" />
						<Stop offset={1} stopColor="#313B42" />
					</LinearGradient>
				</Defs>
			</Svg>

			<TouchableWithoutFeedback
				onPressIn={() => setIsPressed(true)}
				onPressOut={() => setIsPressed(false)}
				onPress={onPress}
				disabled={disabled}
			>
				<View
					style={{
						width: size,
						height: size,
						borderRadius: size / 2,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{children}
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default Button;
