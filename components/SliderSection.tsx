import { View, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';
import Button from './Button';
import Slider from './Slider';
import { textStyleBold, textStyleSecondary } from '../theme';

export interface ISliderSectionProps {
	icon: React.FC<SvgProps>;
	title: string;
	min: number;
	max: number;
	value: number;
	onChange: (value: number) => void;
	renderValue: (value: number) => string;
	subtitle?: string;
}

const SliderSection: React.FC<ISliderSectionProps> = ({
	icon,
	title,
	subtitle,
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
			<Button disabled>{React.createElement(icon, { width: 24, height: 24 })}</Button>

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
							...textStyleBold,
							lineHeight: 16,
						}}
					>
						{title}

						{subtitle && (
							<>
								{' '}
								<Text
									style={{
										...textStyleSecondary,
										lineHeight: 16,
										color: '#6F7880',
									}}
								>
									{subtitle}
								</Text>
							</>
						)}
					</Text>

					<Text
						style={{
							...textStyleSecondary,
							color: '#6E7880',
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
