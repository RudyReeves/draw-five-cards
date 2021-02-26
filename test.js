/***
 * Problem Statement:
 * Pick five random cards from a standard deck of playing cards.
**/

// Here are my two solutions in JavaScript, beginning with the most obvious:
// (Helper functions and tests are defined at the bottom.)

/***
 * Solution 1:
 * Shuffles the `deck` and takes the first `n` cards.
**/
const drawCardsWithShuffling = (deck, n = 5) => {
    const shuffledDeck = shuffleArray(deck);
    return [shuffledDeck.splice(0, n), shuffledDeck];
};

/***
 * Solution 2:
 * Removes one random card at a time and maintains a copy
 * of the `deck` as it shrinks. Might do excessive copies.
**/
const drawCards = (deck, n = 5) => {
    const cards = [];
    for (let i = 0; i < n; i++) {
        const [card, newDeck] = removeRandomElement(deck);
        deck = newDeck;
        cards.push(card);
    }
    return [cards, deck];
};

// Helper functions:

/***
 * Generates and returns an array of 52 unique playing cards,
 * where each card is of the form {rank: [1-4], suit: [1-13]}.
**/
const getNewDeck = () => {
    const deck = [];
    for (let suit = 1; suit <= 4; suit++) {
        for (let rank = 1; rank <= 13; rank++) {
            deck.push({suit, rank});
        }
    }
    return deck;
};

/***
 * Formats a card for display and returns a string representing the card.
**/
const formatCard = ({rank, suit}) => {
    const suitNames = {
        1: 'Hearts',
        2: 'Spades',
        3: 'Diamonds',
        4: 'Clubs'
    };
    const rankNames = {
        1: 'A',
        11: 'J',
        12: 'Q',
        13: 'K'
    };
    return `${rankNames[rank] || rank} of ${suitNames[suit]}`;
};

/***
 * Shuffles an array and returns it, modified.
**/
const shuffleArray = (arr) => {
    for (let i = arr.length; i > 0; i--) {
        let randomIndex = getRandomIndex(i);
        // Swap element at index `i` with the one at `randomIndex`:
        let temporaryValue = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
};

/** Returns a random array index of given `length`,
 * i.e., a random int in range [0, length - 1]
 */
const getRandomIndex = (length) =>
    Math.floor(Math.random() * length);

/***
 * Removes a random element from `arr` and returns
 * the removed element and the rest of `arr` as a pair.
**/
const removeRandomElement = (arr) =>
    [arr.splice(getRandomIndex(arr.length), 1)[0], arr];

// Tests:

// `hand` is the array of five randomly selected cards
// `deck` is the remaining 47 cards in the deck
const [hand, deck] = drawCards(getNewDeck());
const [hand2, deck2] = drawCardsWithShuffling(getNewDeck());

console.log(hand.map(formatCard)); // pass (five random cards)
console.log(deck.length); // pass (47)

console.log(hand2.map(formatCard)); // pass (five random cards)
console.log(deck2.length); // pass (47)
