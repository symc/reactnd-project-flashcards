import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import { getDecks, clearDecks, saveDeckTitle } from '../utils/api';
import { blue, black, white, lightGray } from '../utils/colors';

/**
* @description Represents a component which lists the decks
* @constructor
*/
export default class DeckList extends Component {
  state = {
    decks: null
  }

  /**
  * @description refresh
  * Refresh deck list view by getting the data from AsyncStorage
  */
  refresh = () => {
    getDecks().then((result) => {
      this.setState({decks: result});
    });
  }

  /**
  * @description componentDidMount method of DeckList
  * Refresh the deck list view
  */
  componentDidMount() {
    this.refresh();
  }

  /**
  * @description componentWillReceiveProps method of DeckList
  * Refresh the deck list view
  */
  componentWillReceiveProps() {
    this.refresh();
  }

  /**
  * @description numberOfCardsText
  * Given a number, returns a text to be displayed that tells the user
  * the number of cards the deck has
  * @param {int} number - Number of cards
  * @returns {string} - String that has the information about number of cards
  */
  numberOfCardsText = (number) => {
    if (number === 0) {
      return `No cards`
    }
    let text = `${number} card`;
    if (number > 1) text += 's';
    return text;
  }

  render() {
    if (this.state.decks) {
      /*
        If there are decks in the AsyncStorage, display them
      */
      const deckKeys = Object.keys(this.state.decks);
      // Sort the decks so that they will be displayed in alphabetical (title) order
      deckKeys.sort();
      const decks = this.state.decks;
      /*
        Render a TouchableOpacity for each deck. On clicking TouchableOpacity, deck
        detail will be displayed
      */
      return (
        <ScrollView style={styles.container}>
          {deckKeys.map((key) => {
              return (
                <View key={key}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate(
                      'DeckDetail', {
                        deckTitle: decks[key].title,
                        refresh: this.refresh
                      }
                    )}
                    style={styles.deckContainer}
                  >
                    <View>
                      <Text style={styles.deckTitle}>
                        {decks[key].title}
                      </Text>
                      <Text style={styles.deckNumber}>
                        {this.numberOfCardsText(decks[key].questions.length)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          )}
        </ScrollView>
      );
    } else {
      /*
        If no decks has been created yet, display a message which states
        that no decks have been created so far.
      */
      return (
        <View style={styles.container}>
          <Text style={styles.explanationText}>
            You have not created any decks yet.
          </Text>
          <Text style={styles.explanationText}>
            Please go to the "New Deck" tag to create a new deck.
          </Text>
        </View>
      )
    }
  }
}

/*
  Styles used in this component
*/
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deckContainer: {
    backgroundColor: blue,
    alignSelf: 'center',
    width: 300,
    borderWidth: 1,
    borderColor: black,
    marginTop: 10,
    marginBottom: 10
  },
  deckTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: white
  },
  deckNumber: {
    textAlign: 'center',
    fontSize: 20,
    color: lightGray
  }, 
  explanationText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10
  }
})