import React, { useEffect } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import Page from '../components/Page';
import authState from '../atoms/auth';
import { textStyle, textStyleH2, textStyleSecondary } from '../theme';

const Profile = () => {
	const [user, setUser] = useRecoilState(authState);
	const nav = useNavigation();

	useEffect(() => {
		if (!user) {
			nav.goBack();
		}
	}, [user]);

	if (!user) {
		return null;
	}

	return (
		<Page
			style={{
				alignItems: 'center',
				justifyContent: 'flex-start',
				padding: 30,
				height: '100%',
			}}
		>
			<Text
				style={{
					...textStyleSecondary,
					marginBottom: 10,
				}}
			>
				Hi, {user.firstName} {user.lastName}!
			</Text>

			<TouchableOpacity onPress={() => setUser(null)}>
				<Text style={textStyleH2}>Sign Out</Text>
			</TouchableOpacity>

			<Text
				style={{
					...textStyleSecondary,
					marginTop: 50,
					marginBottom: 10,
				}}
			>
				Privacy
			</Text>

			<TouchableOpacity
				onPress={() => {
					nav.navigate('Privacy');
				}}
			>
				<Text style={textStyle}>Privacy policy</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					Alert.prompt(
						'Are you sure?',
						'This action cannot be undone, one confirmed all data will be lost forever. Type "DELETE" (without quotes) on the box below to confirm.',
						[
							{
								text: 'Cancel',
							},
							{
								text: 'Confirm',
								style: 'destructive',
								onPress: (result) => {
									if (
										typeof result === 'string' &&
										result.toUpperCase() === 'DELETE'
									) {
										// Delete account here
										Alert.alert('Not implemented yet');
									}
								},
							},
						],
					);
				}}
			>
				<Text style={{ ...textStyle, marginVertical: 5, color: 'red' }}>
					Delete my account
				</Text>
			</TouchableOpacity>
		</Page>
	);
};

export default Profile;
