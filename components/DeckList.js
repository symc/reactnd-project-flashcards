import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { getDecks, clearDecks, saveDeckTitle } from '../utils/api'; 

export default class DeckList extends Component {
  state = {
    decks: null
  }

  componentDidMount() {
    getDecks().then((result) => {
      this.setState({decks: result});
    });
  }

  render() {
    if (this.state.decks) {
      const deckKeys = Object.keys(this.state.decks);
      const decks = this.state.decks;
      return (
        <View style={{flex: 1}}>
          {deckKeys.map((key) => {return <Text key={decks[key].title}>{`${decks[key].title}: ${decks[key].questions.length}`}</Text>})}
          <Button 
              title={'Press here for navigating to an individual deck'}
              onPress={() => this.props.navigation.navigate('DeckDetail')}
          />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Text>You have not created any decks yet.</Text>
          <Text>Please go to the "New Deck" tag to create a new deck.</Text>
        </View>
      )
    }
  }
}