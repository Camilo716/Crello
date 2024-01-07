require("./bootstrap");

import { CardClient } from "./Clients/CardClient";
import { ElementBuilder } from "./Util/ElementBuilder";
import { ListClient } from "./Clients/ListClient";
import { getBoardApiUrl } from "./Util/apiConfig";

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

function displayBoards(boards) {
    boards.forEach((currentBoard) => {
        let boardElement = ElementBuilder.createBoardElement(currentBoard);
        boardsContainer.appendChild(boardElement);
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
    ListClient.addNewList(displayAddNewCardForm);
});

document.addEventListener("DOMContentLoaded", function () {
    fetchBoards();
    ListClient.fetchLists(displayAddNewCardForm);
});
