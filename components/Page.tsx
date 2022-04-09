import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

export interface IPageProps {
	style?: StyleProp<ViewStyle>;
}

const Page: React.FC<IPageProps> = ({ children, style = {} }) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				...(style as object),
			}}
		>
			{children}
		</View>
	);
};

export default Page;
