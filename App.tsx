import { NavBar } from './components/NavBar';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Home from './pages/Home';

const customFonts = {
	'ProductSans-BoldItalic': require('./assets/fonts/ProductSansBoldItalic.ttf'),
	'ProductSans-Bold': require('./assets/fonts/ProductSansBold.ttf'),
	'ProductSans-Italic': require('./assets/fonts/ProductSansItalic.ttf'),
	'ProductSans-Regular': require('./assets/fonts/ProductSansRegular.ttf'),
};

export default function App() {
	const [fontsLoaded] = useFonts(customFonts);

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<RecoilRoot>
			<StatusBar barStyle="light-content" />

			<View
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					backgroundColor: '#242A2E',
				}}
			>
				{/* Top Nav */}
				<NavBar />

				{/* Content */}
				<View
					style={{
						flex: 1,
						position: 'relative',
						zIndex: 0,
					}}
				>
					<Home />
				</View>
			</View>
		</RecoilRoot>
	);
}
