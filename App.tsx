import React from 'react';
import { Text, StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Workouts from './pages/Workouts';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';
import { backgroundColor, textStyleBold, textStyleSecondary } from './theme';

const customFonts = {
	'ProductSans-BoldItalic': require('./assets/fonts/ProductSansBoldItalic.ttf'),
	'ProductSans-Bold': require('./assets/fonts/ProductSansBold.ttf'),
	'ProductSans-Italic': require('./assets/fonts/ProductSansItalic.ttf'),
	'ProductSans-Regular': require('./assets/fonts/ProductSansRegular.ttf'),
};

const Stack = createNativeStackNavigator();
const stackNavOptions: NativeStackNavigationOptions = {
	headerTitle: ({ children }) => <Text style={textStyleBold}>{children}</Text>,
	headerStyle: {
		backgroundColor,
	},
	headerShadowVisible: false,
	contentStyle: {
		backgroundColor,
	},
	headerTintColor: '#fff',
	headerBackTitleStyle: textStyleSecondary,
};

export default function App() {
	const [fontsLoaded] = useFonts(customFonts);

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<RecoilRoot>
			<StatusBar barStyle="light-content" />

			<ActionSheetProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Group screenOptions={stackNavOptions}>
							<Stack.Screen name="Home" component={Home} />
							<Stack.Screen name="Workouts" component={Workouts} />
							<Stack.Screen name="Profile" component={Profile} />
							<Stack.Screen name="Privacy" component={Privacy} />
						</Stack.Group>

						<Stack.Group
							screenOptions={{
								...stackNavOptions,
								presentation: 'transparentModal',
								headerShown: false,
							}}
						>
							<Stack.Screen name="Welcome" component={Welcome} />
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</ActionSheetProvider>
		</RecoilRoot>
	);
}
