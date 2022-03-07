import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserBox from './UserBox';
import CircleButton from './CircleButton';

import iconMenu from '../assets/img/icon-menu.png';

export function NavBar() {
	return (
		<SafeAreaView>
			<View
				style={{
					position: 'relative',
					zIndex: 10,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 25,
					paddingTop: 25,
					paddingBottom: 10,
				}}
			>
				<UserBox />

				<CircleButton width={50} onPress={() => console.log('Menu')}>
					<Image
						source={iconMenu}
						style={{
							width: 18,
							height: 14,
						}}
					/>
				</CircleButton>
			</View>
		</SafeAreaView>
	);
}
