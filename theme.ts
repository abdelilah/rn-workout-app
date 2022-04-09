import { TextStyle } from 'react-native';

export const backgroundColor = '#242a2e';

export const textBold: TextStyle = {
	fontFamily: 'ProductSans-Bold',
	fontWeight: 'bold',
};

export const textStyle: TextStyle = {
	color: '#fff',
	fontFamily: 'ProductSans-Regular',
	fontSize: 16,
	lineHeight: 26,
	textAlign: 'center',
};

export const textStyleBold: TextStyle = {
	...textStyle,
	...textBold,
};

export const textStyleH1: TextStyle = {
	...textStyle,
	...textBold,
	fontSize: 40,
	lineHeight: 55,
};

export const textStyleH2: TextStyle = {
	...textStyleH1,
	fontSize: 22,
	lineHeight: 32,
};

export const textStyleGO: TextStyle = {
	...textStyle,
	...textBold,
	color: '#DFE9ED',
	fontSize: 26,
	lineHeight: 32,
};

export const textStyleSecondary: TextStyle = {
	...textStyle,
	color: '#98A3AB',
	fontSize: 14,
	lineHeight: 18,
	maxWidth: '80%',
};

export const signInButtonBackgroundColor = '#2E353A';

export const signInButtonBackgroundAccent = '#343D43';

export default {
	backgroundColor,
	textStyle,
	textStyleBold,
	textStyleH1,
	textStyleGO,
	signInButtonBackgroundColor,
	signInButtonBackgroundAccent,
};
