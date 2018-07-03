import React from 'react';
import { Button, Container, Textarea, Text } from 'native-base';

class InputBox extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Container>
				<Textarea rowSpan={5} style={this.props.style.textArea} placeholder='Text to translate...' />
				<Button block success>
					<Text style={this.props.style.buttonText}>Translate</Text>
				</Button>
			</Container>
		);
	}
}

export default InputBox;