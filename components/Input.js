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
	}
	render() {
		return (
			<View>
				<Textarea
					rowSpan={5}
					style={this.props.style.textArea}
					placeholder='Text to translate...'
					onChangeText={this.props.updateNewInput}
					value={this.props.state.originalText} />
				<Button type='submit' block large success onPress={this.props.updateTranslate}>
					<Icon name='swap' />
				</Button>
				{
					this.props.state.toLang.map(lang => {
						return <Translation
							key={lang}
							from={this.props.state.fromLang}
							to={lang}
							originalText={this.props.state.originalText} />;
					})
				}
			</View>
		);
	}
}

export default Input;