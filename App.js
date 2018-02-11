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


export default class App extends Component {
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