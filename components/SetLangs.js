import React from 'react';
import { AsyncStorage } from 'react-native';
import {
	PowerTranslator,
	ProviderTypes,
	TranslatorConfiguration,
	TranslatorFactory
} from 'react-native-power-translator';
import {
	Body,
	Card,
	CardItem,
	Content,
	Container,
	Form,
	Icon,
	Item,
	Picker,
	Text,
	Toast,
	TabHeading,
} from 'native-base';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import languages from '../assets/languages.json';
import config from '../assets/config.json';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			originalLang: [],
			originalText: '',
			selectedLangs: [],
			showToast: false,
			translatedText: '',
			languages: '',
			history: []
		};
	}
	onOrigLangChange = (originalLang) => {
		this.setState({
			originalLang
		});
	}
	onSelectedLangsChange = (selectedLangs) => {
		 this.setState({
			selectedLangs
		 });
		 console.log(this.selectedLangs);
	}
	componentDidMount() {
		axios.get(`https://translation.googleapis.com/language/translate/v2/languages?key=${config.apiKey}&target=en`)
			.then((result) => {
				console.log(result.data.languages);
			})
			.catch((err) => {
				alert(`Unable to retrieve list of languages from Google Translate.\nLocal list used instead.\n\n${err}`);
			});
	}
	render() {
		const items =
		[
			{  
			  name: "Languages",
			  id: 0,
			  children: languages.data.languages
			}
		  ];

		  const selectorStyle = StyleSheet.create({
			itemText: {
				fontFamily: 'Rubik-Regular',
				fontSize: 25
			},
			searchBar: {
				fontFamily: 'Rubik-Regular',
				fontSize: 30
			},
			selectedItem: {
				fontFamily: 'Rubik-Regular',
				fontSize: 25
			}
		  });

		return (
			<Container>
				<Content padder>
					<Text style={this.props.style.bodyHeader}>FROM</Text>
					<SectionedMultiSelect
							colors={{
								primary: '#8894C9',
								subText: '#4f4f4f'
							}}
							confirmText='CONFIRM'
							items={items}
							subKey='children'
							uniqueKey='language'
							expandDropDowns={true}
							single={true}
							itemNumberOfLines={10}
							searchPlaceholderText='Search languages...'
							selectText='Choose a language...'
							confirmFontFamily={{
								fontFamily: 'Rubik-Medium',
								fontSize: 25,
								letterSpacing: 3
							}}
							itemFontFamily={{
								fontFamily: 'Rubik-Medium',
								fontSize: 30
							}}
							subItemFontFamily={{
								fontFamily: 'Rubik-Regular',
								fontSize: 30
							}}
							searchTextFontFamily={{
								fontFamily: 'Rubik-Regular',
								fontSize: 20
							}}
							showDropDowns={false}
							showRemoveAll={true}
							readOnlyHeadings={true}
							onSelectedItemsChange={this.onOrigLangChange}
							selectedItems={this.state.originalLang}
						/>
					<Text style={this.props.style.bodyHeader}>TO</Text>
					<SectionedMultiSelect
							colors={{
								primary: '#8894C9',
								subText: '#4f4f4f'
							}}
							confirmText='CONFIRM'
							items={items}
							subKey='children'
							uniqueKey='language'
							expandDropDowns={true}
							itemNumberOfLines={10}
							searchPlaceholderText='Search languages...'
							selectText='Choose languages...'
							confirmFontFamily={{
								fontFamily: 'Rubik-Medium',
								fontSize: 25,
								letterSpacing: 3
							}}
							itemFontFamily={{
								fontFamily: 'Rubik-Medium',
								fontSize: 30
							}}
							subItemFontFamily={{
								fontFamily: 'Rubik-Regular',
								fontSize: 30
							}}
							searchTextFontFamily={{
								fontFamily: 'Rubik-Regular',
								fontSize: 20
							}}
							showDropDowns={false}
							showRemoveAll={true}
							readOnlyHeadings={true}
							onSelectedItemsChange={this.onSelectedLangsChange}
							selectedItems={this.state.selectedLangs}
						/>
					<Text>{this.state.originalLang}</Text>
					<Text>{this.state.selectedLangs}</Text>
				</Content>
			</Container>
		);
	}
}

export default Input;