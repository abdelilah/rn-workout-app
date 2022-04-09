import React, { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/native';
import GradientCircularProgress, { IGradientCircularProgressProps } from './GradientCircularProgress';

const AnimatedCircularProgressView = animated(GradientCircularProgress);

const AnimatedCircularProgress: React.FC<IGradientCircularProgressProps> = ({ progress, ...props }) => {
	const [initialValue, setInitialValue] = React.useState(0);
	const animProps = useSpring({
		from: {
			progress: initialValue,
		},
		to: { progress },
		config: {
			duration: 1000,
			easing: (t) => t, // Linear
		},
	});

	useEffect(() => {
		setInitialValue(progress);
	}, [progress]);

	return (
		<AnimatedCircularProgressView {...props} {...animProps}>
			{props.children}
		</AnimatedCircularProgressView>
	);
};

export default AnimatedCircularProgress;
