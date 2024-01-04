require("./bootstrap");

import { ElementBuilder } from "./ElementBuilder";
import {
    getCardApiUrl,
    getCardListApiUrl,
    getCardsByListApiUrl,
    getCardsByIdApiUrl,
    getPatchParentListApiUrl,
    getBoardApiUrl,
} from "./apiConfig";

const listsContainer = document.getElementById("listsContainer");
const boardsContainer = document.getElementById("boardsContainer");
const addNewListButton = document.getElementById("addNewList");
const newListTitleInput = document.getElementById("title");

function addNewList() {
    let newList = {
        title: newListTitleInput.value,
        board_id: 1,
    };

    fetch(getCardListApiUrl(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
    })
        .then((response) => {
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then((response) => {
            displayLists([response.data]);
            newListTitleInput.value = "";
        })
        .catch((error) => console.error("Error adding new list:", error));
}

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

function addNewCard(listId) {
    const newCardTitleInput = document.getElementById(
        `addCardTitleInput-${listId}`
    );
    fetch(getCardApiUrl(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: newCardTitleInput.value,
            content: "",
            card_list_id: listId,
        }),
    })
        .then((response) => {
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then((response) => {
            displayCards([response.data], listId);
            newCardTitleInput.value = "";
        })
        .catch((error) => console.error("Error adding new list:", error));
}

function deleteCard(cardId) {
    fetch(getCardsByIdApiUrl(cardId), {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            const cardElement = document.getElementById(`card-${cardId}`);
            if (cardElement) {
                cardElement.remove();
            }
        })
        .catch((error) => console.error("Error adding new list:", error));
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

function fetchCardsByList(listId) {
    fetch(getCardsByListApiUrl(listId))
        .then((response) => response.json())
        .then((response) => {
            displayCards(response.data, listId);
        })
        .catch((error) => console.error("Error fetching cards:", error));
}

function patchParentList(cardId, parentListId) {
    let newParentList = { card_list_id: parentListId };

    fetch(getPatchParentListApiUrl(cardId), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newParentList),
    }).catch((error) => console.error("Error fetching cards:", error));
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
            patchParentList
        );
        newList.appendChild(cardsContainerElement);

        fetchCardsByList(currentList.id);
        displayAddNewCardForm(currentList.id, newList);
    });
}

function displayCards(cards, parentcardContainerId) {
    const cardsContainerElement = document.getElementById(
        `cardsContainer-${parentcardContainerId}`
    );
    cards.forEach((currentCard) => {
        let newCard = ElementBuilder.createCardElement(currentCard, deleteCard);
        cardsContainerElement.appendChild(newCard);
    });
}

function displayAddNewCardForm(currentListId, listElement) {
    let newCardForm = ElementBuilder.createAddNewCardFormElement(currentListId);
    listElement.appendChild(newCardForm);

    let addCardButton = document.getElementById(
        `addCardButton-${currentListId}`
    );
    addCardButton.addEventListener("click", () => addNewCard(currentListId));
}

addNewListButton.addEventListener("click", addNewList);
document.addEventListener("DOMContentLoaded", function () {
    fetchBoards();
    fetchLists();
});
