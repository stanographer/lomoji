import React, { Component } from 'react';
import { Text, View } from 'native-base';

class Input extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.buttonTapped) {
			return (
				<View>
					{
						this.props.state.toLang.map(lang => {
							const languageName = this.props.state.langList.find(element => {
								return element.language === lang;
							});
	
							return <Translation
								style={this.props.style}
								key={lang}
								from={this.props.state.fromLang}
								to={lang}
								languageName={languageName.name}
								originalText={this.props.state.originalText}
								submittedText={this.props.state.submittedText} />;
						})
					}
				</View>
			);
		} else {
			return <Text>Press the translate button</Text>;
		}
	}
}

export default FlashCard;