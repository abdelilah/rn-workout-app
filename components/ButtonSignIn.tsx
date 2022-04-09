import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconGoogle from '../assets/img/icon-google.svg';
import IconFacebook from '../assets/img/icon-facebook.svg';
import {
	signInButtonBackgroundColor,
	signInButtonBackgroundAccent,
	textStyleBold,
} from '../theme';

export interface IButtonSignInProps {
	type: 'google' | 'facebook';
	onPress: () => void;
	disabled?: boolean;
}

const buttonConfig = {
	google: {
		text: 'Sign in with Google',
		icon: <IconGoogle />,
	},
	facebook: {
		text: 'Sign in with Facebook',
		icon: <IconFacebook />,
	},
};

const ButtonSignIn: React.FC<IButtonSignInProps> = ({
	type,
	onPress,
	disabled = false,
}) => {
	const { text, icon } = buttonConfig[type];

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={{ opacity: disabled ? 0.6 : 1 }}
		>
			<View
				style={{
					position: 'relative',
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: signInButtonBackgroundColor,
					padding: 10,
					borderRadius: 28,
					marginVertical: 10,
					marginHorizontal: 20,
					paddingLeft: 60,
					overflow: 'hidden',
				}}
			>
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						backgroundColor: signInButtonBackgroundAccent,
						width: 50,
						padding: 10,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{icon}
				</View>
				<Text style={textStyleBold}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ButtonSignIn;
