import React from 'react';
import { Font } from 'expo';
import {
	KeyboardAvoidingView,
	StyleSheet,
	View
} from 'react-native';
import {
	AsyncStorage,
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
import Input from './components/Input';
import SetLangs from './components/SetLangs';
import axios from 'axios';
import languages from './assets/languages.json';
import config from './assets/config.json';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			assetsLoaded: false,
			fromLang: [],
			toLang: [],
			originalText: '',
			translatedText: [],
			history: [],
			langList: {}
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
		this.setState({
			originalText
		});
	}

	handleTranslate = (translatedText) => {
		this.setState({translatedText: [...this.state.translatedText, translatedText]});
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
				.get(`https://translation.googleapis.com/language/translate/v2/languages?key=${config.apiKey}&target=en`)
				.then((result) => {
					console.log(result.data);
					this.setState({
						langList: result.data.languages
					});
				})
				.catch((err) => {
					this.setState({
						langList: languages.data.languages
					});
					alert(`Unable to retrieve list of languages from Google Translate.\nLocal list used instead.\n\n${err}`);
		});
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
										updateNewInput={this.handleNewInput}
										updateTranslate={this.handleTranslate}
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
								langList={this.state.langList}
								updateFromLang={this.handleFromLang.bind(this)}
								updateToLang={this.handleToLang.bind(this)}
								state={this.state} />
						</Tab>
					</Tabs>
					<Text>{this.state.fromLang}</Text>
							<Text>{this.state.toLang}</Text>
							<Text>{this.state.originalText}</Text>
							<Text>{this.state.translatedText}</Text>
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