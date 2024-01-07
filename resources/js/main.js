require("./bootstrap");

import { CardClient } from "./Clients/CardClient";
import { ListClient } from "./Clients/ListClient";
import { BoardClient } from "./Clients/BoardClient";
import { ElementBuilder } from "./Util/ElementBuilder";

const addNewListButton = document.getElementById("addNewList");

function displayAddNewCardForm(currentListId, listElement) {
    let newCardForm = ElementBuilder.createAddNewCardFormElement(currentListId);
    listElement.appendChild(newCardForm);

    let addCardButton = document.getElementById(
        `addCardButton-${currentListId}`
    );
    addCardButton.addEventListener("click", () =>
        CardClient.addNewCard(currentListId)
    );
}

addNewListButton.addEventListener("click", function () {
    ListClient.addNewList(displayAddNewCardForm);
});

document.addEventListener("DOMContentLoaded", function () {
    BoardClient.fetchBoards();
    ListClient.fetchLists(displayAddNewCardForm);
});
