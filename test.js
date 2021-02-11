/***
 * Problem Statement:
 * Pick five random cards from a standard deck of playing cards.
**/

// Here are my two solutions in JavaScript, beginning with the most obvious:
// (Helper functions are defined at the bottom.)

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

const [hand, deck] = drawCards(getNewDeck());
const [hand2, deck2] = drawCardsWithShuffling(getNewDeck());

// Tests:
// `hand` is the array of five randomly selected cards
// `deck` is the remaining 47 cards in the deck

console.log(hand.map(formatCard)); // pass (five random cards)
console.log(deck.length); // pass (47)

console.log(hand2.map(formatCard)); // pass (five random cards)
console.log(deck2.length); // pass (47)

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
 * This likely needs to be memorized or looked up.
**/
const shuffleArray = (arr) => {
    let currentIndex = arr.length, temporaryValue, randomIndex;
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    
    return arr;
};

/***
 * Returns a random index for `arr`.
**/
const getRandomIndex = (arr) =>
    Math.floor(Math.random() * arr.length) - 1;

/***
 * Removes a random element from `arr` and returns
 * the removed element and the rest of `arr` as a pair.
**/
const removeRandomElement = (arr) =>
    [arr.splice(getRandomIndex(arr), 1)[0], arr];
