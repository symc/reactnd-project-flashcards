import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';

export default class DeckList extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>This is a list of decks.</Text>
        <Text>This is a list of decks.</Text>
        <Text>This is a list of decks.</Text>
        <Text>This is a list of decks.</Text>
        <Text>This is a list of decks.</Text>
        <Button 
            title={'Press here for navigating to an individual deck'}
            onPress={() => this.props.navigation.navigate('DeckDetail')}
        />
      </View>
    );
  }
}