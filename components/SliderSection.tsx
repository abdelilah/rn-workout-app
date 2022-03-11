import { View, Text, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import Button from './Button';
import Slider from './Slider';

export interface ISliderSectionProps {
	icon: ImageSourcePropType;
	title: string;
	min: number;
	max: number;
	value: number;
	onChange: (value: number) => void;
	renderValue: (value: number) => string;
}

const SliderSection: React.FC<ISliderSectionProps> = ({
	icon,
	title,
	min,
	max,
	value,
	onChange,
	renderValue,
}) => {
	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				width: '100%',
				paddingLeft: 25,
				paddingRight: 50,
				marginBottom: 30,
			}}
		>
			<Button disabled>
				<Image
					source={icon}
					style={{
						width: 24,
						height: 24,
					}}
				/>
			</Button>

			<View style={{ marginLeft: 20, flex: 1 }}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
					}}
				>
					<Text
						style={{
							fontSize: 18,
							color: '#ffffff',
							fontFamily: 'ProductSans-Bold',
						}}
					>
						{title}
					</Text>

					<Text
						style={{
							fontSize: 14,
							color: '#6E7880',
							fontFamily: 'ProductSans-Regular',
						}}
					>
						{renderValue(value)}
					</Text>
				</View>

				<Slider {...{ min, max, value, onChange }} />
			</View>
		</View>
	);
};

export default SliderSection;
