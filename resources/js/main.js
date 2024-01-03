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

const elementBuilder = new ElementBuilder();
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
            "Accept": "application/json",
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
            "Accept": "application/json",
        },
    })
        .then((response) => 
        response.json())
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
        let boardElement = elementBuilder.createBoardElement(currentBoard);
        boardsContainer.appendChild(boardElement);
    });
}

function displayLists(lists) {
    lists.forEach((currentList) => {
        let newList = elementBuilder.createListElement(currentList);
        listsContainer.appendChild(newList);

        let cardsContainerElement = elementBuilder.createCardsContainerElement(currentList.id);
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
        let newCard = _createCardElement(currentCard);
        cardsContainerElement.appendChild(newCard);
    });
}

function displayAddNewCardForm(currentListId, listElement) {
    let newCardForm = elementBuilder.createAddNewCardFormElement(currentListId);
    listElement.appendChild(newCardForm);

    let addCardButton = document.getElementById(
        `addCardButton-${currentListId}`
    );
    addCardButton.addEventListener("click", () => addNewCard(currentListId));
}

function _createCardElement(currentCard) {
    let newCardElement = document.createElement("div");
    newCardElement.className = "card";
    newCardElement.id = `card-${currentCard.id}`;

    let cardTitle = document.createElement("h3");
    cardTitle.textContent = currentCard.title;
    newCardElement.appendChild(cardTitle);

    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteCardButton";

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener("click", () => deleteCard(currentCard.id));
    newCardElement.appendChild(deleteButton);

    _makeCardDraggable(newCardElement);

    return newCardElement;
}

function _makeCardDraggable(cardElement) {
    cardElement.draggable = true;

    cardElement.addEventListener("dragstart", (event) => {
        cardElement.classList.add("dragging");
        event.dataTransfer.setData("text/plain", cardElement.id);
    });

    cardElement.addEventListener("dragend", () => {
        cardElement.classList.remove("dragging");
    });
}

addNewListButton.addEventListener("click", addNewList);
document.addEventListener("DOMContentLoaded", function ()
{
    fetchBoards();
    fetchLists();
});
