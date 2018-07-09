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
		if (this.props.to.length > 0 && this.props.from.length > 0 && this.props.originalText.length > 0) {
			TranslatorConfiguration.setConfig(ProviderTypes.Google, config.apiKey, this.props.to, this.props.from);
			return (
				<Card>
					<CardItem header>
						<Text>{this.props.to}</Text>
					</CardItem>
					<CardItem>
						<Body>
							<PowerTranslator text={this.props.originalText} />
						</Body>
					</CardItem>
				</Card>

			);
		}
		return <Text>Nothing to translate!</Text>
	}
}

export default Translation;