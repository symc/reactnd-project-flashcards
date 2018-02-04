import { AsyncStorage } from 'react-native';

export const DECK_STORAGE_KEY = "MobileFlashcards:decks";

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
        (results) => {
            const data = JSON.parse(results);
            return data;
        }
    );
}

export function getDeck(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
        (results) => {
            const data = JSON.parse(results);
            return data[title];
        }
    );
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }));
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
        (results) => {
            const data = JSON.parse(results);
            data[title].questions.push(card);
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        }
    );
}

export function clearDecks()
{
    return AsyncStorage.clear();
}