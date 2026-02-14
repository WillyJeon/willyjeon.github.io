
const CARD_URL = "https://deckofcardsapi.com/api/"
let deck;
export async function newDeck(deckCount = 1){
    console.log("New Deck Function Called");
    console.log(deckCount);
    let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`;
    const result = await fetch(url, {headers:{'Content-Type': 'application/json'}} );
    const data = await result.json();
    deck = data.deck_id;
  
}

export async function dealCards(cardCount = 4){
   
    if(!deck){
        alert("Please create a new deck first!");
        return;
    }
    let url = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${cardCount}`;
    const result = await fetch(url, {headers:{'Content-Type': 'application/json'}} );
    const data = await result.json();

    let cards = data.cards.map(card => ({
        image: card.images.svg,
        value: card.value,
        remaining: data.remaining
    }));

    return cards;
}

