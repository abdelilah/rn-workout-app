import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserBox from './UserBox';
import Button from './Button';

import IconMenu from '../assets/img/icon-menu.svg';

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

				<Button size={50} onPress={() => console.log('Menu')}>
					<IconMenu width={18} height={14} />
				</Button>
			</View>
		</SafeAreaView>
	);
}
