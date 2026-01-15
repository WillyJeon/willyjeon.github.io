
const CARD_URL = "https://deckofcardsapi.com/api/"
let deck;
export function newDeck(deckCount = 1){
    console.log("New Deck Function Called");
    console.log(deckCount);
    let url = `${CARD_URL}deck/new/shuffle/?deck_count=${deckCount}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        deck = data.deck_id;
    });
    console.log(deck);
  
}

export function dealCards(){

}
