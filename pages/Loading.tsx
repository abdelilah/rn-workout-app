import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import authState from '../atoms/auth';

const Loading = () => {
	const [user, setUser] = useRecoilState(authState);

	useEffect(() => {
		setTimeout(() => {
			setUser(null);
		}, 1000);
	}, []);

	let text = 'Loading...';

	if (user === null) {
		text = 'Not signed in';
	} else if (user) {
		text = 'User is signed in';
	}

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				padding: 30,
				height: '100%',
			}}
		>
			<Text style={{ color: 'white' }}>{text}</Text>
		</View>
	);
};

export default Loading;
