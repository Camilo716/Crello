import { getBoardApiUrl } from "../Util/apiConfig";
import { ElementBuilder } from "../Util/ElementBuilder";
import { ListClient } from "./ListClient";

const boardsContainer = document.getElementById("boardsContainer");

export class BoardClient {
    static AddNewBoard() {
        const newBoardNameInput = document.getElementById("boardNameInput");

        fetch(getBoardApiUrl(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ name: newBoardNameInput.value }),
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then((response) => {
                this.displayBoards([response.data]);
                newBoardNameInput.value = "";
            })
            .catch((error) => console.error("Error adding new board:", error));
    }

    static fetchBoards() {
        fetch(getBoardApiUrl(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                this.displayBoards(response.data);
            })
            .catch((error) => console.error("Error fetching boards:", error));
    }

    static displayBoards(boards) {
        boards.forEach((currentBoard) => {
            let boardElement =
                ElementBuilder.createBoardButtonElement(currentBoard);

            boardElement.addEventListener("click", () =>
                this._displayListsInABoard(currentBoard.id)
            );

            boardsContainer.appendChild(boardElement);
        });
    }

    static _displayListsInABoard(boardId) {
        let listsContainer = document.getElementById("listsContainer");
        listsContainer.innerHTML = "";
        ListClient.fetchListsByBoard(boardId);
    }
}
