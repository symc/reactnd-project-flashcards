import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';
import { purple, white } from './utils/colors';
import { setLocalNotification } from './utils/helpers';
import { Notifications, Permissions } from 'expo';
import { black } from './utils/colors';

/*
  TabNavigator has two tabs:
  1) DeckList: This tab contains a list of decks, the label for 
  this text is 'DECKS'
  2) NewDeck: This tab contains a view for creating a new deck
*/
const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks',
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'Create New Deck',
      tabBarLabel: 'NEW DECK'
    }
  }
}, {
  tabBarOptions: {
    showIcon: false,
    labelStyle: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  }
});

/*
  StackNavigator has four views:
  1) Home: This views contains the tabs described above. One tab for
  listing the decks and another for creating a deck
  2) DeckDetail: This view is for showing the details of an individual
  deck. A user can see the title of the deck, number of cards in the deck.
  User can also create a new question or start a quiz in this view
  3) NewCard: This view is for creating a new question for a deck
  4) Quiz: This view is for showing quiz questions and result of the quiz
  in the end
*/
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerLeft: null,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DeckDetail: {
    screen: Deck,
    navigationOptions: {
      title: 'Deck Details',
      headerLeft: null,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add a new card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerLeft: null,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
});


/**
* @description Represents the main component where the app lives
* @constructor
*/
export default class App extends Component {
  /**
  * @description componentDidMount method of the App
  * Creates a local notification for reminding the user to study
  * Asks for permission if needed
  */
  componentDidMount() {
    setLocalNotification()
    // TODO: Remove the following listener after code review
    // The listener is added for making the job of the reviewer
    // easy in case the reviewer needs to debug the functionality
    // of the listener
    Notifications.addListener((notification) => {
      console.log('received', notification);
      this.setState({ received: true })
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MainNavigator/>
      </View>
    );
  }
}