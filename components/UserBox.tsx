import React from 'react';
import { View, Image, Text } from 'react-native';
import Button from './Button';

import imgProfilePicture from '../assets/img/profile-picture.jpg';

const UserBox = () => {
	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<Button size={50} disabled>
				<Image
					source={imgProfilePicture}
					onProgress={() => console.log('Show profile')}
					style={{
						width: 50,
						height: 50,
						borderRadius: 50 / 2,
					}}
				/>
			</Button>

			<View
				style={{
					marginLeft: 10,
				}}
			>
				<Text
					style={{
						fontSize: 14,
						fontWeight: 'bold',
						color: '#ffffff',
						fontFamily: 'ProductSans-Bold',
					}}
				>
					Cameron Williamson
				</Text>
				<Text
					style={{
						fontSize: 19,
						fontWeight: 'bold',
						color: '#6E7880',
						fontFamily: 'ProductSans-Bold',
					}}
				>
					Welcome back!
				</Text>
			</View>
		</View>
	);
};

export default UserBox;
