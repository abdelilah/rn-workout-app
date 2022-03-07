import React, { useEffect, useRef, useState } from 'react';
import Svg, { LinearGradient, Stop, Defs, Path } from 'react-native-svg';
import { Animated } from 'react-native';

export interface IGradientCircularProgressProps {
	width?: number;
	progress?: number;
	startColor?: string;
	endColor?: string;
	middleColor?: string;
	id?: string;
	strokeWidth?: number;
	emptyColor?: string;
}

function id(): string {
	return '_' + Math.random().toString(36).substr(2, 9);
}

const GradientCircularProgress: React.FC<IGradientCircularProgressProps> = ({
	strokeWidth = 3,
	emptyColor = 'transparent',
	startColor = '#00F0FF',
	middleColor = '#18BAFF',
	endColor = '#00B2FF',
	width,
	progress = 0,
}) => {
	const DIAMETER = 50;
	const WIDTH = DIAMETER + strokeWidth;
	const firstHalfProg = progress > DIAMETER ? 1 : progress / DIAMETER;
	const secondHalfProg =
		progress <= DIAMETER ? 0 : (progress - DIAMETER) / DIAMETER;
	const halfCircumference = (Math.PI * 2 * (DIAMETER / 2)) / 2;
	const firstHalfGradientId = id();
	const secondHalfGradientId = id();

	return (
		<Svg width={width} height={width} viewBox={`0 0 ${WIDTH} ${WIDTH}`}>
			<Path
				fill="none"
				stroke={emptyColor}
				d={`
					M ${strokeWidth / 2} ${WIDTH / 2}
					a ${DIAMETER / 2} ${DIAMETER / 2} 0 1 1 ${DIAMETER} 0
					a ${DIAMETER / 2} ${DIAMETER / 2} 0 1 1 -${DIAMETER} 0
				`}
				strokeWidth={strokeWidth}
			/>

			<Path
				fill="none"
				stroke={`url(#${firstHalfGradientId})`}
				strokeDasharray={`${
					firstHalfProg * halfCircumference
				},${halfCircumference}`}
				strokeLinecap="round"
				d={`
					M ${WIDTH / 2} ${strokeWidth / 2}
					a ${DIAMETER / 2} ${DIAMETER / 2} 0 1 1 0 ${DIAMETER}
				`}
				strokeWidth={strokeWidth}
			/>

			{progress >= 50 && (
				<Path
					fill="none"
					stroke={`url(#${secondHalfGradientId})`}
					strokeDasharray={`${
						secondHalfProg * halfCircumference
					},${halfCircumference}`}
					strokeLinecap="round"
					d={`
						M ${WIDTH / 2} ${WIDTH - strokeWidth / 2}
						a ${DIAMETER / 2} ${DIAMETER / 2} 0 0 1 0 -${DIAMETER}
					`}
					strokeWidth={strokeWidth}
				/>
			)}

			<Defs>
				<LinearGradient
					id={firstHalfGradientId}
					x1="50%"
					y1="0%"
					x2="0%"
					y2="100%"
				>
					<Stop offset="0%" stopColor={startColor} />
					<Stop offset="90%" stopColor={middleColor} />
				</LinearGradient>

				<LinearGradient
					id={secondHalfGradientId}
					x1="0%"
					y1="0%"
					x2="50%"
					y2="100%"
				>
					<Stop offset="0%" stopColor={endColor} />
					<Stop offset="90%" stopColor={middleColor} />
				</LinearGradient>
			</Defs>
		</Svg>
	);
};

export default GradientCircularProgress;
