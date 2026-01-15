import { newDeck, dealCards } from "./modules/cards.js";

const button = document.querySelector("#deal");
const deckButton = document.querySelector("#newDeck");
const deckInput = document.querySelector("#deckInput");

deckButton.addEventListener("click", () =>{
    let amount = deckInput.value;
    newDeck(amount);
} );
button.addEventListener("click", dealCards);
