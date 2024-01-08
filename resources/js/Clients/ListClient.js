import {
    getCardListApiUrl,
    getCardListsByBoardApiUrl,
} from "../Util/apiConfig";
import { CardClient } from "./CardClient";
import { ElementBuilder } from "../Util/ElementBuilder";

const newListTitleInput = document.getElementById("title");
const restHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export class ListClient {
    static addNewList() {
        let newList = {
            title: newListTitleInput.value,
            board_id: 1,
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
    }
}
