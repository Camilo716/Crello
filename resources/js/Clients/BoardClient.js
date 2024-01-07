import { getBoardApiUrl } from "../Util/apiConfig";
import { ElementBuilder } from "../Util/ElementBuilder";

const boardsContainer = document.getElementById("boardsContainer");

export class BoardClient {
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
            let boardElement = ElementBuilder.createBoardElement(currentBoard);
            boardsContainer.appendChild(boardElement);
        });
    }
}
