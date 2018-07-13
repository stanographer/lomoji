import React from 'react';
import {
	Body,
	Card,
	CardItem,
	Container,
	Text
} from 'native-base';
import {
	Translate,
	PowerTranslator,
	ProviderTypes,
	TranslatorConfiguration,
	TranslatorFactory
} from 'react-native-power-translator';
import config from '../assets/config.json';

class Translation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.to.length > 0 && this.props.submittedText.length > 0) {
			TranslatorConfiguration.setConfig(ProviderTypes.Google, config.apiKey, this.props.to, null);
			return (
				<Card>
					<CardItem header>
						<Text style={this.props.style.cardHeader}>{this.props.languageName}</Text>
					</CardItem>
					<CardItem>
						<Body>
							<PowerTranslator
								text={this.props.submittedText}
								style={{
									fontFamily: 'Rubik-Regular',
									fontSize: 22,
									color: '#4f4f4f'
								}} />
						</Body>
					</CardItem>
				</Card>
			);
		}
		return <Text>Press the translate button!</Text>;
	}
}

export default Translation;