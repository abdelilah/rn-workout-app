import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { backgroundColor } from '../theme';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy policy</title>

    <style>
        body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
			color: #fff;
			background-color: ${backgroundColor};
			padding: 0 15px;
        }
    </style>
</head>
<body>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, cumque culpa assumenda molestiae minima qui ea veritatis magnam odio nam quisquam quos, debitis voluptates iusto cupiditate facere maxime quibusdam pariatur.</p>
    <p>Quis earum nulla iusto aut, enim accusamus quibusdam suscipit porro, esse cum molestiae sed optio molestias magni atque! Debitis aspernatur natus omnis explicabo. Voluptatum, eligendi corporis et perspiciatis illum quae!</p>
    <p>Recusandae velit ut eaque pariatur, cupiditate nobis. Ullam corrupti, unde error odio iure modi cupiditate nam consequatur nobis? Quisquam repudiandae id cumque doloribus earum harum accusantium libero, deleniti obcaecati! Quis.</p>
    <p>Doloremque a dolorem nobis totam neque laudantium voluptates, distinctio vitae officia qui, iusto obcaecati non asperiores, alias facere error pariatur odit facilis amet. Molestiae commodi et quos excepturi eaque nulla?</p>
    <p>Fuga fugit laborum, debitis consequatur blanditiis cum non. Ipsum, facilis. Non explicabo sint dolorum, dolores nobis dolore sunt corrupti officia harum excepturi magnam ratione fugit aliquam, dicta nam veniam eaque?</p>
    <p>Assumenda, officiis blanditiis. Consequuntur in ullam aliquam vitae corporis inventore iure est deserunt quia, animi iusto, recusandae explicabo praesentium sit pariatur enim voluptatum ea quisquam? Quaerat consequatur libero ab reiciendis?</p>
    <p>Totam id pariatur odio maxime aperiam nihil consectetur molestias libero molestiae, porro quae error iste culpa eum nostrum atque tempora aliquam velit. Eum praesentium deleniti necessitatibus maxime nulla. Ducimus, pariatur.</p>
    <p>Quas, autem sed ipsum rerum quam ut enim omnis ipsam placeat, necessitatibus praesentium sapiente. Dolore, a asperiores nesciunt fugit, eos saepe vitae labore corporis, voluptatum deleniti omnis tempora amet quaerat.</p>
    <p>Tenetur minus nostrum amet, excepturi assumenda sunt ad dolores, dolore, labore velit nam similique vero voluptate cupiditate saepe error cumque aspernatur possimus sit quos rem odio quaerat? Quod, quibusdam facere!</p>
    <p>Dolorum quod recusandae eos tenetur voluptate qui quia officia vel! Beatae at suscipit consequatur odit mollitia pariatur sint doloribus, vel unde, neque vitae ipsum tenetur iusto aspernatur soluta omnis magnam.</p>
</body>
</html>`;

const Privacy = () => {
	const nav = useNavigation();

	useEffect(() => {
		nav.setOptions({
			title: 'Privacy policy',
		});
	}, []);

	return (
		<View
			style={{
				width: '100%',
				height: '100%',
			}}
		>
			<WebView style={{ backgroundColor }} source={{ html }} />
		</View>
	);
};

export default Privacy;
