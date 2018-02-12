import { AsyncStorage } from 'react-native';

/*
    Storage key for deck objects is defined here
*/
export const DECK_STORAGE_KEY = "MobileFlashcards:decks";

/**
* @description getDecks
* Gets all deck objects from AsyncStorage
* @returns {Promise} - Returns a promise after getting the decks
*/
export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
        (results) => {
            const data = JSON.parse(results);
            return data;
        }
    );
}

/**
* @description getDeck
* Get a particular deck from AsyncStorage
* @param {string} title - Title of the deck to be returned
* @returns {Promise} - Returns a promise after getting the deck
*/
export function getDeck(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
        (results) => {
            const data = JSON.parse(results);
            return data[title];
        }
    );
}

/**
* @description saveDeckTitle
* Saves a deck to AsyncStorage
* @param {string} title - Title of the deck to be saved
* @returns {Promise} - Returns a promise after saving the deck
*/
export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }));
}

/**
* @description addCardToDeck
* Adds a card to a deck
* @param {string} title - Title of the deck to be modified
* @param {Object} title - Card to be added to the deck
* @returns {Promise} - Returns a promise after modifying the deck
*/
export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
        (results) => {
            const data = JSON.parse(results);
            data[title].questions.push(card);
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        }
    );
}

/**
* @description clearDecks
* Clears the decks in AsyncStorage. This function is used for debugging only
* TODO: Remove the following function after code review
* The function is added for helping the reviewer in debugging
* @returns {Promise} - Returns a promise after clearing the AsyncStorage
*/
export function clearDecks()
{
    return AsyncStorage.clear();
}