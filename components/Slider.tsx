import React, { useState } from 'react';
import { View } from 'react-native';
import { Slider as RNSlider } from '@miblanchard/react-native-slider';
import { LinearGradient } from 'expo-linear-gradient';

import ImgThumb from '../assets/img/track-thumb.svg';

export interface ISliderProps {
	min?: number;
	max?: number;
	step?: number;
	value?: number;
	onChange?: (value: number) => void;
}

const Slider: React.FC<ISliderProps> = ({ min = 0, max = 100, step = 1, value = 0, onChange }) => {
	const [isPressed, setIsPressed] = useState(false);

	return (
		<View
			style={{
				position: 'relative',
			}}
			onTouchStart={() => setIsPressed(true)}
			onTouchEnd={() => setIsPressed(false)}
		>
			{/* Track Container */}
			<View
				style={{
					position: 'absolute',
					height: 9,
					borderRadius: 5,
					width: '100%',
					top: 15,
					zIndex: 1,
					overflow: 'hidden',
				}}
			>
				{/* Active track */}
				<LinearGradient
					colors={['#00F0FF', '#00D1FF', '#00F0FF']}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={{
						position: 'absolute',
						height: '100%',
						borderRadius: 5,
						width: `${(value / max) * 100}%`,
						top: 0,
						backgroundColor: '#00D1FF',
						zIndex: 2,
					}}
				/>
				{/* Track Shadow */}
				<LinearGradient
					colors={['rgba(16, 16, 16, 0.5)', 'rgba(84, 84, 84, 0.2)']}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={{
						position: 'absolute',
						zIndex: 3,
						width: '100%',
						height: '100%',
					}}
				/>
			</View>

			<RNSlider
				containerStyle={{
					width: '100%',
					position: 'relative',
					zIndex: 3,
				}}
				minimumTrackTintColor="transparent"
				maximumTrackTintColor="transparent"
				renderThumbComponent={() => (
					<View
						style={{
							position: 'relative',
							shadowColor: '#000',
							shadowOpacity: isPressed ? 0 : 0.2,
							shadowOffset: {
								width: 2,
								height: 3,
							},
						}}
					>
						<ImgThumb
							width={26}
							height={26}
							style={{
								position: 'relative',
								top: -1,
								zIndex: 5,
							}}
						/>
					</View>
				)}
				minimumValue={min}
				maximumValue={max}
				value={value}
				step={step}
				onValueChange={onChange}
			/>
		</View>
	);
};

export default Slider;
