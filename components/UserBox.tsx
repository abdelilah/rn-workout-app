import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';
import { useRecoilState } from 'recoil';
import authState from '../atoms/auth';
import { textStyleBold } from '../theme';

import imgProfilePicture from '../assets/img/profile-picture.jpg';

const UserBox = () => {
	const nav = useNavigation();
	const [user] = useRecoilState(authState);

	return (
		<TouchableOpacity
			onPress={() => nav.navigate(user ? 'Profile' : 'Welcome')}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Button size={40} hideShadow={true} disabled>
					<Image
						source={imgProfilePicture}
						onProgress={() => console.log('Show profile')}
						style={{
							width: 40,
							height: 40,
							borderRadius: 40 / 2,
						}}
					/>
				</Button>

				<View
					style={{
						marginLeft: 10,
						alignItems: 'flex-start',
					}}
				>
					{user ? (
						<>
							<Text
								style={{
									...textStyleBold,
									fontSize: 12,
									lineHeight: 14,
									color: '#98A3AB',
								}}
							>
								Welcome back!
							</Text>
							<Text
								style={{
									...textStyleBold,
									fontSize: 16,
									lineHeight: 18,
								}}
							>
								{user.firstName || user.email}
							</Text>
						</>
					) : (
						<>
							<Text
								style={{
									...textStyleBold,
									fontSize: 16,
									lineHeight: 18,
								}}
							>
								Sign In
							</Text>
							<Text
								style={{
									...textStyleBold,
									fontSize: 12,
									lineHeight: 14,
									color: '#98A3AB',
								}}
							>
								to keep track of your workouts
							</Text>
						</>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default UserBox;
