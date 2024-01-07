require("./bootstrap");

import { CardClient } from "./CardClient";
import { ElementBuilder } from "./ElementBuilder";
import { ListClient } from "./ListClient";
import { getCardListApiUrl, getBoardApiUrl } from "./apiConfig";

const listsContainer = document.getElementById("listsContainer");
const boardsContainer = document.getElementById("boardsContainer");
const addNewListButton = document.getElementById("addNewList");

function fetchBoards() {
    fetch(getBoardApiUrl(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((response) => {
            displayBoards(response.data);
        })
        .catch((error) => console.error("Error fetching boards:", error));
}

function fetchLists() {
    fetch(getCardListApiUrl(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((response) => {
            displayLists(response.data);
        })
        .catch((error) => console.error("Error fetching lists:", error));
}

function displayBoards(boards) {
    boards.forEach((currentBoard) => {
        let boardElement = ElementBuilder.createBoardElement(currentBoard);
        boardsContainer.appendChild(boardElement);
    });
}

function displayLists(lists) {
    lists.forEach((currentList) => {
        let newList = ElementBuilder.createListElement(currentList);
        listsContainer.appendChild(newList);

        let cardsContainerElement = ElementBuilder.createCardsContainerElement(
            currentList.id,
            CardClient.patchParentList
        );
        newList.appendChild(cardsContainerElement);

        CardClient.fetchCardsByList(currentList.id);
        displayAddNewCardForm(currentList.id, newList);
    });
}

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
    ListClient.addNewList(
        CardClient.fetchCardsByList,
        displayAddNewCardForm,
        CardClient.patchParentList
    );
});

document.addEventListener("DOMContentLoaded", function () {
    fetchBoards();
    fetchLists();
});
