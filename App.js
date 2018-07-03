import React from 'react';
import { Font } from 'expo';
import {
	StyleSheet,
	View
} from 'react-native';
import {
	Body,
	Button,
	Container,
	Content,
	Header,
	Icon,
	Left,
	Right,
	Text,
	Title

} from 'native-base';
import InputBox from './components/InputBox';

export default class App extends React.Component {
	state = {
		fontLoaded: false,
	};
	async componentDidMount() {
		await Font.loadAsync({
			'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
		});
		this.setState({fontLoaded: true});
	}
	render() {
		if (this.state.fontLoaded) {
			return (
				<Container style={styles.container}>
					<Header transparent style={styles.header}>
						<Left>
							<Button transparent>
								<Icon name='more' style={styles.headerButton} />
							</Button>
						</Left>
						<Body>
							<Title style={styles.headerText}>LOMOJI</Title>
						</Body>
						<Right />
					</Header>
					<Content padder>
						<InputBox style={styles} />
					</Content>
				</Container>
			);
		}
		return null;
	}
}

const styles = StyleSheet.create({
	bodyText: {
		color: '#4f4f4f',
		fontFamily: 'Rubik-Regular'
	},
	buttonText: {
		fontFamily: 'Rubik-Regular',
		fontSize: 20
	},
	headerButton: {
		color: '#fff'
	},
	headerText: {
		fontFamily: 'Rubik-Regular',
		fontSize: 20,
		color: '#fff',
		letterSpacing: 5
	},
	textArea: {
		color: '#4f4f4f',
		fontFamily: 'Rubik-Regular',
		fontSize: 30
	},
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	header: {
		backgroundColor: '#8894C9'
	}
});