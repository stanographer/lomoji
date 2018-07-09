import React from 'react';
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
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import config from '../assets/config.json';

class Input extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const items =
		[
			{  
			  name: "Languages",
			  id: 0,
			  children: this.props.state.langList
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
							onSelectedItemsChange={this.props.updateFromLang}
							selectedItems={this.props.state.fromLang}
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
							onSelectedItemsChange={this.props.updateToLang}
							selectedItems={this.props.state.toLang}
						/>
					<Text>{this.props.state.fromLang}</Text>
					<Text>{this.props.state.toLang}</Text>
				</Content>
			</Container>
		);
	}
}

export default Input;