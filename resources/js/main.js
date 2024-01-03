require("./bootstrap");

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
    console.log(boards);
    boards.forEach((currentBoard) => {
        let boardElement = _createBoardElement(currentBoard);
        boardsContainer.appendChild(boardElement);
    });
}

function displayLists(lists) {
    lists.forEach((currentList) => {
        let newList = _createListElement(currentList);
        listsContainer.appendChild(newList);

        let cardsContainerElement = _createCardsContainerElement(
            currentList.id
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
        let newCard = _createCardElement(currentCard);
        cardsContainerElement.appendChild(newCard);
    });
}

function displayAddNewCardForm(currentListId, listElement) {
    let newCardForm = _createAddNewCardFormElement(currentListId);
    listElement.appendChild(newCardForm);

    let addCardButton = document.getElementById(
        `addCardButton-${currentListId}`
    );
    addCardButton.addEventListener("click", () => addNewCard(currentListId));
}

function _createAddNewCardFormElement(parentListId) {
    let newCardForm = document.createElement("form");
    newCardForm.className = "newCardForm";

    newCardForm.innerHTML = `
    <input type="text" placeholder="Enter card title..." id="addCardTitleInput-${parentListId}">
    <button class="addNewCard" type="button" id="addCardButton-${parentListId}">Add Card</button>
    `;

    return newCardForm;
}

function _createBoardElement(board) {
    let boardElement = document.createElement("div");
    boardElement.className = "board";
    boardElement.innerHTML = `<h1>${board.name}</h1>`;
    boardElement.id = `board-${board.id}`;

    return boardElement;
}

function _createListElement(currentList) {
    let newList = document.createElement("div");
    newList.className = "list";
    newList.innerHTML = `<h2>${currentList.title}</h2>`;
    return newList;
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

function _createCardsContainerElement(currentListId) {
    let cardsContainerElement = document.createElement("div");
    cardsContainerElement.className = "cardsContainer";
    cardsContainerElement.id = `cardsContainer-${currentListId}`;

    _makeCardsContainerDroppable(cardsContainerElement);

    return cardsContainerElement;
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

function _makeCardsContainerDroppable(cardContainerElement) {
    cardContainerElement.addEventListener("dragover", (event) => {
        event.preventDefault();
        const draggable = document.querySelector(".dragging");
        cardContainerElement.appendChild(draggable);
    });

    cardContainerElement.addEventListener("drop", (event) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("text/plain").split("-")[1];
        const cardContainerId = cardContainerElement.id.split("-")[1];

        patchParentList(cardId, cardContainerId);
    });
}

addNewListButton.addEventListener("click", addNewList);
document.addEventListener("DOMContentLoaded", function ()
{
    fetchBoards();
    fetchLists();
});
