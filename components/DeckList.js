import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { getDecks, clearDecks, saveDeckTitle } from '../utils/api'; 

export default class DeckList extends Component {
  state = {
    decks: null
  }

  refresh = () => {
    getDecks().then((result) => {
      this.setState({decks: result});
    });
  }

  testFunction = () => {
    console.log('called');
  }

  componentDidMount() {
    //clearDecks();
    this.refresh();
  }

  componentWillReceiveProps() {
    this.refresh();
  }

  render() {
    if (this.state.decks) {
      const deckKeys = Object.keys(this.state.decks);
      const decks = this.state.decks;
      return (
        <View style={{flex: 1}}>
          {deckKeys.map((key) => {
              return (
                <View key={key} style={{flex: 1}}>
                  <Text>Deck title: {decks[key].title}</Text>
                  <Text>Number of cards: {decks[key].questions.length}</Text>
                  <Button 
                      title={'Show deck details'}
                      onPress={() => this.props.navigation.navigate(
                        'DeckDetail', {
                          deckTitle: decks[key].title,
                          refresh: this.refresh
                        }
                      )}
                  />
                </View>
              );
            }
          )}
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