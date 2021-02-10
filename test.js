/***
 * Problem Statement:
 * Pick five random cards from a standard deck of playing cards.
**/

// Here are my two solutions in JavaScript, beginning with the more obvious one:
// Helper functions:

const getNewDeck = () => {
    const deck = [];
    for (let suit = 1; suit <= 4; suit++) {
        for (let rank = 1; rank <= 13; rank++) {
            deck.push({suit, rank});
        }
    }
    return deck;
};

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
 * Shuffles the `deck` and take the first `n` cards.
 * Requires memorizing or looking up a shuffling algorithm.
**/
const drawCardsWithShuffledDeck = (deck, n) => {
    const shuffled = shuffleArray(deck);
    return [shuffled.splice(0, n), shuffled];
};

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
 * Removes one random card at a time and maintains a copy
 * of the `deck` as it shrinks. Might do excessive copies.
**/
const getRandomIndex = (arr) =>
    Math.floor(Math.random() * arr.length) - 1;

const removeRandomElement = (arr) =>
    [arr.splice(getRandomIndex(arr), 1)[0], arr];

const drawCards = (deck, n) => {
    const cards = [];
    for (let i = 0; i < n; i++) {
        const [card, newDeck] = removeRandomElement(deck);
        deck = newDeck;
        cards.push(card);
    }
    return [cards, deck];
};

const [hand, deck] = drawCards(getNewDeck(), 5);
const [hand2, deck2] = drawCardsWithShuffledDeck(shuffleArray(getNewDeck()), 5);

// `hand` is the array of five randomly selected cards
// `deck` is the remaining 47 cards in the deck

console.log(hand.map(formatCard)); // pass (five random cards)
console.log(deck.length); // pass (47)

console.log(hand2.map(formatCard)); // pass (five random cards)
console.log(deck2.length); // pass (47)
