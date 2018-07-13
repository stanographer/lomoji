// React and Expo
import React, { Component } from 'react';
import { Font } from 'expo';
import {
	AsyncStorage,
	KeyboardAvoidingView,
	StyleSheet
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
	Spinner,
	Tab,
	Tabs,
	TabHeading,
	Text,
	Title
} from 'native-base';

// Required modules
import axios from 'axios';
import DropdownAlert from 'react-native-dropdownalert';

// Components
import Input from './components/Input';
import SetLangs from './components/SetLangs';

// Settings
import languages from './assets/languages.json';
import config from './assets/config.json';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			showToast: false,
			assetsLoaded: false,
			fromLang: [],
			toLang: [],
			originalText: '',
			submittedText: '',
			history: [],
			langList: []
		}
	}

	handleToLang = (toLang) => {
		this.setState({
			toLang
		});
	}

	handleFromLang = (fromLang) => {
		this.setState({
			fromLang
		});
	}

	handleNewInput = (originalText) => {
		if (this.submittedText && this.submittedText.length < 1) {
			this.setState({submittedText: this.originalText});
		}
		this.setState({
			originalText
		});
	}

	handleTranslate = (event) => {
		event.preventDefault();

		// Alerts the user that at least one language needs to be selected.
		if (this.state.toLang && this.state.toLang.length < 1) {
			this.onAlert('warn', 'No Target Languages', 'Please select target languages in Options before attempting to translate.');
		}

		// Only add translation to history if it doesn't exist in history.
		if (this.state.history.indexOf(this.state.submittedText) < 1) {
			this.setState({history: [...this.state.history, this.state.submittedText]});
		}
		
		// Update the typed-in text to be what's translated.
		this.setState({
			submittedText: this.state.originalText
		});
	}

	// Gets the state of the last session.
	getState = async() => {
		try {
			const savedState = await AsyncStorage.getItem('@Lomoji:state') || null;
			if (savedState) {
				this.setState({
					savedState
				});
			}
			this.onAlert('warn', 'No Saved State', 'There is no saved state');
		} catch (error) {
			console.log('there was an error');
		}
	}

	// Saves the state of the current session.
	saveState = async() => {
		try {
			await AsyncStorage.setItem('@Lomoji:state', JSON.stringify(this.state));
		} catch (error) {
			alert('there was an error in saving!');
		}
	}

	// Dropdown alerts

	onAlert = (type, heading, message) => {
		switch (type) {
			case 'error':
				this.dropdown.alertWithType('error', heading, message);
				break;
			case 'warn':
				this.dropdown.alertWithType('warn', heading, message);
				break;
			case 'success':
				this.dropdown.alertWithType('success', heading, message);
				break;
			case 'info':
				this.dropdown.alertWithType('info', heading, message);
				break;
			default:
				this.dropdown.alertWithType('dismiss', heading, message);
		}
	}

	async componentDidMount() {
		await Font.loadAsync({
			'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
			'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
			'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
			'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
			'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf')
		});
		await axios
				// Get most recent list of langs from Google.
				.get(`https://translation.googleapis.com/language/translate/v2/languages?key=${config.apiKey}&target=en`)
				// If that was successful, set our internal state.
				.then((result) => {
					this.setState({
						langList: result.data.data.languages
					});
				})
				// If that fails, use default built-in list of languages.
				.catch((err) => {
					this.setState({
						langList: languages.data.languages
					});
					alert(`Unable to retrieve list of languages from Google Translate.\nLocal list used instead.\n\n${err}`);
		});
		await this.getState();

		this.setState({assetsLoaded: true});
	}
	render() {
		if (this.state.assetsLoaded) {
			return (
				<Container style={styles.container}>
					<Header transparent hasTabs style={styles.header}>
						<Left>
							<Button transparent>
								<Icon name='more' style={styles.headerButton} />
							</Button>
						</Left>
						<Body>
							<Title style={styles.headerTitle}>LOMOJI</Title>
						</Body>
						<Right />
					</Header>
					<Tabs tabBarUnderlineStyle={styles.underline} style={styles.tabs}>
						<Tab heading={
							<TabHeading style={styles.header}>
								<Icon name="globe" style={styles.headerButton} />
								<Text style={styles.headerText}>TRANSLATE</Text>
							</TabHeading>
						}>
							<Content padder>
								<KeyboardAvoidingView behavior='padding'>
									<Input
										style={styles}
										handleNewInput={this.handleNewInput}
										handleTranslate={this.handleTranslate}
										state={this.state} />
								</KeyboardAvoidingView>
							</Content>
						</Tab>
						<Tab heading={
							<TabHeading style={styles.header}>
								<Icon name="options" style={styles.headerButton} />
								<Text style={styles.headerText}>
									OPTIONS
								</Text>
							</TabHeading>
						}>
							<SetLangs
								style={styles}
								updateFromLang={this.handleFromLang.bind(this)}
								updateToLang={this.handleToLang.bind(this)}
								state={this.state} />
						</Tab>
					</Tabs>
					<DropdownAlert 
						ref={ref => this.dropdown = ref}
						containerStyle={{
							padding: 40,
							flexDirection: 'row'
						}}
						titleStyle={{
							fontFamily: 'Rubik-Medium',
							fontSize: 21,
							textAlign: 'left',
							fontWeight: 'bold',
							color: 'white'
						}}
						messageStyle={{
							fontFamily: 'Rubik-Regular',
							fontSize: 17,
							textAlign: 'left',
							fontWeight: 'bold',
							color: 'white'
						}} />
				</Container>
			);
		}
	return (<Spinner />);
	}
}

const styles = StyleSheet.create({
	bodyText: {
		color: '#4f4f4f',
		fontFamily: 'Rubik-Regular',
	},
	bodyHeader: {
		color: '#4f4f4f',
		fontFamily: 'Rubik-Regular',
		fontSize: 24,
		marginTop: 25,
		marginLeft: 10
	},
	buttonText: {
		fontFamily: 'Rubik-Regular',
		fontSize: 30,
		letterSpacing: 5
	},
	cardHeader: {
		fontFamily: 'Rubik-Medium',
		fontSize: 29,
		color: '#4f4f4f'
	},
	cardText: {
		fontFamily: 'Rubik-Regular',
		fontSize: 20,
		color: '#4f4f4f'
	},
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	header: {
		backgroundColor: '#8894C9'
	},
	headerButton: {
		color: '#fff'
	},
	headerText: {
		fontFamily: 'Rubik-Medium',
		fontSize: 15,
		color: '#fff',
		letterSpacing: 3
	},
	headerTitle: {
		fontFamily: 'Rubik-Medium',
		fontSize: 23,
		color: '#fff',
		letterSpacing: 3
	},
	picker: {
		color: '#bfc6ea',
		fontFamily: 'Rubik-Regular',
		fontSize: 22,
		marginBottom: 10
	},
	pickerItem: {
		color: '#4f4f4f',
		fontFamily: 'Rubik-Regular',
		fontSize: 24
	},
	pickerText: {
		color: '#4f4f4f',
		fontFamily: 'Rubik-Regular',
		fontSize: 222
	},
	tabs: {
		marginBottom: 10
	},
	textArea: {
		color: '#4f4f4f',
		fontFamily: 'Rubik-Regular',
		fontSize: 30
	},
	underline: {
		backgroundColor: '#fff'
	}
});