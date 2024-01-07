import { getCardApiUrl, getCardsByIdApiUrl } from "./apiConfig";
import { ElementBuilder } from "./ElementBuilder";

export class CardClient {
    static addNewCard(listId) {
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
                this.displayCards([response.data], listId);
                newCardTitleInput.value = "";
            })
            .catch((error) => console.error("Error adding new list:", error));
    }

    static displayCards(cards, parentcardContainerId) {
        const cardsContainerElement = document.getElementById(
            `cardsContainer-${parentcardContainerId}`
        );
        cards.forEach((currentCard) => {
            let newCard = ElementBuilder.createCardElement(
                currentCard,
                this.deleteCard
            );
            cardsContainerElement.appendChild(newCard);
        });
    }

    static deleteCard(cardId) {
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
}
