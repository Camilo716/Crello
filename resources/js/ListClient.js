import { getCardListApiUrl } from "./apiConfig";
import { ElementBuilder } from "./ElementBuilder";

const newListTitleInput = document.getElementById("title");

export class ListClient {
    static addNewList(
        fetchCardsByListsFunction,
        displayCardFormFunction,
        patchCardParentListFunction
    ) {
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
                this.displayLists(
                    [response.data],
                    fetchCardsByListsFunction,
                    displayCardFormFunction,
                    patchCardParentListFunction
                );
                newListTitleInput.value = "";
            })
            .catch((error) => console.error("Error adding new list:", error));
    }

    static displayLists(
        lists,
        fetchCardsByListsFunction,
        displayCardFormFunction,
        patchCardParentListFunction
    ) {
        lists.forEach((currentList) => {
            let newList = ElementBuilder.createListElement(currentList);
            listsContainer.appendChild(newList);

            let cardsContainerElement =
                ElementBuilder.createCardsContainerElement(
                    currentList.id,
                    patchCardParentListFunction
                );
            newList.appendChild(cardsContainerElement);

            fetchCardsByListsFunction(currentList.id);
            displayCardFormFunction(currentList.id, newList);
        });
    }
}
