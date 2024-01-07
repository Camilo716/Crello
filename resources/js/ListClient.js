import { getCardListApiUrl } from "./apiConfig";
import { CardClient } from "./CardClient";
import { ElementBuilder } from "./ElementBuilder";

const newListTitleInput = document.getElementById("title");

export class ListClient {
    static addNewList(displayCardFormFunction) {
        let newList = {
            title: newListTitleInput.value,
            board_id: 1,
        };

        fetch(getCardListApiUrl(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(newList),
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then((response) => {
                this.displayLists([response.data], displayCardFormFunction);
                newListTitleInput.value = "";
            })
            .catch((error) => console.error("Error adding new list:", error));
    }

    static fetchLists(displayCardFormFunction) {
        fetch(getCardListApiUrl(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                this.displayLists(response.data, displayCardFormFunction);
            })
            .catch((error) => console.error("Error fetching lists:", error));
    }

    static displayLists(lists, displayCardFormFunction) {
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
            displayCardFormFunction(currentList.id, newList);
        });
    }
}
