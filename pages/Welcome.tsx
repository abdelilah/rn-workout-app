import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Page from '../components/Page';
import ButtonSignIn from '../components/ButtonSignIn';
import Button from '../components/Button';
import app from '../app.config';
import { textStyleH1, textStyle, textStyleGO, textStyleSecondary } from '../theme';
import { useRecoilState } from 'recoil';
import authState from '../atoms/auth';

const Welcome = () => {
	const nav = useNavigation();
	const [, setUser] = useRecoilState(authState);
	const [authenticating, setAuthenticating] = useState(false);

	const goBack = () => nav.canGoBack() && nav.goBack();

	const handleAuth = () => {
		setAuthenticating(true);

		setTimeout(() => {
			setUser({
				id: '123',
				email: 'user@example.com',
				firstName: 'John',
				lastName: 'Doe',
			});

			setAuthenticating(false);
			goBack();
		}, 1500);
	};

	return (
		<Page
			style={{
				padding: 30,
			}}
		>
			<View>
				<Text
					style={{
						...textStyleH1,
						marginTop: 20,
						marginBottom: 'auto',
					}}
				>
					{app.name}
				</Text>
				<Text
					style={{
						...textStyle,
						marginTop: 20,
					}}
				>
					{app.description}
				</Text>

				<View
					style={{
						marginTop: 40,
					}}
				>
					<ButtonSignIn disabled={authenticating} type="google" onPress={handleAuth} />
					<ButtonSignIn disabled={authenticating} type="facebook" onPress={handleAuth} />
				</View>

				<Text
					style={{
						...textStyleSecondary,
						marginTop: 20,
						alignSelf: 'center',
					}}
				>
					Or use the app anonymously by tapping the button below
				</Text>

				<Button
					style={{
						alignSelf: 'center',
						marginVertical: 15,
					}}
				>
					<Text style={textStyleGO} onPress={goBack}>
						GO
					</Text>
				</Button>
			</View>
		</Page>
	);
};

export default Welcome;
