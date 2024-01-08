import {
    getCardListApiUrl,
    getCardListsByBoardApiUrl,
} from "../Util/apiConfig";
import { CardClient } from "./CardClient";
import { ElementBuilder } from "../Util/ElementBuilder";

const restHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export class ListClient {
    static addNewList(boardId) {
        const newListTitleInput = document.getElementById("title");

        let newList = {
            title: newListTitleInput.value,
            board_id: boardId,
        };

        fetch(getCardListApiUrl(), {
            method: "POST",
            headers: restHeaders,
            body: JSON.stringify(newList),
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then((response) => {
                this.displayLists([response.data]);
                newListTitleInput.value = "";
            })
            .catch((error) => console.error("Error adding new list:", error));
    }

    static fetchListsByBoard(boardId) {
        fetch(getCardListsByBoardApiUrl(boardId), {
            method: "GET",
            headers: restHeaders,
        })
            .then((response) => response.json())
            .then((response) => {
                this.displayLists(response.data);
            })
            .catch((error) => console.error("Error fetching lists:", error));
    }

    static displayLists(lists) {
        const listsContainer = document.getElementById("listsContainer");
        lists.forEach((currentList) => {
            let newList = ElementBuilder.createListElement(currentList);
            listsContainer.appendChild(newList);

            let cardsContainerElement =
                ElementBuilder.createCardsContainerElement(
                    currentList.id,
                    CardClient.patchParentList
                );
            newList.appendChild(cardsContainerElement);

            CardClient.fetchCardsByList(currentList.id);
            CardClient.displayAddNewCardForm(currentList.id, newList);
        });

        this._displayNewListForm(lists[0].board_id);
    }

    static _displayNewListForm(parentBoardId) {
        const newListContainer = document.getElementById("newListContainer");
        newListContainer.innerHTML = "";

        const listFormElement =
            ElementBuilder.createListFormElement(parentBoardId);

        const submitButton = listFormElement.querySelector(
            `#addNewList-${parentBoardId}`
        );
        submitButton.addEventListener("click", () =>
            ListClient.addNewList(parentBoardId)
        );

        newListContainer.appendChild(listFormElement);
    }
}
