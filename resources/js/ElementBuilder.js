export class ElementBuilder {
    createBoardElement(board) {
        let boardElement = document.createElement("div");
        boardElement.className = "board";
        boardElement.innerHTML = `<h1>${board.name}</h1>`;
        boardElement.id = `board-${board.id}`;
    
        return boardElement;
    }

    createListElement(currentList) {
        let newList = document.createElement("div");
        newList.className = "list";
        newList.innerHTML = `<h2>${currentList.title}</h2>`;
        return newList;
    }

    createCardsContainerElement(currentListId) {
        let cardsContainerElement = document.createElement("div");
        cardsContainerElement.className = "cardsContainer";
        cardsContainerElement.id = `cardsContainer-${currentListId}`;
    
        this._makeCardsContainerDroppable(cardsContainerElement);
    
        return cardsContainerElement;
    }

    createCardElement(currentCard) {
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

    createAddNewCardFormElement(parentListId) {
        let newCardForm = document.createElement("form");
        newCardForm.className = "newCardForm";
    
        newCardForm.innerHTML = `
        <input type="text" placeholder="Enter card title..." id="addCardTitleInput-${parentListId}">
        <button class="addNewCard" type="button" id="addCardButton-${parentListId}">Add Card</button>
        `;
    
        return newCardForm;
    }
    _makeCardsContainerDroppable(cardContainerElement) {
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
}