## MobileFlashcards

This is an implementation of the third project of  Udacity's React Fundamentals course. A user can create decks with questions using the app. The app lists the created decks on a scroll list. The user can add questions to
any created deck. There is a quiz feature where the user can display the questions for that deck and test her
knowledge.

### Displaying decks
The main view when the app is first opened has two tabs. The first tab with the label 'DECKS' shows a list of created decks. If there are no decks created, this view also displays information about how to create one. Each deck is represented by a blue rectangle, and each rectangle contains the title of a deck and the number of cards in that deck.

### Creating decks
In order to create a deck, users can click on the second tab in the view, with the label 'NEW DECK'. This will guide user to a page with a single text input under a question text 'What is the title of your new deck?'. Users can enter the title of their deck to this input box and press 'Create Deck' to create the deck. After pressing 'Create Deck', the user will be navigated to a view where the deck details are displayed

### Deck Details
Whenever a user clicks on one of the decks in the deck list or creates a new deck, the user will be guided to a view which contains the details of the deck. The deck title is at the top of the view, in black. Under the deck title, in gray, the number of cards in the deck is displayed. There are three buttons in the deck details view. 'Create New Question' creates a new question for this deck. 'Start Quiz' initiates a quiz where user can self-test his/her knowledge about the questions in the deck. Finally, 'Show Deck List' navigates back to the main view where the existing decks are displayed.

### Creating new questions
Users can create a new question by going to the details page of a deck and pressing 'Create New Question'. The app will navigate to a page with two input text fields. The first text field is for the question and the second is for the answer. After entering the question and the answer, the user can press 'Submit' to save the question to the deck. After pressing 'Submit', the user will be navigated to the deck details view.

### Quiz
Users can self-test their knowledge about a deck by going to the details page of a deck and pressing 'Start Quiz'. The app will navigate to a quiz page where for each question in the deck, there will be a screen with a panel. Initially, the panel shows displays the question. The back side of the panel shows the answer and the user can click on the button 'Show Answer' to display it. After answering the question and checking the answer, the user marks his answer as 'Correct' or 'Incorrect' to go to the next question. After answering all questions, the total number of correct answers and the percentage of correct answers are displayed in a summary section. The user can restart the quiz or go back to the detailed deck view after completing a quiz. During the quiz, the user can press 'Abort Quiz' to abort the quiz and go back to the deck details view.

### Notifications
The app requires permission to send local notifications. If the user does not completes a quiz on a given day, the app sends a reminder to the user at 17:00 PM (User's timezone). 

## Installation

You can follow the directions below to install and run the app:

1. Install Node.js and npm. For more information, please check https://docs.npmjs.com/getting-started/installing-node

2. To install
- Install all project dependencies with `npm install`
- Start the app with `npm start`
- Follow the instruction on the terminal to open the app using Expo or one of the simulators

3. If you have not installed Watchmen, npm start may error out in the first run. Follow the provided instructions by npm and restart the app using `npm start`. For more details, please check
https://github.com/react-community/create-react-native-app/issues/234

## Supported Platforms
This app is tested on iPhone 6, iPhone X and Samsung Galaxy S8.