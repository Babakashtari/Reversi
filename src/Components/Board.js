import React, { Component } from "react";
import Bolt from "./Bolt";

class Board extends Component {
  state = {
    playerNames: ["Player1", "Player2"],
    rows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    columns: [1, 2, 3, 4, 5, 6, 7, 8],
    // variable that change bolt colors according to players' turn:
    move: true,
    // color classes should begin with capital letter for their css classes to be functional:
    color: ["Black", "White"],
    color_number: [2, 2],
    currentColor: "Black",
    // index of the last column cells used in calculation for horizontal bolt taking:
    lastColumn: [7, 15, 23, 31, 39, 47, 55, 63],
    // index of the first column cells used in calculation for horizontal bolt taking:
    // in reverse order in order to let find() method find the first instance lower than the clicked item index:
    firstColumn: [56, 48, 40, 32, 24, 16, 8, 0],
    // cells located at the beginning and end of each oblique line on the board:
    // prettier-ignore
    top_left_to_Bottom_right_obliqueRowsLastCells: [7, 15, 23, 31, 39, 47, 55, 56, 57, 58, 59, 60, 61, 62, 63],
    // prettier-ignore
    top_left_to_Bottom_right_obliqueRowsFirstCells: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 24, 32, 40, 48, 56],
    // prettier-ignore
    top_right_to_Bottom_left_obliqueRowsLastCells: [0, 8, 16, 24, 32, 40, 48, 56, 57, 58, 59, 60, 61, 62, 63],
    // prettier-ignore
    top_right_to_Bottom_left_obliqueRowsFirstCells: [0, 1, 2, 3, 4, 5, 6, 7, 15, 23, 31, 39, 47, 55, 63]
  };
  componentWillMount() {
    // getting the players' name:
    const player_One = prompt(
      "Welcome player 1 ! What should we call you?",
      this.state.color[0]
    );
    const player_two = prompt(
      "Welcome player 2. What should we call you?",
      this.state.color[1]
    );
    if (player_One !== "" && player_two !== "") {
      const players_array = [player_One, player_two];
      this.setState({ playerNames: players_array });
    }
  }
  // placing the four centered bolts at the middle of the board:
  componentDidMount() {
    const Allcells = document.getElementsByTagName("td");
    // centered cells' index which should be always filled with bolts at the beginning of the game:
    // the order of this array matters:
    // prettier-ignore
    const centered_cells = [Allcells[27], Allcells[28], Allcells[36], Allcells[35]   ];
    const centered_cells_bolt = centered_cells.map(item => {
      return item.querySelector("span");
    });
    let boolean = true;
    centered_cells_bolt.forEach(item => {
      item.classList.remove("hide");
      if (boolean) {
        item.classList.add(this.state.color[0]);
      } else {
        item.classList.add(this.state.color[1]);
      }
      boolean = !boolean;
    });
    this.possibleMoveChecker();
  }
  possibleMoveChecker = () => {
    // highlight the possible moves of each player:
    const Allcells = document.getElementsByTagName("td");
    const AllcellsBolts = document.getElementsByTagName("span");
    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i].classList.contains("possible_moves")) {
        Allcells[i].classList.remove("possible_moves");
      }
      if (AllcellsBolts[i].classList.contains("hide")) {
        this.firstPossibleMove(i);
        this.secondPossibleMove(i);
        this.thirdPossibleMove(i);
        this.fourthPossibleMove(i);
        this.fifthPossibleMove(i);
        this.sixthPossibleMove(i);
        this.seventhPossibleMove(i);
        this.eighthPossibleMove(i);
      }
    }
  };
  // ----- Check if the player has chosen the right cell -----
  checker = e => {
    const first = this.first(e);
    const second = this.second(e);
    const third = this.third(e);
    const fourth = this.fourth(e);
    const fifth = this.fifth(e);
    const sixth = this.sixth(e);
    const seventh = this.seventh(e);
    const eighth = this.eighth(e);

    // prettier-ignore
    if (first || second || third || fourth || fifth || sixth || seventh || eighth) {
      // if at least one of the 8 direction checks returns "true" then the move is considered to be valid:
      this.clicking(e);
    }
  };
  first = e => {
    // horizontally from left to right:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;
    for (let i = 0; i < Allcells.length; i++) {
      // selecting the clicked cell in Allcells array:
      if (Allcells[i] === boltCell) {
        // return the first and last column cell of the clicked cell:
        const lastcolumnIndex = this.state.lastColumn.find(item => {
          return item >= i;
        });
        if (
          i !== lastcolumnIndex &&
          !Allcells[i + 1].querySelector("span").classList.contains("hide") &&
          !Allcells[i + 1]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i + 1; l <= lastcolumnIndex; l++) {
            if (Allcells[l].querySelector("span").classList.contains("hide")) {
              break;
            }
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i + 1
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  firstPossibleMove = i => {
    // horizontally from left to right:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const lastcolumnIndex = this.state.lastColumn.find(item => {
      return item >= i;
    });
    if (
      i !== lastcolumnIndex &&
      !Allcells[i + 1].querySelector("span").classList.contains("hide") &&
      !Allcells[i + 1]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i + 1; l <= lastcolumnIndex; l++) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i + 1
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return;
  };
  second = e => {
    // horizontally from right to left:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;
    // an array of all td elements on the board:

    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i] === boltCell) {
        // return the first column cell of the clicked cell:
        const firstcolumnIndex = this.state.firstColumn.find(item => {
          return item <= i;
        });
        if (
          i !== firstcolumnIndex &&
          !Allcells[i - 1].querySelector("span").classList.contains("hide") &&
          !Allcells[i - 1]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i - 1; l >= firstcolumnIndex; l--) {
            if (Allcells[l].querySelector("span").classList.contains("hide")) {
              break;
            }
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i - 1
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  secondPossibleMove = i => {
    // horizontally from right to left:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const firstcolumnIndex = this.state.firstColumn.find(item => {
      return item <= i;
    });
    if (
      i !== firstcolumnIndex &&
      !Allcells[i - 1].querySelector("span").classList.contains("hide") &&
      !Allcells[i - 1]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i - 1; l >= firstcolumnIndex; l--) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i - 1
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return;
  };
  third = e => {
    // vertically from top to bottom:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;
    // an array of all td elements on the board:
    const emptyLastArr = [];

    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i] === boltCell) {
        for (let l = i; l <= 63; l += 8) {
          emptyLastArr.push(l);
        }
        const lastrowIndex = emptyLastArr.pop();
        if (
          i !== lastrowIndex &&
          !Allcells[i + 8].querySelector("span").classList.contains("hide") &&
          !Allcells[i + 8]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i + 8; l <= lastrowIndex; l += 8) {
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i + 8
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  thirdPossibleMove = i => {
    // vertically from top to bottom:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const emptyLastArr = [];
    for (let l = i; l <= 63; l += 8) {
      emptyLastArr.push(l);
    }
    const lastrowIndex = emptyLastArr.pop();
    if (
      // Allcells[i].classList.contains("hide") &&
      i !== lastrowIndex &&
      !Allcells[i + 8].querySelector("span").classList.contains("hide") &&
      !Allcells[i + 8]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i + 8; l <= lastrowIndex; l += 8) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i + 8
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return;
  };

  fourth = e => {
    // vertically from bottom to top:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;
    // an array of all td elements on the board:
    const emptyFirstArr = [];

    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i] === boltCell) {
        for (let l = i; l >= 0; l -= 8) {
          emptyFirstArr.push(l);
        }
        const firstrowIndex = emptyFirstArr.pop();
        if (
          i !== firstrowIndex &&
          !Allcells[i - 8].querySelector("span").classList.contains("hide") &&
          !Allcells[i - 8]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i - 8; l >= firstrowIndex; l -= 8) {
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i - 8
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  fourthPossibleMove = i => {
    // vertically from bottom to top:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const emptyFirstArr = [];
    for (let l = i; l >= 0; l -= 8) {
      emptyFirstArr.push(l);
    }
    const firstrowIndex = emptyFirstArr.pop();
    if (
      // Allcells[i].classList.contains("hide") &&
      i !== firstrowIndex &&
      !Allcells[i - 8].querySelector("span").classList.contains("hide") &&
      !Allcells[i - 8]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i - 8; l >= firstrowIndex; l -= 8) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i - 8
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return;
  };

  fifth = e => {
    // slantwise from top left to bottom right:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;
    // an array of all td elements on the board:
    const lastCells_array = [];
    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i] === boltCell) {
        for (let l = i; l <= 63; l += 9) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value = this.state.top_left_to_Bottom_right_obliqueRowsLastCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value !== undefined) {
            lastCells_array.push(array_value);
          }
        }
        // shifting the first value of the array
        const selected_oblique_lastCell = lastCells_array.shift();
        if (
          i !== selected_oblique_lastCell &&
          !Allcells[i + 9].querySelector("span").classList.contains("hide") &&
          !Allcells[i + 9]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i + 9; l <= selected_oblique_lastCell; l += 9) {
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i + 9
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  fifthPossibleMove = i => {
    // slantwise from top left to bottom right:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const lastCells_array = [];
    for (let l = i; l <= 63; l += 9) {
      // taking the 2 values of last cells in both X and Y axis:
      const array_value = this.state.top_left_to_Bottom_right_obliqueRowsLastCells.find(
        item => {
          return item === l;
        }
      );
      // pushing the 2 returned values to an empty array:
      if (array_value !== undefined) {
        lastCells_array.push(array_value);
      }
    }
    // shifting the first value of the array
    const selected_oblique_lastCell = lastCells_array.shift();
    if (
      i !== selected_oblique_lastCell &&
      !Allcells[i + 9].querySelector("span").classList.contains("hide") &&
      !Allcells[i + 9]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i + 9; l <= selected_oblique_lastCell; l += 9) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i + 9
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return;
  };
  sixth = e => {
    // slantwise from bottom right to top left:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;
    // an array of all td elements on the board:
    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i] === boltCell) {
        const lastCells_array = [];
        for (let l = i; l >= 0; l -= 9) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value = this.state.top_left_to_Bottom_right_obliqueRowsFirstCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value !== undefined) {
            lastCells_array.push(array_value);
          }
        }
        // shifting the first value of the array
        const selected_oblique_FirstCell = lastCells_array.shift();
        if (
          i !== selected_oblique_FirstCell &&
          !Allcells[i - 9].querySelector("span").classList.contains("hide") &&
          !Allcells[i - 9]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i - 9; l >= selected_oblique_FirstCell; l -= 9) {
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i - 9
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  sixthPossibleMove = i => {
    // slantwise from bottom right to top left:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const lastCells_array = [];
    for (let l = i; l >= 0; l -= 9) {
      // taking the 2 values of last cells in both X and Y axis:
      const array_value = this.state.top_left_to_Bottom_right_obliqueRowsFirstCells.find(
        item => {
          return item === l;
        }
      );
      // pushing the 2 returned values to an empty array:
      if (array_value !== undefined) {
        lastCells_array.push(array_value);
      }
    }
    // shifting the first value of the array
    const selected_oblique_FirstCell = lastCells_array.shift();
    if (
      i !== selected_oblique_FirstCell &&
      !Allcells[i - 9].querySelector("span").classList.contains("hide") &&
      !Allcells[i - 9]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i - 9; l >= selected_oblique_FirstCell; l -= 9) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i - 9
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return;
  };

  seventh = e => {
    // slantwise from top right to bottom left:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;
    // an array of all td elements on the board:
    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i] === boltCell) {
        const lastCells_array = [];
        for (let l = i; l <= 63; l += 7) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value = this.state.top_right_to_Bottom_left_obliqueRowsLastCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value !== undefined) {
            lastCells_array.push(array_value);
          }
        }
        // shifting the first value of the array
        const selected_oblique_lastCell = lastCells_array.shift();
        if (
          i !== selected_oblique_lastCell &&
          !Allcells[i + 7].querySelector("span").classList.contains("hide") &&
          !Allcells[i + 7]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i + 7; l <= selected_oblique_lastCell; l += 7) {
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i + 7
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  seventhPossibleMove = i => {
    // slantwise from top right to bottom left:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const lastCells_array = [];
    for (let l = i; l <= 63; l += 7) {
      // taking the 2 values of last cells in both X and Y axis:
      const array_value = this.state.top_right_to_Bottom_left_obliqueRowsLastCells.find(
        item => {
          return item === l;
        }
      );
      // pushing the 2 returned values to an empty array:
      if (array_value !== undefined) {
        lastCells_array.push(array_value);
      }
    }
    // shifting the first value of the array
    const selected_oblique_lastCell = lastCells_array.shift();
    if (
      i !== selected_oblique_lastCell &&
      !Allcells[i + 7].querySelector("span").classList.contains("hide") &&
      !Allcells[i + 7]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i + 7; l <= selected_oblique_lastCell; l += 7) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i + 7
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return;
  };
  eighth = e => {
    // slantwise from bottom left to top right:
    const Allcells = document.getElementsByTagName("td");
    const boltCell = e.currentTarget;

    // an array of all td elements on the board:

    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i] === boltCell) {
        const lastCells_array = [];
        for (let l = i; l >= 0; l -= 7) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value = this.state.top_right_to_Bottom_left_obliqueRowsFirstCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value !== undefined) {
            lastCells_array.push(array_value);
          }
        }
        // shifting the first value of the array
        const selected_oblique_FirstCell = lastCells_array.shift();
        if (
          i !== selected_oblique_FirstCell &&
          !Allcells[i - 7].querySelector("span").classList.contains("hide") &&
          !Allcells[i - 7]
            .querySelector("span")
            .classList.contains(this.state.currentColor)
        ) {
          for (let l = i - 7; l >= selected_oblique_FirstCell; l -= 7) {
            if (
              Allcells[l]
                .querySelector("span")
                .classList.contains(this.state.currentColor) &&
              l !== i - 7
            ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  };
  eighthPossibleMove = i => {
    // slantwise from bottom left to top right:
    const Allcells = document.getElementsByTagName("td");
    if (Allcells[i].classList.contains("possible_moves")) {
      return;
    }
    const lastCells_array = [];
    for (let l = i; l >= 0; l -= 7) {
      // taking the 2 values of last cells in both X and Y axis:
      const array_value = this.state.top_right_to_Bottom_left_obliqueRowsFirstCells.find(
        item => {
          return item === l;
        }
      );
      // pushing the 2 returned values to an empty array:
      if (array_value !== undefined) {
        lastCells_array.push(array_value);
      }
    }
    // shifting the first value of the array
    const selected_oblique_FirstCell = lastCells_array.shift();
    if (
      i !== selected_oblique_FirstCell &&
      !Allcells[i - 7].querySelector("span").classList.contains("hide") &&
      !Allcells[i - 7]
        .querySelector("span")
        .classList.contains(this.state.currentColor)
    ) {
      for (let l = i - 7; l >= selected_oblique_FirstCell; l -= 7) {
        if (Allcells[l].querySelector("span").classList.contains("hide")) {
          break;
        }
        if (
          Allcells[l]
            .querySelector("span")
            .classList.contains(this.state.currentColor) &&
          l !== i - 7
        ) {
          Allcells[i].classList.add("possible_moves");
        }
      }
    }
    return false;
  };
  clicking = e => {
    // bolt selector:
    const bolt = e.currentTarget.querySelector("span");
    const boltCell = e.currentTarget;

    // an array of all td elements on the board:
    const Allcells = document.getElementsByTagName("td");

    // -----how to change player bolt colors:-----
    // conditionally change the bolt player colors on turns:
    bolt.classList.remove("hide");
    if (this.state.move) {
      bolt.classList.add(this.state.color[0]);
      this.setState({ currentColor: this.state.color[1] });
    } else {
      bolt.classList.add(this.state.color[1]);
      this.setState({ currentColor: this.state.color[0] });
    }

    // bolt player selector according to the turns:
    this.setState({ move: !this.state.move });
    setTimeout(() => {
      bolt.style.transform = "rotateY(180deg)";
    }, 1);

    // -----how to take opponent's bolts-----
    //    ---- horizontal bolt taking (X axis) ----
    for (let i = 0; i < Allcells.length; i++) {
      // selecting the clicked cell in Allcells array:
      if (Allcells[i] === boltCell) {
        // return the first and last column cell of the clicked cell:
        const lastcolumnIndex = this.state.lastColumn.find(item => {
          return item >= i;
        });
        const firstcolumnIndex = this.state.firstColumn.find(item => {
          return item <= i;
        });

        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== lastcolumnIndex &&
          !Allcells[i + 1].querySelector("span").classList.contains("hide") &&
          Allcells[i + 1].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray = [];
          let sameColorsArray = [];
          // check if there is any bolts of the same color in the row:
          for (let l = i + 1; l <= lastcolumnIndex; l++) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              //pushing same color bolts in a row into an array:
              sameColorsArray.push(Allcells[l]);
              // stop the iteration if there are more than one bolt with the same color in a row:
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt with the same color in the same row):
              for (let x = i + 1; x < l; x++) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              if (emptyCellsArray.length === 0) {
                for (let x = i + 1; x < l; x++) {
                  //check to see if the length of the empty array cells is 0:
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }

        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== firstcolumnIndex &&
          !Allcells[i - 1].querySelector("span").classList.contains("hide") &&
          Allcells[i - 1].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray = [];
          const sameColorsArray = [];
          // check if there is any bolts of the same color in the row:
          for (let l = i - 1; l >= firstcolumnIndex; l--) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // pushing the same color bolts in a row into an array:
              sameColorsArray.push(Allcells[l]);
              // stop the iteration if there are more than one bolt with the same color in a row:
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 1; x > l; x--) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i - 1; x > l; x--) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
      }
    }
    //       ---- vertical bolt taking (Y axis) ----
    //      -- from top to bottom bolt taking --
    for (let i = 0; i < Allcells.length; i++) {
      // selecting the clicked cell in Allcells array:
      if (Allcells[i] === boltCell) {
        // return the first and last column cells of the clicked cell:
        const emptyLastArr = [];
        for (let l = i; l <= 63; l += 8) {
          emptyLastArr.push(l);
        }
        const lastrowIndex = emptyLastArr.pop();
        const emptyFirstArr = [];
        for (let l = i; l >= 0; l -= 8) {
          emptyFirstArr.push(l);
        }
        const firstrowIndex = emptyFirstArr.pop();

        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== lastrowIndex &&
          !Allcells[i + 8].querySelector("span").classList.contains("hide") &&
          Allcells[i + 8].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          const emptyCellsArray = [];
          const sameColorsArray = [];
          // check if there are any bolts of the same color in the row:
          for (let l = i + 8; l <= lastrowIndex; l += 8) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // pushing same color bolts in a column into an empty array:
              sameColorsArray.push(Allcells[l]);
              // stop the iteration if there are more than one bolt with the same color in a column:
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt with the same color in the same row):
              for (let x = i + 8; x < l; x += 8) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i + 8; x < l; x += 8) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        //    -- from bottom to top bolt taking --
        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== firstrowIndex &&
          !Allcells[i - 8].querySelector("span").classList.contains("hide") &&
          Allcells[i - 8].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          const emptyCellsArray = [];
          const sameColorsArray = [];
          // check if there is any bolts of the same color in the column:
          for (let l = i - 8; l >= firstrowIndex; l -= 8) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // pushing same color bolts into an empty array representing the same color bolts in a column:
              sameColorsArray.push(Allcells[l]);
              // stop the iteration and bolt color changing if there is more than one bolt with the same color in a column:
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 8; x > l; x -= 8) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i - 8; x > l; x -= 8) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        //        -----oblique bolt taking (Z axis)-----
        //          -- from top left to bottom right --
        const lastCells_array = [];
        for (let l = i; l <= 63; l += 9) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value = this.state.top_left_to_Bottom_right_obliqueRowsLastCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value !== undefined) {
            lastCells_array.push(array_value);
          }
        }
        // shifting the first value of the array
        const selected_oblique_lastCell = lastCells_array.shift();
        if (
          i !== selected_oblique_lastCell &&
          !Allcells[i + 9].querySelector("span").classList.contains("hide") &&
          Allcells[i + 9].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          const emptyCellsArray = [];
          const sameColorsArray = [];
          // check if there is any bolts of the same color in the column:
          for (let l = i + 9; l <= selected_oblique_lastCell; l += 9) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // pushing the same color bolts of an oblique row into an array:
              sameColorsArray.push(Allcells[l]);
              // checking if the same color array has more than one element. if so the itteration must stop so that the next bolts in the same row don't change:
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i + 9; x < l; x += 9) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i + 9; x < l; x += 9) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        // -- from bottom right to top left --

        const lastCells_array2 = [];
        for (let l = i; l >= 0; l -= 9) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value2 = this.state.top_left_to_Bottom_right_obliqueRowsFirstCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value2 !== undefined) {
            lastCells_array2.push(array_value2);
          }
        }
        // shifting the first value of the array
        const selected_oblique_FirstCell = lastCells_array2.shift();
        if (
          i !== selected_oblique_FirstCell &&
          !Allcells[i - 9].querySelector("span").classList.contains("hide") &&
          Allcells[i - 9].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          const emptyCellsArray2 = [];
          const sameColorsArray = [];
          // check if there is any bolts of the same color in the oblique column:
          for (let l = i - 9; l >= selected_oblique_FirstCell; l -= 9) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // pushing the same color bolts of an oblique row into an array:
              sameColorsArray.push(Allcells[l]);
              // checking if the same color array has more than one item: if so the iteration must stop so that unrelated bolts do not change color
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 9; x > l; x -= 9) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray2.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray2.length === 0) {
                for (let x = i - 9; x > l; x -= 9) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        // -- from top right to bottom left --
        const lastCells_array3 = [];
        for (let l = i; l <= 63; l += 7) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value3 = this.state.top_right_to_Bottom_left_obliqueRowsLastCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value3 !== undefined) {
            lastCells_array3.push(array_value3);
          }
        }
        // shifting the first value of the array
        const selected_oblique_lastCell3 = lastCells_array3.shift();
        if (
          i !== selected_oblique_lastCell3 &&
          !Allcells[i + 7].querySelector("span").classList.contains("hide") &&
          Allcells[i + 7].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          const emptyCellsArray3 = [];
          const sameColorsArray = [];
          // check if there is any bolts of the same color in the column:
          for (let l = i + 7; l <= selected_oblique_lastCell3; l += 7) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // pushing individual items of the same color bolts into an empty array:
              sameColorsArray.push(Allcells[l]);
              // checking if the array has more than one bolt with the same color. if so iteration stops so that unrelevent bolts do not change color
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i + 7; x < l; x += 7) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray3.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray3.length === 0) {
                for (let x = i + 7; x < l; x += 7) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        // -- from bottom left to top right --

        const lastCells_array4 = [];
        for (let l = i; l >= 0; l -= 7) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value4 = this.state.top_right_to_Bottom_left_obliqueRowsFirstCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value4 !== undefined) {
            lastCells_array4.push(array_value4);
          }
        }
        // shifting the first value of the array
        const selected_oblique_FirstCell4 = lastCells_array4.shift();
        if (
          i !== selected_oblique_FirstCell4 &&
          !Allcells[i - 7].querySelector("span").classList.contains("hide") &&
          Allcells[i - 7].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          const emptyCellsArray4 = [];
          const sameColorsArray = [];
          // check if there are any bolts of the same color in the oblique column:
          for (let l = i - 7; l >= selected_oblique_FirstCell4; l -= 7) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // pushing same color bolts into an array of the same color bolts of the same oblique row:
              sameColorsArray.push(Allcells[l]);
              // checking in order to stop the iteration if there are more than one bolt of the same color in the row:
              if (sameColorsArray.length > 1) {
                break;
              }
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 7; x > l; x -= 7) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray4.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray4.length === 0) {
                for (let x = i - 7; x > l; x -= 7) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
      }
    }
    // calling a function which will check the number of each color bolt:
    this.number();
    setTimeout(() => {
      this.possibleMoveChecker();
    }, 1);
  };

  // a function which will check the number of each color bolt:
  number = () => {
    let first_number = 0;
    let second_number = 0;
    const Allcells = document.getElementsByTagName("span");
    for (let i = 0; i < Allcells.length; i++) {
      if (Allcells[i].classList.contains(this.state.color[0])) {
        second_number += 1;
      } else if (Allcells[i].classList.contains(this.state.color[1])) {
        first_number += 1;
      }
    }
    const number_of_bolts = [first_number, second_number];
    this.setState({ color_number: number_of_bolts });
  };

  // how the bolts' color is changed in the state:
  changeColor = event => {
    // the returned value is a string ex: '["Black", "White"]'
    const returnedValue = event.target.value;
    // split the string from " ' " so that it will be something like : [ "[" , "Red" , "," , "Blue" , "]" ]
    const string_of_colors = returnedValue.split("'");
    // putting the two colors according to their index to an array:
    const array_of_colors = [];
    array_of_colors.push(string_of_colors[1]);
    array_of_colors.push(string_of_colors[3]);

    // changing the bolts that are already in place on the board:
    if (this.state.color !== array_of_colors) {
      this.setState({
        color: array_of_colors
      });
    }
    if (this.state.move) {
      this.setState({ currentColor: array_of_colors[0] });
    } else {
      this.setState({ currentColor: array_of_colors[1] });
    }
  };
  componentDidUpdate(PrevProps, PrevState) {
    // how to change the color of the bolts:
    const AllcellsBolts = document.getElementsByTagName("span");
    for (let i = 0; i < AllcellsBolts.length; i++) {
      if (AllcellsBolts[i].classList.contains(PrevState.color[0])) {
        AllcellsBolts[i].classList.remove(PrevState.color[0]);
        AllcellsBolts[i].classList.add(this.state.color[0]);
      } else if (AllcellsBolts[i].classList.contains(PrevState.color[1])) {
        AllcellsBolts[i].classList.remove(PrevState.color[1]);
        AllcellsBolts[i].classList.add(this.state.color[1]);
      }
    }
  }

  render() {
    // styling the players bolt number section:
    const player_one = {
      color: this.state.color[1]
    };
    const player_two = {
      color: this.state.color[0]
    };
    return (
      <React.Fragment>
        <section style={{ display: "flex", justifyContent: "center" }}>
          <table
            style={{
              backgroundColor: "green",
              color: "white"
            }}
            className="Board m-3"
          >
            <tbody>
              {this.state.rows.map((item, index) => {
                const rowName = this.state.rows[index];
                return (
                  <tr key={rowName} ref={rowName}>
                    {this.state.columns.map((item, index) => {
                      const columnName = this.state.columns[index];
                      const cellName = rowName + columnName;
                      return (
                        <td
                          onClick={this.checker}
                          style={{
                            cursor: "pointer",
                            border: "3px solid white",
                            height: "80px",
                            width: "80px",
                            position: "relative",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                          }}
                          key={cellName}
                          ref={cellName}
                        >
                          <Bolt />
                          {cellName}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section
          className="container"
          style={{
            backgroundColor: "gray",
            border: "3px solid black",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <div>
            <h4>{this.state.playerNames[0]}</h4>
            <p style={player_two}>
              Number of bolts: {this.state.color_number[1]}
            </p>
          </div>
          <div>
            <select
              style={{ textAlign: "center", width: "25rem" }}
              multiple={true}
              name="bolt_color"
              id="colorizer"
              value={this.state.color}
              onChange={this.changeColor}
            >
              <option value="['Black', 'White']">Black and White</option>
              <option value="['Red', 'Blue']">Red and Blue</option>
              <option value="['Green', 'Yellow']">Green and Yellow</option>
              <option value="['Violet', 'Brown']">Violet and Brown</option>
            </select>
          </div>
          <div>
            <h4>{this.state.playerNames[1]}</h4>
            <p style={player_one}>
              Number of bolts: {this.state.color_number[0]}
            </p>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Board;
