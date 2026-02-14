import { newDeck, dealCards } from "./modules/cards.js";

const button = document.querySelector("#deal");
const hitButton = document.querySelector("#hit");
const deckButton = document.querySelector("#newDeck");
const deckInput = document.querySelector("#deckInput");
const standButton = document.querySelector("#stand");

const remaining = document.querySelector(".remaining");
const dealerInfo = document.querySelector(".dealerCards");
const playerInfo = document.querySelector(".cards");
const status = document.querySelector(".status");

let value = 0;
let dealerValue = 0;
let hasAce = false;
let initialCards = false;

deckButton.addEventListener("click", async () =>{
    let amount = deckInput.value;
    newDeck(amount);
});

button.addEventListener("click", async () =>{

    clearTable();
    initialCards = false;
    let cardCount = 4;
    let cards = await dealCards(cardCount);
    cardVisuals(cards);

});

hitButton.addEventListener("click", async () =>{
    initialCards = true;
    let cardCount = 1;
    let cards = await dealCards(cardCount);
    cardVisuals(cards);

});

standButton.addEventListener("click", async () =>{
    stand();
});


function cardVisuals(cards){
    cards.map((card, i) => {
        const cardContainer = document.createElement("div");
        const img = document.createElement("img");
        cardContainer.classList.add("card");
        img.src = card.image;
        cardContainer.appendChild(img);
        if(i % 2 != 0){
            document.querySelector(".dealerHand").appendChild(cardContainer);
            dealerValue = getCardValue(card, dealerValue);
        }
        else{
            document.querySelector(".hand").appendChild(cardContainer);
            value = getCardValue(card, value);
        }

        
    })
       
    if(dealerValue == 21 && !initialCards)
        dealerInfo.innerHTML = "Dealer's Hand: Dealer Blackjack!";
    else if(value == 21 && !initialCards)
        playerInfo.innerHTML = "Your Hand: Player Blackjack!";
}



function getCardValue(card, cardValue = 0){
    if(card.value === "ACE"){
        hasAce = true;
            if(cardValue + 11 > 21){
                cardValue += 1;
        }
        else{
                cardValue += 11;
        }
    }
    else if(card.value === "KING" || card.value === "QUEEN" || card.value === "JACK")
    {
        cardValue += 10;
    }
    else
    {
        cardValue += parseInt(card.value);
    }
    if(hasAce && cardValue > 21)
    {
        cardValue -= 10;
        hasAce = false;
    }
    if(cardValue > 21){
        alert("Bust!");
    }

    remaining.innerHTML = `Remaining Cards: ${card.remaining}`;

    return cardValue;
}

async function stand(){
    if(dealerValue < 17){        
        let card = await dealCards(1);
        const cardContainer = document.createElement("div");
        const img = document.createElement("img");
        cardContainer.classList.add("card");
        img.src = card[0].image;
        cardContainer.appendChild(img);
        document.querySelector(".dealerHand").appendChild(cardContainer);
        dealerValue = getCardValue(card, dealerValue);
    }
    else{
        checkHands();
    }
}

async function clearTable(){
    value = 0;
    dealerValue = 0;
    hasAce = false;
    initialCards = false;
    document.querySelector(".dealerHand").replaceChildren();
    document.querySelector(".hand").replaceChildren();

}

async function checkHands(){
    if(dealerValue > value)
        status.innerHTML = "DEALER WINS";
    else
        status.innerHTML = "YOU WIN";
}