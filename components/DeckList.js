import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, FlatList, StyleSheet } from 'react-native';
import { getDecks, clearDecks, saveDeckTitle } from '../utils/api';
import { blue, black, white, lightGray } from '../utils/colors';

export default class DeckList extends Component {
  state = {
    decks: null
  }

  refresh = () => {
    getDecks().then((result) => {
      this.setState({decks: result});
    });
  }

  componentDidMount() {
    //clearDecks();
    this.refresh();
  }

  componentWillReceiveProps() {
    this.refresh();
  }

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
      const deckKeys = Object.keys(this.state.decks);
      deckKeys.sort();
      const decks = this.state.decks;
      return (
        <View style={styles.container}>
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
        </View>
      );
    } else {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
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
    fontFamily: 'Courier',
    textAlign: 'center',
    fontSize: 20,
    color: lightGray
  }, 
  explanationText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10
  },
})