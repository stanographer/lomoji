import React from 'react';
import { AsyncStorage } from 'react-native';
import {
	Translate,
	PowerTranslator,
	ProviderTypes,
	TranslatorConfiguration,
	TranslatorFactory
} from 'react-native-power-translator';
import {
	Button,
	Container,
	Form,
	Icon,
	Item,
	Textarea,
	Text
} from 'native-base';
import axios from 'axios';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			originalLang:'',
			targetLang: '',
			originalText: '',
			translatedText: '',
			history: []
		};
	}
	origLangChange(value) {
		this.setState({
			originalLang: value
		});
	}
	componentDidMount() {			
		TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyBCYL8kbR3__RoMV0qdmcefG_63a1ddgA4','es');
	}
	render() {
		return (
			<Container style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
				<Textarea
					autoFocus
					rowSpan={5}
					style={this.props.style.textArea}
					placeholder='Text to translate...'
					onChangeText={(text) => this.setState({originalText: text})}
					value={this.state.originalText} />
				<Button type='submit' block large success onPress={this.translate.bind(this)}>
					<Icon name='swap' />
				</Button>
				<Text>{this.state.originalText}</Text>
				<Text>{this.state.translatedText}</Text>
				<Text>{this.state.languages}</Text>
			</Container>
		);
	}
	translate() {
		const translator = TranslatorFactory.createTranslator();
		if (this.state.originalText) {
			translator.translate(this.state.originalText).then(translated => {
				this.setState({translatedText: translated});
			});
		}
	}
}

export default Input;