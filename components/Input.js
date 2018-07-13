import React from 'react';
import {
	Button,
	Container,
	Form,
	Icon,
	Item,
	Textarea,
	Text,
	View
} from 'native-base';
import Translation from './Translation';

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			buttonTapped: false
		}
	}

	tapButton = () => {
		this.props.handleTranslate();
		this.setState({buttonTapped: true});
	}

	render() {
		return (
			<View>
				<Form>
					<Textarea
						rowSpan={5}
						style={this.props.style.textArea}
						placeholder='Text to translate...'
						onChangeText={this.props.handleNewInput}
						ref='textBox'
						value={this.props.state.originalText} />
					<Button type='submit' onPress={this.props.handleTranslate} block large success>
						<Icon name='swap' />
					</Button>
				</Form>
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
				<Text>Orig: {this.props.state.originalText}</Text>
				<Text>Submitted: {this.props.state.submittedText}</Text>
				<Text>History: {this.props.state.history}</Text>
				<Text>Languages: {this.props.state.toLang}</Text>
			</View>
		);
	}
}

export default Input;